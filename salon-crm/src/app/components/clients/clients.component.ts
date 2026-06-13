import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalonDataService } from '../../services/salon-data.service';
import { Client } from '../../models';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  clients: Client[] = [];
  search = '';

  constructor(private data: SalonDataService) {
    this.clients = this.data.clients;
  }

  get filtered(): Client[] {
    if (!this.search) return this.clients;
    const s = this.search.toLowerCase();
    return this.clients.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.phone.includes(s) ||
      c.email.toLowerCase().includes(s)
    );
  }

  getLastService(clientId: string): string {
    const appts = this.data.appointments.filter(a => a.clientId === clientId);
    if (!appts.length) return '—';
    const last = appts.sort((a, b) => b.date.localeCompare(a.date))[0];
    return last.serviceName;
  }

  getTotalSpend(clientId: string): number {
    return this.data.appointments
      .filter(a => a.clientId === clientId && a.status === 'completed')
      .reduce((sum, a) => sum + a.servicePrice, 0);
  }
}
