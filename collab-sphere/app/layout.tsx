import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collab-Sphere",
  description: "A collaborative platform for students to share and find open-source projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Navbar */}
          <header className="w-full flex justify-between items-center p-4 sm:p-6 bg-white dark:bg-black shadow-md">
            <h1 className="text-xl font-bold text-foreground">
              <a href="/">Collab-Sphere</a>
            </h1>
            <div className="flex gap-4">
              {/* Show SignIn and SignUp buttons if signed out */}
              <SignedOut>
                <SignInButton>
                  <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
                    Register
                  </button>
                </SignUpButton>
              </SignedOut>
              {/* Show UserButton if signed in */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </header>

          {/* Main Content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}