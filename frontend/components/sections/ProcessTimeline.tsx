"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampEffect } from "@/components/aceternity/lamp-effect";
import { Search, Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Architecture",
    duration: "Week 1-2",
    description: "Deep-dive into your requirements. We design the system architecture and define the production roadmap.",
  },
  {
    icon: Lightbulb,
    title: "Rapid Prototype",
    duration: "Week 3-4",
    description: "Working prototype deployed to staging. Validate core assumptions before full build.",
  },
  {
    icon: Code,
    title: "Production Build",
    duration: "Month 2-3",
    description: "Full implementation with monitoring, logging, and documentation. Security hardening included.",
  },
  {
    icon: Rocket,
    title: "Deploy & Optimize",
    duration: "Ongoing",
    description: "Production deployment with CI/CD pipeline. Continuous optimization based on real metrics.",
  },
];

export function ProcessTimeline(): JSX.Element {
  return (
    <section className="py-16 bg-main/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
            <LampEffect>How We Work</LampEffect>
          </h2>
          <p className="text-secondary/60 font-mono text-sm">
            From concept to production in weeks, not quarters
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-accent/20 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-main/70 border border-accent/20 rounded-xl p-6 hover:border-accent/50 transition-all">
                    <span className="text-accent text-xs font-mono">{step.duration}</span>
                    <h3 className="text-secondary font-bold font-mono mt-1 mb-2">{step.title}</h3>
                    <p className="text-secondary/60 text-sm">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
