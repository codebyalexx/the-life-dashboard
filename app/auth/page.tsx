import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import { AuthForm } from "./AuthForm"

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-6 bg-background rounded-xl shadow-xl border-2 border-slate-100 dark:border-white/5 w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  )
}
