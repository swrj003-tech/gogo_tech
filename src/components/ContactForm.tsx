"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2, CheckCircle2, Mail, User, MessageSquare, Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function ContactForm() {
    const { lang } = useLang();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const t = {
        en: {
            title: "Get in Touch",
            subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
            name: "Full Name",
            namePlaceholder: "John Doe",
            email: "Email Address",
            emailPlaceholder: "john@example.com",
            phone: "Phone Number",
            phonePlaceholder: "+229 XX XX XX XX",
            phoneOptional: "(Optional)",
            message: "Your Message",
            messagePlaceholder: "Tell us how we can help you...",
            submit: "Send Message",
            sending: "Sending...",
            successTitle: "Message Sent!",
            successMessage: "Thank you for contacting us. We'll get back to you within 24 hours.",
            sendAnother: "Send another message",
            errorMessage: "Something went wrong. Please try again."
        },
        fr: {
            title: "Contactez-nous",
            subtitle: "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.",
            name: "Nom Complet",
            namePlaceholder: "Jean Dupont",
            email: "Adresse Email",
            emailPlaceholder: "jean@exemple.com",
            phone: "Numéro de Téléphone",
            phonePlaceholder: "+229 XX XX XX XX",
            phoneOptional: "(Optionnel)",
            message: "Votre Message",
            messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
            submit: "Envoyer le Message",
            sending: "Envoi en cours...",
            successTitle: "Message Envoyé!",
            successMessage: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.",
            sendAnother: "Envoyer un autre message",
            errorMessage: "Une erreur s'est produite. Veuillez réessayer."
        }
    };

    const text = t[lang as keyof typeof t] || t.en;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to send message");

            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            setError(text.errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setSuccess(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    if (success) {
        return (
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{text.successTitle}</h3>
                        <p className="text-slate-600">{text.successMessage}</p>
                    </div>
                    <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    >
                        <Send className="w-4 h-4" />
                        {text.sendAnother}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{text.title}</h2>
                <p className="text-slate-600">{text.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        {text.name} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={text.namePlaceholder}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        {text.email} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={text.emailPlaceholder}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
                        />
                    </div>
                </div>

                {/* Phone Field */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                        {text.phone} <span className="text-slate-400 font-normal">{text.phoneOptional}</span>
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={text.phonePlaceholder}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
                        />
                    </div>
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        {text.message} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder={text.messagePlaceholder}
                            className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 resize-none"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent/90 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {text.sending}
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            {text.submit}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
