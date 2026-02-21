# Feature: Doctor Management

> Add doctors with name, specialty, contact, and profile image.

---

## Overview

- Admins add doctors via `/admin/doctors`
- Doctors appear in registration and appointment forms
- Stored in Appwrite Doctor collection
- Fallback to constants if DB is empty

---

## User Flow

```
/admin/doctors
  → DoctorForm
  → createDoctor()
  → router.refresh()
```

---

## Components

| Component | Path | Role |
|-----------|------|------|
| DoctorForm | `components/forms/DoctorForm.tsx` | Add doctor form |
| Add Doctor Page | `app/admin/doctors/page.tsx` | Page layout |

---

## Form Fields

- **Name** (required) – Doctor full name
- **Specialty** (optional) – e.g. Cardiologist
- **Email** (optional)
- **Phone** (optional)
- **Profile Image** (optional) – File upload

---

## Server Actions

- **createDoctor** – Creates doctor document; uploads image to Storage if present
- **getAllDoctors** – Returns doctors for forms and admin table

---

## Data Model

- `name`, `specialty`, `email`, `phone`, `image` (Storage URL)

---

## Integration

- **RegisterForm** – Primary physician dropdown
- **AppointmentForm** – Doctor dropdown
- **columns.tsx** – Doctor column in appointments table
- **success page** – Doctor display

Uses DB doctors when available; falls back to `Doctors` constant.

---

## Technology Used

- **react-hook-form** + **zod** – Validation
- **FileUploader** – Image upload
- **Appwrite Databases** – Doctor collection
- **Appwrite Storage** – Doctor image

---

## [← Admin Dashboard](./03-ADMIN-DASHBOARD.md) | [Back to Docs](../README.md) | [Next: Patient Records →](./05-PATIENT-RECORDS.md)
