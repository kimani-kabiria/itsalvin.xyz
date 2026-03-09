import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from '@/sanity/client';
import type { Post } from '@/types/sanity';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'motion/react';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface PostCardProps {
  post: Post;
  isFeatured?: boolean;
}

export function PostCard({ post, isFeatured = false }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Physics-based spring animations
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 400, damping: 25 });
  const rotateX = useSpring(0, { stiffness: 200, damping: 15 });
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.1), transparent)`;

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
    y.set(-4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    y.set(0);
    rotateX.set(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    
    // Subtle 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 20;
    rotateX.set(rotateXValue);
  };

  return (
    <motion.article 
      className={`
        group bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden 
        border border-gray-200 dark:border-gray-700 h-full relative
        ${isFeatured ? 'p-6' : 'p-4'}
      `}
      style={{ scale, y, rotateX, background }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: Math.random() * 0.2 // Stagger effect
      }}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Link href={`/blog/${post.slug.current}`} className="block h-full relative">
        {post.mainImage && (
          <motion.div 
            className={`
              overflow-hidden relative
              ${isFeatured ? 'aspect-[16/9] mb-4' : 'aspect-video'}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.img
              src={urlFor(post.mainImage)?.url() || '/placeholder.jpg'}
              alt={post.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
              }}
            />
            
            {/* Overlay gradient on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Read more indicator */}
            <motion.div 
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2"
              initial={{ x: 20, opacity: 0, scale: 0.8 }}
              animate={{ 
                x: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <ArrowRight className="w-4 h-4 text-gray-900 dark:text-white" />
            </motion.div>
          </motion.div>
        )}
        
        <div className="flex flex-col h-full justify-between">
          <div>
            <motion.div 
              className={`
                flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3
                ${isFeatured ? 'text-base' : 'text-sm'}
              `}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <time className="flex items-center gap-1">
                <motion.div
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Calendar className="w-4 h-4" />
                </motion.div>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              {post.author && (
                <span className="flex items-center gap-1">
                  <motion.div
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <User className="w-4 h-4" />
                  </motion.div>
                  {post.author.name}
                </span>
              )}
            </motion.div>

            <motion.h2 
              className={`
                font-bold font-[family-name:var(--font-acorn-bold)] text-gray-900 dark:text-white mb-3 line-clamp-2
                ${isFeatured ? 'text-2xl' : 'text-xl'}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                color: isHovered ? "#2563eb" : "#111827"
              }}
              transition={{ 
                delay: 0.3,
                color: { type: "spring", stiffness: 300 }
              }}
            >
              {post.title}
            </motion.h2>

            {isFeatured && post.categories && post.categories.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {post.categories.map((category, index) => (
                  <motion.span
                    key={category._id}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 400
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#dbeafe"
                    }}
                  >
                    {category.title}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>

          {!isFeatured && post.categories && post.categories.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {post.categories.map((category, index) => (
                <motion.span
                  key={category._id}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 400
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#dbeafe"
                  }}
                >
                  {category.title}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
