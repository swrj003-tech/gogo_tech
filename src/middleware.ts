import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { fetchAuthSession } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-utils';

export async function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    // Using a more permissible CSP for Amplify
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://connect.facebook.net https://snap.licdn.com https://*.amazoncognito.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://www.google.com https://www.facebook.com https://px.ads.linkedin.com;
    font-src 'self' https://fonts.gstatic.com;
    frame-src 'self' https://www.google.com https://*.amazoncognito.com;
    connect-src 'self' https://*.amazonaws.com https://*.amazoncognito.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
        .replace(/\s{2,}/g, ' ')
        .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    // TEMPORARILY DISABLED FOR DEVELOPMENT - CSP causing SSL errors
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // =========================================================
    // Amplify Auth Protection
    // =========================================================
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const authenticated = await runWithAmplifyServerContext({
            nextServerContext: { request, response },
            operation: async (contextSpec) => {
                try {
                    const session = await fetchAuthSession(contextSpec);
                    return !!session.tokens?.idToken;
                } catch {
                    return false;
                }
            },
        });

        if (!authenticated) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // TEMPORARILY DISABLED FOR DEVELOPMENT - CSP causing SSL errors
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
