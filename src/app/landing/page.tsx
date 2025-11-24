
'use client';

import * as React from "react";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { SecondSection } from "@/components/landing/sections/second-section";
import { TestimonialsSection } from "@/components/landing/sections/testimonials-section";
import { FeaturesSection } from "@/components/landing/sections/features-section";
import { FaqSection } from "@/components/landing/sections/faq-section";
import { SimplifySection } from "@/components/landing/sections/simplify-section";
import { FooterSection } from "@/components/landing/sections/footer-section";

export default function LandingPage() {

  return (
    <div className="bg-background">
        <HeroSection />
        <SecondSection />
        <TestimonialsSection />
        <FeaturesSection />
        <FaqSection />
        <SimplifySection />
        <FooterSection />
    </div>
  );
}
