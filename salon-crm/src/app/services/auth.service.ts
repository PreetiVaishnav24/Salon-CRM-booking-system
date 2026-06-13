import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin123', name: 'Sarah Mitchell', role: 'admin' as const },
  { id: '2', username: 'staff', password: 'staff123', name: 'Emma Clarke', role: 'staff' as const }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const stored = localStorage.getItem('salon_user');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }

  login(username: string, password: string): boolean {
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPass } = user;
      localStorage.setItem('salon_user', JSON.stringify(userWithoutPass));
      this.currentUserSubject.next(userWithoutPass);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('salon_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
