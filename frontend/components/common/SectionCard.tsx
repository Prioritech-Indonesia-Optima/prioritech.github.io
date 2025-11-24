import { ReactNode } from "react"

interface SectionCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
  hover?: boolean
}

/**
 * Reusable card component for content sections.
 * 
 * Provides consistent styling for displaying content in card format.
 * Features optional icons, hover effects, and flexible content areas.
 * 
 * @param title - Card title text
 * @param description - Card description text
 * @param icon - Optional icon element
 * @param children - Optional additional content
 * @param className - Optional additional CSS classes
 * @param hover - Whether to enable hover effects (default: true)
 * @returns JSX element containing the section card
 */
export function SectionCard({ 
  title, 
  description, 
  icon, 
  children, 
  className = "",
  hover = true 
}: SectionCardProps) {
  return (
    <div className={`
      relative bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-6 font-mono terminal-window
      ${hover ? 'hover:border-accent/50 hover:bg-main/90 transition-all duration-300' : ''}
      ${className}
    `}>
      {/* Terminal header bar */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      
      <div className={`pt-12 ${className.includes('flex flex-col') ? 'flex flex-col flex-1' : ''}`}>
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 flex-shrink-0">
            <div className="text-accent">
              {icon}
            </div>
          </div>
        )}
        
        <h3 className="text-secondary font-semibold text-base sm:text-lg mb-3 font-mono">
          {title}
        </h3>
        
        {description && (
          <p className="text-secondary/60 text-xs sm:text-sm mb-4 leading-relaxed font-mono">
            <span className="text-accent">></span> {description}
          </p>
        )}
        
        {children && (
          <div className={`${className.includes('flex flex-col') ? 'mt-auto' : 'mt-4'}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
