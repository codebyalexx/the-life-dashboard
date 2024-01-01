import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {env} from "./env"
import {AuthOptions, getServerSession} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ]
}

export const getAuthSession = async() => await getServerSession(authOptions)
