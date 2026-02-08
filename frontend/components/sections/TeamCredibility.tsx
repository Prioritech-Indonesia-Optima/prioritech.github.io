"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Users, label: "Engineering Team", value: "12+" },
  { icon: Clock, label: "Combined Experience", value: "80+ years" },
  { icon: Award, label: "Certifications", value: "AWS, CKA, OSCP" },
  { icon: Shield, label: "Systems Deployed", value: "50+" },
];

export function TeamCredibility(): JSX.Element {
  return (
    <section className="py-16 bg-main/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6 font-mono">
              Built by Engineers Who Ship
            </h2>
            <p className="text-secondary/70 mb-6 leading-relaxed">
              Our team combines deep expertise across AI/ML, cybersecurity, quantitative systems, 
              and industrial automation. We've built and deployed systems at scale for fintech, 
              logistics, and enterprise clients across Southeast Asia.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-main/70 border border-accent/20 rounded-lg p-4 hover:border-accent/40 transition-all"
                >
                  <stat.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-accent font-mono font-bold text-lg">{stat.value}</p>
                  <p className="text-secondary/50 text-xs font-mono">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-main/70 border border-accent/20 rounded-xl p-8 font-mono">
              <div className="flex items-center gap-2 mb-4 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs">Company Profile</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary/50">Founded:</span>
                  <span className="text-secondary">2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/50">HQ:</span>
                  <span className="text-secondary">Jakarta, Indonesia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/50">Focus:</span>
                  <span className="text-secondary">AI Systems & Engineering</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-accent/10">
                <p className="text-xs text-secondary/40 italic">
                  "Progress. Precision. Prioritech."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
