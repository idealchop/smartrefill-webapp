
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { Button } from "../ui/button";
import Image from "next/image";

export function HeaderLoginDialog({ children, defaultToLogin = true }: { children?: React.ReactNode, defaultToLogin?: boolean }) {
  const [isLogin, setIsLogin] = useState(defaultToLogin);

  return (
    <Dialog onOpenChange={(open) => { if(!open) setIsLogin(defaultToLogin); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-md border-none bg-background">
        <DialogHeader className="p-6 sm:p-8 pb-0 text-center items-center">
             <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={40} height={40} className="mb-2" />
            <DialogTitle className="text-2xl sm:text-3xl font-bold font-headline">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </DialogTitle>
            <DialogDescription className="max-w-xs text-center">
                {isLogin ? 'Your dashboard is ready for you.' : 'Create an account to run your refilling station smarter for free.'}
            </DialogDescription>
        </DialogHeader>
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />

        <div className="pb-6 text-center">
            <p className="text-sm text-muted-foreground">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="font-bold">
                {isLogin ? "Create Account" : 'Log In'}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
