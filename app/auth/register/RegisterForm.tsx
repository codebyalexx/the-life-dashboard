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
    
    if (!/^([A-Za-z]+[\-\']?)?$/.test(name))
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
    <h2 className="mb-10 text-2xl font-bold text-center" onSubmit={(e) => e.preventDefault()}>Inscription</h2>
    <form className="mb-4 space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <Label htmlFor="name">Prénom</Label>
        <Input className={nameError ? "border-red-500 border-2" : ""} id="name" placeholder="Indiquez votre prénom" type="name" value={name} onChange={(e) => {setName(e.target.value); validateForm()}} />
        {nameError ? <p className="mt-1 text-sm font-medium text-red-500">{nameError.error}</p> : ""}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Adresse email</Label>
        <Input className={emailError ? "border-red-500 border-2" : ""} id="email" placeholder="Indiquez votre adresse email" type="email" value={email} onChange={(e) => {setEmail(e.target.value); validateForm()}} />
        {emailError ? <p className="mt-1 text-sm font-medium text-red-500">{emailError.error}</p> : ""}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Mot de passe</Label>
        <Input className={passwordError ? "border-red-500 border-2" : ""} id="password" placeholder="Indiquez votre mot de passe" type="password" value={password} onChange={(e) => {setPassword(e.target.value); validateForm()}} />
        {passwordError ? <p className="mt-1 text-sm font-medium text-red-500">{passwordError.error}</p> : ""}
      </div>
      <Button className="w-full" type="submit" onClick={() => {
        setSubmitted(1)

        if (!validateForm()) return

        fetch('/api/sign-up', {
          body: JSON.stringify({
            name,
            email,
            password
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((data: any) => {
            if (data.error) {
              const error: {input: string, error: string} = data.error
              setErrors([
                ...errors,
                {...error}
              ])
            }
          })
          .catch((err) => {
            
          })
      }}>
        S&apos;inscrire
      </Button>
    </form>
		<p className="text-sm text-center">Déjà inscrit ? <Link href={'/auth'} className="text-blue-400 underline">Se connecter</Link></p>
  </>)
}