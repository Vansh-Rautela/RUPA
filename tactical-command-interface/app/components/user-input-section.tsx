"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search, Settings } from "lucide-react"

interface UserInputSectionProps {
  onAnalyze: (username: string, options: any) => void
  isAnalyzing: boolean
}

export function UserInputSection({ onAnalyze, isAnalyzing }: UserInputSectionProps) {
  const [username, setUsername] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [postLimit, setPostLimit] = useState("100")
  const [model, setModel] = useState("gpt-4")
  const [detailedAnalysis, setDetailedAnalysis] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onAnalyze(username.trim(), {
        postLimit: Number.parseInt(postLimit),
        model,
        detailedAnalysis,
      })
    }
  }

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white tracking-wider flex items-center gap-2">
          <Search className="w-5 h-5 text-orange-500" />
          ANALYZE REDDIT PROFILE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-neutral-300">
              Reddit Username or Profile URL
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username (e.g., spez) or full URL"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white placeholder-neutral-400"
              disabled={isAnalyzing}
            />
          </div>

          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-neutral-400 hover:text-white p-0"
                type="button"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Advanced Options
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 p-4 bg-neutral-800 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postLimit" className="text-sm font-medium text-neutral-300">
                    Post/Comment Limit
                  </Label>
                  <Select value={postLimit} onValueChange={setPostLimit}>
                    <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="50">50 posts</SelectItem>
                      <SelectItem value="100">100 posts</SelectItem>
                      <SelectItem value="250">250 posts</SelectItem>
                      <SelectItem value="500">500 posts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium text-neutral-300">
                    Analysis Model
                  </Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="gpt-4">GPT-4 (Detailed)</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5 (Fast)</SelectItem>
                      <SelectItem value="claude">Claude (Balanced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="detailed" className="text-sm font-medium text-neutral-300">
                  Detailed Analysis
                </Label>
                <Switch id="detailed" checked={detailedAnalysis} onCheckedChange={setDetailedAnalysis} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
            disabled={!username.trim() || isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
