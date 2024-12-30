/**
 * NextAuth.js configuration
 * Auth配置文件
 */
import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import { NODE_ENV } from '@/lib/env'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub
        }

        if (token.email) {
          session.user.email = token.email
        }

        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  },
  debug: NODE_ENV !== 'production',
})
