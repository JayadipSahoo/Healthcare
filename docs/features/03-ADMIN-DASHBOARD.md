# Feature: Admin Dashboard

> Admin overview, stats, and appointment management.

---

## Overview

- Stats cards: Scheduled, Pending, Cancelled counts
- Appointments table with Schedule/Cancel actions
- Accessible only with valid admin passkey

---

## User Flow

```
/?admin=true → PasskeyModal → store passkey
  → Redirect /admin

/admin
  → Stats: scheduledCount, pendingCount, cancelledCount
  → DataTable (appointments)
  → Schedule / Cancel via AppointmentModal
```

---

## Components

| Component | Path | Role |
|-----------|------|------|
| StatCard | `components/StatCard.tsx` | Count display |
| DataTable | `components/table/DataTable.tsx` | Paginated table |
| AdminAppointmentsTable | `components/AdminAppointmentsTable.tsx` | Wrapper with doctors |
| columns | `components/table/columns.tsx` | Column definitions |
| AppointmentModal | `components/AppointmentModal.tsx` | Schedule/Cancel |

---

## Access Control

- DataTable checks `localStorage.accessKey` (decrypted) against `NEXT_PUBLIC_ADMIN_PASSKEY`
- Redirects to `/` if invalid

---

## Data Source

- **getRecentAppointmentList()** – Appointments + status counts
- **getAllDoctors()** – For doctor column display

---

## Technology Used

- **@tanstack/react-table** – Table + pagination
- **Server Components** – Data fetching on server
- **Client Components** – Table, modals, passkey check

---

## [← Appointments](./02-APPOINTMENTS.md) | [Back to Docs](../README.md) | [Next: Doctor Management →](./04-DOCTOR-MANAGEMENT.md)
