import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-utils';
import { cookies } from 'next/headers';

export interface UserSession {
    email: string;
    role: string;
}

/**
 * Get the current authenticated user from the server session
 */
export async function getCurrentUser(): Promise<UserSession | null> {
    try {
        const session = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: async (contextSpec) => {
                const { tokens } = await fetchAuthSession(contextSpec);
                return tokens;
            },
        });

        if (!session?.idToken) return null;

        const payload = session.idToken.payload;

        // Custom attribute for role, or default to admin if they can log in
        // In this app, only admins have access anyway
        const role = (payload['custom:role'] as string) || 'admin';

        return {
            email: payload.email as string,
            role,
        };
    } catch (error) {
        // console.error('Auth check failed:', error);
        return null;
    }
}

/**
 * Verify session for middleware
 */
export async function verifySession(request: NextRequest, response: NextResponse): Promise<boolean> {
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

    return authenticated;
}

import { query } from './db';

/**
 * Log audit events to database
 */
export async function logAudit(
    userEmail: string,
    action: string,
    details?: Record<string, unknown>,
    ipAddress?: string
): Promise<void> {
    try {
        await query(
            `INSERT INTO audit_logs (user_email, action, details, ip_address) VALUES ($1, $2, $3, $4)`,
            [userEmail, action, JSON.stringify(details || {}), ipAddress || null]
        );
    } catch (err) {
        console.error('Failed to log audit:', err);
    }
}
