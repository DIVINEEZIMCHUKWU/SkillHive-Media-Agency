import { motion, AnimatePresence } from 'motion/react';
import { ResultItem, parseImages } from '../lib/store';
import { X, Play, ExternalLink, CheckCircle2 } from 'lucide-react';
import ImageGallery from './ImageGallery';
import MediaRenderer from './MediaRenderer';

export default function ProjectModal({ project, isOpen, onClose }: { project: ResultItem | null, isOpen: boolean, onClose: () => void }) {
  if (!project || !isOpen) return null;
  const images = parseImages(project.image);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 h-screen overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-brand-black rounded-[2rem] shadow-2xl overflow-y-auto flex flex-col md:flex-row z-10 border border-gray-200 dark:border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/10 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-brand-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Media Area */}
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-[#0a0f1c] relative min-h-[300px] flex flex-col">
            {project.videoUrl ? (
               <div className="flex-grow relative">
                 <MediaRenderer interactive={true} src={project.videoUrl} alt={project.clientName} className="absolute inset-0 w-full h-full object-contain bg-black" />
               </div>
            ) : (
               <div className="flex-grow relative min-h-[320px]">
                 <ImageGallery images={images} altBase={project.clientName} onClose={onClose} />
               </div>
            )}
          </div>

          {/* Right: Info Area */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-2 block">{project.category}</span>
            <h2 className="text-3xl font-black text-brand-black dark:text-white mb-2">{project.clientName}</h2>
            <p className="text-gray-500 font-medium mb-8">{project.industry}</p>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">{project.metric}</span>
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">{project.metricLabel}</span>
              </div>
            </div>

            {project.description && (
              <div className="mb-8 font-medium text-gray-600 dark:text-gray-300">
                {project.description}
              </div>
            )}

            {project.problem && (
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> The Problem</h4>
                <p className="text-gray-600 dark:text-gray-400">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-blue"></div> Our Solution</h4>
                <p className="text-gray-600 dark:text-gray-400">{project.solution}</p>
              </div>
            )}

            {project.resultsAchieved && (
              <div className="mb-8 bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-800/30">
                <h4 className="font-bold text-green-700 dark:text-green-500 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Results Achieved</h4>
                <p className="text-green-900 dark:text-green-100/80">{project.resultsAchieved}</p>
              </div>
            )}

            {project.testimonial && (
              <div className="mb-8 italic border-l-4 border-brand-blue/30 pl-4 py-2">
                <p className="text-gray-700 dark:text-gray-300 font-medium">"{project.testimonial}"</p>
              </div>
            )}

            {project.ctaLink && (
              <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5">
                <a href={project.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-3 bg-brand-black dark:bg-white text-white dark:text-brand-black px-8 py-4 rounded-xl font-bold hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors">
                  {project.ctaText || 'View Live Project'}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
