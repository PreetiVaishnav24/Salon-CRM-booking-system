import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonDataService } from '../../services/salon-data.service';
import { Appointment, Bill } from '../../models';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  appointment?: Appointment;
  bill?: Bill;
  toast = '';

  taxRate = 18;
  discount = 0;
  billGenerated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: SalonDataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.appointment = this.data.getAppointmentById(id);
    const existing = this.data.getBillByAppointment(id);
    if (existing) {
      this.bill = existing;
      this.taxRate = existing.taxRate;
      this.discount = existing.discount;
      this.billGenerated = true;
    }
  }

  get serviceAmount(): number { return this.appointment?.servicePrice || 0; }
  get taxAmount(): number { return Math.round(this.serviceAmount * this.taxRate / 100); }
  get total(): number { return this.serviceAmount + this.taxAmount - this.discount; }

  generate() {
    if (!this.appointment) return;
    const bill: Bill = {
      id: this.data.generateId('bill'),
      appointmentId: this.appointment.id,
      clientName: this.appointment.clientName,
      clientPhone: this.appointment.clientPhone,
      staffName: this.appointment.staffName,
      serviceName: this.appointment.serviceName,
      serviceAmount: this.appointment.servicePrice,
      date: this.appointment.date,
      time: this.appointment.timeSlot,
      taxRate: this.taxRate,
      taxAmount: this.taxAmount,
      discount: this.discount,
      total: this.total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.data.addBill(bill);
    this.bill = bill;
    this.billGenerated = true;
    this.showToast('Bill generated!');

    // Mark appointment as completed
    if (this.appointment.status !== 'completed') {
      this.data.updateAppointment({ ...this.appointment, status: 'completed' });
    }
  }

  print() {
    window.print();
  }

  shareWhatsApp() {
    if (!this.bill) return;
    const msg = `Bill from Lumière Salon\n\nClient: ${this.bill.clientName}\nService: ${this.bill.serviceName}\nStaff: ${this.bill.staffName}\nDate: ${this.bill.date} at ${this.bill.time}\n\nService Amount: ₹${this.bill.serviceAmount}\nTax (${this.bill.taxRate}%): ₹${this.bill.taxAmount}\nDiscount: -₹${this.bill.discount}\n─────────────\nTotal: ₹${this.bill.total}\n\nThank you for visiting us!`;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  }

  copyBill() {
    if (!this.bill) return;
    const txt = `Bill: ${this.bill.clientName} | ${this.bill.serviceName} | ₹${this.bill.total} | ${this.bill.date}`;
    navigator.clipboard.writeText(txt);
    this.showToast('Copied!');
  }

  showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => this.toast = '', 3000);
  }

  back() { this.router.navigate(['/home/appointments', this.appointment?.id]); }
}
