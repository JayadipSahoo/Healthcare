# Feature: Authentication & Access Control

> Admin passkey protection; patient identity via Appwrite Users.

---

## Overview

- **Patients** – No login; identified by `userId` in URL
- **Admin** – Protected by 6-digit passkey (OTP-style)
- Passkey stored encrypted in `localStorage`

---

## Admin Flow

1. User visits `/?admin=true`
2. **PasskeyModal** appears
3. User enters 6-digit OTP (matches `NEXT_PUBLIC_ADMIN_PASSKEY`)
4. Key encrypted and stored in `localStorage.accessKey`
5. Redirect to `/admin`
6. **DataTable** (and other admin components) decrypt and verify on mount; redirect to `/` if invalid

---

## Components

| Component | Path | Role |
|-----------|------|------|
| PasskeyModal | `components/PasskeyModal.tsx` | 6-digit OTP input |
| DataTable | `components/table/DataTable.tsx` | Access check in `useEffect` |

---

## Implementation Details

- **encryptKey** / **decryptKey** – Utils for storing passkey
- `NEXT_PUBLIC_ADMIN_PASSKEY` – Expected value
- Check runs client-side in `DataTable` and similar components

---

## Patient Identity

- **Appwrite Users** – Created on registration
- `userId` used in URLs: `/patients/[userId]/register`, `/patients/[userId]/new-appointment`
- No session; identity inferred from URL (suitable for MVP)

---

## Technology Used

- **input-otp** – 6-digit OTP UI
- **localStorage** – Encrypted passkey
- **Next.js redirect** – On invalid passkey

---

## [← File Uploads](./06-FILE-UPLOADS.md) | [Back to Docs](../README.md) | [Next: SMS Notifications →](./08-SMS-NOTIFICATIONS.md)
