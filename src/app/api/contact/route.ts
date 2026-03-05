import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 3;

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
        const { name, email, phone, message } = body;

        // Server-side validation
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return NextResponse.json({ success: false, error: 'Invalid name' }, { status: 400 });
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
        }
        if (!message || typeof message !== 'string' || message.trim().length < 10) {
            return NextResponse.json({ success: false, error: 'Message must be at least 10 characters' }, { status: 400 });
        }

        // Optional phone validation
        if (phone && typeof phone !== 'string') {
            return NextResponse.json({ success: false, error: 'Invalid phone number' }, { status: 400 });
        }

        // Send email notification to support team
        const emailContent = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `;

        try {
            await sendEmail({
                to: process.env.CONTACT_EMAIL || 'support@gogo.bj',
                subject: `Contact Form: Message from ${name}`,
                html: emailContent
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue even if email fails - we don't want to show error to user
        }

        // Send confirmation email to user
        try {
            await sendEmail({
                to: email,
                subject: 'Thank you for contacting GoGo',
                html: `
                    <h2>Thank you for reaching out!</h2>
                    <p>Hi ${name},</p>
                    <p>We've received your message and our team will get back to you within 24 hours.</p>
                    <p><strong>Your message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p>Best regards,<br>The GoGo Team</p>
                `
            });
        } catch (confirmError) {
            console.error('Confirmation email failed:', confirmError);
            // Continue - confirmation email is not critical
        }

        return NextResponse.json({ success: true });

    } catch (error: unknown) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
