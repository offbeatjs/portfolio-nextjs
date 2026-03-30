import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import HireMeLauncher from "./components/HireMeLauncher";
import HireMePortal from "./components/HireMePortal";
import { GlobalNav } from "./components/GlobalNav";

const BASE_URL = "https://theyash.dev";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Yash - Full-Stack Developer & Automation Engineer",
    template: "%s | Yash",
  },
  description:
    "Full-stack developer specializing in automation systems, WhatsApp & Telegram bots, REST APIs, and custom business tools. Available for freelance projects.",
  keywords: [
    "full-stack developer",
    "automation engineer",
    "WhatsApp bot",
    "Telegram bot",
    "Discord bot",
    "API development",
    "Next.js developer",
    "Node.js developer",
    "freelance developer",
    "workflow automation",
  ],
  authors: [{ name: "Yash", url: BASE_URL }],
  creator: "Yash",
  publisher: "Yash",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "TheYash",
    title: "Yash - Full-Stack Developer & Automation Engineer",
    description:
      "Full-stack developer specializing in automation systems, APIs, and custom business tools. Available for freelance projects.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yash - Full-Stack Developer & Automation Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@not_yash_",
    creator: "@not_yash_",
    title: "Yash - Full-Stack Developer & Automation Engineer",
    description:
      "Full-stack developer specializing in automation, APIs, and custom tools.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yash",
  url: BASE_URL,
  sameAs: [
    "https://github.com/offbeatjs",
    "https://linkedin.com/in/theyash07",
    "https://x.com/not_yash_",
  ],
  jobTitle: "Full-Stack Developer & Automation Engineer",
  knowsAbout: [
    "Web Development",
    "API Design",
    "Automation Systems",
    "WhatsApp Bots",
    "Telegram Bots",
    "Node.js",
    "Next.js",
  ],
  email: "yash@theyash.dev",
  offers: {
    "@type": "Offer",
    description: "Freelance full-stack development and automation services",
    url: `${BASE_URL}/contact`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <GlobalNav />
          <HireMeLauncher />
          <HireMePortal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
