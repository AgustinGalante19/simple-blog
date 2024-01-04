import { PrismaAdapter } from '@next-auth/prisma-adapter';
import client from './prisma';
import { AuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username && !credentials?.password) {
          throw new Error('Credentials are required');
        }

        const user = await client.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          throw new Error("That user doesn't exists");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        const currentUser = await client.user.findUnique({
          where: {
            id: token.sub,
          },
        });
        if (currentUser) {
          session.user.id = currentUser.id;
          session.user.name = currentUser.name;
          session.user.lastname = currentUser.lastname;
          session.user.username = currentUser.username;
        }
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default authOptions;
