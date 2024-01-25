"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateEmail } from "@/lib/utils"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [errors, setErrors] = useState([] as {input: string, error: string}[])
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    if (!submitted) return
    const errs = [] as any

    if (!validateEmail(email))
      errs.push({
        input: 'email',
        error: 'Votre adresse email est invalide'
      })
    
    if (!password)
      errs.push({
        input: 'password',
        error: 'Votre mot de passe ne doit pas être vide'
      })

    setErrors(errs)
    return errs.length === 0
  }

  const emailError = errors.find((e: any) => e.input === 'email') || undefined
  const passwordError = errors.find((e: any) => e.input === 'password') || undefined

  return (
    <>
      <h2 className="mb-10 text-2xl font-bold text-center">Connexion</h2>
      <form className="mb-4 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1">
          <Label htmlFor="email">Adresse email</Label>
          <Input className={emailError ? "border-red-500 border-2" : ""} id="email" placeholder="Indiquez votre adresse email" type="email" value={email} onChange={(e: any) => {setEmail(e.target.value); validateForm()}} />
          {emailError ? <p className="mt-1 text-sm font-medium text-red-500">{emailError.error}</p> : ""}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Mot de passe</Label>
          <Input className={passwordError ? "border-red-500 border-2" : ""} id="password" placeholder="Indiquez votre mot de passe" type="password" value={password} onChange={(e: any) => {setPassword(e.target.value); validateForm()}} />
          {passwordError ? <p className="mt-1 text-sm font-medium text-red-500">{passwordError.error}</p> : ""}
        </div>
        <Button className="w-full" type="submit" onClick={() => {
          setSubmitted(true)

          if (!validateForm()) return

          signIn('credentials', {
            email,
            password
          })
        }}>
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
