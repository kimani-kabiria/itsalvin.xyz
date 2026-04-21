"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Calendar, Users, Tag, Code, Lightbulb, Target, Award, ChevronRight, Globe } from "lucide-react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Project, ProjectDetail } from "@/types/sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface ProjectDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  projectDetails: ProjectDetail[];
}

export function ProjectDetailPanel({ isOpen, onClose, project, projectDetails }: ProjectDetailPanelProps) {
  if (!isOpen || !project) return null;

  const statusGradients = {
    completed: "from-emerald-500 to-teal-600",
    ongoing: "from-blue-500 to-indigo-600",
    inDevelopment: "from-amber-500 to-orange-600", 
    onHold: "from-slate-500 to-gray-600"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Right Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-3/4 lg:w-1/2 xl:w-2/5 bg-gradient-to-l from-background to-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl overflow-hidden"
          >
            {/* Handle - Desktop Only */}
            <div className="hidden md:flex justify-center py-4">
              <motion.div 
                className="w-16 h-1.5 bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/50 to-muted-foreground/30 rounded-full"
                whileHover={{ scale: 1.2, opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-full px-6 pb-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {/* Header */}
              <div className="sticky top-0 bg-background/65 backdrop-blur-lg backdrop-saturate-150 rounded-xl p-4 mb-6 border-b border-border/30 z-10 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <motion.h2 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-bold font-[family-name:var(--font-acorn-bold)] mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent truncate"
                    >
                      {project.title}
                    </motion.h2>
                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-medium">{project.timeline}</span>
                      </motion.div>
                      <motion.div 
                        className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${statusGradients[project.status]} text-white rounded-full`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-white/80`} />
                        <span className="font-medium capitalize">{project.status.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </motion.div>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl p-3 bg-muted/50 hover:bg-muted transition-all duration-200 hover:scale-105"
                    aria-label="Close panel"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Featured Image */}
              {project.featuredImage?.asset?._ref && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="relative group">
                    <Image
                      src={urlFor(project.featuredImage.asset)?.url() || ""}
                      alt={project.featuredImage.alt || project.title}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              )}

              {/* Project Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Role Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/20 rounded-xl">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Role</h3>
                  </div>
                  <p className="text-muted-foreground font-medium">{project.role}</p>
                </motion.div>

                {/* Client Card */}
                {project.client && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/20 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-amber-500/20 rounded-xl">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <h3 className="font-semibold text-foreground">Client</h3>
                    </div>
                    <p className="text-muted-foreground font-medium">{project.client}</p>
                  </motion.div>
                )}
              </div>

              {/* Categories */}
              {project.categories && project.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <motion.span
                        key={category._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + project.categories.indexOf(category) * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {category.title}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={tech._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-background to-muted border border-border/50 rounded-xl text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {tech.title}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              {project.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">Overview</h3>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {/* Debug: Show raw data structure */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="mb-4 p-2 bg-muted rounded text-xs">
                          <details>
                            <summary>Debug: Description data structure</summary>
                            <pre>{JSON.stringify(project.description, null, 2)}</pre>
                          </details>
                        </div>
                      )}
                      <PortableText 
                        value={project.description}
                        components={{
                          block: {
                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
                            normal: ({ children }) => (
                              <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-primary pl-4 italic">{children}</blockquote>
                            ),
                          },
                          marks: {
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            link: ({ children, value }) => (
                              <a 
                                href={value?.href} 
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),
                          },
                          list: {
                            bullet: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                            number: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                          },
                          listItem: {
                            bullet: ({ children }) => <li className="mb-1">{children}</li>,
                            number: ({ children }) => <li className="mb-1">{children}</li>,
                          },
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Project Details */}
              {projectDetails.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-6"
                >
                  {projectDetails.map((detail, index) => (
                    <motion.div
                      key={detail._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="bg-gradient-to-br from-background to-muted/30 border border-border/50 rounded-2xl p-6 space-y-6 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Detail Title */}
                      <div>
                        <h4 className="text-xl font-bold font-[family-name:var(--font-acorn-bold)] mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                          {detail.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed text-lg">{detail.description}</p>
                      </div>

                      {/* Technologies */}
                      {detail.technologies && detail.technologies.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                              <Code className="w-4 h-4 text-white" />
                            </div>
                            Technologies Used
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {detail.technologies.map((tech) => (
                              <motion.span
                                key={tech}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {detail.features && detail.features.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                              <Lightbulb className="w-4 h-4 text-white" />
                            </div>
                            Key Features
                          </h5>
                          <ul className="space-y-2">
                            {detail.features.map((feature, featureIndex) => (
                              <motion.li 
                                key={feature} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 + featureIndex * 0.05 }}
                                className="flex items-start gap-3 text-muted-foreground"
                              >
                                <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Challenges */}
                      {detail.challenges && detail.challenges.length > 0 && (
                        <div>
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <div className="p-1.5 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                              <Target className="w-4 h-4 text-white" />
                            </div>
                            Challenges & Solutions
                          </h5>
                          <ul className="space-y-2">
                            {detail.challenges.map((challenge, challengeIndex) => (
                              <motion.li 
                                key={challenge} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 + challengeIndex * 0.05 }}
                                className="flex items-start gap-3 text-muted-foreground"
                              >
                                <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{challenge}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Project Link */}
              {project.url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mt-6 py-6 border-t border-border/30"
                >
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe className="w-5 h-5" />
                    View Live Project
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
