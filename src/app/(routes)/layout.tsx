import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MobileNav from "@/components/MobileNav";
import DesctopNav from "@/components/DesktopNav";
import ThemeObserver from "@/components/ThemeObserver";
import { auth } from "@/auth";
import { prisma } from "@/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Created with Aura",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  // Validate session and profile
  const profile = session?.user?.email
    ? await prisma.profile.findFirst({
        where: { email: session.user.email },
      })
    : null;

  const isAuthenticated = session && profile;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-red-500`}
      >
        <Theme>
          {modal}
          <div className="flex min-h-screen dark:bg-gray-800 dark:text-gray-300">
            {isAuthenticated && <DesctopNav />}
            <div className="pb-24 ld:pb-4 pt-4 px-4 lg:px-8 flex justify-around w-full">
              <div className="w-full">{children}</div>
            </div>
          </div>
          {isAuthenticated && <MobileNav />}
        </Theme>
        <ThemeObserver />
      </body>
    </html>
  );
}

