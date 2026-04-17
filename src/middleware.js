import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/pt',
  },
});

export const config = {
  matcher: ['/(pt|en)/account/:path*', '/(pt|en)/admin/:path*'],
};
