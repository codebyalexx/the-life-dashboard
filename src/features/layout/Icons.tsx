"use client";

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import React from "react"

type IconProps = {
    size?: number,
    className?: string
}

export function ThemedIcon({ size, className }: IconProps) {
    const {theme} = useTheme()
    return theme === 'dark' ? <WhiteIconSvg size={size} className={className} /> : <DarkIconSvg size={size} className={className} />
}

export function DarkIconSvg({ size, className }: IconProps) {
    return <Image src='/icon.svg' width={size} height={size} className={cn(className)} alt='The life dashboard icon' />
}

export function WhiteIconSvg({ size, className }: IconProps) {
    return <Image src='/icon_white.svg' width={size} height={size} className={cn(className)} alt='The life dashboard icon' />
}