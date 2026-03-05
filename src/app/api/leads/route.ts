import { NextResponse } from 'next/server';
import { insertLead, getLeads } from '@/lib/db';
import { cookies } from 'next/headers';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-utils';
import { fetchAuthSession } from 'aws-amplify/auth/server';

// Simple in-memory rate limiting for leads submission
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function getClientIP(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return 'unknown';
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, firstAttempt: now });
        return true;
    }

    if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, firstAttempt: now });
        return true;
    }

    if (record.count >= MAX_SUBMISSIONS_PER_WINDOW) {
        return false;
    }

    record.count += 1;
    rateLimitMap.set(ip, record);
    return true;
}

export async function GET(req: Request) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // 1. Verify Admin Auth
    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: { cookies },
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
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const leads = await getLeads();
        return NextResponse.json(leads);
    } catch (error: unknown) {
        console.error("Leads Fetch Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
        return NextResponse.json(
            { success: false, error: 'Too many requests. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const body = await req.json();

        // Server-side validation
        const { companyName, fleetSize, fuelType, email, phone } = body;

        if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Invalid company name' }, { status: 400 });
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
        }
        if (!fleetSize || typeof fleetSize !== 'string') {
            return NextResponse.json({ success: false, error: 'Fleet size is required' }, { status: 400 });
        }

        const { lead, error } = await insertLead({
            company_name: companyName.trim(),
            fleet_size: fleetSize,
            fuel_type: fuelType || 'Not specified',
            email: email.toLowerCase().trim(),
            phone: phone || '',
            email_status: 'pending'
        });

        if (error || !lead) {
            throw new Error(error || "Insert failed");
        }

        return NextResponse.json({ success: true, leadId: lead.id });

    } catch (error: unknown) {
        console.error("Leads API Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
