
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { riverBFF } from "@/lib/river-bff";

// Define a type for the user object returned by your BFF
interface BffUser {
  id: string;
  email: string;
  fullName?: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        action: { label: "Action", type: "text" },
        fullName: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          return null;
        }

        const { action, email, password, fullName } = credentials;

        try {
          let bffUser: BffUser | null = null;
          if (action === 'signup') {
            bffUser = await riverBFF.signup(fullName || '', email, password) as BffUser;
          } else {
            bffUser = await riverBFF.login(email, password) as BffUser;
          }
          
          if (bffUser) {
            const user: User = {
              id: bffUser.id,
              email: bffUser.email,
              name: bffUser.fullName || bffUser.email,
            };
            return user;
          }
          
          return null;
        } catch (error: any) {
          console.error("Authorization Error:", error.message);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          if (!user.email || !user.name || !account.access_token) return false;

          const bffUser = await riverBFF.google(
            user.email,
            user.name,
            user.image,
            account.access_token
          );
          
          return !!bffUser;
        } catch (error) {
          console.error('Google Sign-In Error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
