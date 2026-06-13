export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'staff';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  phone: string;
  email: string;
  specialties: string[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  visits: number;
  lastVisit?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  category: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  status: 'booked' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Bill {
  id: string;
  appointmentId: string;
  clientName: string;
  clientPhone: string;
  staffName: string;
  serviceName: string;
  serviceAmount: number;
  date: string;
  time: string;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}
