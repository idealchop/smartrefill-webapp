import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSecureToken(length = 32): string {
  const array = new Uint8Array(length);
  // Use a modern, secure random number generator
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for non-browser environments (like server-side rendering, though less likely for this use case)
    // This part is less secure and is just a fallback. The primary use is client-side.
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}


export function generateReferenceNumber() {
  const datePart = format(new Date(), 'yyMMdd');
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${datePart}-${randomPart}`;
}
