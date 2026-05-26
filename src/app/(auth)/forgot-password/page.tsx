"use client";

import { useActionState, useState } from "react";
import { Mail, ArrowLeft, ChefHat } from "lucide-react";
import Link from "next/link";
import { requestPasswordReset } from "@/lib/actions/user.action";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [state, action, isPending] = useActionState(requestPasswordReset, {
    success: false,
    message: "",
  });

  if (state.success) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] p-6 sm:p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-[#00A63E]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[#0a0a0a] tracking-[-0.4492px]">
                Check your email
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#4a5565] tracking-[-0.3125px]">
                We&apos;ve sent a password reset link to
              </p>
              <p className="mt-1 font-medium text-sm sm:text-base text-[#0a0a0a] tracking-[-0.3125px] break-all">
                {email}
              </p>
              <p className="mt-4 text-xs sm:text-sm text-[#717182] tracking-[-0.1504px]">
                Didn&apos;t receive the email? Check your spam folder or
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 text-sm text-[#4a5565] hover:text-[#0a0a0a] tracking-[-0.1504px]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] p-6 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <ChefHat className="size-8 text-orange-500" />
            <h1 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold text-[#0a0a0a] text-center tracking-[-0.4492px]">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#4a5565] text-center tracking-[-0.3125px]">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>

          <form action={action} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#717182]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {state.message && !state.success && (
              <p className="text-sm text-red-500 tracking-[-0.1504px]">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#FF6900] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#e55f00] transition-colors tracking-[-0.1504px] disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <div className="mt-6">
            <Link
              href="/sign-in"
              className="flex items-center justify-center gap-2 text-sm text-[#4a5565] hover:text-[#0a0a0a] tracking-[-0.1504px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
