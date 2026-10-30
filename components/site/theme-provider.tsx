"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // The inline script only needs to run during the initial HTML parse.
      // Marking it inert on the client avoids React's dev warning about <script> tags.
      scriptProps={{
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
        suppressHydrationWarning: true,
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
