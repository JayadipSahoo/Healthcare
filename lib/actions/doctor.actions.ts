"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export interface CreateDoctorParams {
  name: string;
  specialty?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  imageFile?: FormData;
}

export const createDoctor = async ({
  imageFile,
  ...doctor
}: CreateDoctorParams) => {
  try {
    let imageFileId = null;
    let imageUrl = doctor.imageUrl || null;

    if (imageFile) {
      const inputFile = InputFile.fromBlob(
        imageFile.get("blobFile") as Blob,
        imageFile.get("fileName") as string
      );
      const file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      imageFileId = file.$id;
      imageUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    }

    const newDoctor = await databases.createDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {
        name: doctor.name,
        specialty: doctor.specialty || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        image: imageUrl,
      }
    );

    return parseStringify(newDoctor);
  } catch (error) {
    console.error("An error occurred while creating a doctor:", error);
    return null;
  }
};

export const getAllDoctors = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.orderAsc("name")]
    );

    return parseStringify(result.documents);
  } catch (error) {
    console.error("An error occurred while retrieving doctors:", error);
    return [];
  }
};
