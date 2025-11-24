
'use client';

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/landing/utils";
import { features } from "../constants";

export function FeaturesSection() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const handleFeatureClick = (index: number) => {
    setActiveFeatureIndex(index);
  };

  return (
    <section id="features" className="py-20 md:pt-32 overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="relative md:order-2 h-96 md:h-full md:min-h-[600px] w-full">
                     <AnimatePresence mode="wait">
                         <motion.div
                            key={activeFeatureIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0"
                         >
                             <Image 
                                src={features.interactiveFeatures[activeFeatureIndex].image} 
                                alt={features.interactiveFeatures[activeFeatureIndex].title} 
                                fill 
                                className="object-contain" 
                                sizes="(min-width: 768px) 50vw, 100vw"
                             />
                         </motion.div>
                     </AnimatePresence>
                 </div>
                 <div className="w-full md:order-1">
                    <AnimatedSection className="mb-8 md:mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight max-w-xl">
                            {features.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-xl">{features.subtitle}</p>
                    </AnimatedSection>
                    <div className="space-y-2">
                        {features.interactiveFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <AnimatedSection key={index} stagger={index * 100}>
                                    <div
                                        className={cn(
                                            "p-6 rounded-lg cursor-pointer transition-all duration-300 border-2",
                                            activeFeatureIndex === index 
                                                ? 'border-primary/50 bg-white dark:bg-card shadow-2xl shadow-primary/10' 
                                                : 'border-transparent hover:shadow-xl'
                                        )}
                                        onClick={() => handleFeatureClick(index)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Icon className="h-8 w-8 text-primary" />
                                            <h3 className="text-lg md:text-xl font-bold font-headline">{feature.title}</h3>
                                        </div>
                                        {activeFeatureIndex === index && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                                className="pl-12 mt-2 overflow-hidden"
                                            >
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
