"use client";

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import React, { useEffect, useState } from "react"

type IconProps = {
    size?: number,
    className?: string
}

export function ThemedIcon({ size, className }: IconProps) {
    const {theme} = useTheme()
    const [t, setTheme] = useState('dark')

    useEffect(() => {
        setTheme(theme)
    }, [theme]) 

    return t === 'dark' ? <WhiteIconSvg size={size} className={className} /> : <DarkIconSvg size={size} className={className} />
}

export function DarkIconSvg({ size, className }: IconProps) {
    return <Image src='/icon.svg' width={size} height={size} className={cn(className)} alt='The life dashboard icon' />
}

export function WhiteIconSvg({ size, className }: IconProps) {
    return <Image src='/icon_white.svg' width={size} height={size} className={cn(className)} alt='The life dashboard icon' />
}