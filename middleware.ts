import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
  },
  {
    // pages: {
    //   signIn: '/',
    // },
    callbacks: {
      authorized: async ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith('/candidate')) {
          return token?.role === 'candidate';
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/candidate/:path*'],
};
