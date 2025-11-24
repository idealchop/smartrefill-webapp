
'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { footer, header } from "../constants";

export function FooterSection() {
  return (
    <footer className="bg-background text-foreground">
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Image src={header.logo} alt="Smart Refill Logo" width={32} height={32} />
                        <h1 className="text-2xl font-headline font-bold text-foreground">
                            {footer.brand}
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {footer.copyright} — {footer.motto}
                    </p>
                </div>
                <div className="flex justify-center gap-6">
                    {footer.links.map((link, index) => <Link key={index} href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.text}</Link>)}
                </div>
            </div>
        </div>
      </footer>
  )
}
