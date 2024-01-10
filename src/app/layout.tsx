import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/ui/navigation"
import Providers from "@/components/providers"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Simple blog made with nextjs, mongodb and prisma",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <Providers>
          <div className='flex min-h-screen flex-col bg-gray-100'>
            <div className='flex-1'>
              <div className='flex mx-auto w-full container min-h-screen max-sm:p-0 max-sm:m-0 justify-center'>
                <Navigation />
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
