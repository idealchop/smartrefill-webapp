
'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { HeaderLoginDialog } from "@/components/auth/header-login-dialog";
import { header } from "./constants";
import { ListItem, FeatureListItem } from "./utils";

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
                <Image src={header.logo} alt={`${header.brand} Logo`} width={32} height={32} />
                <h1 className="text-2xl font-headline font-bold text-foreground">
                    {header.brand}
                </h1>
            </Link>
            <div className="flex items-center gap-4">
                <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {header.navLinks.map((navLink, index) => (
                        <NavigationMenuItem key={index}>
                            {navLink.href ? (
                                <NavigationMenuLink asChild>
                                    <Link href={navLink.href} className={cn(navigationMenuTriggerStyle(), "bg-transparent", navLink.className)}>
                                        {navLink.text}
                                    </Link>
                                </NavigationMenuLink>
                            ) : (
                                <>
                                    <NavigationMenuTrigger>{navLink.trigger}</NavigationMenuTrigger>
                                    {navLink.content && (
                                        <NavigationMenuContent>
                                            <div className="p-6 md:w-[500px] lg:w-[600px]">
                                                <h3 className="font-headline text-lg font-semibold text-primary">{navLink.content.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{navLink.content.subtitle}</p>
                                                {navLink.content.items && (
                                                    <ul className="grid w-full gap-3 mt-4">
                                                        {navLink.content.items.map((item, itemIndex) => (
                                                            <ListItem key={itemIndex} href={item.href} title={<>{item.title} <Badge className={item.badgeClass}>{item.badge}</Badge></>}>
                                                                {item.description}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                )}
                                                {navLink.content.features && Array.isArray(navLink.content.features) && (
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                        {navLink.content.features.map((feature, featureIndex) => {
                                                            const Icon = feature.icon;
                                                            return (
                                                                <li key={featureIndex}>
                                                                    <FeatureListItem title={feature.title} icon={<Icon className="h-4 w-4" />}>
                                                                        {feature.description}
                                                                    </FeatureListItem>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        </NavigationMenuContent>
                                    )}
                                </>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden md:flex items-center gap-2">
                    <HeaderLoginDialog>
                        <Button className="btn-press">{header.ctaButton}</Button>
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
                                <SheetTitle className="sr-only">{header.mobileNav.title}</SheetTitle>
                                <Image src={header.logo} alt={`${header.brand} Logo`} width={32} height={32} />
                                <h1 className="text-2xl font-headline font-bold text-foreground">
                                    {header.brand}
                                </h1>
                            </div>
                            <nav className="flex flex-col gap-1 text-lg px-4">
                                {header.mobileNav.links.map((link, index) => (
                                    link.href ? (
                                        <SheetClose asChild key={index}>
                                            <Link href={link.href} className="p-2 rounded-md hover:bg-accent font-medium block">{link.text}</Link>
                                        </SheetClose>
                                    ) : (
                                        <Accordion type="single" collapsible key={index}>
                                            <AccordionItem value={`mobile-nav-${index}`} className="border-b-0">
                                                <AccordionTrigger className="p-2 rounded-md hover:bg-accent font-medium text-lg hover:no-underline">{link.text}</AccordionTrigger>
                                                <AccordionContent className="pl-4">
                                                    {link.items && link.items.map((item, itemIndex) => (
                                                        <SheetClose asChild key={itemIndex}>
                                                            <Link href={item.href} className="p-2 rounded-md hover:bg-accent font-medium block text-base">{item.text}</Link>
                                                        </SheetClose>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )
                                ))}
                            </nav>
                            <div className="mt-auto p-4 space-y-4">
                                <HeaderLoginDialog>
                                    <Button className="w-full">{header.ctaButton}</Button>
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
