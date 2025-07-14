"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { UserInputSection } from "./components/user-input-section"
import { StatusFeedback } from "./components/status-feedback"
import { PersonaReport } from "./components/persona-report"
import { Footer } from "./components/footer"
import { AnalysisHistory } from "./components/analysis-history"
import type { PersonaData } from "./types/persona"

export default function RedditPersonaAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [personaData, setPersonaData] = useState<PersonaData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<PersonaData[]>([])

  const handleAnalyze = async (username: string, options: any) => {
    setIsAnalyzing(true)
    setError(null)
    setPersonaData(null)

    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const mockPersonaData: PersonaData = {
        username,
        avatar: "/placeholder.svg?height=80&width=80",
        analysisDate: new Date().toISOString(),
        stats: {
          totalPosts: 1247,
          totalComments: 3892,
          karma: 15634,
          accountAge: "3 years",
          activeSubreddits: 47,
        },
        demographics: {
          estimatedAge: "25-35",
          location: "North America (likely)",
          timezone: "EST/PST",
          confidence: 0.78,
        },
        psychologicalProfile: {
          personality: ["Analytical", "Introverted", "Detail-oriented"],
          interests: ["Technology", "Gaming", "Science Fiction", "Programming"],
          communicationStyle: "Direct and technical",
          confidence: 0.85,
        },
        onlineBehavior: {
          postingPattern: "Evening hours, weekends",
          engagementStyle: "Thoughtful responses, technical discussions",
          controversyLevel: "Low",
          confidence: 0.82,
        },
        expertise: {
          domains: ["Software Development", "Cybersecurity", "Gaming"],
          knowledgeLevel: "Advanced",
          credibility: "High",
          confidence: 0.88,
        },
        socialDynamics: {
          networkSize: "Medium",
          influenceLevel: "Moderate",
          collaborationStyle: "Helpful mentor",
          confidence: 0.75,
        },
        behavioralPatterns: {
          consistency: "High",
          adaptability: "Medium",
          riskTaking: "Low",
          confidence: 0.8,
        },
        activityAnalysis: {
          subredditActivity: [
            { name: "r/programming", posts: 45, comments: 234 },
            { name: "r/cybersecurity", posts: 23, comments: 156 },
            { name: "r/gaming", posts: 67, comments: 289 },
            { name: "r/technology", posts: 34, comments: 178 },
          ],
          contentTypes: {
            technical: 45,
            discussion: 30,
            humor: 15,
            other: 10,
          },
          recentActivity: [
            {
              type: "comment",
              subreddit: "r/programming",
              title: "Best practices for API security",
              timestamp: "2 hours ago",
              link: "#",
            },
            {
              type: "post",
              subreddit: "r/cybersecurity",
              title: "New vulnerability in popular framework",
              timestamp: "1 day ago",
              link: "#",
            },
          ],
        },
      }

      setPersonaData(mockPersonaData)
      setAnalysisHistory((prev) => [mockPersonaData, ...prev.slice(0, 4)])
    } catch (err) {
      setError("Failed to analyze Reddit profile. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleLoadHistory = (data: PersonaData) => {
    setPersonaData(data)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <UserInputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

            <StatusFeedback isAnalyzing={isAnalyzing} error={error} hasData={!!personaData} />

            {personaData && <PersonaReport data={personaData} />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AnalysisHistory history={analysisHistory} onLoadAnalysis={handleLoadHistory} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
