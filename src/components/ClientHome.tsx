"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";

// Dynamic Imports with loading skeletons for critical path optimization
// const TrustStrip = dynamic(() => import("@/components/TrustStrip"), {
//     loading: () => <div className="h-32 bg-slate-50 opacity-10 animate-pulse" />
// });
const B2BSolutions = dynamic(() => import("@/components/B2BSolutions"), {
    loading: () => <div className="h-[600px] bg-white" />
});
const AppSection = dynamic(() => import("@/components/AppSection"), {
    loading: () => <div className="h-[500px] bg-slate-50" />
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
    loading: () => <div className="h-[400px] bg-white" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
    ssr: true // Footer is essential for SEO links, so we keep SSR but code-split
});

interface HomeContent {
    hero: {
        title: { en: string; fr: string };
        subtitle: { en: string; fr: string };
        image: string;
    };
}

export default function ClientHome({ content }: { content: HomeContent }) {
    // Check if preloader has been shown in this session - initialize state from sessionStorage
    const [shouldShowPreloader] = useState(() => {
        if (typeof window !== 'undefined') {
            const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
            if (!hasSeenPreloader) {
                // Mark as seen for this session
                sessionStorage.setItem('hasSeenPreloader', 'true');
                return true;
            }
        }
        return false;
    });

    const [isLoading, setIsLoading] = useState(shouldShowPreloader);

    return (
        <>
            <AnimatePresence mode="wait">
                {shouldShowPreloader && isLoading && (
                    <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {(!shouldShowPreloader || !isLoading) && (
                <main className="min-h-screen bg-white text-slate-900">
                    <Navbar />
                    <Hero cmsContent={content.hero} />
                    {/* <TrustStrip /> Disabled to be enabled later */}
                    <B2BSolutions />
                    <AppSection />
                    <FAQ />
                    <Footer />
                </main>
            )}
        </>
    );
}
