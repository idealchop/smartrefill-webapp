
'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, HeartHandshake, Briefcase } from "lucide-react";
import Link from "next/link";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";
import { AnimatedSection } from "@/components/landing/utils";
import { secondSection } from "../constants";

export function SecondSection() {
  return (
    <section id="second-section" className="py-20 my-10">
        <div className="container mx-auto px-4">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold font-headline p-4 transition-all">
                   {secondSection.title}
                </h2>
                 <p className="text-lg text-muted-foreground mt-4">{secondSection.subtitle}</p>
            </AnimatedSection>

             <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <HeaderLoginDialog defaultToLogin={false}>
                    <Card className="text-center p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <HeartHandshake className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold">{secondSection.station.title}</h3>
                        <p className="text-muted-foreground mb-4">{secondSection.station.subtitle}</p>
                        <Button variant="link" className="group-hover:text-primary">
                            {secondSection.station.button} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Card>
                </HeaderLoginDialog>
                <Link href="/business">
                    <Card className="text-center p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                         <Briefcase className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-bold">{secondSection.business.title}</h3>
                        <p className="text-muted-foreground mb-4">{secondSection.business.subtitle}</p>
                         <Button variant="link" className="group-hover:text-primary">
                            {secondSection.business.button} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Card>
                </Link>
            </div>
        </div>
    </section>
  )
}
