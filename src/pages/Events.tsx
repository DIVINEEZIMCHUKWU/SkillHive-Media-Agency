import { Calendar, MapPin, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EventItem, getEvents, parseImages } from '../lib/store';
import { motion, AnimatePresence } from 'motion/react';
import MediaRenderer from '../components/MediaRenderer';

export default function Events() {
 const [events, setEvents] = useState<EventItem[]>([]);
 const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

 useEffect(() => {
  const loadEvents = () => setEvents(getEvents());
  loadEvents();
  window.addEventListener('eventsUpdated', loadEvents);
  return () => window.removeEventListener('eventsUpdated', loadEvents);
 }, []);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow min-h-screen">
   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Events</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400">
      Join us at our upcoming events or browse through our galleries of previous successful programs.
     </p>
    </div>

    {events.length === 0 ? (
     <div className="text-center text-gray-500 py-12 bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10">
      No events to display currently. Check back soon!
     </div>
    ) : (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((ev) => (
       <div key={ev.id} className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col hover:border-brand-blue/50 transition-colors cursor-pointer" onClick={() => {
         const firstImg = parseImages(ev.image)[0];
         if (firstImg) {
          setSelectedEvent(ev);
         }
       }}>
        <div className="h-64 relative">
         <MediaRenderer interactive={false} src={parseImages(ev.image)[0]} alt={ev.title} className="w-full h-full object-cover block" />
        </div>
        <div className="p-8 flex-grow flex flex-col">
         <h3 className="text-2xl font-bold mb-4">{ev.title}</h3>
         <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2 text-brand-blue font-medium">
           <Calendar className="w-5 h-5" /> {ev.date}
          </div>
          {ev.location && (
           <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5" /> {ev.location}
           </div>
          )}
         </div>
         <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-none text-sm leading-6 flex-grow line-clamp-3">
          {ev.description}
         </p>
        </div>
       </div>
      ))}
     </div>
    )}

    <AnimatePresence>
     {selectedEvent && (
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
       onClick={() => setSelectedEvent(null)}
      >
       <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative"
       >
        <button 
         onClick={() => setSelectedEvent(null)}
         className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
        >
         <X size={24} />
        </button>
        <div className="overflow-y-auto no-scrollbar flex-grow">
         <div className="h-64 sm:h-96 relative w-full">
          <MediaRenderer interactive={true} src={parseImages(selectedEvent.image)[0]} alt={selectedEvent.title} className="w-full h-full object-cover block" />
         </div>
         <div className="p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-brand-black dark:text-white">{selectedEvent.title}</h2>
          <div className="flex flex-wrap items-center gap-6 mb-8 text-lg bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
           <div className="flex items-center gap-3 text-brand-blue font-bold">
            <Calendar className="w-6 h-6" /> {selectedEvent.date}
           </div>
           {selectedEvent.location && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
             <MapPin className="w-6 h-6" /> {selectedEvent.location}
            </div>
           )}
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none px-2">
           <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {selectedEvent.description}
           </p>
          </div>
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
