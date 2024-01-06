import {ThemeToggle} from "@/src/theme/ThemeToggle";
import {TrendingUp} from "lucide-react";
import {LoginButton} from "@/src/features/layout/auth/LoginButton";
import {getAuthSession} from "@/lib/auth";
import {UserProfileDropdown} from "@/src/features/layout/auth/UserProfileDropdown";

export const Header = async () => {
    const session = await getAuthSession()
    
    return (<header className={'border-b border-b-accent z-20'}>
        <div className={'container flex items-center py-4 max-w-2xl m-auto gap-1'}>
            <div className={'mr-auto flex items-center'}>
                <TrendingUp size={24} className={'mr-2'}/>
                <h1 className={'inline-block text-2xl font-medium'}>The Life Dashboard</h1>
            </div>
            {session?.user ? (<UserProfileDropdown />) : <LoginButton />}
            <ThemeToggle />
        </div>
    </header>)
}