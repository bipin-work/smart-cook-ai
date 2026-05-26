const ResetPasswordPage = ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = searchParams;
};

export default ResetPasswordPage;
