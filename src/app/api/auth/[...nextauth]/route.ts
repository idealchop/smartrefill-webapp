
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { riverBFF } from "@/lib/river-bff"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        action: { label: "Action", type: "text" },
        fullName: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { action, email, password, fullName } = credentials;

        try {
          let res;
          if (action === 'signup') {
            res = await riverBFF.signup(fullName || '', email, password);
          } else {
            res = await riverBFF.login(email, password);
          }
          // @ts-ignore
          if (!res.ok) {
             // @ts-ignore
            const error = await res.json();
            throw new Error(error.message || (action === 'signup' ? 'Signup failed' : 'Login failed'));
          }
           // @ts-ignore
          const user = await res.json();
          return user;

        } catch (error: any) {
          console.error(error);
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login page on error.
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        // @ts-ignore
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
      }
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const res = await riverBFF.google(
            user.email!,
            user.name!,
            user.image!,
            account.access_token!
          );
            // @ts-ignore
          if (!res.ok) {
            throw new Error('Google sign-in failed on the BFF side.');
          }
          
           // @ts-ignore
          const bffUser = await res.json();
          Object.assign(user, bffUser);

          return true; 
        } catch (error) {
          console.error('Google Sign-In Error:', error);
          return false; 
        }
      }
      return true; 
    },
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
