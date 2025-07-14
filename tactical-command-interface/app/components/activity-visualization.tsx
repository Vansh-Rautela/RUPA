import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ActivityAnalysis } from "../types/persona"
import { BarChart3, PieChart, Clock, ExternalLink } from "lucide-react"

interface ActivityVisualizationProps {
  data: ActivityAnalysis
}

export function ActivityVisualization({ data }: ActivityVisualizationProps) {
  const maxActivity = Math.max(...data.subredditActivity.map((s) => s.posts + s.comments))

  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            SUBREDDIT ACTIVITY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.subredditActivity.map((subreddit, index) => {
              const totalActivity = subreddit.posts + subreddit.comments
              const percentage = (totalActivity / maxActivity) * 100

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-mono">{subreddit.name}</span>
                    <div className="flex gap-2">
                      <Badge className="bg-neutral-800 text-neutral-300 text-xs">{subreddit.posts} posts</Badge>
                      <Badge className="bg-neutral-800 text-neutral-300 text-xs">{subreddit.comments} comments</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
              <PieChart className="w-5 h-5 text-orange-500" />
              CONTENT BREAKDOWN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(data.contentTypes).map(([type, percentage]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300 capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-neutral-800 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-mono w-8">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              RECENT ACTIVITY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-orange-500/20 text-orange-500 text-xs">{activity.type}</Badge>
                        <span className="text-xs text-neutral-400 font-mono">{activity.subreddit}</span>
                      </div>
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-neutral-400 mt-1">{activity.timestamp}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 hover:text-orange-500 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
