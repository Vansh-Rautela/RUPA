import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Reddit Persona Analyzer",
  description: "AI-powered Reddit profile analysis tool",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-mono antialiased">{children}</body>
    </html>
  )
}
