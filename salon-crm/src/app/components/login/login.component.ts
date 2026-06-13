import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;
  features = [
    'Smart calendar & slot management',
    'Client & staff profiles',
    'Automated billing & receipts',
    'Appointment reminders'
  ];

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/home']);
  }

  login() {
    if (!this.username || !this.password) { this.error = 'Please enter your credentials.'; return; }
    this.loading = true;
    this.error = '';
    setTimeout(() => {
      const ok = this.auth.login(this.username, this.password);
      if (ok) {
        this.router.navigate(['/home']);
      } else {
        this.error = 'Invalid User ID or Password.';
        this.loading = false;
      }
    }, 600);
  }
}
