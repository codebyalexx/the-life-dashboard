import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipboardCheck, Home, Salad } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={'fixed py-2 flex justify-between items-center container gap-1 bottom-0 left-0 right-0 bg-background max-w-2xl z-20 m-auto border-t border-accent'}>
            <Link href={'/'} className={cn(buttonVariants({
                variant: 'ghost'
            }), 'flex-1')}>
                <Home size={20} />
            </Link>
            <Link href={'/habits'} className={cn(buttonVariants({
                variant: 'ghost'
            }), 'flex-1')}>
                <ClipboardCheck size={20} />
            </Link>
            {/*<Link href={'/calendar'} className={cn(buttonVariants({
                variant: 'ghost'
            }), 'flex-1')}>
                <Calendar size={20} />
        </Link>*/}
            <Link href={'/food'} className={cn(buttonVariants({
                variant: 'ghost'
            }), 'flex-1')}>
                <Salad size={20} />
            </Link>
            {/*<Link href={'/health'} className={cn(buttonVariants({
                variant: 'ghost'
            }), 'flex-1')}>
                <HeartPulse size={20} />
        </Link>*/}
        </footer>
    )
}