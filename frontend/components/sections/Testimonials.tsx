"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Prioritech reduced our data processing time by 70%. Their AI pipeline integrated seamlessly with our legacy systems.",
    author: "Jonathan W.",
    title: "CTO",
    company: "Digital Solutions Firm",
  },
  {
    quote: "Deployed our trading infrastructure in 3 weeks. What usually takes 6 months, they delivered in record time.",
    author: "Michelle T.",
    title: "Head of Operations",
    company: "Regional FinTech",
  },
  {
    quote: "The most reliable engineering partner we've worked with. Their systems have maintained 99.9% uptime for 18 months straight.",
    author: "Kevin O.",
    title: "Engineering Director",
    company: "Logistics Company",
  },
];

export function Testimonials(): JSX.Element {
  return (
    <section className="py-16 bg-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
            Client Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-main/70 border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-all"
            >
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <p className="text-secondary/80 text-sm mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-accent/10 pt-4">
                <p className="text-secondary font-mono font-medium text-sm">{testimonial.author}</p>
                <p className="text-secondary/50 text-xs font-mono">{testimonial.title}, {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
