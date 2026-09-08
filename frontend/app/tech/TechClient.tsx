"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SubPageScene } from "@/components/three/SubPageScene"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const STACK = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Go", "Rust", "C++", "Java"],
  },
  {
    category: "AI / ML",
    items: ["PyTorch", "LangChain", "Hugging Face", "ONNX Runtime", "TensorRT"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "PostgreSQL", "Redis", "Kafka", "gRPC"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    category: "Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "Grafana", "Prometheus"],
  },
  {
    category: "Industrial",
    items: ["PLC (Siemens, Allen-Bradley)", "ROS 2", "MQTT", "OPC-UA", "Edge TPU"],
  },
]

const PRINCIPLES = [
  { title: "Type safety everywhere", desc: "If it compiles, it probably works. We use types as our first line of defense, not an afterthought." },
  { title: "Observability over logging", desc: "Structured metrics, traces, and alerts. If you can't see it, you can't fix it." },
  { title: "Infrastructure as code", desc: "Every environment is reproducible. No snowflake servers, no 'it works in staging'." },
  { title: "Boring on purpose", desc: "We choose technology that will still be supported in 5 years. Innovation where it matters, stability where it doesn't." },
]

export default function TechClient() {
  return (
    <div className="min-h-screen bg-background">
      <SubPageScene pageId="tech" />
      <div className="fixed inset-0 z-[1] pointer-events-none vignette" />
      <Navbar />
      <main id="main-content" className="relative z-10 pt-16">
        <section className="px-6 sm:px-12 lg:px-20 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-6">
              Technology
            </span>
            <h1 className="text-4xl sm:text-6xl font-mono font-bold leading-[0.95] tracking-tight mb-8">
              <span className="block">The stack.</span>
              <span className="block text-foreground/40">Chosen deliberately.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed max-w-2xl">
              We don&apos;t use technology because it&apos;s new. We use it because
              it solves the problem and will still be here when the system needs maintenance.
            </p>
          </motion.div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
              {STACK.map((group) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-background/60 p-6"
                >
                  <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-accent/60 mb-4">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs text-foreground/50 font-mono">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              Engineering principles
            </motion.span>

            <div className="space-y-12">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-6"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 to-transparent" />
                  <h3 className="text-lg font-mono font-semibold text-foreground/90 mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground/45 font-mono leading-relaxed max-w-lg">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight mb-6">
              Have a specific technical challenge?
            </h2>
            <p className="text-sm text-foreground/50 font-mono mb-8">
              Tell us the constraints. We&apos;ll tell you what will work.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-background font-mono text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Talk to an engineer
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
