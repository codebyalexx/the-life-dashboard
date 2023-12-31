import {ThemeToggle} from "@/src/theme/ThemeToggle";

export const Header = () => {
    return (<header className={'border-b border-b-accent z-20'}>
        <div className={'container flex items-center py-4 max-w-xl m-auto gap-1'}>
            <div className={'mr-auto flex items-center'}>
                <img src='/icon.png' alt="Application Icon" className={'h-8 mr-2'}/>
                <h1 className={'inline-block text-2xl font-bold'}>The Life Dashboard</h1>
            </div>
            <ThemeToggle />
        </div>
    </header>)
}