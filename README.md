# Prioritech Indonesia Optima - Landing Page

A responsive, multi-page landing site for Prioritech Indonesia Optima, an Indonesian AI and engineering company focused on creating production-grade systems.

## 🎨 Design System

### Color Palette
- **Main**: `#2d2c2c` (graphite background)
- **Secondary**: `#d9d9d9` (silver text)
- **Accent**: `#daa520` (gold highlights)

### Typography
- **Primary Font**: Geist Sans
- **Monospace Font**: Geist Mono

## 🏗️ Architecture

### Pages Structure
```
/                    # Home - Hero + brief summaries of all sections
/about              # Company identity and engineering ethos
/divisions          # Detailed breakdown of 5 core divisions
/projects           # Portfolio showcase with case studies
/tech               # Stack overview and methodology
/contact            # Business contact information and form
```

### Component Organization
```
components/
├── common/                 # Shared components
│   ├── Navbar.tsx         # Responsive navigation with mobile menu
│   ├── Footer.tsx         # Company info and links
│   ├── PageHero.tsx      # Reusable hero section component
│   ├── SectionCard.tsx   # Card component for content sections
│   └── IconComponents.tsx # Icons for divisions and tech stack
└── ui/                    # shadcn/ui components
```

## 🚀 Features

### Responsive Design
- **Mobile**: 320px - 768px (optimized for Android devices)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Key Features
- ✅ Multi-page routing with Next.js App Router
- ✅ Responsive navigation with active states
- ✅ Animated background with SVG threads
- ✅ Consistent Prioritech branding
- ✅ Icon-based design (no placeholder images)
- ✅ Form handling with validation
- ✅ SEO-optimized metadata
- ✅ Production-ready build

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14.2.25 (App Router)
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Analytics**: Vercel Analytics

### Development
- **Language**: TypeScript
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Linting**: ESLint

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

3. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 🎯 Engineering Divisions

### 1. AI Systems & Orchestration
- End-to-end agentic systems
- Retrieval-augmented generation (RAG) pipelines
- Multi-agent orchestration

### 2. Cybersecurity Intelligence
- Automated penetration testing
- Graph Neural Network (GNN) fraud detection
- Anomaly detection and event correlation

### 3. Quantitative Engineering
- Algorithmic trading systems
- Financial time-series analysis
- Risk management and portfolio optimization

### 4. Automation & Robotics
- PLC programming and industrial automation
- IoT device integration
- Edge AI and embedded systems

### 5. Applied Product Engineering
- Full-stack web applications
- Cloud platform architecture
- Voice AI and conversational interfaces

## 📊 Project Portfolio

### Intelligent Systems
- **Sales Analytics Assistant**: 80% faster data retrieval
- **Graph Neural Fraud Detector**: 92% precision rate

### Cybersecurity & Network Intelligence
- **Virtual Penetration Framework**: Fully autonomous planning
- **Anomaly & Event Correlation Engine**: Real-time detection

### Quantitative & Financial Systems
- **Futures Trading Engine**: Sustained profitability
- **Predictive Equation Modeler**: 70% precision on live data
- **Agentic Financial Assistant**: 12% spending efficiency improvement

### Automation & Mechatronics
- **Edge-AI Kitchen Vision System**: Reduced service delays
- **Industrial Automation Suite**: 30% faster BOM processing
- **IoT & Robotics R&D**: Energy-efficient adaptive control

### Applied AI Platforms
- **Cognitive Therapy Platform**: Privacy-first AI conversations
- **Offline Summarizer App**: Mobile-first offline capabilities

## 🏢 Company Information

**PT PRIORITECH INDONESIA OPTIMA**
- **Address**: NEO SOHO PODOMORO CITY UNIT 3106
- **Location**: Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan
- **City**: Jakarta Barat, DKI Jakarta 11470
- **Email**: ivan.aurelius@prioritech.co.id

## 🎨 Design Philosophy

> **Progress. Precision. Prioritech.**

We measure innovation not by concept, but by uptime, precision, and throughput. Every solution is built for durability and scale.

### Core Principles
- **Modular Design**: Components can be scaled, replaced, or upgraded independently
- **Production-First**: Design for production from day one
- **Cloud-Agnostic**: Solutions work across cloud providers and on-premises
- **Auditable Systems**: Comprehensive logging, monitoring, and audit trails

## 🔧 Development Guidelines

### Code Standards
- TypeScript for type safety
- Comprehensive component documentation
- Responsive-first design approach
- Consistent naming conventions
- Modular component architecture

### File Structure
- Components organized by functionality
- Clear separation of concerns
- Reusable component patterns
- Centralized styling with Tailwind

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The site is optimized for deployment on Vercel with:
- Automatic builds from GitHub
- Edge functions support
- Global CDN distribution
- HTTPS enabled by default

## 📄 License

© 2024 Prioritech Indonesia Optima. All rights reserved.

---

**Progress. Precision. Prioritech.**
