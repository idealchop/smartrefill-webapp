
'use client';

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, HeartHandshake, Briefcase, GitBranch, Terminal, Users, AppWindow, ArrowDown, Quote, LayoutDashboard, UserCheck, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { InteractiveBackground } from "@/components/landing/interactive-background";
import { LandingHeader } from "@/components/landing/landing-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Custom hook for Intersection Observer
function useOnScreen(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false); 
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
}


const AnimatedSection = ({ children, className, stagger = 0 }: { children: React.ReactNode, className?: string, stagger?: number }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-out opacity-0 transform translate-y-4",
                isVisible && "opacity-100 translate-y-0",
                className
            )}
             style={{ transitionDelay: `${stagger}ms` }}
        >
            {children}
        </div>
    )
}

const interactiveFeatures = [
    {
        title: "Smart Platform — Built for Water Refilling Stations",
        description: "Run your entire refilling station on one easy platform. Track sales, deliveries, inventory, team, and customer engagement — all in real time. With AI tools designed for the refilling industry, you’ll operate smoother, faster, and more profitably.",
        icon: LayoutDashboard,
        image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-operations03.png?alt=media&token=739804dd-4b00-41b2-85a1-a90b542e3e88"
    },
    {
        title: "Partner in Growth & Compliance",
        description: "We’ll guide you every step of the way. From pen-and-paper to digital, we make the shift simple — at no extra cost. Plus, we help you grow sales, reach more customers, and stay compliant so your business runs stronger and safer for the community.",
        icon: HeartHandshake,
        image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-platform.png?alt=media&token=9ac95656-d4c8-4ead-a236-f23702ddda48"
    },
    {
        title: "Customer Growth, Built In",
        description: "Acquire new customers directly through the River Mobile App and Smart Refill Business — automatically added to your Station's Platform. From new orders to delivery, everything flows in one streamlined system, so you can serve more customers without extra work.",
        icon: UserCheck,
        image: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-refilling-stations-operationS_02.png?alt=media&token=9e2f529d-2254-4601-bb7f-60a39f02919c"
    }
];

const faqs = [
    {
        question: "What is Smart Refill?",
        answer: {
            text: "Smart Refill is the Philippines’ first technology platform built to empower water refilling station owners. It helps you manage orders, deliveries, inventory, and customer communication—all in one easy-to-use dashboard."
        }
    },
    {
        question: "How can Smart Refill help my business?",
        answer: {
            text: "With Smart Refill, you can:",
            points: [
                "Automate customer reminders and orders",
                "Track deliveries in real time",
                "Manage inventory and pricing digitally",
                "Generate reports to understand business performance",
                "Save time by reducing manual processes",
            ]
        }
    },
    {
        question: "Do I need to be tech-savvy to use Smart Refill?",
        answer: {
            text: "Not at all! Smart Refill is designed for water station owners—even if you have little to no technical background. If you know how to use a smartphone or Facebook, you can easily use Smart Refill."
        }
    },
    {
        question: "How does Smart Refill keep customer data safe?",
        answer: {
            text: "We strictly comply with the Data Privacy Act of 2012 (RA 10173). All customer information such as names, phone numbers, and addresses are encrypted and securely stored. We only collect information that is necessary to complete orders, deliveries, and reminders."
        }
    },
    {
        question: "Can Smart Refill work offline?",
        answer: {
            text: "Yes! Our system uses offline caching so you can still record orders and manage your data even without internet. Once you’re back online, all updates automatically sync to the cloud."
        }
    },
    {
        question: "Do customers need to install an app?",
        answer: {
            text: "No need! Customers can order through SMS, Messenger, or directly from your team. Smart Refill digitizes these requests and keeps everything in one place for you."
        }
    },
    {
        question: "What kind of support do you provide?",
        answer: {
            text: "We’re with you every step of the way! Our support includes:",
            points: [
                "24/7 chat support for quick help anytime",
                "Virtual tutorials to guide you through the app at your own pace",
                "Onsite training (by request) for non-techy users and early app adopters",
                "Step-by-step onboarding so your whole team feels confident using Smart Refill",
                "With River AI inside the platform, you’ll also have a digital companion ready to assist you in real time."
            ]
        }
    },
    {
        question: "How can Smart Refill boost my sales?",
        answer: {
            text: "Smart Refill helps you keep repeat customers, gain new ones through River mobile and our partners, and serve more orders faster with automated tools. No extra onboarding needed—once you become an accredited Smart Refill partner, these features are automatically activated in your app."
        }
    }
];

const testimonials = [
  {
    quote: "Dati, kailangan ko pang mag-follow up sa supplier tuwing nauubos ang tubig. Ngayon, automated na — dumadating na lang si Smart Refill on schedule.",
    name: "Business Owner",
    station: "BPO Company",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-1.jpg?alt=media&token=c19825b7-7e61-4648-9f34-896a77517a26"
  },
  {
    quote: "Ang galing! Hindi na ako nag-aalala sa tubig ng staff namin — consistent, malinis, at laging on time.",
    name: "Office Manager",
    station: "Tech Startup",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-2.jpg?alt=media&token=27339d84-f726-444a-a035-c331a99908a8"
  },
  {
    quote: "Mas madali na ang monitoring ng consumption namin. Kita ko agad kung ilang gallons na nagamit sa dashboard.",
    name: "Admin Head",
    station: "Manufacturing Plant",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-3.jpg?alt=media&token=1c6b5413-524a-4a69-826a-8d132646c879"
  },
  {
    quote: "Nabawasan pa gastos namin dahil wala nang double delivery at manual recording. Lahat digital na sa Smart Refill.",
    name: "Clinic Owner",
    station: "Healthcare Facility",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-4.jpg?alt=media&token=d1f5bf9f-6893-4375-9c59-1d55e09f56a"
  },
  {
    quote: "Sulit ang subscription — predictable ang billing, walang hidden charges, at may support pa kung may concern.",
    name: "Restaurant Chain Owner",
    station: "F&B Group",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-5.jpg?alt=media&token=123a6331-b883-4c0b-939e-2e4530869766"
  },
  {
    quote: "Smart Refill helped us focus on our business instead of managing deliveries — hassle-free, reliable, and eco-friendly.",
    name: "HR Manager",
    station: "Corporate Office",
    avatar: "https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Ffilipino-6.jpg?alt=media&token=e9e61427-4a74-4b52-b884-a15d7e48b888"
  }
];

