import { auth } from "@/auth";
import SignInForm from "./sign-in-credentials-form";
import { ChefHat } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metaData: Metadata = {
  title: "Sign in",
};

const SignIn = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  //   console.log("session", session);
  //   if (session) {
  //     redirect(callbackUrl || "/");
  //   }
  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] p-8">
          <div className="mb-8">
            <ChefHat className="size-8 text-orange-500" />
            <h1 className="mt-6 text-2xl font-semibold text-[#0a0a0a] text-center tracking-[-0.4492px]">
              Welcome back
            </h1>
            <p className="mt-2 text-[#4a5565] text-center tracking-[-0.3125px]">
              Sign in to your account to continue
            </p>
          </div>

          <SignInForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-[#4a5565] tracking-[-0.1504px]">
              Dont have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#FF6900] hover:text-[#e55f00] font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
