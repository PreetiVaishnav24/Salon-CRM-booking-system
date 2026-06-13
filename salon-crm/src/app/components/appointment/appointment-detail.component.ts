import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonDataService } from '../../services/salon-data.service';
import { Appointment } from '../../models';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
  appointment?: Appointment;
  showShareModal = false;
  shareTarget = '';
  toast = '';
  showCancelConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: SalonDataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.data.appointments$.subscribe(appts => {
      this.appointment = appts.find(a => a.id === id);
    });
  }

  edit() {
    this.router.navigate(['/home/appointments/new'], { queryParams: { edit: this.appointment!.id } });
  }

  reschedule() {
    this.router.navigate(['/home/appointments/new'], {
      queryParams: { edit: this.appointment!.id, reschedule: true }
    });
  }

  confirm() {
    const updated = { ...this.appointment!, status: 'confirmed' as const };
    this.data.updateAppointment(updated);
    this.showToast('Appointment confirmed!');
  }

  complete() {
    const updated = { ...this.appointment!, status: 'completed' as const };
    this.data.updateAppointment(updated);
    this.showToast('Marked as completed!');
  }

  cancel() {
    const updated = { ...this.appointment!, status: 'cancelled' as const };
    this.data.updateAppointment(updated);
    this.showCancelConfirm = false;
    this.showToast('Appointment cancelled.');
  }

  generateBill() {
    this.router.navigate(['/home/billing', this.appointment!.id]);
  }

  share(target: string) {
    this.shareTarget = target;
    this.showShareModal = true;
  }

  sendShare() {
    const a = this.appointment!;
    const msg = `Appointment Details:\nClient: ${a.clientName}\nService: ${a.serviceName}\nStaff: ${a.staffName}\nDate: ${a.date}\nTime: ${a.timeSlot}\nPrice: ₹${a.servicePrice}`;
    const encoded = encodeURIComponent(msg);
    const wa = `https://wa.me/?text=${encoded}`;
    window.open(wa, '_blank');
    this.showShareModal = false;
    this.showToast(`Details shared via WhatsApp!`);
  }

  copyDetails() {
    const a = this.appointment!;
    const msg = `Appointment: ${a.clientName} | ${a.serviceName} | ${a.date} at ${a.timeSlot} | ${a.staffName} | ₹${a.servicePrice}`;
    navigator.clipboard.writeText(msg);
    this.showToast('Copied to clipboard!');
  }

  showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => this.toast = '', 3000);
  }

  back() { this.router.navigate(['/home/appointments']); }
}
