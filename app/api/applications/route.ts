import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const applicationSchema = z.object({
  jobId: z.string().min(1),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  city: z.string().trim().min(2).max(100),
  licenseType: z.enum(["Class D", "Class D and G", "In progress", "None"]),
  yearsExperience: z.coerce.number().int().min(0).max(60),
  availability: z.enum(["Immediately", "Within two weeks", "Within one month"]),
  note: z.string().trim().max(1200).optional().default(""),
  consent: z.literal("true"),
});

export async function POST(request: Request) {
  try {
    const parsed = applicationSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the application fields and try again." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const job = db
      .prepare("SELECT id, status, is_demo FROM jobs WHERE id = ?")
      .get(data.jobId) as
      | { id: string; status: string; is_demo: number }
      | undefined;
    if (!job || job.status !== "PUBLISHED" || !job.is_demo) {
      return NextResponse.json(
        { message: "This demo position is no longer available." },
        { status: 404 },
      );
    }

    db.prepare(
      `
        INSERT INTO applications (
          id, job_id, is_demo, applicant_name, applicant_email,
          applicant_phone, applicant_city, has_class_d, has_class_g,
          cover_letter, profile_snapshot, consent_to_share_at
        ) VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    ).run(
      randomUUID(),
      job.id,
      data.fullName,
      data.email.toLowerCase(),
      data.phone,
      data.city,
      data.licenseType === "Class D" || data.licenseType === "Class D and G" ? 1 : 0,
      data.licenseType === "Class D and G" ? 1 : 0,
      data.note || null,
      JSON.stringify({
        licenseType: data.licenseType,
        yearsExperience: data.yearsExperience,
        availability: data.availability,
      }),
      new Date().toISOString(),
    );

    return NextResponse.json({ message: "Application submitted." }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { message: "An application for this email has already been submitted." },
        { status: 409 },
      );
    }

    console.error("Application submission failed", error);
    return NextResponse.json(
      { message: "We could not submit the application. Please try again." },
      { status: 500 },
    );
  }
}
