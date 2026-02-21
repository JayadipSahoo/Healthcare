# Feature: Patient Records

> View all patients and download identification documents.

---

## Overview

- Table: Patient name, email, phone, document download
- Document = ID document uploaded during registration
- Download proxied via `/api/download/[fileId]`

---

## User Flow

```
/admin/records
  → getAllPatients()
  → DataTable (recordsColumns)
  → Download → /api/download/[fileId]
```

---

## Components

| Component | Path | Role |
|-----------|------|------|
| recordsColumns | `components/table/recordsColumns.tsx` | Column definitions |
| DataTable | `components/table/DataTable.tsx` | Table + pagination |

---

## Columns

- **#** – Row index
- **Patient Name**
- **Email**
- **Phone**
- **Document** – Download button or "No document uploaded"

---

## API Route

- **GET /api/download/[fileId]**
  - Fetches file from Appwrite Storage
  - Returns `Content-Disposition: attachment`
  - Uses server-side API key for Storage access

---

## Data Source

- **getAllPatients()** – All patients, ordered by `$createdAt` desc

---

## Technology Used

- **@tanstack/react-table** – Table
- **Appwrite Storage** – File retrieval
- **Next.js API Route** – Download proxy

---

## [← Doctor Management](./04-DOCTOR-MANAGEMENT.md) | [Back to Docs](../README.md) | [Next: File Uploads →](./06-FILE-UPLOADS.md)
