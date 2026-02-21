import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Doctors } from "@/constants";
import { getPatient } from "@/lib/actions/patient.actions";
import { getAllDoctors } from "@/lib/actions/doctor.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const [patient, dbDoctors] = await Promise.all([
    getPatient(userId),
    getAllDoctors(),
  ]);

  const doctors =
    dbDoctors?.length > 0
      ? dbDoctors.map((d: { name: string; image?: string }) => ({
          name: d.name,
          image: d.image,
        }))
      : Doctors;

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-icon.png"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />
          <h1>HealthPlus</h1>
          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
            doctors={doctors}
          />

          <p className="copyright mt-10 py-12">© 2024 HealthPlus</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
