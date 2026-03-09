"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Users, Tag, Code, Lightbulb, Target, Award } from "lucide-react";
import { Project, ProjectDetail } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projectDetails: ProjectDetail[];
}

export function BottomDrawer({ isOpen, onClose, project, projectDetails }: BottomDrawerProps) {
  if (!isOpen || !project) return null;

  const statusColors = {
    completed: "bg-green-500",
    ongoing: "bg-blue-500",
    inDevelopment: "bg-yellow-500",
    onHold: "bg-gray-500"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 h-1/2 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 h-1/2 bg-background border-t shadow-2xl rounded-t-3xl"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[50vh] px-6 pb-6">
              {/* Header */}
              <div className="sticky top-0 bg-background/90 backdrop-blur-sm py-4 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-acorn-bold)] mb-2">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                        <span className="capitalize">{project.status.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-muted transition-colors"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              {project.featuredImage?.asset?._ref && (
                <div className="mb-6">
                  <img
                    src={urlFor(project.featuredImage.asset)?.url() || ""}
                    alt={project.featuredImage.alt || project.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Project Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Role & Client */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Role
                    </h3>
                    <p className="text-muted-foreground">{project.role}</p>
                  </div>
                  {project.client && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Client
                      </h3>
                      <p className="text-muted-foreground">{project.client}</p>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech._id}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tech.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    Overview
                  </h3>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {/* You'll need to add PortableText component here */}
                    <p className="text-muted-foreground">
                      Project description would be rendered here with PortableText
                    </p>
                  </div>
                </div>
              )}

              {/* Project Details */}
              {projectDetails.length > 0 && (
                <div className="space-y-6">
                  {projectDetails.map((detail, index) => (
                    <motion.div
                      key={detail._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      {/* Detail Title */}
                      <div>
                        <h4 className="text-lg font-semibold font-[family-name:var(--font-acorn-bold)] mb-2">
                          {detail.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">{detail.description}</p>
                      </div>

                      {/* Technologies */}
                      {detail.technologies && detail.technologies.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-2 flex items-center gap-2 text-sm">
                            <Code className="w-3 h-3 text-primary" />
                            Technologies Used
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {detail.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {detail.features && detail.features.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-2 flex items-center gap-2 text-sm">
                            <Lightbulb className="w-3 h-3 text-primary" />
                            Key Features
                          </h5>
                          <ul className="space-y-1">
                            {detail.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Challenges */}
                      {detail.challenges && detail.challenges.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-2 flex items-center gap-2 text-sm">
                            <Target className="w-3 h-3 text-primary" />
                            Challenges & Solutions
                          </h5>
                          <ul className="space-y-1">
                            {detail.challenges.map((challenge, challengeIndex) => (
                              <li key={challengeIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Divider */}
                      {index < projectDetails.length - 1 && (
                        <div className="border-t pt-6" />
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Project Link */}
              {project.url && (
                <div className="mt-6 pt-6 border-t">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
