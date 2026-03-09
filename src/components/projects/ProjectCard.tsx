"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Calendar, Users, Tag } from "lucide-react";
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

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-2 row-span-2",
    large: "col-span-3 row-span-3",
    wide: "col-span-4 row-span-2"
  };

  const folderOpenVariants = {
    closed: {
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
    },
    open: {
      rotateX: -5,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  const filesVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: -5,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const fileVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const statusColors = {
    completed: "bg-green-500",
    ongoing: "bg-blue-500",
    inDevelopment: "bg-yellow-500",
    onHold: "bg-gray-500"
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Folder Container */}
      <motion.div
        className="relative h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-blue-200 dark:border-gray-600 overflow-hidden shadow-xl"
        variants={folderOpenVariants}
        animate={isHovered ? "open" : "closed"}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Folder Tab - Document Style */}
        <motion.div 
          className="absolute top-0 left-4 right-8 h-8 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-gray-700 dark:to-gray-600 rounded-t-lg origin-left"
          variants={folderOpenVariants}
        />
        
        {/* Folder Content */}
        <div className="relative p-6 pt-10 h-full">
          {/* Project Image */}
          {project.featuredImage?.asset?._ref && (
            <div className="absolute inset-0 opacity-15">
              <img
                src={urlFor(project.featuredImage.asset)?.url() || ""}
                alt={project.featuredImage.alt || project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Project Info */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white line-clamp-2">
                  {project.title}
                </h3>
                {project.isFeatured && (
                  <div className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    ★
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 mb-2">
                {project.role}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-2">
                {project.techStack.slice(0, 2).map((tech, index) => (
                  <span
                    key={tech._id}
                    className="px-1.5 py-0.5 bg-white/60 dark:bg-gray-700/60 text-xs font-medium rounded"
                  >
                    {tech.title}
                  </span>
                ))}
                {project.techStack.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-white/60 dark:bg-gray-700/60 text-xs font-medium rounded">
                    +{project.techStack.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{project.timeline}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {project.status.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            </div>
          </div>

          {/* Documents that appear on hover - Document Style */}
          {isHovered && (
            <motion.div
              className="absolute top-10 right-3 space-y-1"
              variants={filesVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-6 h-8 bg-white dark:bg-gray-200 rounded-sm shadow-md border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-4 h-6 bg-blue-500 dark:bg-blue-600 rounded-sm" />
              </motion.div>
              <motion.div
                className="w-6 h-8 bg-white dark:bg-gray-200 rounded-sm shadow-md border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-4 h-6 bg-green-500 dark:bg-green-600 rounded-sm" />
              </motion.div>
              <motion.div
                className="w-6 h-8 bg-white dark:bg-gray-200 rounded-sm shadow-md border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-4 h-6 bg-red-500 dark:bg-red-600 rounded-sm" />
              </motion.div>
            </motion.div>
          )}

          {/* Hover Overlay with folder open effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-100/30 to-transparent dark:from-gray-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {/* Folder opening effect lines */}
            <motion.div
              className="absolute top-2 left-2 right-2 h-0.5 bg-blue-300 dark:bg-gray-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="absolute bottom-2 left-2 right-2 h-0.5 bg-blue-300 dark:bg-gray-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            />
            
            <div className="absolute bottom-3 right-3">
              <motion.div
                className="w-6 h-6 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-3 h-3 text-gray-700 dark:text-gray-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
