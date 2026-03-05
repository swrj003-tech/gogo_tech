'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#FED75F]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#ED6A21]/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block group">
                        <h1 className="text-4xl font-bold italic tracking-tighter text-white mb-2">
                            GOGO
                        </h1>
                        <div className="h-1 w-12 bg-[#FED75F] mx-auto rounded-full group-hover:w-24 transition-all duration-300" />
                    </Link>
                    <p className="mt-4 text-neutral-400 font-medium">Admin & CMS Portal</p>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <Authenticator
                        hideSignUp={true}
                        components={{
                            Header: () => (
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-white">Secure Access</h2>
                                </div>
                            )
                        }}
                    >
                        {() => (
                            <LoginRedirect />
                        )}
                    </Authenticator>
                </div>
            </div>
        </div>
    );
}

function LoginRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin');
        router.refresh();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#FED75F] mb-4" />
            <p className="text-white">Redirecting to Dashboard...</p>
        </div>
    );
}
