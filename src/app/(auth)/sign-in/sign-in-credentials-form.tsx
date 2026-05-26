"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className="w-full bg-[#FF6900] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#e55f00] transition-colors tracking-[-0.1504px]"
        variant="default"
      >
        {pending ? "Signing In.." : "Sign In"}
      </Button>
    );
  };
  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="block w-full pl-10 pr-10 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
            placeholder="••••••••"
          />
          <Button
            variant="ghost"
            type="button"
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-[rgba(0,0,0,0.1)] text-[#FF6900] focus:ring-[#FF6900]"
          />
          <Label
            htmlFor="remember-me"
            className="ml-2 text-sm text-[#4a5565] tracking-[-0.1504px]"
          >
            Remember me
          </Label>
        </div>

        <Link
          href="/forgot-password"
          className="text-sm text-[#FF6900] hover:text-[#e55f00] tracking-[-0.1504px]"
        >
          Forgot password?
        </Link>
      </div>
      <div>
        <SignInButton />
      </div>
      {data && !data.success && (
        <div className="text-center text-destructive">{data.message}</div>
      )}
    </form>
  );
};

export default SignInForm;
