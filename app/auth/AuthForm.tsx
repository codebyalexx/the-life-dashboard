"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export const AuthForm = () => {
  return (
    <>
      <h2 className="mb-10 text-2xl font-bold text-center">Connexion</h2>
      <form className="mb-4 space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" placeholder="Indiquez votre adresse email" required type="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" placeholder="Indiquez votre mot de passe" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Se connecter
        </Button>
      </form>
			<p className="text-sm text-center">Pas de compte ? <Link href={'/auth/register'} className="text-blue-400 underline">Créez un compte</Link></p>
      <div className="mt-2">
        <div className="relative mb-5">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Ou continuer avec</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button className="flex items-center justify-center w-full" variant="outline" onClick={() => {
            signIn('google', {callbackUrl: '/'})
          }}>
            Google
          </Button>
          <Button className="flex items-center justify-center w-full" variant="outline"onClick={() => {
            signIn('github', {callbackUrl: '/'})
          }}>
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
		</>
  )
}
