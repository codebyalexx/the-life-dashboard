import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import { AuthForm } from "./AuthForm"

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <AuthForm />
    </div>
  )
}
