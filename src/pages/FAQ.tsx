import { motion } from 'motion/react';

export default function FAQ() {
 const faqs = [
  {
   question: "How long does it take to see results?",
   answer: "While some paid campaigns can show results within 48 hours, organic SEO and complex brand building strategies typically require 3-6 months of consistent execution to yield massive returns. We build systems optimized for both short-term wins and long-term dominance."
  },
  {
   question: "Do you only work with clients in Nigeria?",
   answer: "No. SkillHive Media Agency is an international agency. We serve clients globally across North America, Europe, and Africa. Everything is managed digitally, and our communication process is seamless."
  },
  {
   question: "What makes SkillHive different from other agencies?",
   answer: "We don't just 'make posts.' We engineer complete sales systems. By combining human creativity with cutting-edge AI automation, we deliver faster implementations and higher ROI. We care about your bottom line, not just vanity metrics."
  },
  {
   question: "How does the AI consultation work?",
   answer: "Our AI experts audit your current operations, identify bottlenecks, and recommend specific AI tools and workflows (like custom chatbots or content generators) that will reduce your costs and accelerate your growth."
  }
 ];

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow">
   <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>

   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="text-center mb-16"
    >
     <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Questions</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to know about working with SkillHive.</p>
    </motion.div>

    <div className="space-y-8">
     {faqs.map((faq, idx) => (
      <motion.div
       key={idx}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: idx * 0.1 }}
       className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 hover:shadow-2xl transition-all"
      >
       <h3 className="text-xl font-bold text-brand-black dark:text-white mb-4">{faq.question}</h3>
       <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
      </motion.div>
     ))}
    </div>
   </div>
  </div>
 );
}
