
'use client';

import LandingPage from "./landing/page";
import { Suspense } from "react";

export default function Home() {
  // The root of the application now renders the new landing page.
  // The LanguageProvider is intentionally removed from here to ensure
  // the landing page always defaults to English.
  return (
      <Suspense>
        <LandingPage />
      </Suspense>
  );
}
