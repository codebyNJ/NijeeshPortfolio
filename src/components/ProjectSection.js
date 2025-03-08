"use client";

import { Red_Rose, Rock_Salt, Red_Hat_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Import fonts
const redRose = Red_Rose({ subsets: ["latin"], weight: ["300", "400", "700"] });
const redhatmono = Red_Hat_Mono({ weight: "400", subsets: ["latin"] });

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "AI Research Agent",
      category: "AI Development",
      description: "AI agent that helps you in research on any topic using Smol Agent framework.",
      image: "/aiagent.mp4",
      isVideo: true,
      github: "https://github.com/codebyNJ/AIResearch_Agent.git"
    },
    {
      id: 2,
      title: "Offy.AI",
      category: "Mobile App Development",
      description: "Efficient on-device offline AI model inference using MediaPipe with optimized model screening.",
      image: "/project2.png",
      isVideo: false,
      github: "https://github.com/codebyNJ/offyai"
    },
    {
      id: 3,
      title: "EMNIST CNN model using pure math",
      category: "Machine Learning",
      description: "The whole EMNIST CNN ( convolutional neural network ) was created from stratch using jax and numpy. Having a model accuracy of 90.72%",
      image: "/ml-preview.jpg",
      isVideo: false,
      github: "https://github.com/codebyNJ/EMNIST-ML-model.git"
    },
    {
      id: 4,
      title: "GenZ Library",
      category: "Software Development",
      description: "A simple dictionary of GenZ terms and there meanings",
      image: "/genz-preview.png",
      isVideo: false,
      github: "https://github.com/codebyNJ/GenZ-Library.git"
    }
  ];

  // Handle project selection
  const handleProjectClick = (index) => {
    setActiveProject(index);
  };

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
          <h2 className={`text-6xl text-white font-normal mb-3 ${redRose.className}`}>
            PROJECTS
          </h2>
          <div className="w-24 h-1 bg-purple-600"></div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Column 1: Project List */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/3 space-y-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`cursor-pointer border-l-4 pl-4 py-3 transition-all duration-300 ${
                  activeProject === index
                    ? "border-purple-600 bg-zinc-900/50"
                    : "border-zinc-800 hover:border-purple-400"
                }`}
                onClick={() => handleProjectClick(index)}
              >
                <div className={`text-sm text-purple-400 font-medium mb-1 ${redhatmono.className}`}>
                  {project.category}
                </div>
                <h3 className={`text-2xl text-white font-normal ${redRose.className}`}>
                  {project.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Column 2: Project Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-2/3"
          >
            <motion.div
              key={projects[activeProject].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden border border-zinc-700 shadow-lg rounded-l-xl"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Project Media (Image or Video) */}
              <div className="w-full h-full">
                {projects[activeProject].isVideo ? (
                  <video 
                    className="w-full h-full object-cover" 
                    src={projects[activeProject].image}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                ) : (
                  <img 
                    className="w-full h-full object-cover"
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                  />
                )}
              </div>

              {/* Overlay with text and link */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-between p-8">
                <div>
                  <h3 className={`text-4xl text-white mb-3 ${redRose.className}`}>
                    {projects[activeProject].title}
                  </h3>
                  <p className={`text-lg text-gray-300 max-w-lg ${redhatmono.className}`}>
                    {projects[activeProject].description}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <a 
                    href={projects[activeProject].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors ${redhatmono.className}`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}