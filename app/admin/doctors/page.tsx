import Image from "next/image";
import Link from "next/link";

import { DoctorForm } from "@/components/forms/DoctorForm";
import { Button } from "@/components/ui/button";

const AddDoctorPage = () => {
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
            <Link href="/admin/records" className="shad-gray-btn">
              Patient Records
            </Link>
          </Button>
          <p className="text-16-semibold">Add Doctor</p>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-2">
          <h1 className="header">Add Doctor</h1>
          <p className="text-16-regular text-dark-700">
            Add a new doctor and their details to the system. They will be
            available for patients to select during registration and appointment
            booking.
          </p>
        </section>

        <div className="w-full max-w-5xl rounded-2xl border border-dark-500 bg-dark-200/80 p-6 shadow-lg md:p-8 lg:p-10">
          <DoctorForm />
        </div>
      </main>
    </div>
  );
};

export default AddDoctorPage;
