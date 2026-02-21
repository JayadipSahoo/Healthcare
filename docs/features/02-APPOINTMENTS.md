# Feature: Appointments

> Create, list, schedule, and cancel appointments.

---

## Overview

- Patients create **pending** appointments
- Admins **schedule** or **cancel** them
- Status: `pending` | `scheduled` | `cancelled`
- SMS notifications on schedule/cancel

---

## User Flow

### Patient

```
/patients/[userId]/new-appointment
  → AppointmentForm (doctor, date/time, reason)
  → createAppointment()
  → Redirect /patients/[userId]/new-appointment/success
```

### Admin

```
/admin
  → AppointmentModal (Schedule) → updateAppointment(type: schedule)
  → AppointmentModal (Cancel)   → updateAppointment(type: cancel)
  → SMS sent via sendSMSNotification()
```

---

## Components

| Component | Path | Role |
|-----------|------|------|
| AppointmentForm | `components/forms/AppointmentForm.tsx` | Create/schedule/cancel form |
| AppointmentModal | `components/AppointmentModal.tsx` | Modal for admin actions |

---

## Server Actions

- **createAppointment** – Creates appointment with status `pending`
- **updateAppointment** – Updates status; triggers SMS
- **getRecentAppointmentList** – List + counts by status
- **getAppointment** – Single appointment
- **sendSMSNotification** – Appwrite Messaging → Twilio SMS

---

## Validation Schemas

- **CreateAppointmentSchema**: doctor, schedule, reason
- **ScheduleAppointmentSchema**: schedule (optional reason/note)
- **CancelAppointmentSchema**: required `cancellationReason`

---

## Data Model

- `userId`, `patient`, `primaryPhysician`, `schedule`, `reason`, `note`
- `status`, `cancellationReason`

---

## Technology Used

- **react-datepicker** – Date/time selection
- **react-hook-form** + **zod** – Form handling
- **Appwrite Databases** – Appointments
- **Appwrite Messaging** – SMS

---

## [← Patient Registration](./01-PATIENT-REGISTRATION.md) | [Back to Docs](../README.md) | [Next: Admin Dashboard →](./03-ADMIN-DASHBOARD.md)
