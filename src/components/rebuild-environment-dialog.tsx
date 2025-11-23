"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function RebuildEnvironmentDialog() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="flex flex-row items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Info className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex-grow">
            <AlertDialogTitle className="text-lg font-semibold">
              Rebuild Environment
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-muted-foreground">
              Your environment configuration (dev.nix) has changed. You may
              need to rebuild your environment.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 sm:justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>Take me there</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
