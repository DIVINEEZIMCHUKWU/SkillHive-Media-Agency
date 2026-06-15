import { motion } from 'motion/react';
import { BrainCircuit, Video, Image as ImageIcon, Code, MessageSquare, Bot, AreaChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AISolutions() {
 const solutions = [
  {
   title: 'AI Video Content Creation',
   description: 'Generate professional, scroll-stopping videos faster. We use advanced AI models to script, storyboard, and edit high-quality marketing videos that tell your brand story and capture attention in seconds.',
   icon: <Video className="w-8 h-8" />
  },
  {
   title: 'AI Image Generation',
   description: 'Break free from stock photos. We create custom, ultra-realistic or artistically stylized AI-generated visuals for your ad campaigns, website, and social media that perfectly align with your brand identity.',
   icon: <ImageIcon className="w-8 h-8" />
  },
  {
   title: 'AI Website Assistant & Development',
   description: 'We integrate intelligent chatbots (like the one on this site) and build automated website systems that capture leads, answer questions 24/7, and guide your visitors toward conversion without human intervention.',
   icon: <Code className="w-8 h-8" />
  },
  {
   title: 'AI Business Consultation',
   description: 'Confused about how AI can actually help? We consult with your executive team to audit your current operations and provide a concrete roadmap on how to deploy AI to save time, reduce costs, and accelerate sales.',
   icon: <MessageSquare className="w-8 h-8" />
  },
  {
   title: 'AI Automation Systems',
   description: 'Stop doing repetitive tasks manually. We set up custom AI-driven workflows that connect your CRM, emails, and social media, automatically nurturing leads and managing appointments while you sleep.',
   icon: <Bot className="w-8 h-8" />
  },
  {
   title: 'AI Literacy & Team Training',
   description: 'Equip your staff with the skills they need to stay relevant. We provide hands-on training for individuals and corporate teams on how to effectively use ChatGPT, Midjourney, Claude, and other powerful AI tools securely.',
   icon: <AreaChart className="w-8 h-8" />
  }
 ];

 return (
  <div className="pt-20 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative overflow-hidden">
   {/* Background glowing effects */}
   <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/30 rounded-full blur-[120px] pointer-events-none"></div>
   <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>

   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div 
     initial={{ opacity: 0, y: 30 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8 }}
     className="text-center max-w-4xl mx-auto mb-24"
    >
     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue dark:text-blue-300 font-medium text-sm mb-6">
      <BrainCircuit className="w-4 h-4" />
      Next-Generation Intelligence
     </div>
     <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8 tracking-tight">
      Supercharge Your Growth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">AI Solutions</span>
     </h1>
     <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
      We don't just use AI; we build business ecosystems around it. Automate tasks, generate impossible content, and scale your operations faster than you ever thought possible.
     </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
     {solutions.map((solution, index) => (
      <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: "-50px" }}
       transition={{ duration: 0.5, delay: index * 0.1 }}
       key={index}
       className="bg-gray-50 dark:bg-[#0F0F12]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 p-10 rounded-3xl hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-colors group"
      >
       <div className="w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform shadow-inner border border-gray-200 dark:border-white/5">
        {solution.icon}
       </div>
       <h3 className="text-2xl font-bold text-brand-black dark:text-white mb-4 group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors">{solution.title}</h3>
       <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {solution.description}
       </p>
      </motion.div>
     ))}
    </div>

    <motion.div 
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="bg-gradient-to-r from-brand-blue to-blue-800 rounded-[3rem] p-16 text-center shadow-2xl border border-gray-200 dark:border-white/10"
    >
     <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Future-Proof Your Business?</h2>
     <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
      Stop letting your competitors use tools you don't understand. Partner with our AI specialists to integrate intelligence directly into your daily workflow.
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
       to="/book-consultation"
       className="bg-white text-brand-blue px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
       Book an AI Strategy Call
      </Link>
     </div>
    </motion.div>
   </div>
  </div>
 );
}
