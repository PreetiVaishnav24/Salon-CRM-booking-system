import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SalonDataService } from '../../services/salon-data.service';
import { Staff, Appointment } from '../../models';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentWeekStart!: Date;
  weekDays: Date[] = [];
  staff: Staff[] = [];
  appointments: Appointment[] = [];
  timeSlots: string[] = [];

  constructor(private data: SalonDataService, private router: Router) {}

  ngOnInit() {
    this.staff = this.data.staff;
    this.timeSlots = this.data.timeSlots;
    this.setWeek(new Date());
    this.data.appointments$.subscribe(a => this.appointments = a);
  }

  setWeek(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    this.currentWeekStart = new Date(d.setDate(diff));
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
      const wd = new Date(this.currentWeekStart);
      wd.setDate(wd.getDate() + i);
      return wd;
    });
  }

  prevWeek() {
    const d = new Date(this.currentWeekStart);
    d.setDate(d.getDate() - 7);
    this.setWeek(d);
  }

  nextWeek() {
    const d = new Date(this.currentWeekStart);
    d.setDate(d.getDate() + 7);
    this.setWeek(d);
  }

  goToToday() { this.setWeek(new Date()); }

  formatDate(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  isToday(d: Date): boolean {
    return this.formatDate(d) === this.formatDate(new Date());
  }

  getAppointment(date: Date, staffId: string, time: string): Appointment | undefined {
    const ds = this.formatDate(date);
    return this.appointments.find(a => a.date === ds && a.staffId === staffId && a.timeSlot === time && a.status !== 'cancelled');
  }

  isSlotBooked(date: Date, staffId: string, time: string): boolean {
    return !!this.getAppointment(date, staffId, time);
  }

  selectSlot(date: Date, staffId: string, time: string) {
    const appt = this.getAppointment(date, staffId, time);
    if (appt) {
      this.router.navigate(['/home/appointments', appt.id]);
    } else {
      const ds = this.formatDate(date);
      this.router.navigate(['/home/appointments/new'], { queryParams: { date: ds, staffId, time } });
    }
  }

  getStatusColor(status: string): string {
    const map: any = { booked: '#3b82f6', confirmed: '#10b981', completed: '#6b7280', cancelled: '#ef4444' };
    return map[status] || '#3b82f6';
  }

  getDayAppointmentCount(date: Date): number {
    return this.appointments.filter(a => a.date === this.formatDate(date) && a.status !== 'cancelled').length;
  }
}
