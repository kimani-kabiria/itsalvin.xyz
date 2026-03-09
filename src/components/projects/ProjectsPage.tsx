"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { BottomDrawer } from "./BottomDrawer";
import { Project, ProjectDetail } from "@/types/sanity";

interface ProjectsPageProps {
  projects: Project[];
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetail[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Determine card sizes for bento grid layout
  const getCardSize = (index: number, isFeatured: boolean): "large" | "wide" | "medium" | "small" => {
    if (isFeatured) {
      // Featured projects get larger sizes
      const sizes: ("large" | "wide" | "medium")[] = ["large", "wide", "medium"];
      return sizes[index % sizes.length];
    }
    
    // Regular projects get smaller sizes
    const sizes: ("medium" | "small")[] = ["medium", "small", "small", "medium"];
    return sizes[index % sizes.length];
  };

  const handleProjectClick = async (project: Project) => {
    setSelectedProject(project);
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/project-details?projectId=${project._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }
      const details = await response.json();
      setProjectDetails(details);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
      // Still open drawer with basic project info
      setIsDrawerOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProject(null);
    setProjectDetails([]);
  };

  // Bento grid animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 left-0 w-full z-30 bg-background/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-acorn-bold)]">
                My Projects
              </h1>
              <p className="text-muted-foreground mt-1">
                A collection of my work and side projects
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {projects.length} projects
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container mx-auto px-6 py-8">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-muted-foreground/20 rounded" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground">Projects will appear here once you add them to your Sanity studio</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="relative"
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                  size={getCardSize(index, project.isFeatured)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project details...</p>
          </div>
        </div>
      )}

      {/* Bottom Drawer */}
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        project={selectedProject}
        projectDetails={projectDetails}
      />
    </div>
  );
}
