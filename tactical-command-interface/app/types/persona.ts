export interface PersonaData {
  username: string
  avatar: string
  analysisDate: string
  stats: {
    totalPosts: number
    totalComments: number
    karma: number
    accountAge: string
    activeSubreddits: number
  }
  demographics: {
    estimatedAge: string
    location: string
    timezone: string
    confidence: number
  }
  psychologicalProfile: {
    personality: string[]
    interests: string[]
    communicationStyle: string
    confidence: number
  }
  onlineBehavior: {
    postingPattern: string
    engagementStyle: string
    controversyLevel: string
    confidence: number
  }
  expertise: {
    domains: string[]
    knowledgeLevel: string
    credibility: string
    confidence: number
  }
  socialDynamics: {
    networkSize: string
    influenceLevel: string
    collaborationStyle: string
    confidence: number
  }
  behavioralPatterns: {
    consistency: string
    adaptability: string
    riskTaking: string
    confidence: number
  }
  activityAnalysis: ActivityAnalysis
}

export interface ActivityAnalysis {
  subredditActivity: Array<{
    name: string
    posts: number
    comments: number
  }>
  contentTypes: {
    technical: number
    discussion: number
    humor: number
    other: number
  }
  recentActivity: Array<{
    type: string
    subreddit: string
    title: string
    timestamp: string
    link: string
  }>
}
