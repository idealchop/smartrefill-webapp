
'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";
import { motion } from "framer-motion";
import { useOnScreen, AnimatedSection } from "@/components/landing/utils";
import { hero, footer } from "../constants";

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroRef, isHeroVisible] = useOnScreen({ threshold: 0.5 });
  const [showScrollIcon, setShowScrollIcon] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const timer = setTimeout(() => {
      setShowScrollIcon(true);
    }, 5000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  const scrollToSecondSection = () => {
    document.getElementById('second-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={cn("relative min-h-screen flex items-center pt-20 pb-28 sm:pt-0 sm:pb-20 scroll-fade-in", isHeroVisible && "visible")}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="text-center lg:text-left">
                        <div className={cn("mb-6 justify-center lg:justify-start transition-opacity duration-500 flex items-center gap-2", isScrolled ? "opacity-0" : "opacity-100")}>
                            <Image src={hero.logo} alt="Smart Refill Logo" width={32} height={32} />
                            <h1 className="text-2xl font-headline font-bold text-foreground">
                                {footer.brand}
                            </h1>
                        </div>
                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tighter max-w-xl mx-auto lg:mx-0">
                            {hero.title}
                        </h1>
                        <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground">
                            {hero.subtitle}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <HeaderLoginDialog defaultToLogin={false}>
                                    <Button size="lg" className="w-full sm:w-auto text-xl h-16 px-12 btn-press shadow-lg shadow-primary/30">
                                        {hero.button}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </HeaderLoginDialog>
                                <p className="text-xs text-muted-foreground">{hero.underButton}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-64 sm:h-80 lg:absolute lg:right-0 lg:bottom-0 lg:w-[58%] lg:h-full mt-12 lg:mt-0">
                        <div className="w-full h-full transform transition-transform duration-1000 ease-out opacity-0 translate-x-12 translate-y-12 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0 data-[visible=true]:translate-y-0" data-visible={isHeroVisible}>
                            <Image 
                                src={hero.mainImage}
                                alt="Smart Refill Dashboard on multiple devices"
                                fill
                                priority
                                className="object-contain object-right-bottom"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
         <button
            onClick={scrollToSecondSection}
            className={cn(
                "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500",
                (isScrolled || !showScrollIcon) ? "opacity-0" : "opacity-100"
            )}
            aria-label="Scroll down"
        >
            <div className="w-8 h-12 rounded-full border-2 border-foreground flex items-center justify-center p-2 flex-col">
                <ArrowDown className="h-6 w-6 text-foreground" />
            </div>
        </button>
    </section>
  )
}
