import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  console.log("middleware");
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (request.method === "POST") {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "sb",
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      },
      cookies: {
        getAll: () => {
          const cookies = request.cookies.getAll();
          return cookies.map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: (cookies) => {
          cookies.forEach(({ name, value, ...options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Session check error in middleware:", error);
  }

  if (session?.user) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!userError && user) {
      console.log("User email:", user.email);
    }
  }

  const { pathname } = request.nextUrl;
  const publicPaths = ["/login", "/sign-up"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (session && isPublicPath) {
    console.log(
      "Authenticated user trying to access public path, redirecting to /home"
    );
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!session && !isPublicPath) {
    console.log(
      "Unauthenticated user trying to access protected path, redirecting to /login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
