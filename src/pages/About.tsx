import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Zap, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function About() {
 const [selectedImage, setSelectedImage] = useState<string | null>(null);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative overflow-hidden">
   <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
   <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Hero */}
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">SkillHive Media</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400">
      We are a team of strategists, creatives, and growth experts dedicated to turning your online presence into a profitable asset.
     </p>
    </div>

    {/* Story */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
     <div className="grid grid-cols-2 gap-4">
      <motion.img 
       src="https://i.ibb.co/yD28NLm/Chat-GPT-Image-Jun-13-2026-10-08-08-AM.png" 
       alt="Highlight 1" 
       className="w-full h-full object-cover rounded-3xl col-span-2 shadow-lg h-64 md:h-72 cursor-pointer hover:opacity-90 transition-opacity"
       referrerPolicy="no-referrer"
       onClick={() => setSelectedImage("https://i.ibb.co/yD28NLm/Chat-GPT-Image-Jun-13-2026-10-08-08-AM.png")}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
      />
      <motion.img 
       src="https://i.ibb.co/ns75m3vX/Chat-GPT-Image-Jun-13-2026-10-05-03-AM.png" 
       alt="Highlight 2" 
       className="w-full h-full object-cover rounded-3xl shadow-lg col-span-2 aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity"
       referrerPolicy="no-referrer"
       onClick={() => setSelectedImage("https://i.ibb.co/ns75m3vX/Chat-GPT-Image-Jun-13-2026-10-05-03-AM.png")}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: 0.1 }}
      />
     </div>
     <div>
      <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">Our Story</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
       SkillHive Media Agency was born out of a simple observation: too many great businesses were struggling to translate their real-world value into online success. They were posting without a plan, running ads without a strategy, and wondering why they weren't growing.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
       We set out to change that. We don't just offer services; we build comprehensive digital systems designed to capture attention, build trust, and drive consistent sales.
      </p>
     </div>
    </div>

    {/* Mission & Vision */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
     <div className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-3xl p-10 shadow-sm hover:border-brand-blue/30 transition-colors group">
      <div className="w-14 h-14 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
       <Target className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-brand-black dark:text-white mb-4">Our Mission</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
       To empower businesses and creators with the strategies, content, and systems they need to dominate their market and achieve sustainable growth.
      </p>
     </div>
     <div className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-3xl p-10 shadow-sm hover:border-brand-blue/30 transition-colors group">
      <div className="w-14 h-14 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
       <Eye className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-brand-black dark:text-white mb-4">Our Vision</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
       To be the premier growth partner for ambitious brands worldwide, recognized for our transparency, innovation, and undeniable results.
      </p>
     </div>
     <div className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-3xl p-10 shadow-sm hover:border-brand-blue/30 transition-colors group">
      <div className="w-14 h-14 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
       <Zap className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-brand-black dark:text-white mb-4">Our Approach</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
       Data-driven decisions combined with scroll-stopping creativity. We test, we measure, and we optimize relentlessly to ensure your success.
      </p>
     </div>
    </div>

    {/* CTA */}
    <div className="bg-gradient-to-br from-brand-blue to-blue-800 rounded-3xl p-16 text-center border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
     <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-10 mix-blend-overlay"></div>
     <div className="relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to partner with us?</h2>
      <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
       Let's discuss how we can help you achieve your business goals.
      </p>
      <Link
       to="/get-started"
       className="inline-flex items-center gap-2 bg-white text-brand-black hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl"
      >
       Book a Consultation
       <ArrowRight className="w-5 h-5" />
      </Link>
     </div>
    </div>
   </div>

   {/* Image Modal Lightbox */}
   <AnimatePresence>
    {selectedImage && (
     <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 lg:p-8"
      onClick={() => setSelectedImage(null)}
     >
      <button 
       className="absolute top-6 right-6 lg:top-10 lg:right-10 text-brand-black dark:text-white/70 hover:text-brand-black dark:text-white transition-colors"
       onClick={() => setSelectedImage(null)}
      >
       <X size={32} />
      </button>
      <motion.img 
       initial={{ scale: 0.9, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.9, opacity: 0 }}
       transition={{ type: "spring", damping: 25, stiffness: 300 }}
       src={selectedImage} 
       alt="Fullscreen Highlight" 
       className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
       referrerPolicy="no-referrer"
       onClick={(e) => e.stopPropagation()}
      />
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
}
