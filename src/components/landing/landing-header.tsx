
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplets, GitBranch, Terminal, Users, AppWindow, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { LoginDialog } from "@/components/auth/login-dialog";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";

const appFeatures = [
    {
        icon: <AppWindow className="h-4 w-4" />,
        title: "Operational Platform",
        description: "Your all-in-one dashboard to automate operations — from orders, deliveries, and sales, to inventory, staff, and maintenance."
    },
    {
        icon: <GitBranch className="h-4 w-4" />,
        title: "Acquire Customers",
        description: "Acquire new customers through Smart Refill Business and the River Mobile App."
    },
    {
        icon: <Terminal className="h-4 w-4" />,
        title: "Offline-Ready App",
        description: "No internet? No problem. Smart Refill keeps running and automatically syncs when you're back online."
    },
    {
        icon: <Users className="h-4 w-4" />,
        title: "Roles & Permissions",
        description: "Give your team the right access — whether admin, cashier, or delivery staff — so they have the tools they need, and nothing they don’t."
    }
];

const FeatureListItem = ({ icon, title, children }: { icon: React.ReactNode, title: React.ReactNode, children: React.ReactNode }) => {
    return (
        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors">
            <div className="flex items-start gap-3">
                 <div className="text-primary mt-0.5">{icon}</div>
                <div>
                    <span className="text-sm font-medium leading-none flex items-center gap-2">{title}</span>
                    <p className="text-sm leading-snug text-muted-foreground mt-1">
                        {children}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    Omit<React.ComponentPropsWithoutRef<"a">, "title"> & { title: React.ReactNode }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:shadow-md focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function LandingHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
            scrolled ? "translate-y-0 opacity-100 bg-background/80 backdrop-blur-sm shadow-md" : "-translate-y-full opacity-0"
        )}>
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
                <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={32} height={32} />
                <h1 className="text-2xl font-headline font-bold text-foreground">
                    Smart Refill
                </h1>
            </Link>
            <div className="flex items-center gap-4">
                <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/about" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                About Us
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="p-6 md:w-[500px] lg:w-[600px]">
                                <h3 className="font-headline text-lg font-semibold text-primary">Our Products</h3>
                                <p className="text-sm text-muted-foreground mt-1">Solutions for every part of the water refilling ecosystem.</p>
                                <ul className="grid w-full gap-3 mt-4">
                                     <ListItem href="/water-refilling-stations" title={<>Operations Platform <Badge>Smart Refill</Badge></>}>
                                        Empowering water refilling stations with a smart, AI-powered platform that simplifies operations for both owners and team — all in one system.
                                    </ListItem>
                                    <ListItem href="/franchising" title={<>Refill Operators <Badge className="border-white bg-gradient-to-br from-slate-200 to-slate-400 text-white animate-shine">Franchising</Badge></>}>
                                        A next-generation water refilling station in the Philippines— fully accredited and ready for success from day one.
                                    </ListItem>
                                    <ListItem href="/business" title={<>Smart Refill <Badge className="bg-gradient-to-br from-yellow-300 to-amber-500 text-white border-amber-600/50">Business</Badge></>}>
                                        Get access to 100+ accredited water refilling stations — delivering safe, clean water straight to your business.
                                    </ListItem>
                                </ul>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        ✨ What’s in the App
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[500px] lg:w-[600px]">
                            <h3 className="font-headline text-lg font-semibold text-primary">What’s in the App</h3>
                            <p className="text-sm text-muted-foreground mt-1">Smart Refill comes with everything you need to grow, stay in control and connect with your customers — all in one platform.</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                {appFeatures.map((feature, index) => (
                                    <li key={index}>
                                        <FeatureListItem title={feature.title} icon={feature.icon}>
                                            {feature.description}
                                        </FeatureListItem>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/client-login" className={cn(navigationMenuTriggerStyle(), "bg-transparent font-semibold")}>
                                Client Portal
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden md:flex items-center gap-2">
                    <HeaderLoginDialog>
                        <Button className="btn-press">My Station's Account</Button>
                    </HeaderLoginDialog>
                </div>
                
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-8 p-4">
                                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                                <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={32} height={32} />
                                <h1 className="text-2xl font-headline font-bold text-foreground">
                                    Smart Refill
                                </h1>
                            </div>
                            <nav className="flex flex-col gap-1 text-lg px-4">
                                 <SheetClose asChild>
                                    <Link href="/about" className="p-2 rounded-md hover:bg-accent font-medium block">About Us</Link>
                                </SheetClose>
                                 <Accordion type="single" collapsible>
                                    <AccordionItem value="products" className="border-b-0">
                                        <AccordionTrigger className="p-2 rounded-md hover:bg-accent font-medium text-lg hover:no-underline">Products</AccordionTrigger>
                                        <AccordionContent className="pl-4">
                                             <SheetClose asChild>
                                                <Link href="/water-refilling-stations" className="p-2 rounded-md hover:bg-accent font-medium block text-base">Operations Platform</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/franchising" className="p-2 rounded-md hover:bg-accent font-medium block text-base">Franchising</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/business" className="p-2 rounded-md hover:bg-accent font-medium block text-base">Business</Link>
                                            </SheetClose>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <SheetClose asChild>
                                    <Link href="/#faq" className="p-2 rounded-md hover:bg-accent font-medium block">FAQs</Link>
                                </SheetClose>
                                 <SheetClose asChild>
                                    <Link href="/client-login" className="p-2 rounded-md hover:bg-accent font-medium block">Client Portal</Link>
                                </SheetClose>
                            </nav>
                            <div className="mt-auto p-4 space-y-4">
                                <HeaderLoginDialog>
                                    <Button className="w-full">My Station's Account</Button>
                                </HeaderLoginDialog>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            </div>
        </header>
    );
}
