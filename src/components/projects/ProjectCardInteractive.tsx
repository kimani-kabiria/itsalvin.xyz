"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Calendar, Users, Tag, Code, Star, ArrowRight } from "lucide-react";
import { Project } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  size?: "small" | "medium" | "large" | "wide";
}

export function ProjectCard({ project, onClick, size = "medium" }: ProjectCardProps) {
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
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    hover: {
      scale: 1.02,
      rotate: [0, 1, -1, 0],
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
    pressed: {
      scale: 0.98,
      rotate: [0, -1, 1, 0],
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
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
      
      {/* Project Image Background */}
      {project.featuredImage?.asset?._ref && (
        <motion.div 
          className="absolute inset-0 opacity-40"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={urlFor(project.featuredImage.asset)?.url() || ""}
            alt={project.featuredImage.alt || project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Animated border accent */}
      <motion.div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${statusColors[project.status]} opacity-70`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex flex-col justify-between mb-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white leading-tight">
                {project.title}
              </h3>
              {project.isFeatured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg"
                >
                  <Star className="w-4 h-4 fill-current" />
                </motion.div>
              )}
            </div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 font-medium text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {project.role}
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-3 text-base text-gray-500 dark:text-gray-400">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{project.timeline}</span>
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          variants={contentVariants}
        >
          {project.techStack.slice(0, 4).map((tech, index) => (
            <motion.span
              key={tech._id}
              className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 text-base font-medium rounded-xl shadow-md"
              variants={techVariants}
              style={{ transitionDelay: `${index * 0.1}s` }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech.title}
            </motion.span>
          ))}
          {project.techStack.length > 4 && (
            <motion.span
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-base font-medium rounded-xl border border-gray-300 dark:border-gray-600"
              variants={techVariants}
              style={{ transitionDelay: "0.5s" }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              +{project.techStack.length - 4} more
            </motion.span>
          )}
        </motion.div>

        {/* Status indicator */}
        <motion.div 
          className="flex items-center justify-between mt-auto"
          variants={contentVariants}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${statusColors[project.status]} shadow-xl`}
              animate={{ 
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? 360 : 0 
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
              {project.status.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>

          {/* Action indicator */}
          <motion.div
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-2 border-gray-200 dark:border-gray-600"
            variants={contentVariants}
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Hover effects overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
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
    </motion.div>
  );
}
