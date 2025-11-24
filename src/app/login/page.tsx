
'use client';
import { LoginForm } from "@/components/auth/login-form";
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { pageConfig, titles, subtitles, switchModeText, LOADER_CLASS } from './constants';
import { STRINGS } from '@/components/auth/constants';

function LoginContent() {
    const [isLogin, setIsLogin] = useState(true);
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [authLoading, setAuthLoading] = useState(false);

    if (authLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background/80">
            <Loader2 className={LOADER_CLASS} />
        </div>
      )
    }
  
    return (
        <div className="relative min-h-screen w-full bg-background/80 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="relative p-8 shadow-xl bg-background rounded-3xl">
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full">
                        <X className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <CardHeader className="text-center items-center p-0 mb-6">
                        <Image src={STRINGS.logoUrl} alt={STRINGS.logoAlt} width={40} height={40} className="mb-4" />
                        <CardTitle className="text-3xl sm:text-4xl font-bold font-headline">
                            {isLogin ? titles.login : titles.create}
                        </CardTitle>
                        <CardDescription className="max-w-xs text-center mt-2 text-base text-muted-foreground">
                            {isLogin ? subtitles.login : subtitles.create}
                        </CardDescription>
                    </CardHeader>
                    
                    <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />

                    <div className="mt-6 text-center text-sm">
                        <p className="text-muted-foreground">
                            {isLogin ? switchModeText.login.prompt : switchMode-text.create.prompt}
                            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="font-bold text-base text-primary">
                                {isLogin ? switchModeText.login.action : switchModeText.create.action}
                            </Button>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className={LOADER_CLASS} /></div>}>
      <LoginContent />
    </Suspense>
  );
}
