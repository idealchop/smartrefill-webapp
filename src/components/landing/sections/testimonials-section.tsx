
'use client';

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSection } from "@/components/landing/utils";
import { testimonials } from "../constants";

export function TestimonialsSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              {testimonials.map((testimonial, index) => (
                  <AnimatedSection key={index} stagger={index * 100}>
                       <Card className="h-full flex flex-col bg-muted/30">
                          <CardContent className="p-6 flex-grow">
                              <Quote className="w-8 h-8 text-primary mb-4" />
                              <p className="text-lg font-medium">“{testimonial.quote}”</p>
                          </CardContent>
                           <CardFooter className="p-6 pt-4 border-t">
                              <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <p className="font-semibold">{testimonial.name}</p>
                                      <p className="text-sm text-muted-foreground">{testimonial.station}</p>
                                  </div>
                              </div>
                          </CardFooter>
                      </Card>
                  </AnimatedSection>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
