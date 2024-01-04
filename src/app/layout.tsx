import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/navigation";
import Providers from "@/components/providers";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Simple blog made with nextjs, mongodb and prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={nunitoSans.className}>
        <Providers>
          <div className='flex min-h-screen flex-col'>
            <div className='flex-1 bg-neutral-100'>
              <Navigation />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
