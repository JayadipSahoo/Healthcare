import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { getAllDoctors } from "@/lib/actions/doctor.actions";
import { Doctors } from "@/constants";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const [user, patient, dbDoctors] = await Promise.all([
    getUser(userId),
    getPatient(userId),
    getAllDoctors(),
  ]);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  const doctors =
    dbDoctors?.length > 0
      ? dbDoctors.map((d: { name: string; image?: string }) => ({
          name: d.name,
          image: d.image,
        }))
      : Doctors;

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-icon.png"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <h1>HealthPlus</h1>

          <RegisterForm user={user} doctors={doctors} />

          <p className="copyright py-12">© 2024 HealthPlus</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
