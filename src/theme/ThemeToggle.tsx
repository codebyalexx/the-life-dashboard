"use client";

import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, SunMedium} from "lucide-react";

export const ThemeToggle = () => {
    const {setTheme, theme} = useTheme()
    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'relative'}
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light")
            }}>
            <SunMedium className={'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'} />
            <Moon className={'absolute -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'} />
            <span className={'sr-only'}>Toggle Theme</span>
        </Button>
    )
}