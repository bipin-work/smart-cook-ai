import { auth } from "@/auth";
import SignUpForm from "./sign-up-form";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session) {
    redirect(callbackUrl || "/");
  }
  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] p-8">
          <div className="mb-8">
            <ChefHat className="size-8 text-orange-500 mx-auto" />
            <h1 className="mt-6 text-2xl font-semibold text-[#0a0a0a] text-center tracking-[-0.4492px]">
              Create an account
            </h1>
            <p className="mt-2 text-[#4a5565] text-center tracking-[-0.3125px]">
              Start managing your recipes today
            </p>
          </div>

          <SignUpForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4a5565] tracking-[-0.1504px]">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-[#FF6900] hover:text-[#e55f00] font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
