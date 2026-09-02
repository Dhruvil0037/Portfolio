import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { skillsData } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://dhruvilportfolio.vercel.app";
const SITE_NAME = "Dhruvil Dhamecha";
const TITLE = "Dhruvil Dhamecha | Senior Full Stack Developer";
const DESCRIPTION =
  "Senior Full Stack Developer with 2+ years of experience building AI-powered products, real-time systems & SEO-first Next.js applications. Core stack: Next.js, Node.js, Express, PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Dhruvil Dhamecha",
  },
  description: DESCRIPTION,
  keywords: [
    "Dhruvil Dhamecha",
    "Full Stack Developer",
    "Next.js Developer",
    "Ahmedabad",
    ...skillsData,
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // paste Google Search Console verification code here once available
    google: "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Senior Full Stack Developer",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/dhruvil-dhamecha-14939b258/",
    "https://github.com/Dhruvil0037",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Squadkin Technologies Pvt. Ltd.",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "L.J. Institute of Engineering and Technology",
  },
  knowsAbout: skillsData,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-20 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
