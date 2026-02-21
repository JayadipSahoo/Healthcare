# Backend & Data Technologies

> Appwrite, Storage, Databases, Messaging — what, why, how, alternatives.

---

## 1. Appwrite (BaaS)

### What

Backend-as-a-Service: Databases, Users, Storage, Messaging in one platform.

### Why Used

- Single backend for auth, DB, files, SMS
- No need to host PostgreSQL, Redis, S3 separately
- Server SDK (node-appwrite) for secure server-side access
- Quick to build MVP

### How Used

| Service | Purpose |
|---------|---------|
| **Users** | Patient identity (createUser, getUser) |
| **Databases** | Patient, Doctor, Appointment collections |
| **Storage** | ID documents, doctor images |
| **Messaging** | SMS via Twilio integration |

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Firebase** | Lock-in, NoSQL only, pricing model |
| **Supabase** | PostgreSQL; more setup for auth + storage + messaging |
| **Custom Node/Express + PostgreSQL** | More dev time, ops burden |
| **AWS (DynamoDB, S3, Cognito)** | Complex setup, steeper learning |

---

## 2. node-appwrite (v12)

### What

Server-side SDK for Appwrite.

### Why Used

- Official SDK
- TypeScript support
- All Appwrite services (Databases, Storage, Users, Messaging)

### How Used

- `lib/appwrite.config.ts` – Client, databases, users, storage
- All server actions import from this config

---

## 3. Appwrite Databases

### What

Document-style database with collections and attributes.

### Why Used

- Managed, no DB hosting
- REST API + SDK
- Permissions model
- Integrates with Appwrite auth

### How Used

- Collections: Patient, Doctor, Appointment
- Queries: `Query.equal`, `Query.orderDesc`, `Query.orderAsc`
- Documents: `createDocument`, `listDocuments`, `updateDocument`

### Schema

- Attributes created in Appwrite Console
- Types: string, datetime, relationship, etc.

---

## 4. Appwrite Storage

### What

File storage with permissions.

### Why Used

- Same platform as DB
- API key access for server
- No S3/Blob setup

### How Used

- `storage.createFile()` – Upload
- `storage.getFile()`, `storage.getFileDownload()` – Download
- Files referenced by `$id` in DB documents

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **AWS S3** | Extra service, more config |
| **Cloudinary** | Image-focused; we need generic files |

---

## 5. Appwrite Messaging (Twilio)

### What

Abstraction over SMS/email providers (Twilio for SMS).

### Why Used

- Integrated with Appwrite
- No direct Twilio SDK wiring in app code
- Centralized provider config

### How Used

- `sendSMSNotification()` in appointment.actions
- Configured in Appwrite Console

---

## 6. Next.js API Routes

### What

Server-side HTTP endpoints.

### Why Used

- Proxy for Storage (hide API key from client)
- Custom logic (e.g. download with correct headers)

### How Used

- `/api/download/[fileId]` – Fetches from Appwrite Storage, streams to client

---

## [← Frontend](./01-FRONTEND-TECHNOLOGIES.md) | [Back to Docs](../README.md) | [Next: Forms & Validation →](./03-FORMS-VALIDATION.md)
