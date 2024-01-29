import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import sha1 from "sha1";
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
    Credentials({
      id: "app-login",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = (await prisma.user.findUnique({
            where: {
              email,
            },
          })) as any;

          if (!user) return null;

          const encryptedPassword = sha1(password);
          const doesPasswordsMatch = user.password === encryptedPassword;

          if (!doesPasswordsMatch) return null;

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
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
  session: {
    strategy: "database",
  },
  debug: process.env.NODE_ENV === "development",
  secret: env.JWT_SECRET,
};

export const getAuthSession = async () => await getServerSession(authOptions);
