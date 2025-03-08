"use client"

import { Red_Rose, Rock_Salt, Red_Hat_Mono } from 'next/font/google'
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useSpring, animated } from "@react-spring/web"
import { throttle } from "lodash"
import Link from "next/link"
import ProjectsSection from '@/components/ProjectSection';
import MyLife from '@/components/Myjourney'



// Import fonts
const redRose = Red_Rose({ subsets: ["latin"], weight: ["300", "400", "700"] })
const rocksalt = Rock_Salt({ weight: "400", subsets: ["latin"] })
const redhatmono = Red_Hat_Mono({ weight: "400", subsets: ["latin"] })

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hoveredLetter, setHoveredLetter] = useState(null)
  const [hoveredNav, setHoveredNav] = useState(null)
  const nameRef = useRef(null)
  const heroRef = useRef(null)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, cols: 0, rows: 0 })

  // Add scroll animation controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Transform values for scroll animations
  const gridScale = useTransform(scrollYProgress, [0, 0.3], [1, 1])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Modified video transitions with reduced size
  const videoScale = useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1])
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const videoY = useTransform(scrollYProgress, [0.3, 0.5], [0, -50])

  const distortionProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Grid configuration
  const cellSize = 30 // Cell size in pixels
  const maxDistance = 200 // Maximum distance for shimmer effect (in pixels)
  const lineColor = "rgba(147, 51, 234, 0.15)" // Default grid line color
  const shimmerColor = "rgba(147, 51, 234, 0.8)" // Bright shimmer color

  // Spring animation for cursor
  const cursorSpring = useSpring({
    to: { x: position.x, y: position.y },
    config: { mass: 0.5, tension: 280, friction: 20 },
  })

  // Calculate grid dimensions based on hero section size
  useEffect(() => {
    if (!heroRef.current) return

    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)

      setDimensions({ width, height, cols, rows })
    }

    updateDimensions()

    // Use debounced resize handler for better performance
    const handleResize = throttle(updateDimensions, 200)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Removed unnecessary dependency: setDimensions

  // Handle mouse movement for custom cursor and grid shimmer
  useEffect(() => {
    // Use throttled mouse move handler for better performance
    const handleMouseMove = throttle((e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }, 10)

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      handleMouseMove.cancel()
    }
  }, [])

  // Generate horizontal and vertical grid lines with warping effect
  const gridLines = useMemo(() => {
    if (dimensions.cols === 0 || dimensions.rows === 0) return { horizontal: [], vertical: [] }

    const horizontal = []
    const vertical = []
    const currentDistortion = distortionProgress.get()

    // Create horizontal lines with warping
    for (let row = 0; row <= dimensions.rows; row++) {
      const warpY = row * cellSize + (dimensions.height / 2 - row * cellSize) * currentDistortion * 0.5

      horizontal.push({
        id: `h-${row}`,
        y: warpY,
        length: dimensions.width,
      })
    }

    // Create vertical lines with warping
    for (let col = 0; col <= dimensions.cols; col++) {
      const warpX = col * cellSize + (dimensions.width / 2 - col * cellSize) * currentDistortion * 0.5

      vertical.push({
        id: `v-${col}`,
        x: warpX,
        length: dimensions.height,
      })
    }

    return { horizontal, vertical }
  }, [dimensions, distortionProgress])

  const nameLetters = "Nijeesh NJ".split("")

  // 3D rotation for name
  const nameRotation = useTransform(scrollYProgress, [0, 0.2], [0, -15])
  const nameZ = useTransform(scrollYProgress, [0, 0.2], [0, -200])

  // Color shift for grid lines
  const gridColorTransform = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(147, 51, 234, 0.15)", "rgba(239, 68, 68, 0.15)"],
  )

  // Navigation items
  const navItems = [
    { name: "Projects", href: "/projects"},
    { name: "My Life", href: "/myjourney"},
    { name: "Contact Me", href: "/contact" },
    { name: "Resume", href: "https://drive.google.com/file/d/1c9KcVwLGuX1IvsG2lCQcFxS1_kO4r_Ey/view?usp=sharing", download: true },
  ];

  return (
    <div className="relative w-full bg-black" ref={containerRef}>
      {/* Main Hero Section */}
      <motion.div ref={heroRef} className="min-h-screen w-full overflow-hidden sticky top-0" style={{ zIndex: 10 }}>
        {/* Grid Background with transform */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{
            scale: gridScale,
            opacity: gridOpacity,
            perspective: "1000px",
            transformOrigin: "center center",
          }}
        >
          {/* Horizontal Grid Lines */}
          {gridLines.horizontal.map((line) => (
            <motion.div
              key={line.id}
              className="absolute left-0 w-full"
              style={{
                height: "1px",
                top: line.y,
                backgroundColor: gridColorTransform,
                zIndex: 1,
              }}
            >
              {/* Circular shimmer overlay for horizontal line */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  maskImage: `radial-gradient(circle ${maxDistance}px at ${position.x}px ${position.y - line.y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${maxDistance}px at ${position.x}px ${position.y - line.y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)`,
                  backgroundColor: shimmerColor,
                  boxShadow: "0 0 8px rgba(147, 51, 234, 0.8)",
                  zIndex: 2,
                  transition: "box-shadow 0.3s ease-out",
                  willChange: "box-shadow",
                }}
              />
            </motion.div>
          ))}

          {/* Vertical Grid Lines */}
          {gridLines.vertical.map((line) => (
            <motion.div
              key={line.id}
              className="absolute top-0 h-full"
              style={{
                width: "1px",
                left: line.x,
                backgroundColor: gridColorTransform,
                zIndex: 1,
              }}
            >
              {/* Circular shimmer overlay for vertical line */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  maskImage: `radial-gradient(circle ${maxDistance}px at ${position.x - line.x}px ${position.y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)`,
                  WebkitMaskImage: `radial-gradient(circle ${maxDistance}px at ${position.x - line.x}px ${position.y}px, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)`,
                  backgroundColor: shimmerColor,
                  boxShadow: "0 0 8px rgba(147, 51, 234, 0.8)",
                  zIndex: 2,
                  transition: "box-shadow 0.3s ease-out",
                  willChange: "box-shadow",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Radial Gradient Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)",
            zIndex: 2,
          }}
        />

        {/* Animated Mask Cursor */}
        <animated.div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          style={{
            left: cursorSpring.x,
            top: cursorSpring.y,
            transform: "translate(-50%, -50%)",
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "white",
            willChange: "transform",
          }}
        />

        {/* Styled Text with Terminal */}
        <motion.div
          className="absolute bottom-10 left-10 flex flex-col items-start z-10"
          style={{ opacity: textOpacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={`text-white text-8xl drop-shadow-lg tracking-wider font-normal ${redRose.className}`}
          >
            HEY I AM
          </motion.div>

          <motion.div
            ref={nameRef}
            className={`-mt-2 mb-5 text-purple-400 text-8xl tracking-wider ${rocksalt.className}`}
            style={{
              rotateX: nameRotation,
              z: nameZ,
              transformStyle: "preserve-3d",
            }}
          >
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: 0.5 + index * 0.1,
                }}
                style={{
                  display: "inline-block",
                  fontWeight: hoveredLetter === index ? "1000" : "400",
                  transition: "font-weight 0.3s ease",
                }}
                onMouseEnter={() => setHoveredLetter(index)}
                onMouseLeave={() => setHoveredLetter(null)}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className={`mt-2 text-gray-300 text-2xl tracking-widest font-semibold ${redhatmono.className}`}
          >
            SOFTWARE DEVELOPER | AI ENGINEER | TECH ENTHUSIAST
          </motion.div>
        </motion.div>

        {/* Quote Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{ opacity: textOpacity }}
          className={`absolute top-4 right-4 text-gray-300 text-xs text-right max-w-lg tracking-wider z-10 ${redhatmono.className}`}
        >
          "AN EFFECTIVE METHOD CAN (IN PRINCIPLE) BE CARRIED OUT BY A HUMAN BEING UNAIDED BY ANY MACHINERY EXCEPT PAPER
          AND PENCIL." <br />
          <span className="text-purple-400">- THE CHURCH-TURING THESIS</span>
        </motion.div>
      </motion.div>

      {/* Video Container Section with reveal effect - REDUCED SIZE */}
      <motion.div
        className="w-full bg-black py-16 relative"
        style={{
          opacity: videoOpacity,
          scale: videoScale,
          y: videoY,
          zIndex: 20,
          position: "relative", // Changed back to relative from sticky
        }}
      >
        <div className="max-w-4xl mx-auto p-6">
          {" "}
          {/* Reduced from max-w-6xl to max-w-3xl */}
          {/* Video with emergence effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden border border-zinc-700 shadow-lg rounded-xl cursor-pointer hover:shadow-purple-500/20 transition-shadow duration-300"
            style={{
              aspectRatio: "21/9",
              transformOrigin: "center center",
              perspective: "1000px",
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Video content */}
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <div className="text-center w-full h-full">
                <video className="w-full h-full object-cover" src="/My Video19.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="absolute inset-0 bg-black/1 backdrop-blur-s flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className={`text-4xl font-normal text-white mb-2 ${redRose.className}`}>
                    {" "}
                    {/* Reduced from text-6xl to text-4xl */}
                    AI Short Filmmaking
                  </h3>
                  <p className={`text-sm text-gray-200 mb-4 ${redhatmono.className}`}>
                    {" "}
                    {/* Reduced from text-lg to text-sm */}
                    Made during 100x Buildathon
                  </p>
                  <button
                    className={`px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-sm ${redRose.className}`}
                    onClick={() => window.open("https://youtu.be/uy5L9MVJgR0?si=Kw8yk-hAdsFS8-cQ", "_blank")}
                  >
                    {" "}
                    {/* Reduced button size */}
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Vertical Navigation Bar */}
      <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          style={{
            opacity: textOpacity, // Add scroll-based opacity
            display: scrollYProgress.get() > 0.3 ? 'none' : 'flex' // Hide navigation after scrolling
          }}
          className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-6"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredNav(index)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {item.download ? (
                <a 
                  href={item.href} 
                  download
                  className={`text-xl ${redhatmono.className} relative`}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      hoveredNav === index ? "text-purple-400" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 right-0 h-[1px] bg-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredNav === index ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              ) : (
                <Link href={item.href} className={`text-xl ${redhatmono.className} relative`}>
                  <span
                    className={`transition-colors duration-300 ${
                      hoveredNav === index ? "text-purple-400" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 right-0 h-[1px] bg-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredNav === index ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
    </div>
  )
}
