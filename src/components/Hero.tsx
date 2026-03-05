"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeroProps {
  cmsContent?: {
    title?: { en: string; fr: string };
    subtitle?: { en: string; fr: string };
    image?: string;
  };
}

export default function Hero({ cmsContent }: HeroProps) {
  const { t } = useLang();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // TODO: Add link to CMS
  const b2bLogin = "https://gogofuelapp.on-demand-app.com/business/login";

  return (
    <header className="relative w-full flex flex-col items-center">
      {/* Hero Background & Main Content */}
      <div className="w-full h-[640px] relative bg-slate-900 overflow-hidden rounded-b-[40px] sm:rounded-b-[60px] mx-auto max-w-[1440px]">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/hero-fueling.jpg"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded && !cmsContent?.image ? "opacity-60" : "opacity-0"
              }`}
          >
            <source src="/assets/videos/hero.mp4?v=2" type="video/mp4" />
          </video>

          {/* Fallback Image / CMS Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded && !cmsContent?.image ? "opacity-0" : "opacity-60"
              }`}
          >
            <Image
              src={cmsContent?.image || "/assets/images/hero-fueling.jpg"}
              alt="Modern fuel truck on highway"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-0"></div> */}

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 hidden md:flex flex-col justify-center items-center text-center pb-32">
          {/* Desktop content if any in future */}
        </div>
      </div>

      {/* Mobile Primary CTA */}
      <div className="md:hidden w-full px-6 flex justify-center mt-8 relative z-30 mb-4">
        <div className="w-full max-w-xs space-y-3">
          <ScrollReveal delay={0.8} direction="up">
            <Link
              href="/quote"
              className="w-full flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 rounded-full font-bold shadow-lg shadow-accent/20"
            >
              {t.b2b.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Overlapping Cards Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 -mt-24 md:-mt-32 z-20 pb-16 hidden md:block">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Card A: B2B */}
          <ScrollReveal
            direction="up"
            delay={0.8}
            duration={0.8}
            className="h-full"
          >
            <div className="group bg-white rounded-2xl p-8 shadow-tech border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
              <div className="w-full md:w-1/2 h-48 rounded-xl overflow-hidden relative">
                <Image
                  src="/assets/images/b2b-team.jpg"
                  alt="GoGo B2B Solutions Team"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex-1 flex flex-col items-start text-left w-full">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {t.b2b.badge}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                  {t.b2b.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {t.b2b.subtitle}
                </p>
                <Link
                  target="_blank"
                  href={b2bLogin}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#d65a15] transition-colors shadow-lg shadow-accent/20 min-h-[44px]"
                >
                  {t.b2b.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card B: B2C */}
          <ScrollReveal
            direction="up"
            delay={1.0}
            duration={0.8}
            className="h-full"
          >
            <div className="group bg-white rounded-2xl p-8 shadow-tech border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
              <div className="w-full md:w-1/2 h-48 rounded-xl overflow-hidden relative">
                <Image
                  src="/assets/images/contact-team.jpg"
                  alt="GoGo Mobile App Usage"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex-1 flex flex-col items-start text-left w-full">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {t.heroExpanded.forIndividuals}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                  {t.app.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {t.app.subtitle.substring(0, 80)}...
                </p>
                <Link
                  href="/mobile-app"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-200 px-6 py-3 rounded-full text-sm font-bold hover:border-primary hover:bg-primary/5 transition-colors min-h-[44px]"
                >
                  <Download className="w-5 h-5" />
                  {t.heroExpanded.getApp}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </header>
  );
}
