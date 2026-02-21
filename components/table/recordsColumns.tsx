"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import Link from "next/link";

import { Patient } from "@/types/appwrite.types";

import { Button } from "../ui/button";

export const recordsColumns: ColumnDef<Patient>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Patient Name",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <p className="text-14-regular">{row.original.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <p className="text-14-regular">{row.original.phone}</p>;
    },
  },
  {
    id: "download",
    header: () => <div className="pl-4">Document</div>,
    cell: ({ row }) => {
      const patient = row.original;
      const hasDocument = patient.identificationDocumentId;

      if (!hasDocument) {
        return (
          <p className="text-14-regular text-dark-500">No document uploaded</p>
        );
      }

      return (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`/api/download/${patient.identificationDocumentId}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="shad-gray-btn flex items-center gap-2"
          >
            <Download className="size-4" />
            Download
          </Link>
        </Button>
      );
    },
  },
];
