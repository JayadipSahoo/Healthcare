# Feature: Patient Registration

> Implementation details for the patient registration flow.

---

## Overview

Two-step registration:
1. **Step 1** (Home): Create Appwrite user (name, email, phone)
2. **Step 2** (Register): Fill patient profile (demographics, insurance, medical history, ID upload)

---

## User Flow

```
/ (Home) 
  → PatientForm 
  → createUser() 
  → Redirect /patients/[userId]/register

/patients/[userId]/register
  → getUser(), getPatient(), getAllDoctors()
  → If patient exists → redirect /patients/[userId]/new-appointment
  → RegisterForm
  → registerPatient()
  → Redirect /patients/[userId]/new-appointment
```

---

## Components

| Component | Path | Role |
|-----------|------|------|
| PatientForm | `components/forms/PatientForm.tsx` | Name, email, phone |
| RegisterForm | `components/forms/RegisterForm.tsx` | Full patient profile |

---

## Server Actions

- **createUser** – Creates Appwrite user; returns existing if email exists (409)
- **registerPatient** – Creates patient document; uploads ID file to Storage if present

---

## Validation

- **UserFormValidation**: name (2–50), email, phone (E.164)
- **PatientFormValidation**: All registration fields + consents (required)

---

## Data Stored

- **User**: `name`, `email`, `phone` (Appwrite Users)
- **Patient**: All fields including `identificationDocumentId`, `identificationDocumentUrl` (Appwrite Databases)

---

## Technology Used

- **react-hook-form** + **zod** – Form state and validation
- **Appwrite Users** – User creation
- **Appwrite Databases** – Patient document
- **Appwrite Storage** – ID document

---

## [← Back to Docs](../README.md) | [Next: Appointments →](./02-APPOINTMENTS.md)
