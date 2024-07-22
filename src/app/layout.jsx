import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/ui/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "@/components/AuthProvider";
import { auth } from "@/auth";
import ProgressBars from "@/components/ui/ProgressBarProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// Global metadata for the application
export const metadata = {
  title: "Next Gen CRM",
  description: "Created by Ishaan",
};

// Root layout for the application
export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {/* ThemeProvider is a context provider that manages the theme state of the application */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <ProgressBars>{children}</ProgressBars>
              <Footer />
                <Toaster/>
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
