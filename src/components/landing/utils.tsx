
'use client';

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Custom hook for Intersection Observer
export function useOnScreen(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false); 
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
}


export const AnimatedSection = ({ children, className, stagger = 0 }: { children: React.ReactNode, className?: string, stagger?: number }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-out opacity-0 transform translate-y-4",
                isVisible && "opacity-100 translate-y-0",
                className
            )}
             style={{ transitionDelay: `${stagger}ms` }}
        >
            {children}
        </div>
    )
}

export const FeatureListItem = ({ icon, title, children }: { icon: React.ReactNode, title: React.ReactNode, children: React.ReactNode }) => {
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

export const ListItem = React.forwardRef<
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
