"use client"

import { useState } from "react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { TracingBeam } from "@/components/aceternity/tracing-beam"
import { CardSpotlight } from "@/components/aceternity/card-spotlight"
import { StructuredData } from "@/components/common/StructuredData"
import { Mail, MapPin, Building2, Phone, Send, Rocket, Layers, Eye, Brain } from "lucide-react"

/**
 * LocalBusiness structured data for contact page.
 */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness' as const,
  name: 'Prioritech Indonesia Optima',
  url: 'https://prioritech.co.id',
  description: 'Indonesian AI and engineering company focused on creating production-grade systems.',
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'NEO SOHO PODOMORO CITY UNIT 3106, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan',
    addressLocality: 'Jakarta Barat',
    addressRegion: 'DKI Jakarta',
    postalCode: '11470',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint' as const,
    email: 'ivan.aurelius@prioritech.co.id',
    contactType: 'Business Inquiries',
  },
}

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
      <StructuredData localBusiness={localBusinessSchema} />
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <PageHero
          title="We design systems that help you excel — not temporary fixes."
          subtitle="Get in Touch"
          description="Systems that perform and scale."
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center gap-2 p-3 bg-main/50 border border-accent/20 rounded-lg">
                        <Rocket className="w-6 h-6 text-accent" />
                        <span className="text-secondary/70 text-xs font-mono text-center">Production-Grade</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 bg-main/50 border border-accent/20 rounded-lg">
                        <Layers className="w-6 h-6 text-accent" />
                        <span className="text-secondary/70 text-xs font-mono text-center">Scalable</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 bg-main/50 border border-accent/20 rounded-lg">
                        <Eye className="w-6 h-6 text-accent" />
                        <span className="text-secondary/70 text-xs font-mono text-center">Monitored</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-3 bg-main/50 border border-accent/20 rounded-lg">
                        <Brain className="w-6 h-6 text-accent" />
                        <span className="text-secondary/70 text-xs font-mono text-center">Expertise</span>
                      </div>
                    </div>
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
              <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Mail className="w-12 h-12 text-accent" />
                  <span className="text-secondary/70 text-xs font-mono text-center">Response</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-12 h-12 text-accent" />
                  <span className="text-secondary/70 text-xs font-mono text-center">Discussion</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Send className="w-12 h-12 text-accent" />
                  <span className="text-secondary/70 text-xs font-mono text-center">Proposal</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