export default function LandingPage() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
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
  
  const handleFeatureClick = (index: number) => {
    setActiveFeatureIndex(index);
  };
  
  const scrollToSecondSection = () => {
    document.getElementById('second-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-foreground font-body">
      <LandingHeader />

      <main>
        <section ref={heroRef} className={cn("relative min-h-screen flex items-center pt-20 pb-28 sm:pt-0 sm:pb-20 scroll-fade-in", isHeroVisible && "visible")}>
            <InteractiveBackground />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="text-center lg:text-left">
                            <div className={cn("mb-6 justify-center lg:justify-start transition-opacity duration-500 flex items-center gap-2", isScrolled ? "opacity-0" : "opacity-100")}>
                                <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={32} height={32} />
                                <h1 className="text-2xl font-headline font-bold text-foreground">
                                    Smart Refill
                                </h1>
                            </div>
                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tighter max-w-xl mx-auto lg:mx-0">
                                Automate Water Refills to Drive Business Growth
                            </h1>
                            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground">
                                No manual orders. No supply gaps. Just automated, continuous water refills for every business.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <HeaderLoginDialog defaultToLogin={false}>
                                        <Button size="lg" className="w-full sm:w-auto text-xl h-16 px-12 btn-press shadow-lg shadow-primary/30">
                                            Join Smart Refill
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </HeaderLoginDialog>
                                    <p className="text-xs text-muted-foreground">Start your digital journey for free. No payment needed.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-64 sm:h-80 lg:absolute lg:right-0 lg:bottom-0 lg:w-[58%] lg:h-full mt-12 lg:mt-0">
                            <div className="w-full h-full transform transition-transform duration-1000 ease-out opacity-0 translate-x-12 translate-y-12 data-[visible=true]:opacity-100 data-[visible=true]:translate-x-0 data-[visible=true]:translate-y-0" data-visible={isHeroVisible}>
                                <Image 
                                    src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2Fwater-stations-main-dashboard.png?alt=media&token=397a8653-f6ba-4fc6-b2c1-2a86e5c53ab8"
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

        <section id="second-section" className="py-20 my-10">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold font-headline p-4 transition-all">
                       The Philippines’ first AI-driven solution that automates water refills for every business
                    </h2>
                     <p className="text-lg text-muted-foreground mt-4">Your water refills — automatic and safe. No re-order messages needed.</p>
                </AnimatedSection>

                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <HeaderLoginDialog defaultToLogin={false}>
                        <Card className="text-center p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <HeartHandshake className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold">I’m a Water Refilling Station</h3>
                            <p className="text-muted-foreground mb-4">(Manage your station digitally and grow sales)</p>
                            <Button variant="link" className="group-hover:text-primary">
                                Create an Account <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Card>
                    </HeaderLoginDialog>
                    <Link href="/business">
                        <Card className="text-center p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group">
                             <Briefcase className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold">I’m a Business or Office</h3>
                            <p className="text-muted-foreground mb-4">(Get safe, automated water refills for your workplace)</p>
                             <Button variant="link" className="group-hover:text-primary">
                                choose a plan <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Card>
                    </Link>
                </div>
            </div>
        </section>

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
                                    src={interactiveFeatures[activeFeatureIndex].image} 
                                    alt={interactiveFeatures[activeFeatureIndex].title} 
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
                                The Future of Water Refilling,
                                In Your Hands
                            </h2>
                            <p className="text-lg text-muted-foreground mt-4 max-w-xl">Designed to make refilling stations smarter, faster, and future-ready.</p>
                        </AnimatedSection>
                        <div className="space-y-2">
                            {interactiveFeatures.map((feature, index) => {
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

        <section id="faq" className="py-20">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
              <AnimatedSection className="text-center mb-16">
                  <h2 className="text-3xl font-bold font-headline">
                      Frequently Asked Questions
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                      Have questions? We've got answers. If you need more help, feel free to contact us.
                  </p>
              </AnimatedSection>
               <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
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

        <section className="py-24 bg-background">
            <AnimatedSection className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-headline text-foreground">
                        One app to simplify operations and multiply your sales.
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join the growing community of smart water station owners in the Philippines.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <HeaderLoginDialog defaultToLogin={false}>
                            <Button size="lg" className="h-12 text-base btn-press">
                                Create Account
                            </Button>
                        </HeaderLoginDialog>
                    </div>
                </div>
            </AnimatedSection>
        </section>
      </main>
      
      <div className="w-3/4 h-px bg-border mx-auto" />
      <footer className="bg-background text-foreground">
          <div className="container mx-auto py-12 px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                          <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={32} height={32} />
                          <h1 className="text-2xl font-headline font-bold text-foreground">
                              Smart Refill
                          </h1>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        © 2025 Smart Refill — Empowering Water Stations.
                      </p>
                  </div>
                  <div className="flex justify-center gap-6">
                      <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
                      <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help</Link>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                  </div>
              </div>
          </div>
        </footer>
    </div>
  );
}
