"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampEffect } from "@/components/aceternity/lamp-effect";
import { AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";

export function ProblemSolution(): JSX.Element {
  return (
    <section className="py-16 bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
            <LampEffect>The Engineering Gap</LampEffect>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-main/70 border border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-secondary font-mono font-bold">The Problem</h3>
            </div>
            <ul className="space-y-3 text-sm text-secondary/70">
              <li className="flex items-start gap-2">
                <span className="text-red-400">×</span>
                <span>Engineering teams waste 40% of time on infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">×</span>
                <span>Systems take quarters to deploy, not weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">×</span>
                <span>Technical debt accumulates faster than features</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-accent/5 border border-accent/30 rounded-xl p-6 hover:border-accent/50 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="w-5 h-5 text-accent" />
              <h3 className="text-secondary font-mono font-bold">Our Approach</h3>
            </div>
            <ul className="space-y-3 text-sm text-secondary/70">
              <li className="flex items-start gap-2">
                <span className="text-accent">→</span>
                <span>Production-first architecture from day one</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">→</span>
                <span>Modular systems that scale independently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">→</span>
                <span>Cloud-agnostic, auditable implementations</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-main/70 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-secondary font-mono font-bold">Your Result</h3>
            </div>
            <ul className="space-y-3 text-sm text-secondary/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Systems deployed in 3-6 weeks, not quarters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>99.9%+ uptime with comprehensive monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Measurable ROI within first quarter</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
