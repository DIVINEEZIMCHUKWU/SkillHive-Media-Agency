import { useState, useEffect } from 'react';
import { TeamMember, getTeam, parseImages } from '../lib/store';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function Team() {
 const [team, setTeam] = useState<TeamMember[]>([]);
 const [selectedImage, setSelectedImage] = useState<string | null>(null);

 useEffect(() => {
   const loadTeam = () => {
    setTeam(getTeam());
   };

   loadTeam();
   window.addEventListener('teamUpdated', loadTeam);
   return () => window.removeEventListener('teamUpdated', loadTeam);
 }, []);

 const defaultTeam: TeamMember[] = [
  {
   id: 'founder',
   name: 'DIVINE EZIMCHUKWU',
   role: 'Founder & Director',
   image: 'https://i.ibb.co/fYY6rHBM/bku0hr.jpg',
   bio: 'Leading SkillHive Media Agency with a vision to transform digital possibilities into business realities.'
  },
  {
   id: 'creative-design-strategist',
   name: 'DIVINE',
   role: 'CREATIVE DESIGN STRATEGIST',
   image: 'https://i.ibb.co/1GSpxP5M/1730521618530-1565127732.jpg',
   bio: 'Crafting visually compelling and strategically sound designs that elevate brand identities.'
  },
  {
   id: 'photographer-video-creator',
   name: 'FRANKLIN',
   role: 'Creative Photographer & Video Creator',
   image: 'https://i.ibb.co/Nndv9W7s/1762180417779.jpg',
   bio: 'Capturing moments and creating engaging visual stories through photography and videography.'
  },
  {
   id: 'video-editor',
   name: 'DABERECHI GIFT',
   role: 'Video Editor',
   image: 'https://i.ibb.co/gHbH7sn/1725716509480-01.jpg',
   bio: 'Crafting stunning visual narratives through expert video editing and post-production.'
  },
  {
   id: 'facebook-instagram-ad-expert',
   name: 'Goodluck',
   role: 'Creative Facebook & Instagram Ad Expert',
   image: 'https://i.ibb.co/9m7DMYzf/IMG-20260220-WA0052.jpg',
   bio: 'Designing and managing high-performing ad campaigns that drive target audience engagement.'
  },
  {
   id: 'esi-precious',
   name: 'ESI PRECIOUS',
   role: 'Social Media Manager, Video Editor & Graphic Designer',
   image: 'https://i.ibb.co/xK75BjXx/IMG-20260613-WA0042.jpg',
   bio: 'Crafting compelling social narratives, producing dynamic videos, and designing engaging graphics to amplify brand presence.'
  }
 ];

 const displayTeam = [...defaultTeam, ...team];

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow">
   <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Our Team</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
      The experts behind the strategies.
     </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
     {displayTeam.map((member, idx) => (
      <motion.div 
       key={member.id} 
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: idx * 0.1, duration: 0.5 }}
       className="group bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
      >
       <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
       
    <div 
     className={`relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-8 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 group-hover:border-brand-blue/30 group-hover:scale-105 transition-all duration-500 z-10 cursor-pointer ${member.name === 'DABERECHI GIFT' ? 'md:w-96 md:h-96 w-80 h-80' : ''}`}
        onClick={() => setSelectedImage(parseImages(member.image)[0])}
       >
        <img 
         src={parseImages(member.image)[0]} 
         alt={member.name} 
         className={`w-full h-full object-cover ${
          (member.name === 'DIVINE' || member.name === 'DIVINE EZIMCHUKWU') ? 'object-top' : (member.name === 'DABERECHI GIFT' ? 'object-top transform -translate-y-3 md:-translate-y-6' : 'object-center')
         }`}
         referrerPolicy="no-referrer"
        />
       </div>
       
       <div className="text-center relative z-10">
        <h3 className="text-2xl font-black text-brand-black dark:text-white mb-2 group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors duration-300">{member.name}</h3>
        <p className="text-brand-blue dark:text-blue-400 font-bold text-sm tracking-wider uppercase mb-4">{member.role}</p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
         {member.bio}
        </p>
       </div>
      </motion.div>
     ))}
    </div>
   </div>

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
       className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white transition-colors"
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
       alt="Team Member Fullscreen"
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
