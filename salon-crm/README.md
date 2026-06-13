# Lumière – Salon CRM System

A full-featured Angular 17 salon CRM application with appointment booking, staff management, client tracking, and billing.

---

## Features

- **Login** – Secure login with role-based access (admin / staff)
- **Calendar** – Weekly grid view showing all staff × time-slot bookings
- **Appointment Booking** – Full form with client info, staff, date, time slot, service picker
- **Appointment Management** – View, edit, reschedule, confirm, complete, cancel
- **Billing** – Generate GST invoices with tax/discount, print or share via WhatsApp
- **Staff** – Staff profiles with today's and total appointment counts
- **Clients** – Client directory with visit history and spend tracking
- **Settings** – Salon info, working hours, billing defaults, notifications
- **Sharing** – WhatsApp deep-link and clipboard copy for appointments and bills

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm start
```

Then open `http://localhost:4200`

### Build for Production

```bash
npm run build:prod
```

Output goes to `dist/salon-crm/`

---

## Demo Credentials

| Role  | User ID | Password  |
|-------|---------|-----------|
| Admin | admin   | admin123  |
| Staff | staff   | staff123  |

---

## Tech Stack

- **Angular 17** (standalone components, lazy routing)
- **TypeScript 5.2**
- **SCSS** with CSS custom properties (design tokens)
- **LocalStorage** for data persistence (no backend required)

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/          Login page
│   │   ├── home/           Shell layout + sidebar
│   │   ├── calendar/       Weekly booking grid
│   │   ├── appointment/    List, form, detail views
│   │   ├── billing/        Invoice generation
│   │   ├── staff/          Staff profiles
│   │   ├── clients/        Client directory
│   │   └── settings/       Salon settings
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── salon-data.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── models/
│       └── index.ts
└── styles.scss             Global design system
```

---

## Notes

- All data is stored in `localStorage` – seeded on first load with demo appointments
- WhatsApp sharing uses the `wa.me` URL scheme (works on mobile; opens web on desktop)
- Print functionality uses `window.print()` with `@media print` CSS rules
