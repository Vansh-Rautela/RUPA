import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PersonaSectionProps {
  title: string
  icon: React.ReactNode
  data: { confidence: number }
  traits: Array<{ name: string; value: string }>
}

export function PersonaSection({ title, icon, data, traits }: PersonaSectionProps) {
  const confidencePercentage = Math.round(data.confidence * 100)

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
          <span className="text-orange-500">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {traits.map((trait, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 tracking-wider">{trait.name}</span>
              </div>
              <div className="text-sm text-white">{trait.value}</div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-neutral-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-400">Confidence</span>
            <Badge className="bg-orange-500/20 text-orange-500 text-xs">{confidencePercentage}%</Badge>
          </div>
          <Progress value={confidencePercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
