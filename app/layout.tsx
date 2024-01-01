import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ThemeProvider} from "@/src/theme/ThemeProvider";
import {cn} from "@/lib/utils";
import React from "react";
import {Header} from "@/src/features/layout/Header";
import {Footer} from "@/src/features/layout/Footer";
import {getAuthSession} from "@/lib/auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Life Dashboard',
  description: 'The Life Dashboard App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const session = await getAuthSession()
    return (
        <html lang="fr" className={'h-full'}>
            <body className={cn(inter.className, 'bg-background h-full')}>
                <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem>
                    <div className={'flex flex-col h-full'}>
                        <Header />
                        <div className="flex-1 max-w-xl m-auto py-6 w-full">
                            {session?.user ? children : <h2 className={'text-xl font-bold'}>
                                Vous devez vous connecter pour utiliser l&apos;application
                            </h2>}
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
