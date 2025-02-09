import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { inter } from "./fonts";
import { routes } from "./common/routes";
import { GoogleAnalytics } from "./common/ui/components/GoogleAnalytics";
import { Suspense } from "react";
import { AuthActions } from "./common/ui/components/AuthActions";
import { AdSense } from "./common/ui/components/AdSense";

export const metadata: Metadata = {
  title:
    "todopitbike.es - guía completa de Pitbikes de asfalto en España: Marcas, Circuitos, Mantenimiento y mucho más",
  description:
    "Descubre todo sobre las pitbikes de asfalto en España. Guía completa para iniciarte en el mundo de las pitbikes: marcas, mantenimiento, circuitos, eventos y más. Encuentra todo lo que necesitas saber para rodar en asfalto con tu pitbike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <AdSense pid={"pub-6477691629525796"} />
      </head>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen	`}
      >
        <header className="px-6 md:px-10 py-4 flex items-center shadow-xl">
          <Link href={routes.home.path}>
            <Image
              className="rounded-full"
              src="/icon.jpg"
              width={48}
              height={48}
              alt="pitbike-image"
            ></Image>
          </Link>
          <nav className="grow flex justify-end gap-4">
            <Link href={routes.circuits.path}>Circuitos</Link>
            <AuthActions></AuthActions>
          </nav>
        </header>
        <main className="grow">{children}</main>
      </body>
      <Suspense>
        <Analytics />
        <GoogleAnalytics />
      </Suspense>
    </html>
  );
}
