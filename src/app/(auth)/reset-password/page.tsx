import ResetPassword from "./reset-form";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;
  return <ResetPassword token={token || ""} />;
};

export default ResetPasswordPage;
