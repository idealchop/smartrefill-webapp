
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { STRINGS, URLS, iconClass, iconClassPlacement } from './constants';
import { signIn } from 'next-auth/react';

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1001_3)">
        <path d="M15.5455 8.18182C15.5455 7.63636 15.5 7.09091 15.4091 6.54545H8V9.45455H12.1364C11.9545 10.2727 11.4545 10.9545 10.7273 11.4545V13.3636H13.0909C14.6364 11.9545 15.5455 10.2273 15.5455 8.18182Z" fill="#4285F4"/>
        <path d="M8 16C10.2273 16 12.0909 15.2273 13.0909 13.3636L10.7273 11.4545C10 11.9091 9.04545 12.1818 8 12.1818C5.95455 12.1818 4.22727 10.8182 3.59091 8.95455H1.13636V10.9091C2.18182 13.8636 4.86364 16 8 16Z" fill="#34A853"/>
        <path d="M3.59091 8.95455C3.45455 8.54545 3.36364 8.09091 3.36364 7.63636C3.36364 7.18182 3.45455 6.72727 3.59091 6.31818V4.36364H1.13636C0.409091 5.68182 0 6.95455 0 8.31818C0 9.68182 0.409091 10.9545 1.13636 12.2727L3.59091 8.95455Z" fill="#FBBC05"/>
        <path d="M8 3.09091C9.13636 3.09091 10.0909 3.45455 10.8182 4.13636L13.1364 1.81818C12.0909 0.727273 10.2273 0 8 0C4.86364 0 2.18182 2.13636 1.13636 4.36364L3.59091 6.31818C4.22727 4.45455 5.95455 3.09091 8 3.09091Z" fill="#EA4335"/>
        </g>
        <defs>
        <clipPath id="clip0_1001_3">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
    </svg>
);

export function LoginForm({ isLogin, setIsLogin }: { isLogin: boolean, setIsLogin: (isLogin: boolean) => void }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const validatePassword = (pass: string) => {
    if (pass.length < 6) return STRINGS.passwordMinLength;
    return '';
  };

  const handleAuthSuccess = () => {
    toast({ title: STRINGS.success, description: STRINGS.redirectingToDashboard });
    router.push(URLS.dashboard);
  }

  const handleAuthError = (error: any, defaultTitle: string) => {
    let description = STRINGS.unexpectedError;
    if (error instanceof Error) {
      description = error.message;
    }
    
    toast({ variant: 'destructive', title: defaultTitle, description });
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', { redirect: false });
      if (result?.error) {
        handleAuthError(new Error(result.error), STRINGS.googleSignInFailed);
      } else {
        handleAuthSuccess();
      }
    } catch (error) {
      handleAuthError(error, STRINGS.googleSignInFailed);
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    if (!isLogin && password !== confirmPassword) {
      setPasswordError(STRINGS.passwordsDoNotMatch);
      setLoading(false);
      return;
    }

    if (!isLogin && !fullName) {
      setPasswordError(STRINGS.pleaseFillFullName);
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        action: isLogin ? 'login' : 'signup',
        fullName,
        email,
        password,
      });

      if (result?.error) {
        handleAuthError(new Error(result.error), isLogin ? STRINGS.signInFailed : STRINGS.signUpFailed);
      } else {
        handleAuthSuccess();
      }
    } catch (error) {
      handleAuthError(error, isLogin ? STRINGS.signInFailed : STRINGS.signUpFailed);
    }

    setLoading(false);
  };
  

  const renderSignUpForm = () => {
      return (
            <div className="relative">
                <User className={`${iconClass} ${iconClassPlacement}`} />
                <Input id="fullName" type="text" placeholder={STRINGS.fullNamePlaceholder} className="pl-10 h-12 rounded-lg border-2" value={fullName} onChange={(e) => setFullName(e.target.value)} required={!isLogin} disabled={loading} />
            </div>
      )
  }

  return (
    <div className="w-full px-4 sm:px-0">
      <form onSubmit={handleEmailAuth} className="space-y-4">
        {!isLogin && (
          <div className="space-y-4">
            {renderSignUpForm()}
          </div>
        )}
        <div className="relative">
            <Mail className={`${iconClass} ${iconClassPlacement}`} />
            <Input 
                id="email" 
                type="email" 
                placeholder={STRINGS.emailPlaceholder} 
                className="pl-10 h-12 rounded-lg border-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
        </div>
        <div className="relative">
            <Lock className={`${iconClass} ${iconClassPlacement}`} />
            <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder={STRINGS.passwordPlaceholder}
                className="pl-10 h-12 pr-10 rounded-lg border-2"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!isLogin) {
                    setPasswordError(validatePassword(e.target.value));
                  }
                }}
                required
                disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className={iconClass} />
              ) : (
                <Eye className={iconClass} />
              )}
            </button>
        </div>
        {!isLogin && (
            <div className="relative">
                <Lock className={`${iconClass} ${iconClassPlacement}`} />
                <Input 
                    id="confirmPassword" 
                    type={showPassword ? "text" : "password"}
                    placeholder={STRINGS.confirmPasswordPlaceholder}
                    className="pl-10 h-12 pr-10 rounded-lg border-2"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                    disabled={loading}
                />
            </div>
        )}
        {!isLogin && passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
        {!isLogin && !passwordError && password.length > 0 && (
             <p className="text-xs text-muted-foreground">{STRINGS.passwordMinLength}</p>
        )}

        <Button 
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
        >
            {loading ? STRINGS.processing : (isLogin ? STRINGS.login : STRINGS.createAccount)}
        </Button>
      </form>
      
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    {STRINGS.continueWith}
                </span>
            </div>
        </div>

        <Button variant="outline" className="w-full h-12 text-base font-semibold rounded-lg border-2" onClick={handleGoogleSignIn} disabled={loading}>
            <GoogleIcon />
            <span className="ml-2 text-foreground">{STRINGS.continueWithGoogle}</span>
        </Button>
      
      <p className="mt-6 px-0 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href={URLS.terms} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            {STRINGS.termsOfService}
        </Link>{" "}
        and{" "}
        <Link href={URLS.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            {STRINGS.privacyPolicy}
        </Link>.
      </p>
    </div>
  );
}
