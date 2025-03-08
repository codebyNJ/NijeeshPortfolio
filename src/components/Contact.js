"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Red_Rose, Red_Hat_Mono, Rock_Salt } from "next/font/google"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaDiscord, FaInstagram } from "react-icons/fa"

// Font configurations
const redRose = Red_Rose({ subsets: ["latin"], weight: ["300", "400", "700"] })
const redhatmono = Red_Hat_Mono({ weight: "400", subsets: ["latin"] })
const rocksalt = Rock_Salt({ weight: "400", subsets: ["latin"] })

export default function ContactPage() {
  const [gridLines, setGridLines] = useState({ horizontal: [], vertical: [] })
  const containerRef = useRef(null)
  const [activeIcon, setActiveIcon] = useState(null)

  // Grid configuration
  const cellSize = 30
  const lineColor = "rgba(147, 51, 234, 0.15)"

  // Generate grid lines
  useEffect(() => {
    const updateGridLines = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      const horizontal = []
      const vertical = []

      for (let row = 0; row <= rows; row++) {
        horizontal.push({
          id: `h-${row}`,
          y: row * cellSize,
          length: width,
        })
      }

      for (let col = 0; col <= cols; col++) {
        vertical.push({
          id: `v-${col}`,
          x: col * cellSize,
          length: height,
        })
      }

      setGridLines({ horizontal, vertical })
    }

    updateGridLines()
    window.addEventListener("resize", updateGridLines)
    return () => window.removeEventListener("resize", updateGridLines)
  }, [])

  // Contact links with icons
  const contactLinks = [
    {
      id: "github",
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/codebyNJ",
      color: "text-purple-400",
      shadowColor: "shadow-purple-600/50"
    },
    {
      id: "linkedin",
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nijeesh-nj-062468285/",
      color: "text-blue-400",
      shadowColor: "shadow-blue-600/50"
    },
    {
      id: "email",
      icon: FaEnvelope,
      label: "Email",
      href: "mailto:nijeesh10th@gmail.com",
      color: "text-red-400",
      shadowColor: "shadow-red-600/50"
    },
    {
      id: "instagram",
      icon: FaInstagram,
      label: "Instagram",
      href: "https://instagram.com/_nijeeshnj",
      color: "text-pink-400",
      shadowColor: "shadow-pink-600/50"
    },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Grid Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Horizontal Grid Lines */}
        {gridLines.horizontal.map((line) => (
          <div
            key={line.id}
            className="absolute left-0 w-full"
            style={{
              height: "1px",
              top: line.y,
              backgroundColor: lineColor,
              zIndex: 1,
            }}
          />
        ))}

        {/* Vertical Grid Lines */}
        {gridLines.vertical.map((line) => (
          <div
            key={line.id}
            className="absolute top-0 h-full"
            style={{
              width: "1px",
              left: line.x,
              backgroundColor: lineColor,
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)",
          zIndex: 2,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6 lg:p-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className={`text-6xl lg:text-7xl text-white font-normal mb-3 ${redRose.className}`}>CONTACT</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
        </motion.div>

        {/* Magic UI Dock with 3D Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -10,
                rotateX: 10,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setActiveIcon(link.id)}
              onHoverEnd={() => setActiveIcon(null)}
              className={`relative flex flex-col items-center ${activeIcon && activeIcon !== link.id ? "opacity-70" : "opacity-100"} transition-opacity duration-300`}
            >
              <div 
                className={`
                  w-16 h-16 lg:w-20 lg:h-20 
                  rounded-full 
                  flex items-center justify-center 
                  transition-all duration-300
                  bg-black/30 
                  border border-purple-600/30
                  ${link.shadowColor}
                  shadow-2xl
                  hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]
                  transform hover:-translate-y-2 hover:rotate-6
                `}
              >
                <link.icon 
                  className={`
                    text-3xl lg:text-4xl 
                    ${link.color} 
                    transition-transform duration-300 
                    group-hover:scale-110
                  `} 
                />
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activeIcon === link.id ? 1 : 0,
                  y: activeIcon === link.id ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className={`mt-2 text-xs lg:text-sm font-medium ${redhatmono.className} text-purple-400`}
              >
                {link.label}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-gray-400 max-w-md text-center mt-12 lg:mt-24 ${redhatmono.className}`}
        >
          Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative
          ideas, or opportunities to be part of your vision.
        </motion.p>

        {/* Copyright Notice */}
        <div className={`text-gray-500 text-sm mt-8 text-center ${redhatmono.className}`}>
          © {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>
    </div>
  )
}