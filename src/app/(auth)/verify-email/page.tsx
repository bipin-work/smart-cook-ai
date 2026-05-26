import Link from "next/link";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/db/prisma";

type VerifyState = "success" | "expired" | "invalid";

interface StateConfig {
  icon: React.ReactNode;
  iconBg: string;
  heading: string;
  description: string;
  cta: React.ReactNode;
}

const states: Record<VerifyState, StateConfig> = {
  success: {
    icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
    iconBg: "bg-green-50",
    heading: "Email verified!",
    description:
      "Your account is now active. You can sign in and start using SmartCook AI.",
    cta: (
      <Button
        asChild
        className="w-full bg-[#FF6900] hover:bg-[#e55f00] text-white"
      >
        <Link href="/sign-in">Sign in to your account</Link>
      </Button>
    ),
  },
  expired: {
    icon: <Clock className="w-8 h-8 text-amber-500" />,
    iconBg: "bg-amber-50",
    heading: "Link expired",
    description:
      "This verification link has expired. Links are valid for 24 hours. Sign up again to get a new one.",
    cta: (
      <Button
        asChild
        className="w-full bg-[#FF6900] hover:bg-[#e55f00] text-white"
      >
        <Link href="/sign-up">Back to sign up</Link>
      </Button>
    ),
  },
  invalid: {
    icon: <XCircle className="w-8 h-8 text-red-500" />,
    iconBg: "bg-red-50",
    heading: "Invalid link",
    description:
      "This verification link is invalid or has already been used. If you already verified your email, go ahead and sign in.",
    cta: (
      <div className="space-y-3">
        <Button
          asChild
          className="w-full bg-[#FF6900] hover:bg-[#e55f00] text-white"
        >
          <Link href="/sign-in">Go to sign in</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/sign-up">Create a new account</Link>
        </Button>
      </div>
    ),
  },
};

async function verifyToken(token: string): Promise<VerifyState> {
  const record = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!record) return "invalid";

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { identifier_token: { identifier: record.identifier, token } },
    });
    return "expired";
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: record.identifier, token } },
  });

  return "success";
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    const config = states.invalid;
    return <VerifyCard config={{ ...config, icon: <AlertCircle className="w-8 h-8 text-red-500" />, heading: "No token provided" }} />;
  }

  const state = await verifyToken(token);
  return <VerifyCard config={states[state]} />;
}

function VerifyCard({ config }: { config: StateConfig }) {
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-sm">
        <CardContent className="pt-10 pb-8 px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center`}>
              {config.icon}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#0a0a0a] tracking-tight mb-2">
            {config.heading}
          </h1>
          <p className="text-[#4a5565] text-sm leading-relaxed mb-8">
            {config.description}
          </p>

          {config.cta}
        </CardContent>
      </Card>
    </div>
  );
}
