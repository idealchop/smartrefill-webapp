
'use client';

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/landing/utils";
import { faqs } from "../constants";

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold font-headline">
                  {faqs.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                  {faqs.subtitle}
              </p>
          </AnimatedSection>
           <Accordion type="single" collapsible className="w-full">
                {faqs.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-lg hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground pt-2">
                            <p>{faq.answer.text}</p>
                            {faq.answer.points && (
                                <ul className="mt-4 space-y-2 pl-4">
                                    {faq.answer.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
      </div>
    </section>
  )
}
