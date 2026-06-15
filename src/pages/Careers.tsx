import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
 return (
  <div className="pt-24 pb-32">
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
    >
     <div className="inline-block px-4 py-2 bg-blue-50 text-brand-blue font-semibold rounded-full mb-6">Join The Team</div>
     <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6 tracking-tight">Build the Future of Digital Marketing.</h1>
     <p className="text-xl text-gray-600 mb-16 leading-relaxed max-w-2xl mx-auto">
      We are always looking for hungry, creative, and strategic minds to join SkillHive Media Agency. Come build world-class systems with us.
     </p>
    </motion.div>

    <div className="bg-gray-50 rounded-[3rem] p-16 text-center border border-gray-100">
     <h2 className="text-3xl font-bold text-brand-black dark:text-white mb-4">No Open Roles Right Now.</h2>
     <p className="text-lg text-gray-600 mb-10">But we are always taking applications for talented designers, ad buyers, and AI enthusiasts.</p>
     <Link
      to="/contact"
      className="inline-flex items-center gap-2 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue hover:scale-105 transition-all shadow-xl"
     >
      Send Us Your Portfolio
      <ArrowRight className="w-5 h-5" />
     </Link>
    </div>
   </div>
  </div>
 );
}
