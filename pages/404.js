"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [randomBubbles, setRandomBubbles] = useState([])
  const [isHovering, setIsHovering] = useState(false)
  const buttonRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [sparkles, setSparkles] = useState([])

  // Generate random bubbles on component mount
  useEffect(() => {
    setMounted(true)

    // Generate random bubbles data
    const bubbles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 50,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      xOffset: Math.random() * 40 - 20,
      yOffset: Math.random() * 40 - 20,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    setRandomBubbles(bubbles)

    // Generate decorative shapes
    const shapes = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 20,
      type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
    }))

    setSparkles(shapes)

    // Track mouse position for hover effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Generate sparkles on button hover
  const generateSparkle = () => {
    if (!buttonRef.current || !isHovering) return null

    const rect = buttonRef.current.getBoundingClientRect()
    const sparkle = {
      id: Date.now(),
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: Math.random() * 10 + 2,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
    }

    return sparkle
  }

  // Custom Button component with enhanced hover effects
  const SuperButton = ({ children, href }) => {
    const [sparkleList, setSparkleList] = useState([])

    useEffect(() => {
      if (!isHovering) {
        setSparkleList([])
        return
      }

      const interval = setInterval(() => {
        const newSparkle = generateSparkle()
        if (newSparkle) {
          setSparkleList((prev) => [...prev.slice(-20), newSparkle]) // Keep only last 20 sparkles
        }
      }, 50)

      return () => clearInterval(interval)
    }, [isHovering])

    return (
      <motion.div
        className="relative"
        ref={buttonRef}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        whileHover={{ scale: 1.05 }}
      >
        <motion.a
          href={href}
          className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg font-medium text-base z-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
          whileHover={{
            boxShadow: "0 0 25px 5px rgba(59, 130, 246, 0.5)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 0.5,
              scale: 1.1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white rounded-lg opacity-0"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: 1.5,
              opacity: 0,
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                repeatDelay: 0,
              },
            }}
          />

          {/* Sparkles */}
          {sparkleList.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: sparkle.size,
                height: sparkle.size,
                backgroundColor: sparkle.color,
              }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: [1, 0.8, 0],
                scale: [0, 1, 0.5],
                y: sparkle.y - 20,
              }}
              transition={{ duration: 1 }}
              onAnimationComplete={() => {
                setSparkleList((prev) => prev.filter((s) => s.id !== sparkle.id))
              }}
            />
          ))}

          {/* Button text with subtle animation */}
          <motion.span
            className="relative z-10"
            animate={
              isHovering
                ? {
                    y: [0, -2, 0, 2, 0],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1,
                    },
                  }
                : {}
            }
          >
            {children}
          </motion.span>
        </motion.a>

        {/* Button reflection */}
        <motion.div
          className="absolute -bottom-4 left-0 right-0 h-4 mx-auto rounded-full blur-md opacity-30 bg-blue-400 dark:bg-blue-600"
          style={{ width: "80%" }}
          animate={
            isHovering
              ? {
                  width: ["80%", "90%", "80%"],
                  opacity: [0.3, 0.5, 0.3],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                  },
                }
              : {}
          }
        />
      </motion.div>
    )
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-neutral-990 dark:via-neutral-950 dark:to-blue-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {randomBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-br from-blue-300/20 to-indigo-300/20 dark:from-blue-500/10 dark:to-indigo-500/10"
            style={{
              top: `${bubble.y}%`,
              left: `${bubble.x}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: bubble.opacity,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, bubble.opacity, bubble.opacity * 0.7],
              x: [0, bubble.xOffset],
              y: [0, bubble.yOffset],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: bubble.delay,
            }}
          />
        ))}

        {/* Decorative shapes */}
        {sparkles.map((shape) => {
          // Different shapes based on type
          let ShapeComponent

          if (shape.type === 0) {
            // Circle
            ShapeComponent = (
              <motion.div
                key={shape.id}
                className="absolute rounded-full bg-blue-400/10 dark:bg-blue-400/5 border border-blue-300/20 dark:border-blue-500/10"
                style={{
                  top: `${shape.y}%`,
                  left: `${shape.x}%`,
                  width: `${shape.size}px`,
                  height: `${shape.size}px`,
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: shape.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: shape.delay,
                  ease: "linear",
                }}
              />
            )
          } else if (shape.type === 1) {
            // Square
            ShapeComponent = (
              <motion.div
                key={shape.id}
                className="absolute bg-indigo-400/10 dark:bg-indigo-400/5 border border-indigo-300/20 dark:border-indigo-500/10"
                style={{
                  top: `${shape.y}%`,
                  left: `${shape.x}%`,
                  width: `${shape.size}px`,
                  height: `${shape.size}px`,
                  rotate: `${shape.rotation}deg`,
                }}
                animate={{
                  rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: shape.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: shape.delay,
                }}
              />
            )
          } else {
            // Triangle (using clip-path)
            ShapeComponent = (
              <motion.div
                key={shape.id}
                className="absolute bg-blue-500/10 dark:bg-blue-500/5"
                style={{
                  top: `${shape.y}%`,
                  left: `${shape.x}%`,
                  width: `${shape.size * 1.5}px`,
                  height: `${shape.size * 1.5}px`,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
                initial={{ rotate: shape.rotation }}
                animate={{
                  rotate: [shape.rotation, shape.rotation + 360],
                  y: [`${shape.y}%`, `${shape.y + 2}%`, `${shape.y}%`],
                }}
                transition={{
                  rotate: {
                    duration: shape.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: shape.delay,
                    ease: "linear",
                  },
                  y: {
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: shape.delay,
                  },
                }}
              />
            )
          }

          return ShapeComponent
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 text-center">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Text with enhanced effects */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2,
              duration: 0.8,
            }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 dark:from-blue-400/10 dark:to-indigo-400/10 blur-md"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-400/20 dark:from-indigo-400/10 dark:to-blue-400/10 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />

            {/* Glitch effect container */}
            <div className="relative">
              {/* Shadow/glow layer */}
              <motion.div
                className="absolute inset-0 text-[150px] font-bold leading-none tracking-tighter text-blue-500/20 dark:text-blue-400/20 blur-md"
                animate={{
                  x: [0, -4, 6, -2, 0],
                  y: [0, 6, -2, 4, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                404
              </motion.div>

              {/* Main 404 text */}
              <h1 className="text-[150px] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400 relative z-10">
                404
              </h1>

              {/* Highlight effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 z-20"
                animate={{
                  opacity: [0, 0.5, 0],
                  x: [-100, 100],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 5,
                }}
              />
            </div>
          </motion.div>

          {/* Animated subtitle with enhanced effects */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Page not found
            </motion.h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg">
              The page you're looking for has vanished into the digital void.
            </p>

            {/* Enhanced animated line separator */}
            <div className="relative h-1 w-48 mx-auto my-8 overflow-hidden rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
              <motion.div
                className="absolute inset-0 h-full w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-0 h-full w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-70"
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3.5,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
            </div>

            {/* Super high-level hover effect button */}
            <motion.div
              className="mt-12"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <SuperButton href="/">Return to Home</SuperButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}