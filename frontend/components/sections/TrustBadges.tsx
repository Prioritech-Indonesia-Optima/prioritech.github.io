"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Server, Lock, FileCheck } from "lucide-react";

const badges = [
  { icon: Shield, label: "Enterprise Security", description: "SOC 2 Type II Ready" },
  { icon: Server, label: "Cloud Native", description: "AWS Partner Network" },
  { icon: Lock, label: "Data Protection", description: "GDPR Compliant" },
  { icon: FileCheck, label: "Quality Assured", description: "ISO 9001 Aligned" },
];

export function TrustBadges(): JSX.Element {
  return (
    <section className="py-12 bg-main border-y border-accent/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <badge.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-secondary font-mono text-sm font-medium">{badge.label}</p>
              <p className="text-secondary/50 text-xs font-mono">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
