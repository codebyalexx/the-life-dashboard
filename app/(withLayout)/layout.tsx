import '@/app/index.css';
import { Toaster } from '@/components/ui/toaster';
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AppContextMenu } from '@/src/features/contextMenu/AppContextMenu';
import { Footer } from "@/src/features/layout/Footer";
import { Header } from "@/src/features/layout/Header";
import { ReduxStoreProvider } from '@/src/redux/ReduxStoreProvider';
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { Info } from "lucide-react";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Life Dashboard',
  description: 'The Life Dashboard App',
}

export default async function RootLayout({
  children,
  authmodal
}: {
  children: React.ReactNode
  authmodal?: React.ReactNode
}) {
    const session = await getAuthSession()
    return (
        <html lang="fr" className={'h-full'}>
            <body className={cn(inter.className, 'bg-background h-full')}>
                <ReduxStoreProvider>
                    <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem>
                        <AppContextMenu>
                            <div className={'flex flex-col h-full'}>
                                <Header />
                                <div className="flex-1 w-full max-w-xl py-6 m-auto pb-14">
                                    {session?.user ? children : <div className={'p-3 rounded-lg bg-blue-500 w-fit mx-auto'}>
                                        <p className={'flex items-center justify-center text-lg font-medium text-white'}>
                                            <Info size={20} className={'mr-2'} />
                                            Vous devez vous connecter pour utiliser l&apos;application
                                        </p>
                                    </div>}
                                </div>
                                <Footer />
                            </div>
                            {authmodal}
                            <Toaster />
                        </AppContextMenu>
                    </ThemeProvider>
                </ReduxStoreProvider>
            </body>
        </html>
    )
}
