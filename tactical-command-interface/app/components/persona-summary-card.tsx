import { Card, CardContent } from "@/components/ui/card"
import type { PersonaData } from "../types/persona"
import { MessageSquare, ThumbsUp, Clock, Hash } from "lucide-react"

interface PersonaSummaryCardProps {
  data: PersonaData
}

export function PersonaSummaryCard({ data }: PersonaSummaryCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <img
              src={data.avatar || "/placeholder.svg"}
              alt={`${data.username} avatar`}
              className="w-20 h-20 rounded-full border-2 border-orange-500"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wider">u/{data.username}</h2>
              <p className="text-sm text-neutral-400">
                Analysis completed on {new Date(data.analysisDate).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-white font-mono">{data.stats.totalPosts}</div>
                <div className="text-xs text-neutral-400">Posts</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-white font-mono">{data.stats.totalComments}</div>
                <div className="text-xs text-neutral-400">Comments</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-white font-mono">{data.stats.karma}</div>
                <div className="text-xs text-neutral-400">Karma</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-white font-mono">{data.stats.accountAge}</div>
                <div className="text-xs text-neutral-400">Account Age</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Hash className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold text-white font-mono">{data.stats.activeSubreddits}</div>
                <div className="text-xs text-neutral-400">Subreddits</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
