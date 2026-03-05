import { NextResponse } from 'next/server';

// DELETE: Remove an admin user
export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const _params = await params; // Consume params to avoid 'unused' error if needed, or just ignore
    return NextResponse.json(
        { error: 'User management is now handled via AWS Cognito Console.' },
        { status: 501 }
    );
}

// PATCH: Update password
export async function PATCH(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const _params = await params;
    return NextResponse.json(
        { error: 'User management is now handled via AWS Cognito Console.' },
        { status: 501 }
    );
}
