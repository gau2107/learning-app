import type { Metadata } from "next";
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
  title: "Learning App - Master Web Development",
  description: "Learn Next.js, React, TypeScript, and more like you're watching reels. Interactive learning experience with modern web technologies.",
  keywords: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Web Development", "Frontend"],
  authors: [{ name: "Learning App Team" }],
  creator: "Learning App",
  publisher: "Learning App",
  openGraph: {
    title: "Learning App - Master Web Development",
    description: "Learn Next.js, React, TypeScript, and more like you're watching reels.",
    url: "https://learning-app.vercel.app",
    siteName: "Learning App",
    images: [
      {
        url: "https://learning-app.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Learning App - Interactive Web Development Learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning App - Master Web Development",
    description: "Learn Next.js, React, TypeScript, and more like you're watching reels.",
    images: ["https://learning-app.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
