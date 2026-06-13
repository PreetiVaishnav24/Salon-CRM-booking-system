import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonDataService } from '../../services/salon-data.service';
import { Staff } from '../../models';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  staff: Staff[] = [];

  constructor(private data: SalonDataService) {
    this.staff = this.data.staff;
  }

  getAppointmentCount(staffId: string): number {
    return this.data.appointments.filter(a => a.staffId === staffId && a.status !== 'cancelled').length;
  }

  getTodayCount(staffId: string): number {
    const today = new Date().toISOString().split('T')[0];
    return this.data.appointments.filter(a => a.staffId === staffId && a.date === today && a.status !== 'cancelled').length;
  }
}
