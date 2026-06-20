import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Megaphone, PenTool, Globe } from 'lucide-react';

export default function Services() {
 const services = [
  {
   id: 'social-media-management',
   title: 'Social Media Management',
   description: 'We handle everything from strategy to posting, engaging with your audience, and building a loyal community around your brand.',
   icon: <BarChart3 className="w-8 h-8" />,
  },
  {
   id: 'facebook-instagram-ads',
   title: 'Facebook & Instagram Ads',
   description: 'Stop wasting money on ads that don\'t convert. We build data-driven campaigns designed to generate high-quality leads and sales.',
   icon: <Megaphone className="w-8 h-8" />,
  },
  {
   id: 'content-creation-graphic-design',
   title: 'Content Creation/Graphic Design',
   description: 'High-converting graphics, engaging videos, and persuasive copy that tell your brand story and capture attention.',
   icon: <PenTool className="w-8 h-8" />,
  },
  {
   id: 'website-design',
   title: 'Website Design',
   description: 'Clean, fast, and conversion-optimized websites that serve as the ultimate destination for your online traffic.',
   icon: <Globe className="w-8 h-8" />,
  }
 ];

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative overflow-hidden">
   <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[150px] pointer-events-none"></div>
   <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-4xl font-bold text-brand-black dark:text-white mb-6">Our Services</h1>
     <p className="text-base text-gray-600 dark:text-gray-400">
      Comprehensive digital solutions designed to elevate your brand, engage your audience, and drive measurable growth.
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     {services.map((service) => (
      <Link
       key={service.id}
       to={`/portfolio#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
       className="group bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-3xl p-10 hover:shadow-2xl hover:border-brand-blue/30 transition-all flex flex-col h-full"
      >
       <div className="w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-brand-blue dark:text-blue-400 mb-8 group-hover:scale-110 group-hover:from-brand-blue group-hover:to-blue-600 group-hover:text-brand-black dark:text-white transition-all shadow-inner border border-gray-200 dark:border-white/5">
        {service.icon}
       </div>
    <h2 className="text-2xl font-bold text-brand-black dark:text-white mb-4 group-hover:text-brand-blue dark:group-hover:text-blue-300 transition-colors">{service.title}</h2>
    <p className="text-base text-gray-600 dark:text-gray-400 mb-10 flex-grow leading-relaxed">{service.description}</p>
    <div className="flex items-center gap-2 text-brand-blue dark:text-blue-400 font-semibold text-base group-hover:text-brand-black dark:text-white group-hover:gap-4 transition-all">
        Learn More
        <ArrowRight className="w-5 h-5" />
       </div>
      </Link>
     ))}
    </div>
   </div>
  </div>
 );
}
