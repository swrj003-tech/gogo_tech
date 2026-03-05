import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("contact");

    return {
        title: seo.title?.en || "Contact Us",
        description: seo.description?.en || "Get in touch with GoGo. We're here to help with any questions or support you need.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export { default } from "./Contact";
