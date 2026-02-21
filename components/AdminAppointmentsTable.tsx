"use client";

import { getAppointmentColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Appointment } from "@/types/appwrite.types";

type DoctorOption = { name: string; image?: string };

export function AdminAppointmentsTable({
  appointments,
  doctors = [],
}: {
  appointments: Appointment[];
  doctors?: DoctorOption[];
}) {
  return (
    <DataTable
      columns={getAppointmentColumns(doctors)}
      data={appointments}
    />
  );
}
