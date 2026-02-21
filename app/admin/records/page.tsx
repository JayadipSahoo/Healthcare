import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { recordsColumns } from "@/components/table/recordsColumns";
import { DataTable } from "@/components/table/DataTable";
import { getAllPatients } from "@/lib/actions/patient.actions";

const RecordsPage = async () => {
  const patients = await getAllPatients();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-icon.png"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin" className="shad-gray-btn">
              Admin Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/doctors" className="shad-gray-btn">
              Add Doctor
            </Link>
          </Button>
          <p className="text-16-semibold">Search Records</p>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Search Records</h1>
          <p className="text-dark-700">
            View all patient records and download identification documents or
            prescriptions uploaded during registration
          </p>
        </section>

        <DataTable columns={recordsColumns} data={patients ?? []} />
      </main>
    </div>
  );
};

export default RecordsPage;
