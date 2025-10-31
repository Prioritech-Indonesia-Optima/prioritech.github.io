"use client"

import { useState } from "react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Timeline } from "@/components/aceternity/timeline"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { TracingBeam } from "@/components/aceternity/tracing-beam"
import { CardSpotlight } from "@/components/aceternity/card-spotlight"
import { Mail, MapPin, Building2, Phone, Send } from "lucide-react"

/**
 * Contact page for Prioritech Indonesia Optima.
 * 
 * Displays company contact information, office location, and contact form.
 * Features responsive design with form validation and submission handling.
 * Includes company details and business contact information.
 * 
 * @returns JSX element containing the contact page content
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Implement actual form submission logic
    // This would typically send data to a backend API or email service
    console.log('Form submitted:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    alert('Thank you for your message! We\'ll get back to you soon.')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <Building2 size={20} />,
      title: 'Company',
      details: ['PT PRIORITECH INDONESIA OPTIMA']
    },
    {
      icon: <MapPin size={20} />,
      title: 'Office Address',
      details: [
        'NEO SOHO PODOMORO CITY UNIT 3106',
        'Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan',
        'Jakarta Barat, DKI Jakarta 11470'
      ]
    },
    {
      icon: <Mail size={20} />,
      title: 'Email',
      details: ['ivan.aurelius@prioritech.co.id']
    }
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <PageHero
          title="We design systems that help you excel — not temporary fixes."
          subtitle="Get in Touch"
          description="We build what your operations need to compete at their best. If you're ready for a system that performs and scales, we're ready to design it."
        />

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-secondary text-2xl font-bold mb-8">
                  Get in Touch
                </h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <CardSpotlight key={index}>
                      <div className="bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all duration-300 font-mono terminal-window relative">
                        {/* Terminal header bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                          </div>
                        </div>

                        <div className="pt-12 flex items-start space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                            <div className="text-accent">
                              {info.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-secondary font-semibold text-lg mb-2 font-mono">
                              {info.title}
                            </h3>
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-secondary/70 text-sm mb-1 font-mono">
                                <span className="text-accent">&gt;</span> {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardSpotlight>
                  ))}
                </div>

                {/* Additional Info */}
                <TracingBeam>
                  <div className="mt-12 bg-main/80 backdrop-blur-sm border border-accent/20 rounded-xl p-6 font-mono">
                    <h3 className="text-secondary font-semibold text-lg mb-4 font-mono">
                      Why Choose Prioritech?
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-secondary/70 text-sm font-mono">
                          <span className="text-accent">&gt;</span> Production-grade systems, not prototypes
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-secondary/70 text-sm font-mono">
                          <span className="text-accent">&gt;</span> Modular, scalable, and cloud-agnostic solutions
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-secondary/70 text-sm font-mono">
                          <span className="text-accent">&gt;</span> Comprehensive monitoring and audit trails
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-secondary/70 text-sm font-mono">
                          <span className="text-accent">&gt;</span> Expertise across AI, cybersecurity, and automation
                        </span>
                      </li>
                    </ul>
                  </div>
                </TracingBeam>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-secondary text-2xl font-bold mb-8">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-secondary text-sm font-medium mb-2 block font-mono">
                        $ Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-main/50 border-accent/20 text-secondary placeholder:text-secondary/50 focus:border-accent font-mono hover:glow-gold"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-secondary text-sm font-medium mb-2 block font-mono">
                        $ Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-main/50 border-accent/20 text-secondary placeholder:text-secondary/50 focus:border-accent font-mono hover:glow-gold"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-secondary text-sm font-medium mb-2 block font-mono">
                      $ Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-main/50 border-accent/20 text-secondary placeholder:text-secondary/50 focus:border-accent font-mono hover:glow-gold"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-secondary text-sm font-medium mb-2 block font-mono">
                      $ Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-main/50 border-accent/20 text-secondary placeholder:text-secondary/50 focus:border-accent resize-none font-mono hover:glow-gold"
                      placeholder="Tell us about your project, requirements, or how we can help..."
                    />
                  </div>

                  <MovingBorder borderRadius="8px">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-main font-semibold py-3 rounded-lg transition-all font-mono hover:glow-gold disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-main border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          $ Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </span>
                      )}
                    </Button>
                  </MovingBorder>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-secondary text-2xl font-bold mb-4">
                What to Expect
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto mb-8">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please mention it in your message and we'll prioritize your request.
              </p>
              
              <Timeline 
                items={[
                  {
                    title: "Initial Response",
                    description: "We'll acknowledge your message within 24 hours",
                  },
                  {
                    title: "Project Discussion",
                    description: "Schedule a call to discuss your requirements in detail",
                  },
                  {
                    title: "Proposal",
                    description: "Receive a detailed proposal with timeline and approach",
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
