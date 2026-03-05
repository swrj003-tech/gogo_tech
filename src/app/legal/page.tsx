import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms-server";

export async function generateMetadata(): Promise<Metadata> {
    const seo = getPageSEO("legal");

    return {
        title: seo.title?.en || "Legal - Privacy, Terms & Cookies",
        description: seo.description?.en || "Our privacy policy, terms of service, and cookie policy.",
        openGraph: {
            title: seo.title?.en,
            description: seo.description?.en,
        },
    };
}

export {default} from "./LegalClient";
