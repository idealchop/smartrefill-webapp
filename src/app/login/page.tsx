
'use client';
import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { getInitializedFirebase } from '@/lib/firebase';

function LoginContent() {
    const [isLogin, setIsLogin] = useState(true);
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [authLoading, setAuthLoading] = useState(true);

    // This effect runs once on component mount to handle various auth-related side effects.
    useEffect(() => {
        const { auth } = getInitializedFirebase();

        // 1. Handle redirect result from Google Sign-In
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    // This means the user has just been redirected from Google.
                    const user = result.user;
                    toast({
                        title: `Welcome, ${user.displayName}!`,
                        description: "You've successfully signed in.",
                    });
                    router.push('/dashboard');
                } else {
                    // This means the user landed on the page without a redirect result,
                    // so we proceed with other checks.
                    setAuthLoading(false);
                }
            })
            .catch((error) => {
                console.error("Redirect Result Error:", error);
                toast({
                    variant: "destructive",
                    title: "Google Sign-In Failed",
                    description: "Could not complete sign-in. Please try again.",
                });
                setAuthLoading(false);
            });

        // 2. Handle manual logout message
        const logoutMessage = localStorage.getItem('logout_message');
        if (logoutMessage) {
            toast({
                title: "Logged Out",
                description: logoutMessage,
                icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            });
            localStorage.removeItem('logout_message');
        }

        // 3. Handle email verification message
        const verified = searchParams.get('verified');
        if (verified === 'true') {
            toast({
                title: "Email Verified!",
                description: "Your email address has been successfully verified. You can now log in.",
                duration: 5000,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (authLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )
    }
  
    return (
        <div className="relative min-h-screen w-full">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/App-Image%2FPhilippines-water-refilling-stations.jpg?alt=media&token=44b40476-31f0-4ef4-aa83-b7290457a21d"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card className="p-8 shadow-lg bg-background/90">
                        <CardHeader className="text-center items-center p-0 mb-6">
                                <>
                                    <Image src="https://firebasestorage.googleapis.com/v0/b/smartrefill-singapore/o/Brand%20Logo%2FAsset%2022.png?alt=media&token=f7458efe-afd7-4006-862e-40c8d524c080" alt="Smart Refill Logo" width={40} height={40} className="mb-2" />
                                    <CardTitle className="text-2xl sm:text-3xl font-bold font-headline">
                                        {isLogin ? 'Welcome Back' : 'Create Account'}
                                    </CardTitle>
                                    <CardDescription className="max-w-xs text-center">
                                        {isLogin ? 'Your dashboard is ready for you.' : 'Create an account to run your refilling station smarter for free.'}
                                    </CardDescription>
                                </>
                        </CardHeader>
                        
                        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
  
                        <div className="mt-6 text-center text-sm">
                            <p className="text-muted-foreground">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="font-bold">
                                {isLogin ? "Create Account" : 'Log In'}
                            </Button>
                        </div>
  
                        <div className="text-center mt-4">
                            <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
                                &larr; Back to Home
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
