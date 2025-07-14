import { Brain, Github, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wider">REDDIT PERSONA ANALYZER</h1>
              <p className="text-xs text-neutral-400">AI-Powered Profile Analysis</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-neutral-400 hover:text-white">
              <FileText className="w-4 h-4 mr-2" />
              API Docs
            </Button>
            <Button variant="ghost" className="text-neutral-400 hover:text-white">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
