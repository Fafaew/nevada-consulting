import _NextAuth from 'next-auth';
import _GoogleProvider from 'next-auth/providers/google';
import _FacebookProvider from 'next-auth/providers/facebook';
import _CredentialsProvider from 'next-auth/providers/credentials';

// Next.js 15 + next-auth v4: handle CJS/ESM interop
const NextAuth = _NextAuth.default ?? _NextAuth;
const GoogleProvider = _GoogleProvider.default ?? _GoogleProvider;
const FacebookProvider = _FacebookProvider.default ?? _FacebookProvider;
const CredentialsProvider = _CredentialsProvider.default ?? _CredentialsProvider;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'public_profile',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // TODO: Replace with actual database lookup and password verification
        // Example: query user from DB and compare hashed password
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
