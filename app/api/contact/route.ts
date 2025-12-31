import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

// ---------------- Schema ----------------
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  message: z.string().min(10).max(1000),
});

// ---------------- Email Function ----------------
async function sendToEmail(data: z.infer<typeof contactSchema>) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your gmail address
      pass: process.env.GMAIL_PASS, // gmail app password
    },
  });

  await transporter.sendMail({
    from: `"Saroj Contact Form" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER, // your inbox
    subject: `New Contact From ${data.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <hr />
      <small>Submitted on: ${new Date().toLocaleString()}</small>
    `,
  });

  return true;
}

// ---------------- POST HANDLER ----------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    await sendToEmail(validated);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Invalid form data", details: error.issues },
      { status: 400 }
    );
  }


  return NextResponse.json(
    { error: "Failed to send email" },
    { status: 500 }
  );
  }
}

// ---------------- GET (optional) ----------------
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
