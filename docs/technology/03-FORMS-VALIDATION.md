# Forms & Validation Technologies

> react-hook-form, zod, resolvers — what, why, how, alternatives.

---

## 1. react-hook-form

### What

Lightweight form library with minimal re-renders.

### Why Used

- Uncontrolled inputs by default (performance)
- Strong TypeScript support
- Works well with zod
- Small bundle size

### How Used

- All forms: PatientForm, RegisterForm, AppointmentForm, DoctorForm
- `useForm()` with `resolver: zodResolver(schema)`
- `Form`, `FormField`, `FormControl` from shadcn

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Formik** | Heavier, more re-renders |
| **Final Form** | Smaller community |
| **Native HTML forms** | More boilerplate, no validation integration |

---

## 2. Zod

### What

Schema validation and TypeScript inference.

### Why Used

- Single source of truth for validation + types
- Composable schemas
- Clear error messages
- Works with react-hook-form via resolver

### How Used

- `lib/validation.ts` – UserFormValidation, PatientFormValidation, DoctorFormValidation, etc.
- `zodResolver(schema)` in useForm

---

## 3. @hookform/resolvers

### What

Bridges validation libraries (zod, yup, etc.) to react-hook-form.

### Why Used

- Connects zod to react-hook-form
- Transforms validation errors into form errors

### How Used

- `zodResolver(PatientFormValidation)` etc.

---

## 4. react-datepicker

### What

Date and time picker component.

### Why Used

- Widely used, accessible
- Date + time support
- Customizable styling

### How Used

- AppointmentForm for schedule
- Custom styles in `globals.css` (dark theme)

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **React Day Picker** | Less built-in time support |
| **date-fns + custom** | More work for UX |

---

## 5. react-phone-number-input

### What

Phone input with country code and validation.

### Why Used

- E.164 format
- Country selector
- Validation built-in

### How Used

- RegisterForm (phone, emergency contact)
- Custom styles in globals.css

---

## 6. react-dropzone

### What

Drag-and-drop file upload.

### Why Used

- Simple API
- Accessibility
- Works with react-hook-form

### How Used

- FileUploader component
- Patient ID docs, doctor profile image

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Custom input[type=file]** | No drag-drop, worse UX |
| **uppy** | Heavier |

---

## 7. input-otp

### What

OTP/PIN input component.

### Why Used

- 6-digit passkey UI
- Accessible
- Fits PasskeyModal

### How Used

- PasskeyModal for admin access

---

## [← Backend & Data](./02-BACKEND-DATA.md) | [Back to Docs](../README.md) | [Scaling →](../SCALING.md)
