import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import {
 ArrowRight,
 BarChart3,
 Megaphone,
 PenTool,
 Globe,
 CheckCircle2,
 Play,
 Users,
 Trophy,
 Target,
 X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ResultItem, EventItem, TestimonialItem, getResults, getEvents, getTestimonials, parseImages } from "../lib/store";
import { motion, AnimatePresence } from "motion/react";
import ProjectModal from "../components/ProjectModal";
import MediaRenderer from "../components/MediaRenderer";

export default function Home() {
 const [results, setResults] = useState<ResultItem[]>([]);
 const [events, setEvents] = useState<EventItem[]>([]);
 const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
 const [selectedImage, setSelectedImage] = useState<string | null>(null);
 const [selectedProject, setSelectedProject] = useState<ResultItem | null>(null);

 useEffect(() => {
  const loadContent = () => {
   const allResults = getResults();
   let homeResults = allResults.filter(r => r.displayOptions === undefined || r.displayOptions.homepage);
   setResults(homeResults.slice(0, 3));
   setEvents(getEvents().slice(0, 3));
   setTestimonials(getTestimonials());
  };

  loadContent();
  window.addEventListener("resultsUpdated", loadContent);
  window.addEventListener("eventsUpdated", loadContent);
  window.addEventListener("testimonialsUpdated", loadContent);
  return () => {
   window.removeEventListener("resultsUpdated", loadContent);
   window.removeEventListener("eventsUpdated", loadContent);
   window.removeEventListener("testimonialsUpdated", loadContent);
  };
 }, []);

 const services = [
  {
   title: "Social Media Marketing",
   description:
    "End-to-end management, content planning, and targeting to build authority and drive massive engagement.",
   icon: <BarChart3 className="w-8 h-8" />,
   link: "/portfolio#social-media-management",
  },
  {
   title: "Facebook & IG Ads",
   description:
    "Highly profitable conversion campaigns and retargeting systems designed to turn attention into sales.",
   icon: <Megaphone className="w-8 h-8" />,
   link: "/portfolio#facebook-instagram-ads",
  },
  {
   title: "Content Creation/Graphic Design",
   description:
    "High-converting graphics, engaging videos, and persuasive copy that tell your brand story and capture attention.",
   icon: <PenTool className="w-8 h-8" />,
   link: "/portfolio#content-creation-graphic-design",
  },
  {
   title: "Website Development",
   description:
    "Premium, fast, mobile-first business websites engineered specifically as high-converting sales assets.",
   icon: <Globe className="w-8 h-8" />,
   link: "/portfolio#website-development",
  },
 ];

 return (
  <div className="bg-brand-white dark:bg-brand-black">
   {/* Premium Hero Section */}
   <section className="relative pt-32 pb-40 overflow-hidden bg-brand-white dark:bg-brand-black text-brand-black dark:text-white">
    <div className="absolute inset-0 z-0 pointer-events-none">
     <div className="absolute top-20 left-10 md:left-1/4 w-[500px] h-[500px] bg-brand-blue/30 rounded-full blur-[120px]"></div>
     <div className="absolute bottom-10 right-10 md:right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-5xl mx-auto"
     >
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue dark:text-blue-300 shadow-sm font-semibold text-sm mb-8">
       <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
       Africa's Leading Digital Growth & AI Media Agency
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-brand-black dark:text-white mb-8 leading-[1.1]">
       <TypeAnimation
        sequence={[
         "We Don’t Just Manage Social Media, We Build ",
         1500,
         "We Don’t Just Manage Social Media, We Craft ",
         1500,
         "We Don’t Just Manage Social Media, We Scale ",
         1500,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
       />
       <br className="hidden md:block" />
       <motion.span 
        className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
       >
        Visibility & Sales Systems.
       </motion.span>
      </h1>

      <motion.p 
       className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ delay: 2, duration: 0.8 }}
      >
       We help businesses, creators, startups, churches, and brands
       attract the right audience, build authority, increase trust, and
       turn attention into consistent income using strategy, content,
       marketing, and AI.
      </motion.p>

      <motion.div 
       className="flex flex-col sm:flex-row gap-5 justify-center items-center"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 2.2, duration: 0.8 }}
      >
       <Link
        to="/book-consultation"
        className="bg-gradient-to-r from-brand-blue to-blue-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 w-full sm:w-auto"
       >
        Book Free Consultation
        <ArrowRight className="w-5 h-5" />
       </Link>
       <Link
        to="/portfolio"
        className="bg-gray-50 dark:bg-brand-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 text-brand-black dark:text-white px-10 py-5 rounded-full text-lg font-bold hover:border-brand-blue/50 hover:bg-brand-blue/5 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
       >
        <Play className="w-5 h-5" />
        View Our Projects
       </Link>
      </motion.div>
     </motion.div>
    </div>
   </section>

   {/* Trust Banner Stats */}
   <section className="py-12 bg-brand-white dark:bg-brand-black relative z-20 border-y border-gray-200 dark:border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
      <motion.div
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
      >
       <div className="text-3xl md:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400 mb-2">
        500+
       </div>
       <div className="text-gray-600 dark:text-gray-400 font-medium text-sm tracking-wider uppercase">
        Projects Completed
       </div>
      </motion.div>
      <motion.div
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ delay: 0.1 }}
      >
       <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400 mb-2">
        50M+
       </div>
       <div className="text-gray-600 dark:text-gray-400 font-medium text-sm tracking-wider uppercase">
        Ad Spend Managed
       </div>
      </motion.div>
      <motion.div
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ delay: 0.2 }}
      >
       <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400 mb-2">
        300%
       </div>
       <div className="text-gray-600 dark:text-gray-400 font-medium text-sm tracking-wider uppercase">
        Average Client ROI
       </div>
      </motion.div>
      <motion.div
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ delay: 0.3 }}
      >
       <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400 mb-2">98%</div>
       <div className="text-gray-600 dark:text-gray-400 font-medium text-sm tracking-wider uppercase">
        Client Retention
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* Services Section */}
   <section className="py-32 bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
    <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
     <div className="text-center mb-20 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">
       World-Class Services Designed for{" "}
       <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Growth.</span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
       We don't just execute tasks; we engineer intelligent marketing
       systems that position you as the premium choice in your industry.
      </p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {services.map((service, index) => (
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        key={index}
        className="bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-3xl p-12 hover:shadow-2xl transition-all border border-gray-200 dark:border-white/5 hover:border-brand-blue/30 group"
       >
        <div className="w-20 h-20 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-8 group-hover:scale-110 group-hover:from-brand-blue group-hover:to-blue-600 group-hover:text-brand-black dark:text-white transition-all duration-300 shadow-inner border border-gray-200 dark:border-white/5">
         {service.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-brand-black dark:text-white mb-4 group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors">
         {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
         {service.description}
        </p>
        <Link
         to={service.link}
         className="inline-flex items-center gap-3 text-brand-blue dark:text-blue-400 font-bold hover:text-brand-black dark:text-white text-lg transition-colors"
        >
         Explore Service
         <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
       </motion.div>
      ))}
     </div>
    </div>
   </section>

   {/* Certifications & Highlights Section */}
   <section className="py-20 bg-brand-white dark:bg-brand-black relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
     
     <div className="text-center mb-16 relative">
      <h2 className="text-3xl md:text-5xl font-bold text-brand-black dark:text-white mb-6">
       Officially Registered & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Verified.</span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
       SkillHive Media Agency is a fully registered business entity, ensuring credible, authentic, and reliable services.
      </p>
     </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
       <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4">
        <img src="https://i.ibb.co/fY8mDb8Q/CERTIFICATE-SKILLHIVE-MEDIA-AGENCY-page-0001.jpg" alt="CERTIFICATE SKILLHIVE MEDIA AGENCY" className="w-full h-auto object-contain rounded-2xl" />
       </div>
       <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 p-4">
        <img src="https://i.ibb.co/vx1NPsf6/CERTIFICATE-SKILLHIVE-MEDIA-AGENCY-1-page-0001.jpg" alt="CERTIFICATE SKILLHIVE MEDIA AGENCY 1" className="w-full h-auto object-contain rounded-2xl" />
       </div>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {[
       "https://i.ibb.co/PGbxm6Sc/Chat-GPT-Image-May-28-2026-02-08-43-PM.png",
       "https://i.ibb.co/m5t9X7R5/Chat-GPT-Image-May-28-2026-02-07-17-PM.png",
       "https://i.ibb.co/cSnknFWW/Chat-GPT-Image-May-28-2026-02-05-05-PM.png",
       "https://i.ibb.co/yD28NLm/Chat-GPT-Image-Jun-13-2026-10-08-08-AM.png",
       "https://i.ibb.co/ns75m3vX/Chat-GPT-Image-Jun-13-2026-10-05-03-AM.png"
      ].map((img, i) => (
       <motion.div
        key={i}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="rounded-3xl overflow-hidden shadow-xl shadow-blue-900/10 relative group cursor-pointer border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 p-2"
        onClick={() => setSelectedImage(img)}
       >
        <div className="absolute inset-0 bg-brand-blue/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-3xl z-10 mix-blend-overlay"></div>
        <div className="overflow-hidden rounded-2xl h-[300px] md:h-[400px]">
         <img
          src={img}
          alt={`Featured Highlight ${i+1}`}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          referrerPolicy="no-referrer"
         />
        </div>
       </motion.div>
      ))}
     </div>
    </div>
   </section>

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
      <motion.div
       initial={{ scale: 0.9, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       exit={{ scale: 0.9, opacity: 0 }}
       transition={{ type: "spring", damping: 25, stiffness: 300 }}
       onClick={(e) => e.stopPropagation()}
       className="max-w-5xl w-full"
      >
       <MediaRenderer 
        src={selectedImage}
        alt="Fullscreen Highlight"
        interactive={true}
        className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-black"
       />
      </motion.div>
     </motion.div>
    )}
   </AnimatePresence>

   {/* Results / Portfolio Preview Section */}
   <section className="py-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-5 mix-blend-overlay pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
     <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
      <div className="max-w-2xl">
       <div className="flex items-center gap-2 text-brand-blue font-bold tracking-wider uppercase mb-4">
        <Trophy className="w-5 h-5" /> Proven Results
       </div>
       <h2 className="text-3xl md:text-6xl font-bold">
        Don't Take Our Word For It. <br />
        <span className="text-gray-600 dark:text-gray-400">Look At The Numbers.</span>
       </h2>
      </div>
      <Link
       to="/portfolio"
       className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors whitespace-nowrap text-lg"
      >
       View Full Portfolio
      </Link>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {results.length === 0 ? (
       <div className="col-span-1 md:col-span-3"></div>
      ) : (
       results.map((item, index) => (
        <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         key={item.id}
         onClick={() => setSelectedProject(item)}
         className="bg-gray-50 dark:bg-[#0F0F12]/80 cursor-pointer backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-3xl p-10 flex flex-col group hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-colors relative overflow-hidden"
        >
         <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
          CLICK TO VIEW <ArrowRight className="w-3 h-3" />
         </div>
         {(item.image || item.videoUrl) && (
          <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative shrink-0">
           {item.videoUrl ? (
            <MediaRenderer interactive={false} src={item.videoUrl} alt={item.clientName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
           ) : (
            <MediaRenderer interactive={false} src={parseImages(item.image)[0] || ''} alt={item.clientName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
           )}
           <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          </div>
         )}
         {(item.metric || item.metricLabel) && (
          <>
           <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-black to-gray-600 dark:from-white dark:to-gray-400 mb-3 group-hover:from-brand-blue group-hover:to-blue-400 transition-all">
            {item.metric}
           </div>
           <div className="text-brand-blue dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
            {item.metricLabel}
           </div>
          </>
         )}
         {item.resultsAchieved && (
          <div className="mb-6 flex items-start gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-white/5 p-4 rounded-xl shrink-0">
           <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
           {item.resultsAchieved}
          </div>
         )}
         {item.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow italic relative">
           <span className="absolute -left-3 -top-2 text-3xl text-brand-blue/20">"</span>
           {item.description}
          </p>
         )}
         <div className="flex items-center gap-4 pt-6 mt-auto border-t border-gray-200 dark:border-white/10 relative z-10">
          <div>
           <div className="font-bold text-brand-black dark:text-white text-lg">
            {item.clientName}
           </div>
           <div className="text-sm text-gray-600 dark:text-gray-400">
            {item.industry}
           </div>
          </div>
         </div>
        </motion.div>
       ))
      )}
     </div>
    </div>
   </section>

   {/* Testimonials Section */}
   <section className="py-24 bg-gray-50 dark:bg-brand-black border-t border-gray-200 dark:border-white/5 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
     <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6">
       What Clients Say
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
       Don't just take my word for it.
      </p>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
       {
        quote: "Working with you changed how I see social media. My brand finally has direction.",
        name: "Chinedu Okafor",
        role: "CEO, Logistics Co",
        initial: "C"
       },
       {
        quote: "You didn’t just manage my page, you built a system that actually brought sales.",
        name: "Peter Richsound",
        role: "Music Producer",
        initial: "P"
       },
       {
        quote: "Professional, strategic, and efficient. The results speak for themselves.",
        name: "Tunde Adeyemi",
        role: "Real Estate Consultant",
        initial: "T"
       },
       {
        quote: "I finally feel confident showing up online. The strategy was clear and easy to follow.",
        name: "Mrs. Sarah",
        role: "Fashion Entrepreneur",
        initial: "M"
       },
       {
        quote: "The ROI we've seen since partnering with SkillHive has been incredible. Highly recommended.",
        name: "Kemi Solarin",
        role: "E-commerce Founder",
        initial: "K"
       },
       {
        quote: "Their attention to detail and creative execution took our brand from obscurity to market leader.",
        name: "Emeka Nwangwu",
        role: "Tech Startup CEO",
        initial: "E"
       },
       {
        quote: "SkillHive feels like an extension of our own team. We consistently hit our monthly targets with their ad strategies.",
        name: "Amina Bello",
        role: "Beauty Brand Owner",
        initial: "A"
       },
       {
        quote: "I was struggling with content ideas, but their team came in and completely transformed our online presence.",
        name: "Oluwaseun Adeleke",
        role: "Fitness Coach",
        initial: "O"
       },
       {
        quote: "The best digital marketing investment we've ever made. The leads just keep rolling in week after week.",
        name: "Funke Oladapo",
        role: "Event Consultant",
        initial: "F"
       }
      ].map((testimonial, index) => (
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 3) * 0.1 }}
        className="bg-white dark:bg-[#0a0f1c] border border-gray-100 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl transition-shadow flex flex-col justify-between"
       >
        <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic mb-8 relative z-10">
         "{testimonial.quote}"
        </p>
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
         <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center font-black text-xl">
          {testimonial.initial}
         </div>
         <div>
          <div className="font-bold text-brand-black dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
         </div>
        </div>
       </motion.div>
      ))}
     </div>

     {(() => {
      const validTestimonials = testimonials.filter(t => parseImages(t.image).length > 0 && !!parseImages(t.image)[0]);
      if (validTestimonials.length === 0) return null;
      return (
       <div className="mt-16">
        <div className="text-center mb-10">
         <h3 className="text-2xl font-bold text-brand-black dark:text-white">More Client Love</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {validTestimonials.map((t, index) => (
          <motion.div
           key={t.id || index}
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: index * 0.1 }}
           className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 group bg-white dark:bg-white/5"
           onClick={() => {
            const firstImg = parseImages(t.image)[0];
            if (firstImg) {
             setSelectedImage(firstImg);
            }
           }}
          >
           <MediaRenderer interactive={false} src={parseImages(t.image)[0]} alt={t.clientName} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 block" />
          </motion.div>
         ))}
        </div>
       </div>
      );
     })()}
    </div>
   </section>

   {/* Events Section Highlight */}
   {events.length > 0 && (
    <section className="py-24 bg-brand-white dark:bg-brand-black border-t border-gray-200 dark:border-white/5 relative overflow-hidden">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
       <div className="max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6">
         Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Events</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
         Glimpses of our recent workshops, agency events, and client success parties.
        </p>
       </div>
       <Link
        to="/events"
        className="bg-brand-black dark:bg-white text-white dark:text-brand-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
       >
        View All Events
       </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       {events.map((ev, index) => (
        <motion.div
         key={ev.id}
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="group relative rounded-3xl overflow-hidden cursor-pointer"
         onClick={() => {
          const firstImg = parseImages(ev.image)[0];
          if (firstImg) {
           setSelectedImage(firstImg);
          }
         }}
        >
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
         <MediaRenderer interactive={false} src={parseImages(ev.image)[0]} alt={ev.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700 block" />
         <div className="absolute bottom-6 left-6 right-6 z-20">
          <h4 className="text-2xl font-bold text-white mb-2">{ev.title}</h4>
          <p className="text-gray-300 text-sm">{ev.date}</p>
         </div>
        </motion.div>
       ))}
      </div>
     </div>
    </section>
   )}

   {/* CTA Section */}
   <section className="py-40 relative overflow-hidden">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
     <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-brand-blue rounded-[3rem] p-16 md:p-24 shadow-2xl relative overflow-hidden"
     >
      {/* Inner background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>

      <div className="relative z-10">
       <h2 className="text-3xl md:text-6xl font-black text-brand-black dark:text-white mb-8 tracking-tight">
        Ready to Dominate Your Market?
       </h2>
       <p className="text-xl md:text-2xl text-blue-100 font-medium mb-12 max-w-3xl mx-auto">
        Stop leaving money on the table. Join the elite brands using our
        data-driven growth systems to scale fast.
       </p>
       <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link
         to="/book-consultation"
         className="bg-white text-brand-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 hover:bg-gray-100 transition-all shadow-xl"
        >
         Let's Talk Strategy
        </Link>
       </div>
      </div>
     </motion.div>
    </div>
   </section>
   <ProjectModal isOpen={!!selectedProject} project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>
 );
}
