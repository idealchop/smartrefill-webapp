
'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";
import { AnimatedSection } from "@/components/landing/utils";
import { simplify } from "../constants";

export function SimplifySection() {
  return (
    <section className="py-24 bg-background">
        <AnimatedSection className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-foreground">
                    {simplify.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {simplify.subtitle}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <HeaderLoginDialog defaultToLogin={false}>
                        <Button size="lg" className="h-12 text-base btn-press">
                            {simplify.button}
                        </Button>
                    </HeaderLoginDialog>
                </div>
            </div>
        </AnimatedSection>
    </section>
  )
}
