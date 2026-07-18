import ContactSection from "@/components/ContactSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { readContent } from "@/lib/content";
import { readBranding } from "@/lib/branding";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, branding] = await Promise.all([
    readContent(),
    readBranding(),
  ]);

  return (
    <>
      <Navbar logoUrl={branding.logoUrl} />
      <main className="flex-1">
        <Hero hero={content.hero} />
        <Features features={content.features} />
        <Pricing plans={content.pricing} />
        <ContactSection contact={content.contact} />
      </main>
      <Footer contact={content.contact} />
    </>
  );
}
