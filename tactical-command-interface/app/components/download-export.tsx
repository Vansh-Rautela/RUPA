"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { PersonaData } from "../types/persona"
import { Download, Copy, FileText, FileJson, FileImage } from "lucide-react"

interface DownloadExportProps {
  data: PersonaData
}

export function DownloadExport({ data }: DownloadExportProps) {
  const handleDownload = (format: string) => {
    // Mock download functionality
    console.log(`Downloading persona report as ${format}`)
  }

  const handleCopyToClipboard = () => {
    const reportText = `Reddit Persona Analysis for u/${data.username}\n\nGenerated on: ${new Date(data.analysisDate).toLocaleDateString()}\n\n[Analysis content would be formatted here]`
    navigator.clipboard.writeText(reportText)
  }

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
          <Download className="w-5 h-5 text-orange-500" />
          EXPORT PERSONA REPORT
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => handleDownload("txt")}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download TXT
          </Button>

          <Button
            onClick={() => handleDownload("json")}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600"
          >
            <FileJson className="w-4 h-4 mr-2" />
            Download JSON
          </Button>

          <Button
            onClick={() => handleDownload("pdf")}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600"
          >
            <FileImage className="w-4 h-4 mr-2" />
            Download PDF
          </Button>

          <Button onClick={handleCopyToClipboard} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
