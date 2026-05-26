"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
const BackButton = ({ url }: { url?: string }) => {
  const router = useRouter();

  const goBack = () => {
    if (url) {
      router.push(url);
      return;
    }
    router.back();
  };

  return (
    <Button variant="ghost" onClick={goBack}>
      <ArrowLeft className="size-sm text-black-600" />
      Back
    </Button>
  );
};

export default BackButton;
