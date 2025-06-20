import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //Allow webhook endpoint
        if (pathname.startsWith("/api/webhook")) {
          return true;
        }

        //Allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

         if (
          pathname.startsWith("/aboutus") 
        ) {
          return true;
        }

        //Public route
        if (
          pathname.startsWith("/api/products") ||
          pathname.startsWith("/products")
        ) {
          return true;
        }

        //Admin routes require admin role
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        //All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     *Match all request path except:
     *- _next/static (static files)
     *- _next/images (image optimization file)
     *- favicon.ico (favicon file)
     *- public folder
     */

    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
