"use client";

import {Button, buttonVariants} from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import {LogIn} from "lucide-react";
import Link from "next/link";

export const LoginButton = () => {
    return (
        <Link href={'/auth'} className={buttonVariants({ variant: 'default' })}>
            <LogIn className={'mr-2 h-4 w-4'}/>
            Connexion
        </Link>
    )
}