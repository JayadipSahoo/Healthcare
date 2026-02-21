# Feature: File Uploads

> Upload and download of identification documents and doctor profile images.

---

## Overview

- **Patient ID documents** – Uploaded during registration
- **Doctor profile images** – Uploaded when adding a doctor
- Stored in Appwrite Storage
- Downloaded via `/api/download/[fileId]`

---

## Upload Flow

1. Client: `FileUploader` (react-dropzone) → user selects file
2. Form: File passed to server action as `FormData`
3. Server: `InputFile.fromBlob()` → `storage.createFile()`
4. Document: `identificationDocumentId` / `image` (URL) stored

---

## Download Flow

1. Client: Link to `/api/download/[fileId]`
2. API Route: `storage.getFile()` + `storage.getFileDownload()`
3. Response: Buffer with `Content-Disposition: attachment`

---

## Components

| Component | Path | Role |
|-----------|------|------|
| FileUploader | `components/FileUploader.tsx` | Drag-and-drop upload |
| Variants | - | `default` (full), `compact` (doctor form) |

---

## Storage Structure

- **Bucket**: Single bucket (`BUCKET_ID`)
- **Files**: Unique IDs via `ID.unique()`
- **Metadata**: Name, mimeType from Appwrite

---

## Technology Used

- **react-dropzone** – Client upload UI
- **node-appwrite Storage** – Upload/download
- **Next.js API Route** – Secure download proxy (no client-side API key)

---

## [← Patient Records](./05-PATIENT-RECORDS.md) | [Back to Docs](../README.md) | [Next: Authentication →](./07-AUTHENTICATION-ACCESS-CONTROL.md)
