# Low-Level Design (LLD)

> Data models, API design, component structure, and implementation details.

---

## 1. Data Models

### 1.1 User (Appwrite Users API)

| Field | Type | Description |
|-------|------|-------------|
| `$id` | string | Unique ID |
| `name` | string | Full name |
| `email` | string | Email |
| `phone` | string | Phone (E.164) |

### 1.2 Patient (Appwrite Document)

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | FK to User |
| `name` | string | Full name |
| `email` | string | Email |
| `phone` | string | Phone |
| `birthDate` | Date | DOB |
| `gender` | string | male/female/other |
| `address` | string | Address |
| `occupation` | string | Occupation |
| `emergencyContactName` | string | Emergency contact |
| `emergencyContactNumber` | string | Emergency phone |
| `primaryPhysician` | string | Doctor name |
| `insuranceProvider` | string | Insurance |
| `insurancePolicyNumber` | string | Policy # |
| `allergies` | string | Optional |
| `currentMedication` | string | Optional |
| `familyMedicalHistory` | string | Optional |
| `pastMedicalHistory` | string | Optional |
| `identificationType` | string | ID type |
| `identificationNumber` | string | ID number |
| `identificationDocumentId` | string | Storage file ID |
| `identificationDocumentUrl` | string | Storage URL |
| `privacyConsent` | boolean | Consent flag |

### 1.3 Doctor (Appwrite Document)

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Doctor name |
| `specialty` | string | e.g. Cardiologist |
| `email` | string | Optional |
| `phone` | string | Optional |
| `image` | string | Storage URL or path |

### 1.4 Appointment (Appwrite Document)

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | Patient's user ID |
| `patient` | Patient | Embedded/reference |
| `primaryPhysician` | string | Doctor name |
| `schedule` | Date | Date/time |
| `reason` | string | Reason for visit |
| `note` | string | Optional notes |
| `status` | enum | pending \| scheduled \| cancelled |
| `cancellationReason` | string | Optional |

---

## 2. Relationships

```
User (1) ──────< Patient (1)
                       │
                       │ 1:N
                       ▼
                 Appointment (N)
                       │
                       │ N:1 (by name)
                       ▼
                  Doctor (N)
```

---

## 3. Server Actions

### 3.1 Patient Actions (`lib/actions/patient.actions.ts`)

| Action | Input | Output |
|--------|-------|--------|
| `createUser` | `CreateUserParams` | User |
| `getUser` | `userId` | User |
| `registerPatient` | `RegisterUserParams` | Patient |
| `getPatient` | `userId` | Patient |
| `getAllPatients` | - | Patient[] |

### 3.2 Appointment Actions (`lib/actions/appointment.actions.ts`)

| Action | Input | Output |
|--------|-------|--------|
| `createAppointment` | `CreateAppointmentParams` | Appointment |
| `getRecentAppointmentList` | - | `{ documents, scheduledCount, pendingCount, cancelledCount }` |
| `updateAppointment` | `UpdateAppointmentParams` | Appointment |
| `getAppointment` | `appointmentId` | Appointment |
| `sendSMSNotification` | `userId`, `content` | void |

### 3.3 Doctor Actions (`lib/actions/doctor.actions.ts`)

| Action | Input | Output |
|--------|-------|--------|
| `createDoctor` | `CreateDoctorParams` | Doctor |
| `getAllDoctors` | - | Doctor[] |

---

## 4. API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/download/[fileId]` | GET | Proxy download from Appwrite Storage |
| `/api/sentry-example-api` | GET | Sentry test endpoint |

---

## 5. Component Structure

```
components/
├── forms/
│   ├── PatientForm.tsx      # Initial user creation (name, email, phone)
│   ├── RegisterForm.tsx     # Full patient registration
│   ├── AppointmentForm.tsx  # Create/schedule/cancel appointment
│   └── DoctorForm.tsx       # Add doctor
├── table/
│   ├── columns.tsx          # Appointment table columns
│   ├── recordsColumns.tsx   # Patient records table columns
│   ├── DataTable.tsx        # Reusable table with pagination
│   └── AdminAppointmentsTable.tsx
├── ui/                      # shadcn primitives
├── CustomFormField.tsx
├── FileUploader.tsx
├── StatCard.tsx
├── StatusBadge.tsx
├── AppointmentModal.tsx
└── PasskeyModal.tsx
```

---

## 6. Appwrite Configuration

| Env Var | Purpose |
|---------|---------|
| `ENDPOINT` | Appwrite API endpoint |
| `PROJECT_ID` | Project ID |
| `API_KEY` | Server API key |
| `DATABASE_ID` | Main database |
| `PATIENT_COLLECTION_ID` | Patients collection |
| `DOCTOR_COLLECTION_ID` | Doctors collection |
| `APPOINTMENT_COLLECTION_ID` | Appointments collection |
| `NEXT_PUBLIC_BUCKET_ID` | Storage bucket |
| `NEXT_PUBLIC_ADMIN_PASSKEY` | Admin 6-digit passkey |

---

## 7. Validation Schemas (Zod)

| Schema | Scope |
|--------|-------|
| `UserFormValidation` | PatientForm |
| `PatientFormValidation` | RegisterForm |
| `CreateAppointmentSchema` | Create appointment |
| `ScheduleAppointmentSchema` | Schedule |
| `CancelAppointmentSchema` | Cancel |
| `DoctorFormValidation` | DoctorForm |
| `getAppointmentSchema(type)` | Dynamic per action |

---

## Related Documents

- [High-Level Design](./01-HIGH-LEVEL-DESIGN.md)
- [Feature Implementation](./features/)
- [Technology Stack](./technology/)
