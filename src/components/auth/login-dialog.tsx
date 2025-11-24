
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
import { STRINGS } from "./constants";

export function LoginDialog({ children }: { children?: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-md border-none bg-background">
        <DialogHeader className="p-6 sm:p-8 pb-0 text-center items-center">
             <Image src={STRINGS.logoUrl} alt={STRINGS.logoAlt} width={40} height={40} className="mb-2" />
            <DialogTitle className="text-2xl sm:text-3xl font-bold font-headline">
                {isLogin ? STRINGS.welcomeBack : "Welcome"}
            </DialogTitle>
            <DialogDescription className="max-w-xs text-center">
                {isLogin ? STRINGS.dashboardReady : STRINGS.createAccountToRunSmarter}
            </DialogDescription>
        </DialogHeader>
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />

        <div className="pb-6 text-center">
            <p className="text-sm text-muted-foreground">{isLogin ? STRINGS.dontHaveAccount : STRINGS.alreadyHaveAccount}</p>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="font-bold">
                {isLogin ? STRINGS.createAccount : STRINGS.login}
            </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
