# High-Level Design (HLD)

> System overview, user flows, and architectural decisions for the Healthcare Patient Management System (CarePulse / HealthPlus).

---

## 1. System Overview

### Purpose

A **Healthcare Patient Management System** that streamlines:

- Patient registration
- Appointment scheduling
- Medical records management
- Doctor and admin workflows

### Target Users

| User Type | Description |
|-----------|-------------|
| **Patients** | Register, book appointments, view confirmation |
| **Admins** | Manage appointments, doctors, and patient records |

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Next.js)                               │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Home        │  │ Registration │  │ Appointments │  │ Admin        │  │
│  │ PatientForm │  │ RegisterForm │  │ ApptForm     │  │ Dashboard    │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼────────────────┼─────────────────┼─────────────────┼──────────┘
          │                │                 │                 │
          ▼                ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS (App Router + Server Actions)                  │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │  Server Actions: patient | appointment | doctor                     │ │
│  │  API Routes: /api/download/[fileId]                                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
          │                │                 │                 │
          ▼                ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         APPWRITE (BaaS)                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Users    │  │ Databases│  │ Storage  │  │ Messaging│  │          │  │
│  │ (Auth)   │  │ Patient  │  │ Files    │  │ SMS      │  │          │  │
│  │          │  │ Doctor   │  │          │  │          │  │          │  │
│  │          │  │ Appt     │  │          │  │          │  │          │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. User Flows

### 3.1 Patient Registration Flow

```
Home (/) 
  → PatientForm (name, email, phone)
  → createUser() 
  → Redirect /patients/[userId]/register

Register Page
  → RegisterForm (demographics, insurance, medical history, ID upload)
  → registerPatient()
  → Redirect /patients/[userId]/new-appointment
```

### 3.2 Appointment Flow

```
New Appointment (/patients/[userId]/new-appointment)
  → AppointmentForm (doctor, date/time, reason)
  → createAppointment() [status: pending]
  → Redirect /patients/[userId]/new-appointment/success
```

### 3.3 Admin Flow

```
/ → ?admin=true
  → PasskeyModal (6-digit OTP)
  → Store encrypted passkey in localStorage
  → Redirect /admin

Admin Dashboard
  → View stats (scheduled, pending, cancelled)
  → View appointment table
  → Schedule / Cancel via AppointmentModal
  → Add Doctor (/admin/doctors)
  → Patient Records (/admin/records)
```

---

## 4. Module Breakdown

| Module | Responsibility |
|--------|----------------|
| **Patient** | User creation, patient registration, ID document storage |
| **Appointment** | Create, list, update (schedule/cancel), SMS notifications |
| **Doctor** | CRUD doctors, used in registration and appointment dropdowns |
| **Admin** | Protected dashboard, stats, actions on appointments |
| **Storage** | File upload/download (ID docs, doctor photos) |
| **Auth** | Admin passkey; patient identity via Appwrite Users |

---

## 5. External Dependencies

- **Appwrite** – Users, Databases, Storage, Messaging (SMS)
- **Sentry** – Error monitoring
- **Twilio** (via Appwrite Messaging) – SMS delivery

---

## 6. Security Model

- **Patients**: Identified by `userId` from Appwrite Users; no traditional login flow
- **Admin**: Protected by 6-digit passkey; stored encrypted in `localStorage`
- **Files**: Accessed via `/api/download/[fileId]` (server-side Appwrite API key)

---

## Related Documents

- [Low-Level Design](./02-LOW-LEVEL-DESIGN.md) – Data models, APIs, components
- [Feature Implementation](./features/) – Detailed feature docs
- [Technology Stack](./technology/) – Tech choices and alternatives
