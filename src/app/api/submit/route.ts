import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Nomor tidak valid atau kosong" },
        { status: 400 }
      );
    }

    // Basic regex validation for 10-15 digits
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Nomor harus berisikan 10 hingga 15 digit angka" },
        { status: 400 }
      );
    }

    const newNumber = await prisma.phoneNumber.create({
      data: {
        phone,
      },
    });

    return NextResponse.json(
      { message: "Nomor berhasil dikirim", data: newNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/submit Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
