import { useState } from "react";
import { CheckCircle, EyeOff, Eye, Lock, ChefHat } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/actions/user.action";

const ResetPassword = ({ token }: { token: string }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    const data = new FormData();
    data.append("token", token);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    const res = await resetPassword(data);
    if (!res.success) {
      setError(res?.message);
      return;
    }
    setIsSuccess(true);
    setTimeout(() => router.push("/sign-in"), 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.1)] p-6 sm:p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#dcfce7] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-[#00A63E]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[#0a0a0a] tracking-[-0.4492px]">
                Password reset successful
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#4a5565] tracking-[-0.3125px]">
                Your password has been successfully reset.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#717182] tracking-[-0.3125px]">
                Redirecting you to sign in...
              </p>
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
              Set new password
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#4a5565] text-center tracking-[-0.3125px]">
              Your new password must be different from previous passwords
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#717182]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#717182]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#717182]" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-[#717182] tracking-[-0.1504px]">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#0a0a0a] mb-2 tracking-[-0.1504px]"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#717182]" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6900] focus:border-transparent text-[#0a0a0a] tracking-[-0.1504px]"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#717182]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#717182]" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 tracking-[-0.1504px]">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6900] text-white py-2.5 px-4 rounded-lg font-medium hover:bg-[#e55f00] transition-colors tracking-[-0.1504px]"
            >
              Reset password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-sm text-[#4a5565] hover:text-[#0a0a0a] tracking-[-0.1504px]"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
