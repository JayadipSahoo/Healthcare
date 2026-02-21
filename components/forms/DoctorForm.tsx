"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { FileUploader } from "@/components/FileUploader";
import SubmitButton from "@/components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createDoctor } from "@/lib/actions/doctor.actions";
import { DoctorFormValidation } from "@/lib/validation";

export const DoctorForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: "",
      specialty: "",
      email: "",
      phone: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (values.image && values.image.length > 0) {
      const blobFile = new Blob([values.image[0]], {
        type: values.image[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.image[0].name);
    }

    try {
      const doctor = {
        name: values.name,
        specialty: values.specialty || undefined,
        email: values.email || undefined,
        phone: values.phone || undefined,
        imageFile: formData,
      };

      const newDoctor = await createDoctor(doctor);

      if (newDoctor) {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10"
      >
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="sub-header text-light-200">
              Professional Information
            </h2>
            <p className="text-14-regular text-dark-600">
              Enter the doctor&apos;s name and medical specialty
            </p>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Doctor Name"
              placeholder="Dr. John Smith"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="specialty"
              label="Specialty"
              placeholder="e.g. Cardiologist, Neurosurgeon"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="sub-header text-light-200">Contact Details</h2>
            <p className="text-14-regular text-dark-600">
              Email and phone number for correspondence
            </p>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="doctor@hospital.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+1234567890"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="sub-header text-light-200">Profile Photo</h2>
            <p className="text-14-regular text-dark-600">
              Optional. Upload a professional headshot for patient-facing displays
            </p>
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={`rounded-xl border-2 border-dashed transition-all duration-200 ${
                      field.value?.length
                        ? "border-green-500/40 bg-green-600/10"
                        : "border-dark-500 bg-dark-400/30 hover:border-green-500/30 hover:bg-dark-400/50"
                    }`}
                  >
                    <FileUploader
                      files={field.value}
                      onChange={(files) => field.onChange(files)}
                      variant="compact"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <div className="flex items-center gap-4 pt-2">
          <SubmitButton
            isLoading={isLoading}
            className="shad-primary-btn w-fit min-w-[180px] px-8"
          >
            Add Doctor
          </SubmitButton>
          <p className="text-12-regular text-dark-600">
            Doctor will appear in registration and booking forms
          </p>
        </div>
      </form>
    </Form>
  );
};
