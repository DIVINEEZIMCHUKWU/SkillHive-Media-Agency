import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, X, Calendar as CalendarIcon } from 'lucide-react';
import { useState, useEffect, type MouseEvent } from 'react';
import { TrainingCourse, getCourses, parseImages } from '../lib/store';
import { motion, AnimatePresence } from 'motion/react';
import ImageCarousel from '../components/ImageCarousel';
import ImageGallery from '../components/ImageGallery';
import MediaRenderer from '../components/MediaRenderer';

export default function Training() {
 const [courses, setCourses] = useState<TrainingCourse[]>([]);
 const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);

 useEffect(() => {
  const handleCoursesUpdated = () => setCourses(getCourses());
  setCourses(getCourses());
  window.addEventListener('coursesUpdated', handleCoursesUpdated);
  return () => window.removeEventListener('coursesUpdated', handleCoursesUpdated);
 }, []);

 const handleEnroll = (e: MouseEvent, course: TrainingCourse) => {
  e.stopPropagation();
  if (course.link) {
   window.open(course.link, '_blank');
  }
 };

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow min-h-screen">
   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Workshops</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400">
      Learn the exact strategies and systems we use to generate results for our clients. Empower yourself or your team with our expert-led training programs.
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
     {courses.length > 0 ? courses.map((course) => (
       <div 
        key={course.id} 
        onClick={() => setSelectedCourse(course)}
        className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-2xl hover:border-brand-blue/30 transition-all cursor-pointer group"
       >
        {course.image && (
         <div className="aspect-[4/5] sm:aspect-square relative flex items-center justify-center overflow-hidden border-b border-gray-200 dark:border-white/10 bg-[#0a0f1c]">
          <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
          <ImageCarousel images={parseImages(course.image)} altBase={course.title} interactive={false} mediaClassName="w-full h-full object-contain" />
         </div>
        )}
        <div className="p-8 flex flex-col flex-grow">
         <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-4 group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors leading-tight">{course.title}</h2>
         <p className="text-gray-600 dark:text-gray-400 flex-grow leading-relaxed line-clamp-3 mb-6">{course.description}</p>
         
         {course.date && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
           <CalendarIcon className="w-4 h-4 text-brand-blue" />
           {course.date}
          </div>
         )}

         <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-white/5 relative z-20">
          <div className="flex flex-col">
           <span className="text-2xl font-black text-brand-black dark:text-white leading-none">{course.price || 'Free'}</span>
           {course.originalPrice && (
            <span className="text-sm text-gray-400 line-through mt-1">{course.originalPrice}</span>
           )}
          </div>
          <button 
           onClick={(e) => handleEnroll(e, course)}
           className="bg-brand-blue text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg text-sm uppercase tracking-wide"
          >
           Enroll Now
          </button>
         </div>
        </div>
       </div>
      )) : (
       <div className="col-span-3 text-center py-12">
        <p className="text-gray-500 text-lg">No training courses available at the moment.</p>
       </div>
      )}
    </div>

    <AnimatePresence>
     {selectedCourse && (
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8"
       onClick={() => setSelectedCourse(null)}
      >
       <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
       >
        <button 
         onClick={() => setSelectedCourse(null)}
         className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
        >
         <X size={24} />
        </button>
        <div className="overflow-y-auto no-scrollbar flex-grow bg-white dark:bg-[#0a0f1c]">
         {selectedCourse.image && (
          <div className="relative w-full border-b border-gray-200 dark:border-white/10 bg-[#0a0f1c] flex items-center justify-center min-h-[380px]">
            <div className="absolute top-4 left-4 z-20 rounded-full bg-black/70 text-white text-xs uppercase tracking-[0.2em] px-3 py-2 shadow-xl backdrop-blur-sm pointer-events-none">
              Swipe or click arrows to browse
            </div>
            <ImageGallery images={parseImages(selectedCourse.image)} altBase={selectedCourse.title} onClose={() => setSelectedCourse(null)} />
          </div>
         )}
         <div className="p-8 sm:p-12 max-w-3xl mx-auto">
          {selectedCourse.date && (
           <div className="flex items-center gap-2 text-brand-blue font-bold mb-4 uppercase tracking-wider text-sm">
            <CalendarIcon className="w-5 h-5" /> {selectedCourse.date}
           </div>
          )}
          <h1 className="text-3xl sm:text-5xl font-black mb-8 text-brand-black dark:text-white leading-tight">{selectedCourse.title}</h1>
          
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200 dark:border-white/10">
           <div className="flex flex-col">
            <span className="text-4xl font-black text-brand-black dark:text-white">{selectedCourse.price || 'Free'}</span>
            {selectedCourse.originalPrice && <span className="text-gray-400 line-through text-lg">{selectedCourse.originalPrice}</span>}
           </div>
           <button 
            onClick={(e) => handleEnroll(e, selectedCourse)}
            className="ml-auto bg-brand-blue text-white px-8 py-4 rounded-xl font-black hover:bg-blue-600 transition-colors shadow-xl text-lg flex items-center gap-2"
           >
            Enroll Now <ArrowRight className="w-5 h-5" />
           </button>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
           <p className="whitespace-pre-wrap leading-relaxed">{selectedCourse.description}</p>
          </div>
         </div>
        </div>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>

    <div className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md rounded-3xl p-16 text-center border border-gray-200 dark:border-white/5 relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent pointer-events-none"></div>
     <div className="relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold text-brand-black dark:text-white mb-6">Looking for Corporate Training?</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
       We offer customized, on-site or virtual training sessions tailored specifically for your marketing team's needs and goals.
      </p>
      <Link
       to="/contact"
       className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-blue text-brand-blue dark:text-blue-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-blue/10 transition-colors"
      >
       Inquire About Custom Training
       <ArrowRight className="w-5 h-5" />
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
