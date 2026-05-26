import { Resend } from "resend";
import VerifyEmail from "@/emails/verify-email";
import ResetPasswordEmail from "@/emails/reset-password-email";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "SmartCook AI <onboarding@resend.dev>",
    to: email,
    subject: "Verify your SmartCook AI account",
    react: VerifyEmail({ name, verificationUrl }),
  });
}

export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string,
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "SmartCook AI <onboarding@resend.dev>",
    to: email,
    subject: "Reset your SmartCook AI password",
    react: ResetPasswordEmail({ name, resetUrl }),
  });
}
