import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET: List all admin users (Legacy DB, might be empty if using Cognito only)
export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const result = await query(
            `SELECT id, email, role, created_at FROM admin_users ORDER BY created_at DESC`
        );

        return NextResponse.json({ users: result.rows });
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create a new admin user
export async function POST(_req: Request) {
    return NextResponse.json(
        { error: 'User management is now handled via AWS Cognito Console.' },
        { status: 501 }
    );
}
