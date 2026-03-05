"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FileText, Shield, Cookie } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/context/LangContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LegalClient() {
    const { lang } = useLang();
    const searchParams = useSearchParams();
    const section = searchParams.get("section");

    // Scroll to section when URL has section parameter
    useEffect(() => {
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                // Wait for page to render, then scroll with offset for navbar
                setTimeout(() => {
                    const yOffset = -100; // Navbar height offset
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 100);
            }
        }
    }, [section]);

    // Translation content (will be moved to translations.ts)
    const content = {
        pageTitle: lang === "fr" ? "Mentions Légales" : "Legal Information",
        pageSubtitle: lang === "fr" 
            ? "Transparence et conformité : notre engagement envers vous" 
            : "Transparency and compliance: Our commitment to you",
        sections: {
            privacy: {
                id: "privacy",
                icon: Shield,
                title: lang === "fr" ? "Politique de Confidentialité" : "Privacy Policy",
                lastUpdated: lang === "fr" ? "Dernière mise à jour : Janvier 2026" : "Last updated: January 2026",
            },
            terms: {
                id: "terms",
                icon: FileText,
                title: lang === "fr" ? "Conditions d'Utilisation" : "Terms of Service",
                lastUpdated: lang === "fr" ? "Dernière mise à jour : Janvier 2026" : "Last updated: January 2026",
            },
            cookies: {
                id: "cookies",
                icon: Cookie,
                title: lang === "fr" ? "Politique des Cookies" : "Cookie Policy",
                lastUpdated: lang === "fr" ? "Dernière mise à jour : Janvier 2026" : "Last updated: January 2026",
            },
        },
    };

    const sections = [
        content.sections.privacy,
        content.sections.terms,
        content.sections.cookies,
    ];

    return (
        <>
            <Navbar />

            <main id="main-content" className="bg-white">
                {/* Hero Section */}
                <section className="bg-slate-900 text-white py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                                {content.pageTitle}
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                                {content.pageSubtitle}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Quick Navigation */}
                <section className="bg-slate-50 border-b border-slate-200 py-6 sticky top-16 z-40">
                    <div className="max-w-7xl mx-auto px-6">
                        <nav className="flex flex-wrap gap-4 justify-center">
                            {sections.map((sec) => {
                                const Icon = sec.icon;
                                return (
                                    <a
                                        key={sec.id}
                                        href={`#${sec.id}`}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium text-slate-700 hover:text-primary"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {sec.title}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-6 space-y-16">
                        {/* Privacy Policy */}
                        <article id="privacy" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900">
                                            {content.sections.privacy.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {content.sections.privacy.lastUpdated}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="prose prose-slate max-w-none">
                                <ScrollReveal delay={0.1}>
                                    <h3>{lang === "fr" ? "ARTICLE 1 – OBJET" : "ARTICLE 1 – PURPOSE"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr" 
                                            ? "La présente Politique de Confidentialité a pour objet d'informer les utilisateurs de l'application GoGo des modalités de collecte, d'utilisation, de conservation et de protection de leurs données personnelles. Elle complète les Conditions Générales d'Utilisation et les Conditions Générales de Vente applicables à l'application GoGo."
                                            : "This Privacy Policy aims to inform users of the GoGo application about the methods of collection, use, retention, and protection of their personal data. It complements the General Terms of Use and General Terms of Sale applicable to the GoGo application."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.2}>
                                    <h3>{lang === "fr" ? "ARTICLE 2 – RESPONSABLE DU TRAITEMENT" : "ARTICLE 2 – DATA CONTROLLER"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les données personnelles collectées via l'application GoGo sont traitées par la société Imperial Energy, société constituée conformément au droit en vigueur en République du Bénin. Imperial Energy agit en qualité de responsable du traitement des données personnelles."
                                            : "Personal data collected via the GoGo application is processed by Imperial Energy, a company incorporated in accordance with the laws in force in the Republic of Benin. Imperial Energy acts as the data controller for personal data."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.3}>
                                    <h3>{lang === "fr" ? "ARTICLE 3 – DONNÉES COLLECTÉES" : "ARTICLE 3 – DATA COLLECTED"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Dans le cadre de l'utilisation de l'application GoGo, les catégories de données personnelles suivantes peuvent être collectées :"
                                            : "In connection with the use of the GoGo application, the following categories of personal data may be collected:"}
                                    </p>
                                    <ul className="text-justify">
                                        <li>{lang === "fr" ? "Données d'identification telles que nom, prénom ou raison sociale." : "Identification data such as name, first name, or company name."}</li>
                                        <li>{lang === "fr" ? "Coordonnées telles que numéro de téléphone et adresse électronique." : "Contact details such as phone number and email address."}</li>
                                        <li>{lang === "fr" ? "Données de localisation nécessaires à la livraison des commandes." : "Location data necessary for order delivery."}</li>
                                        <li>{lang === "fr" ? "Données relatives aux commandes, livraisons et transactions." : "Data relating to orders, deliveries, and transactions."}</li>
                                        <li>{lang === "fr" ? "Données de paiement, traitées exclusivement par des prestataires de paiement tiers sécurisés." : "Payment data, processed exclusively by secure third-party payment providers."}</li>
                                        <li>{lang === "fr" ? "Données techniques liées à l'utilisation de l'application, notamment logs de connexion, adresse IP et type de terminal." : "Technical data related to application usage, including connection logs, IP address, and device type."}</li>
                                    </ul>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "GoGo ne collecte que les données strictement nécessaires à la fourniture de ses services."
                                            : "GoGo collects only data strictly necessary for the provision of its services."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.4}>
                                    <h3>{lang === "fr" ? "ARTICLE 4 – FINALITÉS DU TRAITEMENT" : "ARTICLE 4 – PROCESSING PURPOSES"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les données personnelles sont collectées et traitées aux fins suivantes :"
                                            : "Personal data is collected and processed for the following purposes:"}
                                    </p>
                                    <ul className="text-justify">
                                        <li>{lang === "fr" ? "Création et gestion des comptes utilisateurs." : "Creation and management of user accounts."}</li>
                                        <li>{lang === "fr" ? "Traitement et exécution des commandes de carburant." : "Processing and fulfillment of fuel orders."}</li>
                                        <li>{lang === "fr" ? "Gestion des paiements et de la facturation." : "Payment and billing management."}</li>
                                        <li>{lang === "fr" ? "Amélioration continue du service et de l'expérience utilisateur." : "Continuous improvement of service and user experience."}</li>
                                        <li>{lang === "fr" ? "Sécurité des opérations et prévention de la fraude." : "Security of operations and fraud prevention."}</li>
                                        <li>{lang === "fr" ? "Respect des obligations légales et réglementaires applicables." : "Compliance with applicable legal and regulatory obligations."}</li>
                                    </ul>
                                </ScrollReveal>

                                <ScrollReveal delay={0.5}>
                                    <h3>{lang === "fr" ? "ARTICLE 5 – BASE LÉGALE DU TRAITEMENT" : "ARTICLE 5 – LEGAL BASIS FOR PROCESSING"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les traitements de données personnelles sont fondés sur l'exécution des contrats conclus avec l'utilisateur, sur le consentement de celui-ci lorsque requis, sur le respect des obligations légales, ainsi que sur l'intérêt légitime d'Imperial Energy à assurer la sécurité et l'amélioration de ses services."
                                            : "The processing of personal data is based on the performance of contracts concluded with the user, on the user's consent when required, on compliance with legal obligations, as well as on the legitimate interest of Imperial Energy to ensure the security and improvement of its services."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.6}>
                                    <h3>{lang === "fr" ? "ARTICLE 6 – PARTAGE DES DONNÉES" : "ARTICLE 6 – DATA SHARING"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les données personnelles peuvent être partagées uniquement avec des tiers strictement nécessaires à l'exécution des services, notamment les prestataires techniques, les prestataires de paiement et les partenaires logistiques intervenant dans le cadre de la livraison. Les données peuvent également être communiquées aux autorités compétentes lorsque la loi l'exige."
                                            : "Personal data may be shared only with third parties strictly necessary for the performance of services, including technical providers, payment providers, and logistics partners involved in delivery. Data may also be disclosed to competent authorities when required by law."}
                                    </p>
                                    <p className="text-justify font-semibold">
                                        {lang === "fr"
                                            ? "Imperial Energy ne vend ni ne loue les données personnelles des utilisateurs à des tiers."
                                            : "Imperial Energy does not sell or rent users' personal data to third parties."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.7}>
                                    <h3>{lang === "fr" ? "ARTICLE 7 – TRANSFERT DE DONNÉES" : "ARTICLE 7 – DATA TRANSFER"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Certaines données personnelles peuvent être hébergées ou traitées par des prestataires situés hors du territoire béninois. Imperial Energy s'assure que ces prestataires présentent des garanties suffisantes en matière de protection et de sécurité des données personnelles."
                                            : "Some personal data may be hosted or processed by service providers located outside Benin territory. Imperial Energy ensures that these providers offer sufficient guarantees regarding the protection and security of personal data."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.8}>
                                    <h3>{lang === "fr" ? "ARTICLE 8 – DURÉE DE CONSERVATION" : "ARTICLE 8 – RETENTION PERIOD"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et conformément aux obligations légales, fiscales et réglementaires applicables."
                                            : "Personal data is retained only for the period necessary for the purposes for which it was collected, and in accordance with applicable legal, tax, and regulatory obligations."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.9}>
                                    <h3>{lang === "fr" ? "ARTICLE 9 – SÉCURITÉ DES DONNÉES" : "ARTICLE 9 – DATA SECURITY"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Imperial Energy met en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données personnelles contre tout accès non autorisé, perte, altération ou divulgation. Toutefois, aucune transmission ou stockage électronique ne peut être garanti comme totalement sécurisé."
                                            : "Imperial Energy implements reasonable technical and organizational measures to protect personal data against unauthorized access, loss, alteration, or disclosure. However, no electronic transmission or storage can be guaranteed as completely secure."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={1.0}>
                                    <h3>{lang === "fr" ? "ARTICLE 10 – DROITS DES UTILISATEURS" : "ARTICLE 10 – USER RIGHTS"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "L'utilisateur dispose, dans les conditions prévues par la réglementation applicable, d'un droit d'accès à ses données personnelles, d'un droit de rectification, d'un droit de suppression sous réserve des obligations légales, ainsi que d'un droit d'opposition pour motifs légitimes. Toute demande relative à l'exercice de ces droits peut être adressée via les coordonnées indiquées dans l'application GoGo."
                                            : "The user has, under the conditions provided by applicable regulations, a right of access to their personal data, a right of rectification, a right of deletion subject to legal obligations, as well as a right to object for legitimate reasons. Any request relating to the exercise of these rights may be sent via the contact details indicated in the GoGo application."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={1.1}>
                                    <h3>{lang === "fr" ? "ARTICLE 11 – COOKIES ET TECHNOLOGIES SIMILAIRES" : "ARTICLE 11 – COOKIES AND SIMILAR TECHNOLOGIES"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "L'application GoGo peut utiliser des technologies similaires aux cookies afin d'améliorer son fonctionnement, ses performances et la sécurité du service. Ces technologies ne permettent pas l'identification directe de l'utilisateur sans son consentement."
                                            : "The GoGo application may use technologies similar to cookies to improve its operation, performance, and service security. These technologies do not allow direct identification of the user without their consent."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={1.2}>
                                    <h3>{lang === "fr" ? "ARTICLE 12 – MODIFICATION DE LA POLITIQUE" : "ARTICLE 12 – POLICY MODIFICATION"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Imperial Energy se réserve le droit de modifier la présente Politique de Confidentialité à tout moment. La version applicable est celle accessible dans l'application à la date d'utilisation."
                                            : "Imperial Energy reserves the right to modify this Privacy Policy at any time. The applicable version is the one accessible in the application on the date of use."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={1.3}>
                                    <h3>{lang === "fr" ? "ARTICLE 13 – DROIT APPLICABLE" : "ARTICLE 13 – APPLICABLE LAW"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "La présente Politique de Confidentialité est régie par le droit béninois et les textes applicables de l'OHADA."
                                            : "This Privacy Policy is governed by Beninese law and applicable OHADA texts."}
                                    </p>
                                </ScrollReveal>
                            </div>
                        </article>

                        {/* Terms of Service */}
                        <article id="terms" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900">
                                            {content.sections.terms.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {content.sections.terms.lastUpdated}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="prose prose-slate max-w-none">
                                <ScrollReveal delay={0.1}>
                                    <h3>{lang === "fr" ? "1. Acceptation des Conditions" : "1. Acceptance of Terms"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "En utilisant les services GoGo, vous acceptez ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services."
                                            : "By using GoGo services, you agree to these terms of service. If you do not agree to these terms, please do not use our services."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.2}>
                                    <h3>{lang === "fr" ? "2. Services Fournis" : "2. Services Provided"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "GoGo fournit des services de livraison de carburant à la demande pour les particuliers et les entreprises au Bénin. Nos services incluent la livraison de diesel et d'essence Super, le suivi en temps réel, et le paiement sécurisé."
                                            : "GoGo provides on-demand fuel delivery services for individuals and businesses in Benin. Our services include delivery of diesel and Super gasoline, real-time tracking, and secure payment."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.3}>
                                    <h3>{lang === "fr" ? "3. Obligations de l'Utilisateur" : "3. User Obligations"}</h3>
                                    <p className="text-justify">{lang === "fr" ? "Vous vous engagez à :" : "You agree to:"}</p>
                                    <ul className="text-justify">
                                        <li>{lang === "fr" ? "Fournir des informations exactes et à jour" : "Provide accurate and up-to-date information"}</li>
                                        <li>{lang === "fr" ? "Être présent à l'adresse de livraison indiquée" : "Be present at the specified delivery address"}</li>
                                        <li>{lang === "fr" ? "Payer le montant total de la commande" : "Pay the full amount for your order"}</li>
                                        <li>{lang === "fr" ? "Respecter les normes de sécurité lors de la livraison" : "Follow safety standards during delivery"}</li>
                                        <li>{lang === "fr" ? "Ne pas utiliser les services à des fins illégales" : "Not use services for illegal purposes"}</li>
                                    </ul>
                                </ScrollReveal>

                                <ScrollReveal delay={0.4}>
                                    <h3>{lang === "fr" ? "4. Prix et Paiement" : "4. Pricing and Payment"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les prix sont affichés dans l'application et peuvent varier selon les conditions du marché. Le paiement est dû au moment de la commande. Nous acceptons les cartes bancaires, le paiement mobile, et d'autres méthodes approuvées."
                                            : "Prices are displayed in the app and may vary based on market conditions. Payment is due at the time of order. We accept credit cards, mobile payment, and other approved methods."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.5}>
                                    <h3>{lang === "fr" ? "5. Annulation et Remboursement" : "5. Cancellation and Refund"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Vous pouvez annuler votre commande jusqu'à 15 minutes après la confirmation. Les annulations tardives peuvent entraîner des frais. Les remboursements sont traités dans un délai de 5 à 7 jours ouvrables."
                                            : "You may cancel your order up to 15 minutes after confirmation. Late cancellations may incur fees. Refunds are processed within 5-7 business days."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.6}>
                                    <h3>{lang === "fr" ? "6. Limitation de Responsabilité" : "6. Limitation of Liability"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "GoGo n'est pas responsable des dommages indirects, accessoires ou consécutifs résultant de l'utilisation de nos services. Notre responsabilité est limitée au montant payé pour la commande concernée."
                                            : "GoGo is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the relevant order."}
                                    </p>
                                </ScrollReveal>
                            </div>
                        </article>

                        {/* Cookie Policy */}
                        <article id="cookies" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Cookie className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900">
                                            {content.sections.cookies.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {content.sections.cookies.lastUpdated}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="prose prose-slate max-w-none">
                                <ScrollReveal delay={0.1}>
                                    <h3>{lang === "fr" ? "1. Qu'est-ce qu'un Cookie ?" : "1. What is a Cookie?"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Les cookies sont de petits fichiers texte stockés sur votre appareil lors de votre visite sur notre site web ou application. Ils nous aident à améliorer votre expérience et à analyser l'utilisation de nos services."
                                            : "Cookies are small text files stored on your device when you visit our website or app. They help us improve your experience and analyze how our services are used."}
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.2}>
                                    <h3>{lang === "fr" ? "2. Types de Cookies Utilisés" : "2. Types of Cookies We Use"}</h3>
                                    <p className="text-justify"><strong>{lang === "fr" ? "Cookies Essentiels" : "Essential Cookies"}:</strong> {lang === "fr" ? "Nécessaires au fonctionnement du site" : "Required for site functionality"}</p>
                                    <p className="text-justify"><strong>{lang === "fr" ? "Cookies de Performance" : "Performance Cookies"}:</strong> {lang === "fr" ? "Nous aident à améliorer nos services" : "Help us improve our services"}</p>
                                    <p className="text-justify"><strong>{lang === "fr" ? "Cookies Fonctionnels" : "Functional Cookies"}:</strong> {lang === "fr" ? "Mémorisent vos préférences" : "Remember your preferences"}</p>
                                    <p className="text-justify"><strong>{lang === "fr" ? "Cookies Marketing" : "Marketing Cookies"}:</strong> {lang === "fr" ? "Utilisés pour la publicité ciblée" : "Used for targeted advertising"}</p>
                                </ScrollReveal>

                                <ScrollReveal delay={0.3}>
                                    <h3>{lang === "fr" ? "3. Cookies Tiers" : "3. Third-Party Cookies"}</h3>
                                    <p className="text-justify">{lang === "fr" ? "Nous utilisons des cookies tiers pour :" : "We use third-party cookies for:"}</p>
                                    <ul className="text-justify">
                                        <li>Google Analytics - {lang === "fr" ? "Analyse du trafic" : "Traffic analysis"}</li>
                                        <li>Facebook Pixel - {lang === "fr" ? "Publicité ciblée" : "Targeted advertising"}</li>
                                        <li>LinkedIn Insight Tag - {lang === "fr" ? "Marketing B2B" : "B2B marketing"}</li>
                                    </ul>
                                </ScrollReveal>

                                <ScrollReveal delay={0.4}>
                                    <h3>{lang === "fr" ? "4. Gestion des Cookies" : "4. Managing Cookies"}</h3>
                                    <p className="text-justify">
                                        {lang === "fr"
                                            ? "Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur. Notez que désactiver certains cookies peut affecter la fonctionnalité de notre site."
                                            : "You can manage your cookie preferences through your browser settings. Note that disabling certain cookies may affect site functionality."}
                                    </p>
                                </ScrollReveal>
                            </div>
                        </article>

                        {/* Contact Section */}
                        <ScrollReveal>
                            <div className="bg-slate-50 rounded-2xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    {lang === "fr" ? "Des Questions ?" : "Questions?"}
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    {lang === "fr"
                                        ? "Si vous avez des questions concernant nos politiques, n'hésitez pas à nous contacter."
                                        : "If you have questions about our policies, feel free to contact us."}
                                </p>
                                <Link
                                    href="/quote"
                                    className="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-accent transition-colors"
                                >
                                    {lang === "fr" ? "Nous Contacter" : "Contact Us"}
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
