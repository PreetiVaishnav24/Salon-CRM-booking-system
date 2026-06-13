import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staff, Client, Service, Appointment, Bill, TimeSlot } from '../models';

const STAFF_DATA: Staff[] = [
  { id: 's1', name: 'Priya Sharma', role: 'Senior Stylist', avatar: 'PS', color: '#c084fc', phone: '+91 98765 43210', email: 'priya@salon.com', specialties: ['Haircut', 'Coloring', 'Highlights'] },
  { id: 's2', name: 'Anjali Mehta', role: 'Nail Artist', avatar: 'AM', color: '#f472b6', phone: '+91 98765 43211', email: 'anjali@salon.com', specialties: ['Manicure', 'Pedicure', 'Nail Art'] },
  { id: 's3', name: 'Kavya Nair', role: 'Skincare Expert', avatar: 'KN', color: '#34d399', phone: '+91 98765 43212', email: 'kavya@salon.com', specialties: ['Facial', 'Cleanup', 'Waxing'] },
  { id: 's4', name: 'Divya Patel', role: 'Makeup Artist', avatar: 'DP', color: '#fb923c', phone: '+91 98765 43213', email: 'divya@salon.com', specialties: ['Makeup', 'Bridal', 'Party'] }
];

const SERVICES_DATA: Service[] = [
  { id: 'sv1', name: 'Haircut & Styling', price: 800, duration: 60, category: 'Hair' },
  { id: 'sv2', name: 'Hair Coloring', price: 2500, duration: 120, category: 'Hair' },
  { id: 'sv3', name: 'Highlights', price: 3000, duration: 150, category: 'Hair' },
  { id: 'sv4', name: 'Manicure', price: 600, duration: 45, category: 'Nails' },
  { id: 'sv5', name: 'Pedicure', price: 800, duration: 60, category: 'Nails' },
  { id: 'sv6', name: 'Nail Art', price: 1200, duration: 90, category: 'Nails' },
  { id: 'sv7', name: 'Facial', price: 1500, duration: 60, category: 'Skin' },
  { id: 'sv8', name: 'Cleanup', price: 700, duration: 45, category: 'Skin' },
  { id: 'sv9', name: 'Full Body Waxing', price: 2200, duration: 90, category: 'Skin' },
  { id: 'sv10', name: 'Bridal Makeup', price: 8000, duration: 180, category: 'Makeup' },
  { id: 'sv11', name: 'Party Makeup', price: 3500, duration: 90, category: 'Makeup' }
];

const CLIENTS_DATA: Client[] = [
  { id: 'c1', name: 'Neha Gupta', phone: '+91 99887 76655', email: 'neha@gmail.com', visits: 12, lastVisit: '2026-06-01' },
  { id: 'c2', name: 'Ritu Singh', phone: '+91 99887 76656', email: 'ritu@gmail.com', visits: 5, lastVisit: '2026-05-28' },
  { id: 'c3', name: 'Sunita Joshi', phone: '+91 99887 76657', email: 'sunita@gmail.com', visits: 3, lastVisit: '2026-05-20' },
  { id: 'c4', name: 'Pooja Reddy', phone: '+91 99887 76658', email: 'pooja@gmail.com', visits: 8, lastVisit: '2026-06-05' }
];

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

