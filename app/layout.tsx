import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Talo Star - Pure Mineral Water | Healthy & Refreshing",
  description:
    "Talo Star pure mineral water from Diinsoor, Somalia. Clean, healthy, and refreshing water for every Somali home. Shop now for 5L bottles.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.variable} relative antialiased`}>{children}</body>
      </html>
    </>
  )
}
