"use client";

import React from "react";
import { motion } from "framer-motion";

const techLogos = [
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Redis", icon: "🔴" },
  { name: "Python", icon: "🐍" },
  { name: "Linux", icon: "🐧" },
];

export function TechStackBar(): JSX.Element {
  return (
    <section className="py-8 bg-main/50 border-y border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-secondary/60 text-sm font-mono mb-6">
          Built on industry-standard infrastructure
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {techLogos.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center gap-2"
            >
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                {tech.icon}
              </div>
              <span className="text-xs font-mono text-secondary/40 group-hover:text-accent transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
