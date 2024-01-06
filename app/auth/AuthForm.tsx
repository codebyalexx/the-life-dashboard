"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

export const AuthForm = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-slate-100 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-10 text-center">Sign In</h2>
        <form className="space-y-6">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" required type="email" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative my-5">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button className="w-full flex justify-center items-center" variant="outline" onClick={() => {
                signIn('google', {callbackUrl: '/'})
            }}>
              Google
            </Button>
            <Button className="w-full flex justify-center items-center" variant="outline"onClick={() => {
                signIn('github', {callbackUrl: '/'})
            }}>
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
  )
}
