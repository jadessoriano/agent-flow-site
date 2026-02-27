import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://agentflow.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AgentFlow - Visual AI Agent Pipeline Builder",
    template: "%s | AgentFlow",
  },
  description:
    "Build, orchestrate, and execute Claude Code agent pipelines with a visual flow editor. A cross-platform desktop app for teams managing multi-step AI automation workflows.",
  keywords: [
    "Claude Code",
    "AI agents",
    "pipeline builder",
    "visual editor",
    "agent orchestration",
    "Tauri",
    "workflow automation",
    "Claude Code pipelines",
    "AI workflow",
    "drag and drop pipeline",
    "Rust desktop app",
    "React Flow",
    "agent management",
    "cost tracking",
    "Claude CLI",
    "pipeline templates",
    "secret variables",
    "desktop notifications",
    "pipeline validation",
    "auto-updater",
  ],
  authors: [{ name: "AgentFlow" }],
  creator: "AgentFlow",
  openGraph: {
    title: "AgentFlow - Visual AI Agent Pipeline Builder",
    description:
      "Build, orchestrate, and execute Claude Code agent pipelines with a visual flow editor. Cross-platform desktop app for teams.",
    url: BASE_URL,
    siteName: "AgentFlow",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgentFlow - Visual AI Agent Pipeline Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentFlow - Visual AI Agent Pipeline Builder",
    description:
      "Build, orchestrate, and execute Claude Code agent pipelines with a visual flow editor.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
