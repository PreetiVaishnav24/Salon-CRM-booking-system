import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalonDataService } from '../../services/salon-data.service';
import { Appointment } from '../../models';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  filtered: Appointment[] = [];
  search = '';
  statusFilter = '';

  constructor(private data: SalonDataService, private router: Router) {}

  ngOnInit() {
    this.data.appointments$.subscribe(a => {
      this.appointments = a.sort((x, y) => x.date < y.date ? -1 : 1);
      this.applyFilter();
    });
  }

  applyFilter() {
    let list = [...this.appointments];
    if (this.search) {
      const s = this.search.toLowerCase();
      list = list.filter(a => a.clientName.toLowerCase().includes(s) || a.staffName.toLowerCase().includes(s) || a.serviceName.toLowerCase().includes(s));
    }
    if (this.statusFilter) {
      list = list.filter(a => a.status === this.statusFilter);
    }
    this.filtered = list;
  }

  view(id: string) { this.router.navigate(['/home/appointments', id]); }
  newBooking() { this.router.navigate(['/home/appointments/new']); }
  billing(id: string) { this.router.navigate(['/home/billing', id]); }
}
