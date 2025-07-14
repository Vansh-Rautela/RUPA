export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Reddit Persona Analyzer</h3>
            <p className="text-sm text-neutral-400">
              AI-powered analysis of Reddit user profiles to understand personality, behavior, and interests.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                API Documentation
              </a>
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                GitHub Repository
              </a>
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Report Issues
              </a>
              <a href="#" className="block text-sm text-neutral-400 hover:text-white transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-sm text-neutral-400">© 2025 Reddit Persona Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
