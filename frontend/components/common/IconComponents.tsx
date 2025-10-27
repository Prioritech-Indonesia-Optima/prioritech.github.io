import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Cog, 
  Code2,
  Database,
  Cloud,
  Cpu,
  Network,
  BarChart3,
  Zap,
  Target,
  Layers,
  GitBranch,
  Workflow
} from "lucide-react"

/**
 * Icon components for Prioritech divisions and tech stack.
 * 
 * Provides consistent iconography across the site using lucide-react icons.
 * Each icon is sized appropriately for different contexts (cards, headers, etc.).
 */

// Division Icons
export function DivisionIcon({ division, size = 24 }: { division: string; size?: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    'ai-systems': <Brain size={size} />,
    'cybersecurity': <Shield size={size} />,
    'quantitative': <TrendingUp size={size} />,
    'automation': <Cog size={size} />,
    'product': <Code2 size={size} />,
  }

  return iconMap[division] || <Code2 size={size} />
}

// Tech Stack Icons
export function TechStackIcon({ tech, size = 20 }: { tech: string; size?: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    // AI/ML
    'pytorch': <Brain size={size} />,
    'tensorflow': <Brain size={size} />,
    'langchain': <GitBranch size={size} />,
    'crewai': <Workflow size={size} />,
    'ollama': <Cpu size={size} />,
    'huggingface': <Brain size={size} />,
    
    // Backend
    'fastapi': <Zap size={size} />,
    'flask': <Zap size={size} />,
    'python': <Code2 size={size} />,
    'docker': <Layers size={size} />,
    
    // Frontend
    'nextjs': <Code2 size={size} />,
    'flutter': <Code2 size={size} />,
    
    // Infrastructure
    'aws': <Cloud size={size} />,
    'vercel': <Cloud size={size} />,
    'linux': <Cpu size={size} />,
    
    // Data
    'postgresql': <Database size={size} />,
    'redis': <Database size={size} />,
    'sqlite': <Database size={size} />,
    
    // Hardware
    'plc': <Cog size={size} />,
    'robotics': <Cog size={size} />,
    'embedded': <Cpu size={size} />,
    'edge-ai': <Cpu size={size} />,
    
    // Analytics
    'analytics': <BarChart3 size={size} />,
    'monitoring': <Target size={size} />,
    'networking': <Network size={size} />,
  }

  return iconMap[tech.toLowerCase()] || <Code2 size={size} />
}

// Project Category Icons
export function ProjectCategoryIcon({ category, size = 24 }: { category: string; size?: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    'intelligent-systems': <Brain size={size} />,
    'cybersecurity': <Shield size={size} />,
    'quantitative': <TrendingUp size={size} />,
    'automation': <Cog size={size} />,
    'ai-platforms': <Code2 size={size} />,
  }

  return iconMap[category] || <Code2 size={size} />
}
