import { Resend } from "resend";
import VerifyEmail from "@/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "SmartCook AI <onboarding@resend.dev>",
    to: email,
    subject: "Verify your SmartCook AI account",
    react: VerifyEmail({ name, verificationUrl }),
  });
}