@Injectable({ providedIn: 'root' })
export class SalonDataService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.loadAppointments());
  appointments$ = this.appointmentsSubject.asObservable();

  private billsSubject = new BehaviorSubject<Bill[]>(this.loadBills());
  bills$ = this.billsSubject.asObservable();

  get staff(): Staff[] { return STAFF_DATA; }
  get services(): Service[] { return SERVICES_DATA; }
  get clients(): Client[] { return CLIENTS_DATA; }
  get timeSlots(): string[] { return TIME_SLOTS; }
  get appointments(): Appointment[] { return this.appointmentsSubject.value; }
  get bills(): Bill[] { return this.billsSubject.value; }

  private loadAppointments(): Appointment[] {
    const stored = localStorage.getItem('salon_appointments');
    if (stored) return JSON.parse(stored);
    // seed data
    const today = new Date();
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    const d0 = fmt(today);
    const d1 = fmt(new Date(today.getTime() + 86400000));
    const d2 = fmt(new Date(today.getTime() + 2*86400000));
    return [
      { id: 'a1', clientId: 'c1', clientName: 'Neha Gupta', clientPhone: '+91 99887 76655', staffId: 's1', staffName: 'Priya Sharma', date: d0, timeSlot: '10:00', serviceId: 'sv1', serviceName: 'Haircut & Styling', servicePrice: 800, status: 'confirmed', notes: 'Prefers shoulder length', createdAt: new Date().toISOString() },
      { id: 'a2', clientId: 'c2', clientName: 'Ritu Singh', clientPhone: '+91 99887 76656', staffId: 's2', staffName: 'Anjali Mehta', date: d0, timeSlot: '11:00', serviceId: 'sv4', serviceName: 'Manicure', servicePrice: 600, status: 'booked', createdAt: new Date().toISOString() },
      { id: 'a3', clientId: 'c3', clientName: 'Sunita Joshi', clientPhone: '+91 99887 76657', staffId: 's3', staffName: 'Kavya Nair', date: d1, timeSlot: '14:00', serviceId: 'sv7', serviceName: 'Facial', servicePrice: 1500, status: 'booked', createdAt: new Date().toISOString() },
      { id: 'a4', clientId: 'c4', clientName: 'Pooja Reddy', clientPhone: '+91 99887 76658', staffId: 's4', staffName: 'Divya Patel', date: d2, timeSlot: '16:00', serviceId: 'sv10', serviceName: 'Bridal Makeup', servicePrice: 8000, status: 'booked', notes: 'Bridal event on Saturday', createdAt: new Date().toISOString() }
    ];
  }

  private loadBills(): Bill[] {
    const stored = localStorage.getItem('salon_bills');
    return stored ? JSON.parse(stored) : [];
  }

  private saveAppointments() {
    localStorage.setItem('salon_appointments', JSON.stringify(this.appointmentsSubject.value));
  }

  private saveBills() {
    localStorage.setItem('salon_bills', JSON.stringify(this.billsSubject.value));
  }

  addAppointment(appt: Appointment) {
    const updated = [...this.appointmentsSubject.value, appt];
    this.appointmentsSubject.next(updated);
    this.saveAppointments();
  }

  updateAppointment(appt: Appointment) {
    const updated = this.appointmentsSubject.value.map(a => a.id === appt.id ? appt : a);
    this.appointmentsSubject.next(updated);
    this.saveAppointments();
  }

  deleteAppointment(id: string) {
    const updated = this.appointmentsSubject.value.filter(a => a.id !== id);
    this.appointmentsSubject.next(updated);
    this.saveAppointments();
  }

  getAppointmentById(id: string): Appointment | undefined {
    return this.appointmentsSubject.value.find(a => a.id === id);
  }

  getTimeSlotsForDate(date: string, staffId: string): TimeSlot[] {
    const booked = this.appointmentsSubject.value
      .filter(a => a.date === date && a.staffId === staffId && a.status !== 'cancelled')
      .map(a => a.timeSlot);
    return TIME_SLOTS.map(t => ({ time: t, available: !booked.includes(t), appointmentId: this.appointmentsSubject.value.find(a => a.date === date && a.staffId === staffId && a.timeSlot === t)?.id }));
  }

  addBill(bill: Bill) {
    const updated = [...this.billsSubject.value, bill];
    this.billsSubject.next(updated);
    this.saveBills();
  }

  getBillByAppointment(appointmentId: string): Bill | undefined {
    return this.billsSubject.value.find(b => b.appointmentId === appointmentId);
  }

  generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }
}
