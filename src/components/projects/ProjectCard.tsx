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
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }
    },
    open: {
      rotateY: -15,
      scale: 1.05,
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
        className="relative h-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl border border-amber-200 dark:border-amber-700/50 overflow-hidden shadow-lg"
        variants={folderOpenVariants}
        animate={isHovered ? "open" : "closed"}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Folder Tab */}
        <div className="absolute top-0 left-4 right-8 h-8 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-amber-800 dark:to-amber-700 rounded-t-lg transform -translate-y-2" />
        
        {/* Folder Content */}
        <div className="relative p-6 pt-10 h-full">
          {/* Project Image */}
          {project.featuredImage && (
            <div className="absolute inset-0 opacity-20">
              <img
                src={urlFor(project.featuredImage)?.url() || ""}
                alt={project.featuredImage.alt || project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Project Info */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white line-clamp-2">
                  {project.title}
                </h3>
                {project.isFeatured && (
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {project.role}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.techStack.slice(0, 3).map((tech, index) => (
                  <span
                    key={tech._id}
                    className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 text-xs font-medium rounded-md"
                  >
                    {tech.title}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 text-xs font-medium rounded-md">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{project.timeline}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {project.status.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
            </div>
          </div>

          {/* Files that appear on hover */}
          {isHovered && (
            <motion.div
              className="absolute top-12 right-4 space-y-2"
              variants={filesVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-8 h-10 bg-blue-200 dark:bg-blue-800 rounded shadow-md flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-6 h-8 bg-blue-300 dark:bg-blue-700 rounded-sm" />
              </motion.div>
              <motion.div
                className="w-8 h-10 bg-green-200 dark:bg-green-800 rounded shadow-md flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-6 h-8 bg-green-300 dark:bg-green-700 rounded-sm" />
              </motion.div>
              <motion.div
                className="w-8 h-10 bg-purple-200 dark:bg-purple-800 rounded shadow-md flex items-center justify-center"
                variants={fileVariants}
              >
                <div className="w-6 h-8 bg-purple-300 dark:bg-purple-700 rounded-sm" />
              </motion.div>
            </motion.div>
          )}

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="absolute bottom-4 right-4">
              <motion.div
                className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4 text-gray-900 dark:text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
