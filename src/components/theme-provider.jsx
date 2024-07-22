"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// This component wraps the NextThemesProvider component and provides the theme to the children components
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
