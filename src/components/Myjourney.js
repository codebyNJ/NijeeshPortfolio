"use client"

import { Red_Rose, Red_Hat_Mono } from "next/font/google"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

// Import fonts
const redRose = Red_Rose({ subsets: ["latin"], weight: ["300", "400", "700"] })
const redhatmono = Red_Hat_Mono({ weight: "400", subsets: ["latin"] })

export default function MyLifeSection() {
  // Chat state
  const [chatMessages, setChatMessages] = useState([{ sender: "ai", text: "Hello! How can I help you today?" }])
  const [userInput, setUserInput] = useState("")
  const chatContainerRef = useRef(null)

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState({
    title: "Morning Coffee",
    category: "LOFI BEATS",
    image: "/placeholder.svg?height=300&width=300",
    audioSrc: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
  })

  const audioRef = useRef(null)

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Update time as audio plays
  useEffect(() => {
    const audio = audioRef.current

    const updateTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    if (audio) {
      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)
      audio.volume = volume
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [volume])

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (userInput.trim() === "") return

    // Add user message
    setChatMessages([...chatMessages, { sender: "user", text: userInput }])

    // Clear input
    setUserInput("")

    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm your AI assistant. I can help answer questions about music, technology, or anything else you're curious about!",
        },
      ])
    }, 1000)
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatContainerRef]) //Corrected dependency

  // Handle pressing Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className={`text-6xl text-white font-normal mb-3 ${redRose.className}`}>MYLIFE</h2>
          <div className="w-24 h-1 bg-purple-600"></div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Column 1: Spotify-like Music Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 space-y-6"
          >
            <div className="border border-zinc-700 rounded-xl bg-zinc-900/30 backdrop-blur-sm p-6 h-full">
              <h3 className={`text-3xl text-white font-normal mb-6 ${redRose.className}`}>My Music</h3>

              <div className="space-y-4">
                {/* Music Player */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/50"
                >
                  <div className={`text-sm text-purple-400 font-medium mb-1 ${redhatmono.className}`}>
                    {currentTrack.category}
                  </div>
                  <h4 className={`text-xl text-white font-normal mb-3 ${redRose.className}`}>{currentTrack.title}</h4>

                  {/* Album Art */}
                  <div className="mb-4">
                    <img
                      src={currentTrack.image || "/placeholder.svg"}
                      alt={currentTrack.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>

                  {/* Audio Element */}
                  <audio ref={audioRef} src={currentTrack.audioSrc} className="hidden" />

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-zinc-400 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="text-zinc-400 hover:text-white transition">
                        <SkipBack size={20} />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                      </button>
                      <button className="text-zinc-400 hover:text-white transition">
                        <SkipForward size={20} />
                      </button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Chat Application */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2"
          >
            <div className="border border-zinc-700 rounded-xl bg-zinc-900/30 backdrop-blur-sm p-6 h-full flex flex-col">
              <h3 className={`text-3xl text-white font-normal mb-6 ${redRose.className}`}>AI Chat</h3>

              {/* Chat Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-grow bg-zinc-900/70 rounded-lg p-4 mb-4 overflow-y-auto"
                style={{ maxHeight: "350px" }}
              >
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start ${message.sender === "user" ? "justify-end" : ""}`}
                    >
                      {message.sender === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2">
                          AI
                        </div>
                      )}

                      <div
                        className={`rounded-lg p-3 max-w-xs ${
                          message.sender === "ai" ? "bg-zinc-800" : "bg-purple-600/70"
                        }`}
                      >
                        <p className={`text-white ${redhatmono.className}`}>{message.text}</p>
                      </div>

                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-zinc-900 ml-2">
                          You
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`flex-grow bg-zinc-800/70 border border-zinc-700 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 ${redhatmono.className}`}
                  placeholder="Ask something..."
                />
                <button
                  onClick={handleSendMessage}
                  className={`bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-lg transition duration-300 ${redhatmono.className}`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

