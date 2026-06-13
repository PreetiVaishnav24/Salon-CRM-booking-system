import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonDataService } from '../../services/salon-data.service';
import { Staff, Service, Appointment } from '../../models';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  staff: Staff[] = [];
  services: Service[] = [];
  timeSlots: string[] = [];
  serviceCategories: string[] = [];
  toast = '';

  form = {
    clientName: '',
    clientPhone: '',
    staffId: '',
    date: '',
    timeSlot: '',
    serviceId: '',
    notes: ''
  };

  selectedService?: Service;
  selectedStaff?: Staff;
  isEdit = false;
  editId = '';

  constructor(
    private data: SalonDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.staff = this.data.staff;
    this.services = this.data.services;
    this.timeSlots = this.data.timeSlots;
    this.serviceCategories = [...new Set(this.services.map(s => s.category))];

    const params = this.route.snapshot.queryParams;
    if (params['date']) this.form.date = params['date'];
    if (params['staffId']) {
      this.form.staffId = params['staffId'];
      this.selectedStaff = this.staff.find(s => s.id === this.form.staffId);
    }
    if (params['time']) this.form.timeSlot = params['time'];
    if (params['edit']) {
      this.isEdit = true;
      this.editId = params['edit'];
      const appt = this.data.getAppointmentById(this.editId);
      if (appt) {
        this.form = {
          clientName: appt.clientName,
          clientPhone: appt.clientPhone,
          staffId: appt.staffId,
          date: appt.date,
          timeSlot: appt.timeSlot,
          serviceId: appt.serviceId,
          notes: appt.notes || ''
        };
        this.onServiceChange();
        this.onStaffChange();
      }
    }
  }

  onServiceChange() {
    this.selectedService = this.services.find(s => s.id === this.form.serviceId);
  }

  onStaffChange() {
    this.selectedStaff = this.staff.find(s => s.id === this.form.staffId);
  }

  getServicesByCategory(cat: string): Service[] {
    return this.services.filter(s => s.category === cat);
  }

  book() {
    if (!this.form.clientName || !this.form.clientPhone || !this.form.staffId ||
        !this.form.date || !this.form.timeSlot || !this.form.serviceId) {
      this.showToast('Please fill in all required fields.', 'error');
      return;
    }
    const service = this.services.find(s => s.id === this.form.serviceId)!;
    const staff = this.staff.find(s => s.id === this.form.staffId)!;

    if (this.isEdit) {
      const existing = this.data.getAppointmentById(this.editId)!;
      const updated: Appointment = {
        ...existing,
        clientName: this.form.clientName,
        clientPhone: this.form.clientPhone,
        staffId: this.form.staffId,
        staffName: staff.name,
        date: this.form.date,
        timeSlot: this.form.timeSlot,
        serviceId: this.form.serviceId,
        serviceName: service.name,
        servicePrice: service.price,
        notes: this.form.notes
      };
      this.data.updateAppointment(updated);
      this.showToast('Appointment updated!', 'success');
      setTimeout(() => this.router.navigate(['/home/appointments', this.editId]), 1000);
    } else {
      const appt: Appointment = {
        id: this.data.generateId('a'),
        clientId: this.data.generateId('c'),
        clientName: this.form.clientName,
        clientPhone: this.form.clientPhone,
        staffId: this.form.staffId,
        staffName: staff.name,
        date: this.form.date,
        timeSlot: this.form.timeSlot,
        serviceId: this.form.serviceId,
        serviceName: service.name,
        servicePrice: service.price,
        status: 'booked',
        notes: this.form.notes,
        createdAt: new Date().toISOString()
      };
      this.data.addAppointment(appt);
      this.showToast('Appointment booked!', 'success');
      setTimeout(() => this.router.navigate(['/home/appointments', appt.id]), 1000);
    }
  }

  showToast(msg: string, type = 'success') {
    this.toast = msg;
    setTimeout(() => this.toast = '', 3000);
  }

  cancel() { this.router.navigate(['/home/calendar']); }
}
