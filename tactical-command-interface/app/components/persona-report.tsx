import type { PersonaData } from "../types/persona"
import { PersonaSummaryCard } from "./persona-summary-card"
import { PersonaSection } from "./persona-section"
import { ActivityVisualization } from "./activity-visualization"
import { DownloadExport } from "./download-export"
import { User, Brain, Activity, Target, Users, TrendingUp } from "lucide-react"

interface PersonaReportProps {
  data: PersonaData
}

export function PersonaReport({ data }: PersonaReportProps) {
  return (
    <div className="space-y-8">
      <PersonaSummaryCard data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PersonaSection
          title="Demographics"
          icon={<User className="w-5 h-5" />}
          data={data.demographics}
          traits={[
            { name: "Estimated Age", value: data.demographics.estimatedAge },
            { name: "Location", value: data.demographics.location },
            { name: "Timezone", value: data.demographics.timezone },
          ]}
        />

        <PersonaSection
          title="Psychological Profile"
          icon={<Brain className="w-5 h-5" />}
          data={data.psychologicalProfile}
          traits={[
            { name: "Personality", value: data.psychologicalProfile.personality.join(", ") },
            { name: "Interests", value: data.psychologicalProfile.interests.join(", ") },
            { name: "Communication Style", value: data.psychologicalProfile.communicationStyle },
          ]}
        />

        <PersonaSection
          title="Online Behavior"
          icon={<Activity className="w-5 h-5" />}
          data={data.onlineBehavior}
          traits={[
            { name: "Posting Pattern", value: data.onlineBehavior.postingPattern },
            { name: "Engagement Style", value: data.onlineBehavior.engagementStyle },
            { name: "Controversy Level", value: data.onlineBehavior.controversyLevel },
          ]}
        />

        <PersonaSection
          title="Expertise & Knowledge"
          icon={<Target className="w-5 h-5" />}
          data={data.expertise}
          traits={[
            { name: "Domains", value: data.expertise.domains.join(", ") },
            { name: "Knowledge Level", value: data.expertise.knowledgeLevel },
            { name: "Credibility", value: data.expertise.credibility },
          ]}
        />

        <PersonaSection
          title="Social Dynamics"
          icon={<Users className="w-5 h-5" />}
          data={data.socialDynamics}
          traits={[
            { name: "Network Size", value: data.socialDynamics.networkSize },
            { name: "Influence Level", value: data.socialDynamics.influenceLevel },
            { name: "Collaboration Style", value: data.socialDynamics.collaborationStyle },
          ]}
        />

        <PersonaSection
          title="Behavioral Patterns"
          icon={<TrendingUp className="w-5 h-5" />}
          data={data.behavioralPatterns}
          traits={[
            { name: "Consistency", value: data.behavioralPatterns.consistency },
            { name: "Adaptability", value: data.behavioralPatterns.adaptability },
            { name: "Risk Taking", value: data.behavioralPatterns.riskTaking },
          ]}
        />
      </div>

      <ActivityVisualization data={data.activityAnalysis} />

      <DownloadExport data={data} />
    </div>
  )
}
