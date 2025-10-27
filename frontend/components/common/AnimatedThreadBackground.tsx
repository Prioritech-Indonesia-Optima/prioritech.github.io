"use client"

/**
 * AnimatedThreadBackground component for Prioritech Indonesia Optima.
 * 
 * This component creates a beautiful animated background with flowing thread-like
 * paths and pulsing circles that move along them. Features include:
 * 
 * - Multiple animated thread paths with different curves and timing
 * - Pulsing circles that follow the thread paths
 * - Gradient effects and neon glow filters
 * - Optimized SVG animations for smooth performance
 * - Customizable colors using Prioritech brand palette
 * 
 * The animation creates a dynamic, tech-focused background perfect for
 * hero sections and key landing areas.
 * 
 * @param className - Optional CSS classes to apply to the container
 * @param viewBox - SVG viewBox dimensions (default: "0 0 2000 800")
 * @param showHeroBackground - Whether to show the hero text background ellipses (default: true)
 * @param threadCount - Number of animated threads to display (default: 10)
 * @returns JSX element containing the animated thread background
 */
export function AnimatedThreadBackground({ 
  className = "", 
  viewBox = "0 0 2000 800",
  showHeroBackground = true,
  threadCount = 10
}: {
  className?: string
  viewBox?: string
  showHeroBackground?: boolean
  threadCount?: number
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial gradients for pulsing circles */}
          <radialGradient id="neonPulse1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(218,165,32,1)" />
            <stop offset="30%" stopColor="rgba(218,165,32,0.8)" />
            <stop offset="70%" stopColor="rgba(218,165,32,0.4)" />
            <stop offset="100%" stopColor="rgba(218,165,32,0)" />
          </radialGradient>
          <radialGradient id="neonPulse2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(217,217,217,0.9)" />
            <stop offset="25%" stopColor="rgba(217,217,217,0.6)" />
            <stop offset="60%" stopColor="rgba(217,217,217,0.3)" />
            <stop offset="100%" stopColor="rgba(217,217,217,0)" />
          </radialGradient>
          <radialGradient id="neonPulse3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(218,165,32,1)" />
            <stop offset="35%" stopColor="rgba(218,165,32,0.7)" />
            <stop offset="75%" stopColor="rgba(218,165,32,0.3)" />
            <stop offset="100%" stopColor="rgba(218,165,32,0)" />
          </radialGradient>

          {/* Hero text background gradient */}
          <radialGradient id="heroTextBg" cx="30%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(218,165,32,0.15)" />
            <stop offset="40%" stopColor="rgba(218,165,32,0.08)" />
            <stop offset="80%" stopColor="rgba(218,165,32,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Text blur filter */}
          <filter id="heroTextBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feTurbulence baseFrequency="0.7" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
            <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
              <feFuncA type="discrete" tableValues="0.03 0.06 0.09 0.12" />
            </feComponentTransfer>
            <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
            <feMerge>
              <feMergeNode in="noisyBlur" />
            </feMerge>
          </filter>

          {/* Thread path gradients */}
          <linearGradient id="threadFade1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,1)" />
            <stop offset="15%" stopColor="rgba(218,165,32,0.8)" />
            <stop offset="85%" stopColor="rgba(218,165,32,0.8)" />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
          </linearGradient>
          <linearGradient id="threadFade2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,1)" />
            <stop offset="12%" stopColor="rgba(217,217,217,0.7)" />
            <stop offset="88%" stopColor="rgba(217,217,217,0.7)" />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
          </linearGradient>
          <linearGradient id="threadFade3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,1)" />
            <stop offset="18%" stopColor="rgba(218,165,32,0.8)" />
            <stop offset="82%" stopColor="rgba(218,165,32,0.8)" />
            <stop offset="100%" stopColor="rgba(0,0,0,1)" />
          </linearGradient>

          {/* Neon glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {/* Hero text background shapes - optional */}
          {showHeroBackground && (
            <>
              <ellipse
                cx="300"
                cy="350"
                rx="400"
                ry="200"
                fill="url(#heroTextBg)"
                filter="url(#heroTextBlur)"
                opacity="0.6"
              />
              <ellipse
                cx="350"
                cy="320"
                rx="500"
                ry="250"
                fill="url(#heroTextBg)"
                filter="url(#heroTextBlur)"
                opacity="0.4"
              />
              <ellipse
                cx="400"
                cy="300"
                rx="600"
                ry="300"
                fill="url(#heroTextBg)"
                filter="url(#heroTextBlur)"
                opacity="0.2"
              />
            </>
          )}

          {/* Animated thread paths with pulsing circles */}
          <path
            id="thread1"
            d="M50 720 Q200 590 350 540 Q500 490 650 520 Q800 550 950 460 Q1100 370 1300 340 Q1500 310 1700 280 Q1900 250 2000 240"
            stroke="url(#threadFade1)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.8"
          />
          <circle r="2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#thread1" />
            </animateMotion>
          </circle>

          <path
            id="thread2"
            d="M80 730 Q250 620 400 570 Q550 520 700 550 Q850 580 1000 490 Q1150 400 1350 370 Q1550 340 1750 310 Q1950 280 2000 270"
            stroke="url(#threadFade2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <circle r="3" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="5s" repeatCount="indefinite">
              <mpath href="#thread2" />
            </animateMotion>
          </circle>

          <path
            id="thread3"
            d="M20 710 Q180 580 320 530 Q460 480 600 510 Q740 540 880 450 Q1020 360 1220 330 Q1420 300 1620 270 Q1820 240 2000 220"
            stroke="url(#threadFade3)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.8"
          />
          <circle r="2.5" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="4.5s" repeatCount="indefinite">
              <mpath href="#thread3" />
            </animateMotion>
          </circle>

          <path
            id="thread4"
            d="M120 740 Q280 640 450 590 Q620 540 770 570 Q920 600 1070 510 Q1220 420 1420 390 Q1620 360 1820 330 Q1920 320 2000 310"
            stroke="url(#threadFade1)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.6"
          />
          <circle r="1.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="5.5s" repeatCount="indefinite">
              <mpath href="#thread4" />
            </animateMotion>
          </circle>

          <path
            id="thread5"
            d="M60 725 Q220 600 380 550 Q540 500 680 530 Q820 560 960 470 Q1100 380 1300 350 Q1500 320 1700 290 Q1900 260 2000 250"
            stroke="url(#threadFade2)"
            strokeWidth="1.0"
            fill="none"
            opacity="0.7"
          />
          <circle r="2.2" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href="#thread5" />
            </animateMotion>
          </circle>

          <path
            id="thread6"
            d="M150 735 Q300 660 480 610 Q660 560 800 590 Q940 620 1080 530 Q1220 440 1420 410 Q1620 380 1820 350 Q1920 340 2000 330"
            stroke="url(#threadFade3)"
            strokeWidth="1.3"
            fill="none"
            opacity="0.6"
          />
          <circle r="2.8" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="5.2s" repeatCount="indefinite">
              <mpath href="#thread6" />
            </animateMotion>
          </circle>

          <path
            id="thread7"
            d="M40 715 Q190 585 340 535 Q490 485 630 515 Q770 545 910 455 Q1050 365 1250 335 Q1450 305 1650 275 Q1850 245 2000 235"
            stroke="url(#threadFade1)"
            strokeWidth="0.9"
            fill="none"
            opacity="0.8"
          />
          <circle r="2" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="4.8s" repeatCount="indefinite">
              <mpath href="#thread7" />
            </animateMotion>
          </circle>

          <path
            id="thread8"
            d="M100 728 Q260 630 420 580 Q580 530 720 560 Q860 590 1000 500 Q1140 410 1340 380 Q1540 350 1740 320 Q1940 290 2000 280"
            stroke="url(#threadFade2)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
          <circle r="3" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="5.8s" repeatCount="indefinite">
              <mpath href="#thread8" />
            </animateMotion>
          </circle>

          <path
            id="thread9"
            d="M30 722 Q170 595 310 545 Q450 495 590 525 Q730 555 870 465 Q1010 375 1210 345 Q1410 315 1610 285 Q1810 255 2000 245"
            stroke="url(#threadFade3)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
          <circle r="1.2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#thread9" />
            </animateMotion>
          </circle>

          <path
            id="thread10"
            d="M90 732 Q240 625 390 575 Q540 525 680 555 Q820 585 960 495 Q1100 405 1300 375 Q1500 345 1700 315 Q1900 285 2000 275"
            stroke="url(#threadFade1)"
            strokeWidth="1.1"
            fill="none"
            opacity="0.8"
          />
          <circle r="2.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
            <animateMotion dur="4.3s" repeatCount="indefinite">
              <mpath href="#thread10" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  )
}
