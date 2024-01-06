"use client"

import { AuthForm } from '@/app/auth/AuthForm'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const AuthModal = () => {
    const router = useRouter()
    const pathname = usePathname()

    return (
    <Dialog open={pathname === '/auth'} onOpenChange={() => {
        router.back()
    }}>
        <DialogContent>
            <AuthForm />
        </DialogContent>
    </Dialog>
  )
}
