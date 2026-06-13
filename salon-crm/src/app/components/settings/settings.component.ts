import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="settings-page">
  <div class="page-header">
    <div><h2>Settings</h2><p>Manage your salon preferences</p></div>
  </div>

  <div class="settings-grid">
    <div class="settings-section card">
      <h4><span class="material-icons">store</span> Salon Information</h4>
      <div class="form-group"><label>Salon Name</label><input type="text" [value]="salonName" (input)="salonName = $any($event.target).value"></div>
      <div class="form-group"><label>Phone</label><input type="text" value="+91 22 1234 5678"></div>
      <div class="form-group"><label>Address</label><input type="text" value="123 MG Road, Mumbai, Maharashtra"></div>
      <div class="form-group"><label>GST Number</label><input type="text" value="27AABCU9603R1ZM"></div>
      <button class="btn btn-primary" (click)="save()">Save Changes</button>
    </div>

    <div class="settings-section card">
      <h4><span class="material-icons">schedule</span> Working Hours</h4>
      <div class="hours-grid">
        <div *ngFor="let day of workingHours" class="hours-row">
          <div class="day-name">{{day.day}}</div>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="day.open">
            <span class="slider"></span>
          </label>
          <span *ngIf="day.open" class="hours-text">{{day.from}} – {{day.to}}</span>
          <span *ngIf="!day.open" class="closed-text">Closed</span>
        </div>
      </div>
    </div>

    <div class="settings-section card">
      <h4><span class="material-icons">receipt</span> Billing Defaults</h4>
      <div class="form-group"><label>Default GST Rate (%)</label><input type="number" value="18"></div>
      <div class="form-group"><label>Currency</label>
        <select><option>INR (₹)</option><option>USD ($)</option></select>
      </div>
      <button class="btn btn-primary" (click)="save()">Save Changes</button>
    </div>

    <div class="settings-section card">
      <h4><span class="material-icons">notifications</span> Notifications</h4>
      <div class="toggle-list">
        <div *ngFor="let n of notifications" class="toggle-row">
          <div>
            <div class="toggle-label">{{n.label}}</div>
            <div class="toggle-desc">{{n.desc}}</div>
          </div>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="n.enabled">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  </div>

  <div class="toast success" *ngIf="toastMsg">
    <span class="material-icons">check_circle</span> {{toastMsg}}
  </div>
</div>
  `,
  styles: [`
.settings-page { max-width: 900px; }
.settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.settings-section {
  padding: 24px;
  h4 { display: flex; align-items: center; gap: 8px; font-size: 16px; color: var(--plum); margin-bottom: 20px;
    .material-icons { font-size: 18px; color: var(--rose-dark); } }
}
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px;
  label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-secondary); }
  input, select { padding: 9px 12px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px;
    &:focus { outline: none; border-color: var(--rose-dark); } }
}
.hours-grid { display: flex; flex-direction: column; gap: 10px; }
.hours-row { display: flex; align-items: center; gap: 12px; }
.day-name { width: 36px; font-size: 12px; font-weight: 600; color: var(--text-secondary); }
.hours-text { font-size: 12px; color: var(--text-secondary); }
.closed-text { font-size: 12px; color: var(--text-muted); }
.toggle-list { display: flex; flex-direction: column; gap: 16px; }
.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 16px;
  .toggle-label { font-size: 13px; font-weight: 500; color: var(--text-primary); }
  .toggle-desc { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
}
.toggle { position: relative; display: inline-block; width: 38px; height: 21px; flex-shrink: 0;
  input { opacity: 0; width: 0; height: 0; }
  .slider { position: absolute; cursor: pointer; inset: 0; background: var(--border); border-radius: 99px; transition: 0.2s;
    &:before { content: ''; position: absolute; width: 15px; height: 15px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.2s; } }
  input:checked + .slider { background: var(--rose-dark); }
  input:checked + .slider:before { transform: translateX(17px); }
}
@media (max-width: 700px) { .settings-grid { grid-template-columns: 1fr; } }
  `]
})
export class SettingsComponent {
  salonName = 'Lumière Salon';
  toastMsg = '';

  workingHours = [
    { day: 'Mon', open: true, from: '09:00', to: '19:00' },
    { day: 'Tue', open: true, from: '09:00', to: '19:00' },
    { day: 'Wed', open: true, from: '09:00', to: '19:00' },
    { day: 'Thu', open: true, from: '09:00', to: '19:00' },
    { day: 'Fri', open: true, from: '09:00', to: '20:00' },
    { day: 'Sat', open: true, from: '09:00', to: '20:00' },
    { day: 'Sun', open: false, from: '10:00', to: '18:00' }
  ];

  notifications = [
    { label: 'Appointment Reminders', desc: 'Notify staff before each appointment', enabled: true },
    { label: 'New Booking Alerts', desc: 'Alert when a new booking is made', enabled: true },
    { label: 'Cancellation Alerts', desc: 'Alert when an appointment is cancelled', enabled: true },
    { label: 'Daily Summary', desc: 'Send daily appointment summary', enabled: false }
  ];

  save() {
    this.toastMsg = 'Settings saved!';
    setTimeout(() => this.toastMsg = '', 3000);
  }
}
