"use server";
import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { randomBytes } from "crypto";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error && error.message === "EMAIL_NOT_VERIFIED") {
      return {
        success: false,
        message:
          "Please verify your email before signing in. Check your inbox for the verification link.",
      };
    }
    return { success: false, message: "Invalid email or password" };
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/sign-in" });
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: plainPassword,
      },
    });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires,
      },
    });

    await sendVerificationEmail(user.email, user.name, token);

    return {
      success: true,
      message:
        "Account created! Please check your email to verify your account.",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}

export async function requestPasswordReset(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    if (!email) return { success: false, message: "Email is required." };

    const user = await prisma.user.findFirst({ where: { email } });
    // Don't reveal whether the email exists
    if (!user)
      return {
        success: true,
        message: "If that email exists, a reset link has been sent.",
      };

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.verificationToken.create({
      data: { identifier: `reset:${email}`, token, expires },
    });

    await sendPasswordResetEmail(email, user.name, token);

    return {
      success: true,
      message: "If that email exists, a reset link has been sent.",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const token = formData.get("token") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!token) return { success: false, message: "Invalid reset link." };
    if (password.length < 6)
      return {
        success: false,
        message: "Password must be at least 6 characters.",
      };
    if (password !== confirmPassword)
      return { success: false, message: "Passwords don't match." };

    const record = await prisma.verificationToken.findFirst({
      where: { token },
    });
    if (!record)
      return { success: false, message: "Invalid or expired reset link." };
    if (record.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { identifier_token: { identifier: record.identifier, token } },
      });
      return {
        success: false,
        message: "Reset link has expired. Please request a new one.",
      };
    }

    const email = record.identifier.replace("reset:", "");
    await prisma.user.update({
      where: { email },
      data: { password: hashSync(password, 10) },
    });
    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: record.identifier, token } },
    });

    return { success: true, message: "Password reset successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
