"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonaData } from "../types/persona"
import { History, User, Calendar } from "lucide-react"

interface AnalysisHistoryProps {
  history: PersonaData[]
  onLoadAnalysis: (data: PersonaData) => void
}

export function AnalysisHistory({ history, onLoadAnalysis }: AnalysisHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-orange-500" />
            ANALYSIS HISTORY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-400">No previous analyses</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
          <History className="w-4 h-4 text-orange-500" />
          ANALYSIS HISTORY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((analysis, index) => (
            <div
              key={index}
              className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer"
              onClick={() => onLoadAnalysis(analysis)}
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-white font-mono">u/{analysis.username}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(analysis.analysisDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
