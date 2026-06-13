import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      {
        path: 'calendar',
        loadComponent: () => import('./components/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./components/appointment/appointment-list.component').then(m => m.AppointmentListComponent)
      },
      {
        path: 'appointments/new',
        loadComponent: () => import('./components/appointment/appointment-form.component').then(m => m.AppointmentFormComponent)
      },
      {
        path: 'appointments/:id',
        loadComponent: () => import('./components/appointment/appointment-detail.component').then(m => m.AppointmentDetailComponent)
      },
      {
        path: 'billing/:id',
        loadComponent: () => import('./components/billing/billing.component').then(m => m.BillingComponent)
      },
      {
        path: 'staff',
        loadComponent: () => import('./components/staff/staff.component').then(m => m.StaffComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./components/clients/clients.component').then(m => m.ClientsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
