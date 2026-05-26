"use client";
import { useActionState, useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signUpUser } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (data.success) {
      router.push("/check-email");
    }
  }, [data.success, router]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className="w-full bg-[#FF6900] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#e55f00] transition-colors tracking-[-0.1504px]"
        variant="default"
      >
        {pending ? "Submitting" : "Sign Up"}
      </Button>
    );
  };
  return (
    <form action={action} className="space-y-5">
      <div>
        <Label
          htmlFor="name"
          className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
        >
          Full Name
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-[#717182]" />
          </div>
          <Input
            id="name"
            type="text"
            name="name"
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
            placeholder="Enter your name"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
        >
          Email
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-[#717182]" />
          </div>
          <Input
            id="email"
            type="email"
            name="email"
            required
            className="block w-full pl-10 pr-3 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
        >
          Password
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[#717182]" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="block w-full pl-10 pr-10 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
            placeholder="••••••••"
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-[#717182]" />
            ) : (
              <Eye className="h-5 w-5 text-[#717182]" />
            )}
          </Button>
        </div>
      </div>

      <div>
        <Label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
        >
          Confirm Password
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[#717182]" />
          </div>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            className="block w-full pl-10 pr-10 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
            placeholder="••••••••"
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-[#717182]" />
            ) : (
              <Eye className="h-5 w-5 text-[#717182]" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-start">
        <Input
          id="terms"
          type="checkbox"
          required
          className="h-4 w-4 mt-0.5 rounded border-[rgba(0,0,0,0.1)] text-[#FF6900] focus:ring-[#FF6900]"
        />
        <Label
          htmlFor="terms"
          className="ml-2 text-sm text-[#4a5565] tracking-[-0.1504px]"
        >
          I agree to the{" "}
          <a href="#" className="text-[#FF6900] hover:text-[#e55f00]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#FF6900] hover:text-[#e55f00]">
            Privacy Policy
          </a>
        </Label>
      </div>

      <SignUpButton />
      {data && !data.success && (
        <div className="text-center text-destructive">{data.message}</div>
      )}
    </form>
  );
};

export default SignUpForm;
