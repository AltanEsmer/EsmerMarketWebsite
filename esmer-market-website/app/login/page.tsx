"use client";

import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('admin.login')}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('admin.login_description')}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 