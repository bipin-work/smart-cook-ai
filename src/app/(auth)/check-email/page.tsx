import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-sm">
        <CardContent className="pt-10 pb-8 px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#FF6900]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#0a0a0a] tracking-tight mb-2">
            Check your inbox
          </h1>
          <p className="text-[#4a5565] text-sm leading-relaxed mb-1">
            We sent a verification link to your email address.
          </p>
          <p className="text-[#717182] text-sm leading-relaxed mb-8">
            Click the link in the email to activate your account. If you don&apos;t
            see it, check your spam folder.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full bg-[#FF6900] hover:bg-[#e55f00] text-white">
              <Link href="/sign-in">Go to sign in</Link>
            </Button>
          </div>

          <p className="text-xs text-[#717182] mt-6">
            The link expires in 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
