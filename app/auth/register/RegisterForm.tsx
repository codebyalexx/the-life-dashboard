"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateEmail } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

export const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState([] as any)
  const [submitted, setSubmitted] = useState(0)

  const validateForm = () => {
    if (submitted === 0) return
    const errs = [] as any

    if (name.length < 6)
      errs.push({
        input: 'name',
        error: 'Votre nom doit contenir plus de 6 caractères'
      })
    
    if (!(/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(name)))
      errs.push({
        input: 'name',
        error: 'Votre nom est invalide'
      })
    
    if (!validateEmail(email))
      errs.push({
        input: 'email',
        error: 'Votre adresse email est invalide'
      })
    
    if (password.length < 6)
      errs.push({
        input: 'password',
        error: 'Votre mot de passe doit contenir plus de 6 caractères'
      })
    
    setErrors(errs)
    return errs.length === 0
  }

  const nameError = errors.find((e: any) => e.input === 'name') || undefined
  const emailError = errors.find((e: any) => e.input === 'email') || undefined
  const passwordError = errors.find((e: any) => e.input === 'password') || undefined

  return (<>
    <h2 className="mb-10 text-2xl font-bold text-center" onSubmit={async (e) => {
      e.preventDefault()
      setSubmitted(1)

      if (!validateForm()) return
    }}>Inscription</h2>
    <form className="mb-4 space-y-6">
      <div className="space-y-1">
        <Label htmlFor="name">Prénom</Label>
        <Input className={nameError ? "" : ""} id="name" placeholder="Indiquez votre prénom" required type="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Adresse email</Label>
        <Input className={emailError ? "" : ""} id="email" placeholder="Indiquez votre adresse email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Mot de passe</Label>
        <Input className={passwordError ? "" : ""} id="password" placeholder="Indiquez votre mot de passe" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button className="w-full" type="submit">
        S&apos;inscrire
      </Button>
    </form>
		<p className="text-sm text-center">Déjà inscrit ? <Link href={'/auth'} className="text-blue-400 underline">Se connecter</Link></p>
  </>)
}