
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Mail, Eye, EyeOff, XCircle } from 'lucide-react';
// import { getInitializedFirebase } from '@/lib/firebase';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     updateProfile,
//     GoogleAuthProvider,
//     signInWithRedirect,
// } from 'firebase/auth';
// import { FirebaseError } from 'firebase/app';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
// import { getFirebaseAuthUrl } from '@/app/actions/gmail-integration-action';
// import { handleSendVerificationEmail } from '@/app/actions/send-verification-action';

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
    if (pass.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleAuthSuccess = () => {
    toast({ title: 'Success!', description: 'Redirecting to your dashboard...' });
    router.push('/dashboard');
  }

  const handleAuthError = (error: unknown, defaultTitle: string) => {
    let description = 'An unexpected error occurred. Please try again.';
      
    // if (error instanceof FirebaseError) {
    //   switch (error.code) {
    //     case 'auth/too-many-requests':
    //       description = "Access to this account has been temporarily disabled due to many failed login attempts. Please wait a moment before trying again.";
    //       break;
    //     case 'auth/email-already-in-use':
    //       description = 'This email is already registered. Please log in instead.';
    //       setIsLogin(true);
    //       break;
    //     case 'auth/weak-password':
    //       description = 'The password is too weak. It must be at least 6 characters long.';
    //       break;
    //     case 'auth/invalid-email':
    //       description = 'Please enter a valid email address.';
    //       break;
    //     case 'auth/invalid-credential':
    //     case 'auth/user-not-found':
    //     case 'auth/wrong-password':
    //       description = 'Invalid email or password. Please check your credentials and try again.';
    //       break;
    //     case 'permission-denied':
    //        description = "Permission denied. Please check your Firestore security rules in the Firebase console.";
    //        break;
    //     case 'auth/popup-closed-by-user':
    //         description = "The sign-in window was closed. Please try again.";
    //         break;
    //     case 'auth/account-exists-with-different-credential':
    //         description = "An account already exists with this email address. Please sign in with the original method.";
    //         break;
    //     case 'auth/app-check-token-is-invalid':
    //       description = 'App verification failed. If this is a development environment, please ensure you have set up a debug token in the Firebase console.';
    //       break;
    //     case 'auth/unauthorized-domain':
    //         description = "This domain is not authorized for OAuth operations. Please add it to the list of authorized domains in the Firebase Console.";
    //         break;
    //     default:
    //       description = "An internal error has occurred. Please check your App Check and reCAPTCHA keys."; 
    //       break;
    //   }
    // } else {
    //   console.error("Unknown Authentication Error:", error);
    // }
    
    toast({ variant: 'destructive', title: defaultTitle, description });
  }

  const handleGoogleSignIn = async () => {
    // setLoading(true);
    // const result = await getFirebaseAuthUrl();
    // if (result.url) {
    //   // Redirect the user to the generated Google Auth URL.
    //   window.location.href = result.url;
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Google Sign-In Failed",
    //     description: result.error || "Could not prepare Google Sign-In. Please try again.",
    //   });
    //   setLoading(false);
    // }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError('');

    // try {
    //   const { auth } = await getInitializedFirebase();

    //   if (!isLogin) {
    //     // --- SIGN UP LOGIC ---
    //     const passErr = validatePassword(password);
    //     if (passErr) {
    //       setPasswordError(passErr);
    //       toast({ variant: 'destructive', title: 'Invalid Password', description: passErr });
    //       setLoading(false);
    //       return;
    //     }

    //     if (password !== confirmPassword) {
    //         toast({ variant: 'destructive', title: 'Passwords Do Not Match', description: 'Please re-enter your password.' });
    //         setLoading(false);
    //         return;
    //     }

    //     if (!fullName) {
    //       toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out your full name.' });
    //       setLoading(false);
    //       return;
    //     }
        
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     await updateProfile(userCredential.user, { displayName: fullName });
        
    //     // **FIX**: Call the centralized server action to send the verification email.
    //     await handleSendVerificationEmail(email, fullName);
        
    //     toast({ title: 'Almost there!', description: 'Please check your inbox to verify your email.' });
    //     handleAuthSuccess(); // Allow user to proceed to dashboard immediately

    //   } else {
    //     // --- LOGIN LOGIC ---
    //     await signInWithEmailAndPassword(auth, email, password);
    //     handleAuthSuccess();
    //   }
    // } catch (error) {
    //   handleAuthError(error, isLogin ? 'Sign-in Failed' : 'Sign-up Failed');
    // } finally {
    //   setLoading(false);
    // }
  };
  

  const renderSignUpForm = () => {
      return (
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input id="fullName" type="text" placeholder="Your Full Name" className="pl-10 h-11" value={fullName} onChange={(e) => setFullName(e.target.value)} required={!isLogin} disabled={loading} />
            </div>
      )
  }

  return (
    <div className="w-full shadow-none border-none rounded-lg px-6 sm:px-8 pt-6">
      <form onSubmit={handleEmailAuth} className="space-y-4">
        {!isLogin && (
          <div className="space-y-4">
            {renderSignUpForm()}
          </div>
        )}
        <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
                id="email" 
                type="email" 
                placeholder="Email Address" 
                className="pl-10 h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
        </div>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 h-11 pr-10"
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
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
        </div>
        {!isLogin && (
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                    id="confirmPassword" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="pl-10 h-11 pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={!isLogin}
                    disabled={loading}
                />
            </div>
        )}
        {!isLogin && passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
        {!isLogin && !passwordError && password.length > 0 && (
             <p className="text-xs text-muted-foreground">Password must be at least 6 characters.</p>
        )}

        <Button 
            type="submit"
            disabled={loading}
            className="w-full h-12 text-base"
            size="lg"
        >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
        </Button>
      </form>
      
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>

        <Button variant="outline" className="w-full h-12" onClick={handleGoogleSignIn} disabled={loading}>
            <GoogleIcon />
            <span className="ml-2">Continue with Google</span>
        </Button>
      
      <p className="mt-6 px-0 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Privacy Policy
        </Link>.
      </p>
    </div>
  );
}
