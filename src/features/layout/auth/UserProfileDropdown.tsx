import {getAuthSession} from "@/lib/auth";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {LogOut, Wrench} from "lucide-react";
import {DropdownMenuItemLogout} from "@/src/features/layout/auth/LogoutDropwndownMenuItem";

export const UserProfileDropdown = async () => {
    const session = await getAuthSession()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                    {session?.user?.name ?? ""}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Wrench size={16} className={'mr-2'}/> Paramètres
                </DropdownMenuItem>
                <DropdownMenuSeparator />
               <DropdownMenuItemLogout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}