import { NextRequest, NextResponse } from "next/server";

import { BUCKET_ID, storage } from "@/lib/appwrite.config";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    const [fileMeta, buffer] = await Promise.all([
      storage.getFile(BUCKET_ID!, fileId),
      storage.getFileDownload(BUCKET_ID!, fileId),
    ]);

    const filename = fileMeta.name || "document";

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": fileMeta.mimeType || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
