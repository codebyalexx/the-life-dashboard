import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-6 border-2 shadow-xl bg-background rounded-xl border-slate-100 dark:border-white/5">
        <RegisterForm />
      </div>
    </div>
  )
}