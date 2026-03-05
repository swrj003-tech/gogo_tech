"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLang } from "@/context/LangContext";

export default function Contact() {
    const { t, lang } = useLang();

    const text = {
        en: {
            pageTitle: "Contact Us",
            pageTitleHighlight: "We're Here to Help",
            pageSubtitle: "Have questions or need assistance? Our team is ready to support you with fast, friendly service.",
            contactInfo: "Contact Information",
            contactInfoSubtitle: "Reach us through any of these channels",
            email: "Email Us",
            emailAddress: "support@gogo.bj",
            emailDescription: "Send us an email anytime",
            phone: "Call Us",
            phoneNumber: "+229 XX XX XX XX",
            phoneDescription: "Available 24/7 for support",
            location: "Visit Us",
            locationAddress: "Cotonou, Benin",
            locationDescription: "Coming soon",
            hours: "Business Hours",
            hoursTime: "Mon-Sun: 7:00 AM - 11:00 PM",
            hoursDescription: "Fuel delivery available"
        },
        fr: {
            pageTitle: "Contactez-nous",
            pageTitleHighlight: "Nous Sommes Là Pour Vous",
            pageSubtitle: "Vous avez des questions ou besoin d'aide? Notre équipe est prête à vous soutenir avec un service rapide et amical.",
            contactInfo: "Informations de Contact",
            contactInfoSubtitle: "Contactez-nous via l'un de ces canaux",
            email: "Email",
            emailAddress: "support@gogo.bj",
            emailDescription: "Envoyez-nous un email à tout moment",
            phone: "Téléphone",
            phoneNumber: "+229 XX XX XX XX",
            phoneDescription: "Disponible 24/7 pour le support",
            location: "Visitez-nous",
            locationAddress: "Cotonou, Bénin",
            locationDescription: "Bientôt disponible",
            hours: "Heures d'Ouverture",
            hoursTime: "Lun-Dim: 7h00 - 23h00",
            hoursDescription: "Livraison de carburant disponible"
        }
    };

    const content = text[lang as keyof typeof text] || text.en;

    const contactMethods = [
        // Option for phone calls
        // {
        //     icon: Phone,
        //     title: content.phone,
        //     value: content.phoneNumber,
        //     description: content.phoneDescription,
        //     href: `tel:${content.phoneNumber.replace(/\s/g, '')}`,
        //     color: "green"
        // },
        {
            icon: MapPin,
            title: content.location,
            value: content.locationAddress,
            description: content.locationDescription,
            href: "#",
            color: "orange"
        },
        {
            icon: Clock,
            title: content.hours,
            value: content.hoursTime,
            description: content.hoursDescription,
            href: "#",
            color: "purple"
        }
    ];

    return (
        <main className="min-h-screen bg-neutral-surface font-sans">
            <Navbar />

            <div className="pt-8 pb-24 px-6 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <ScrollReveal direction="left" delay={0.1}>
                        <div className="mb-12">
                            <Link
                                href="/"
                                className="inline-flex items-center text-slate-500 hover:text-primary transition-colors text-sm font-bold group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-3 group-hover:border-primary/30 transition-colors shadow-sm">
                                    <ArrowLeft className="w-4 h-4" />
                                </div>
                                {t.quote.backToHome}
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-8 pt-4">
                            <div>
                                <ScrollReveal delay={0.1}>
                                    <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-slate-900 mb-6 tracking-tight">
                                        {content.pageTitle} <span className="text-primary relative inline-block">
                                            {content.pageTitleHighlight}
                                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                                            </svg>
                                        </span>
                                    </h1>
                                </ScrollReveal>
                                <ScrollReveal delay={0.2}>
                                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                        {content.pageSubtitle}
                                    </p>
                                </ScrollReveal>
                            </div>

                            <div className="space-y-6">
                                <ScrollReveal delay={0.3}>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{content.contactInfo}</h3>
                                    <p className="text-slate-600 mb-6">{content.contactInfoSubtitle}</p>
                                </ScrollReveal>

                                <div className="space-y-4">
                                    {contactMethods.map((method, i) => {
                                        const Icon = method.icon;
                                        return (
                                            <ScrollReveal key={i} delay={0.1 * i + 0.4} direction="right">
                                                <a
                                                    href={method.href}
                                                    className={`block p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all group ${method.href === "#" ? "cursor-default" : "hover:border-primary/20"
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-12 h-12 rounded-xl bg-${method.color}-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                            <Icon className={`w-6 h-6 text-${method.color}-600`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-900 mb-1">{method.title}</h4>
                                                            <p className="text-slate-900 font-semibold mb-1">{method.value}</p>
                                                            <p className="text-sm text-slate-500">{method.description}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </ScrollReveal>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <ScrollReveal direction="up" delay={0.3} className="lg:mt-0 relative z-10">
                            <div className="absolute inset-0 bg-primary/20 translate-y-4 translate-x-4 rounded-3xl -z-10 blur-xl opacity-0 lg:opacity-100" />
                            <ContactForm />
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
