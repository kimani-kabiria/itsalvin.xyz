/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Calendar, Star, ArrowRight } from "lucide-react";
import { Project } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface ModernProjectCardProps {
  project: Project;
  onClick: () => void;
  size?: "small" | "medium" | "large" | "wide";
}

export function ModernProjectCard({ project, onClick, size = "medium" }: ModernProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    small: "col-span-1 row-span-2",
    medium: "col-span-2 row-span-3", 
    large: "col-span-3 row-span-4",
    wide: "col-span-4 row-span-3"
  };

  const cardVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
    },
    hover: {
      scale: 1.02,
      rotate: [0, 1, -1, 0],
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    },
    pressed: {
      scale: 0.98,
      rotate: [0, -1, 1, 0],
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1, duration: 0.4 }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.2, duration: 0.3 }
    }
  };

  const statusColors = {
    completed: "from-green-500 to-green-600",
    ongoing: "from-blue-500 to-blue-600", 
    inDevelopment: "from-yellow-500 to-yellow-600",
    onHold: "from-gray-500 to-gray-600"
  };

  const statusBorderColors = {
    completed: "border-green-500",
    ongoing: "border-blue-500", 
    inDevelopment: "border-yellow-500",
    onHold: "border-gray-500"
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} cursor-pointer group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      onClick={onClick}
      variants={cardVariants}
      animate={isPressed ? "pressed" : isHovered ? "hover" : "idle"}
      whileHover={{ y: -8, z: 10 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/20 dark:from-gray-900/90 dark:via-gray-800/50 dark:to-gray-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl" />
      
      {/* Card Container */}
      <div className="relative h-full bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Project Image */}
        {project.featuredImage?.asset?._ref && (
          <div className="relative h-48 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: isHovered ? 1.05 : 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={urlFor(project.featuredImage.asset)?.url() || ""}
                alt={project.featuredImage.alt || project.title}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Animated border accent */}
            <motion.div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${statusColors[project.status]} opacity-70`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Status badge */}
            <div className="absolute top-4 right-4">
              <div className={`px-3 py-1.5 ${statusColors[project.status]} text-white text-xs font-medium rounded-full`}>
                {project.status.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>

            {/* Featured badge */}
            {project.isFeatured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="absolute top-4 left-4"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <motion.div 
            className="mb-4"
            variants={contentVariants}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {project.title}
            </h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {project.role}
            </motion.p>
            
            {/* Timeline */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{project.timeline}</span>
            </div>

            {/* Categories */}
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-md"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            className="mb-6"
            variants={contentVariants}
          >
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={tech._id}
                  className="px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-lg shadow-md"
                  variants={techVariants}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech.title}
                </motion.span>
              ))}
              {project.techStack.length > 3 && (
                <motion.span
                  className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600"
                  variants={techVariants}
                  style={{ transitionDelay: "0.5s" }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +{project.techStack.length - 3} more
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-auto flex items-center justify-between"
            variants={contentVariants}
          >
            {/* Project URL */}
            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}

            {/* View Details */}
            <motion.div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusBorderColors[project.status]} text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 ${
                isHovered ? `${statusColors[project.status]} text-gray-900 dark:text-white` : ''
              }`}
              whileHover={{ scale: 1.05, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hover effects overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            background: isHovered 
              ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
              : "transparent"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${project._id}-${i}`}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                initial={{ 
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.random() * 300 - 150,
                  y: Math.random() * 300 - 150,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
