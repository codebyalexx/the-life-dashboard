import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

const profileTemplate = (profile: any) => ({
  id: profile.id.toString(),
  username: profile.login,
  name: profile.name,
  email: profile.email,
  image: profile.avatar_url,
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile: profileTemplate,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: env.JWT_SECRET,
};

export const getAuthSession = async () => await getServerSession(authOptions);
