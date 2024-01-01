import {getAuthSession} from "@/lib/auth";

export default async function Home() {
    const session = await getAuthSession()
    
    return (
        <main>
            <h1 className={'text-2xl'}>Bienvenue, {session?.user?.name}</h1>
        </main>
    )
}
