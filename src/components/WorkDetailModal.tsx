"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Award, Code } from "lucide-react";
import { WorkDetail } from "@/types/sanity";

interface WorkDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workDetails: WorkDetail[];
  companyName: string;
  role: string;
}

export function WorkDetailModal({ isOpen, onClose, workDetails, companyName, role }: WorkDetailModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-4xl w-full max-h-[80vh] overflow-hidden bg-background border rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b px-6 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-acorn-bold)]">{companyName}</h2>
                <p className="text-muted-foreground mt-1">{role}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-88px)] px-6 py-6">
            {workDetails.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No work details available for this position.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {workDetails.map((detail, index) => (
                  <motion.div
                    key={detail._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    {/* Project Title */}
                    <div>
                      <h3 className="text-xl font-semibold font-[family-name:var(--font-acorn-bold)] mb-2">
                        {detail.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{detail.description}</p>
                    </div>

                    {/* Technologies */}
                    {detail.technologies && detail.technologies.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Technologies Used</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {detail.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Achievements */}
                    {detail.achievements && detail.achievements.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Key Achievements</h4>
                        </div>
                        <ul className="space-y-2">
                          {detail.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Divider */}
                    {index < workDetails.length - 1 && (
                      <div className="border-t pt-8" />
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
