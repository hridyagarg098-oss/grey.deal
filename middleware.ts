import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Unified middleware:
 * 1. Strips legacy .html extensions (Chrome cached old Express routes)
 * 2. Refreshes Supabase auth session on every request
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ── Strip legacy .html extension ────────────────────────────────────────────
  if (pathname.endsWith(".html")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -5) || "/";
    url.search = search;
    return NextResponse.redirect(url, { status: 308 });
  }

  // ── Supabase session refresh ────────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // CRITICAL: Refresh session on every request so users stay logged in
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
