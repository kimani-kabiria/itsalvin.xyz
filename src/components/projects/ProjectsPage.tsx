"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ModernProjectCard } from "./ModernProjectCard";
import { ProjectDetailPanel } from "./ProjectDetailPanel";
import { WorkHeader } from "./WorkHeader";
import { CategoryFilter } from "./CategoryFilter";
import { useProjectDetails } from "@/hooks/api/projects";
import { Project } from "@/types/sanity";

interface ProjectsPageProps {
  projects: Project[];
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { projectDetails, isLoading, isError, error } = useProjectDetails(
    selectedProject?._id || ''
  );

  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projects.filter(project => 
        project.categories?.some(category => category._id === selectedCategory)
      )
    : projects;

  // Determine card sizes for bento grid layout
  const getCardSize = (index: number, isFeatured: boolean): "large" | "wide" | "medium" | "small" => {
    // For 2 projects or fewer, make them both large for better visual impact
    if (filteredProjects.length <= 2) {
      return "large";
    }
    
    if (isFeatured) {
      // Featured projects get larger sizes
      const sizes: ("large" | "wide" | "medium")[] = ["large", "wide", "large"];
      return sizes[index % sizes.length];
    }
    
    // Regular projects get varied sizes for bento grid
    const sizes: ("medium" | "small")[] = ["medium", "small", "medium", "small"];
    return sizes[index % sizes.length];
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProject(null);
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
      <WorkHeader projectsCount={filteredProjects.length} />

      {/* Category Filter */}
      <div className="py-6">
        <CategoryFilter
          projects={projects}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Bento Grid */}
      <div className="pb-8">
        {filteredProjects.length === 0 ? (
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
            className={`grid gap-6 ${
              filteredProjects.length <= 2 
                ? 'grid-cols-1 md:grid-cols-2 auto-rows-[400px]' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[300px]'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="relative"
              >
                <ModernProjectCard
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

      {/* Project Detail Panel */}
      <ProjectDetailPanel
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        project={selectedProject}
        projectDetails={projectDetails}
      />
    </div>
  );
}
