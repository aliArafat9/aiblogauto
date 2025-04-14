"use client";
import React, { useEffect } from "react";
import LoginModal from "@/components/modal/login-modal";
import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { loginModalOpen, setLoginModalOpen, loggedIn } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      setLoginModalOpen(true);
    } else {
      router.push("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        onClick={() => setLoginModalOpen(!loginModalOpen)}
        variant="outline"
        className="mt-[-100px]"
      >
        Login
      </Button>
    </div>
  );
}
