import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { BlogPost, getPosts, parseImages } from '../lib/store';
import { X, Calendar as CalendarIcon, Tag } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

export default function Blog() {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

 useEffect(() => {
  const handlePostsUpdated = () => setPosts(getPosts());
  setPosts(getPosts());
  window.addEventListener('postsUpdated', handlePostsUpdated);
  return () => window.removeEventListener('postsUpdated', handlePostsUpdated);
 }, []);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow">
   <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     className="text-center mb-20"
    >
     <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6 tracking-tight">Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Strategy</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Tactics, thoughts, and playbooks on how to grow your business in the modern digital landscape.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     {posts.length > 0 ? posts.map((post, idx) => (
      <motion.article
       key={post.id || idx}
       initial={{ opacity: 0, scale: 0.95 }}
       whileInView={{ opacity: 1, scale: 1 }}
       viewport={{ once: true }}
       transition={{ delay: (idx % 3) * 0.1 }}
       onClick={() => setSelectedPost(post)}
       className="group cursor-pointer bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-3xl p-6 hover:shadow-2xl hover:border-brand-blue/30 transition-all flex flex-col h-full"
      >
       <div className="h-48 bg-[#0a0f1c] rounded-2xl mb-6 overflow-hidden relative border border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
        <img src={post.image ? parseImages(post.image)[0] : `https://picsum.photos/seed/${idx+10}/800/600`} alt="Blog Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
       </div>
       <div className="flex items-center gap-4 mb-4">
        <span className="text-brand-blue dark:text-blue-400 font-bold text-sm tracking-widest uppercase">{post.category}</span>
        <span className="text-gray-500 text-sm">{post.date}</span>
       </div>
       <h3 className="text-2xl font-bold text-brand-black dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors leading-tight mb-4 flex-grow">{post.title}</h3>
       <div className="text-brand-blue font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">Read article →</div>
      </motion.article>
     )) : (
      <div className="col-span-3 text-center py-12">
       <p className="text-gray-500 text-lg">No blog posts published yet.</p>
      </div>
     )}
    </div>

    <AnimatePresence>
     {selectedPost && (
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8"
       onClick={() => setSelectedPost(null)}
      >
       <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
       >
        <button 
         onClick={() => setSelectedPost(null)}
         className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
        >
         <X size={24} />
        </button>
        <div className="overflow-y-auto no-scrollbar flex-grow bg-white dark:bg-[#0a0f1c]">
         <div className="h-64 sm:h-96 relative w-full border-b border-gray-200 dark:border-white/10 bg-[#0a0f1c]">
          <img src={selectedPost.image ? parseImages(selectedPost.image)[0] : `https://picsum.photos/seed/10/1200/600`} alt={selectedPost.title} className="w-full h-full object-cover" />
         </div>
         <div className="p-8 sm:p-12 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-6">
           <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">{selectedPost.category}</span>
           <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CalendarIcon className="w-4 h-4" /> {(selectedPost as any).publish_date || selectedPost.date}
           </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black mb-8 text-brand-black dark:text-white leading-tight">{selectedPost.title}</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
           <div className="ql-editor" dangerouslySetInnerHTML={{ __html: selectedPost.content || "" }} />
          </div>

          {selectedPost.tags && (
           <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-wrap gap-2 items-center">
            <Tag className="w-5 h-5 text-gray-400 mr-2" />
            {selectedPost.tags.split(',').map(tag => (
             <span key={tag} className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
              #{tag.trim()}
             </span>
            ))}
           </div>
          )}
         </div>
        </div>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </div>
 );
}
