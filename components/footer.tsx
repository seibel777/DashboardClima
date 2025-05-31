import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Dashboard de Clima</div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>Feito usando Next.js, Tailwind CSS e OpenWeather API</span>
          </div>

          <a
            href="https://github.com/seibel777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>seibel777</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
