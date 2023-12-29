import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { GoogleProfile } from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          username: profile.username,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : 'candidate',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
