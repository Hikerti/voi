"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
};

export default function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <button type="button" className={className} onClick={handleBack}>
      Назад
    </button>
  );
}
