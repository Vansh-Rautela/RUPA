import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react"

interface StatusFeedbackProps {
  isAnalyzing: boolean
  error: string | null
  hasData: boolean
}

export function StatusFeedback({ isAnalyzing, error, hasData }: StatusFeedbackProps) {
  if (!isAnalyzing && !error && !hasData) return null

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardContent className="p-6">
        {isAnalyzing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
              <span className="text-white font-medium">Analyzing Reddit profile...</span>
            </div>
            <Progress value={66} className="h-2" />
            <div className="text-sm text-neutral-400 space-y-1">
              <div>• Fetching user posts and comments</div>
              <div>• Processing content with AI</div>
              <div>• Generating persona insights</div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {hasData && !isAnalyzing && !error && (
          <div className="flex items-center gap-3 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>Analysis completed successfully!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
