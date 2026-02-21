# Feature: SMS Notifications

> SMS sent when appointments are scheduled or cancelled.

---

## Overview

- **Schedule** – SMS to patient when admin schedules
- **Cancel** – SMS to patient when admin cancels
- Uses Appwrite Messaging (Twilio provider)

---

## Flow

1. Admin: Schedule/Cancel in `AppointmentModal`
2. `updateAppointment()` called
3. `sendSMSNotification(userId, content)` invoked
4. Appwrite Messaging → Twilio → Patient phone

---

## Implementation

- **sendSMSNotification** in `lib/actions/appointment.actions.ts`
- Uses Appwrite Messaging API
- Content: appointment details (doctor, date/time, status)

---

## Configuration

- Twilio configured in Appwrite Console (Messaging provider)
- Patient phone from User/Patient record (E.164)

---

## Technology Used

- **Appwrite Messaging** – Abstraction over Twilio
- **Twilio** – SMS delivery

---

## [← Authentication](./07-AUTHENTICATION-ACCESS-CONTROL.md) | [Back to Docs](../README.md) | [Technology Stack →](../technology/01-FRONTEND-TECHNOLOGIES.md)
