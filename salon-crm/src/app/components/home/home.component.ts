import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  sidebarCollapsed = false;
  today = new Date();
  activeRoute = '';

  navItems = [
    { label: 'Calendar', icon: 'calendar_month', route: '/home/calendar' },
    { label: 'Appointments', icon: 'event_note', route: '/home/appointments' },
    { label: 'Staff', icon: 'group', route: '/home/staff' },
    { label: 'Clients', icon: 'people', route: '/home/clients' },
    { label: 'Settings', icon: 'settings', route: '/home/settings' }
  ];

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.activeRoute = e.urlAfterRedirects;
    });
    this.activeRoute = this.router.url;
  }

  isActive(route: string): boolean {
    return this.activeRoute.startsWith(route);
  }

  logout() { this.auth.logout(); }
}
