import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ResultItem, getResults, parseImages } from '../lib/store';
import ProjectModal from '../components/ProjectModal';
import MediaRenderer from '../components/MediaRenderer';

export default function Results() {
 const categories = ['Social Media Management', 'Facebook & Instagram Ads', 'Content Creation/Graphic Design', 'Website Development'];
 const [results, setResults] = useState<ResultItem[]>([]);
 const [selectedProject, setSelectedProject] = useState<ResultItem | null>(null);

 useEffect(() => {
  const loadResults = () => {
   setResults(getResults());
  };
  
  loadResults();
  window.addEventListener('resultsUpdated', loadResults);
  return () => window.removeEventListener('resultsUpdated', loadResults);
 }, []);

 return (
  <div className="pt-24 pb-32 bg-brand-white dark:bg-brand-black text-brand-black dark:text-white relative flex-grow">
   <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-20">
     <h1 className="text-3xl md:text-5xl font-black text-brand-black dark:text-white mb-6">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">Results & Proof</span></h1>
     <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
      We let our numbers do the talking. Explore how we've helped businesses scale, increase visibility, and drive revenue through proven strategies.
     </p>
    </div>

    {categories.map((category, index) => {
      // For the Results page, we show projects that have 'portfolio' selected in displayOptions.
      // If displayOptions doesn't exist (old data), we'll gracefully show it.
      const categoryResults = results.filter(r => 
       r.category === category && 
       (r.displayOptions === undefined || r.displayOptions.portfolio)
      );
      
      if (categoryResults.length === 0) return null;

      return (
       <div key={index} className="mb-32 last:mb-0" id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
        <div className="flex items-center justify-center lg:justify-start mb-12 border-b-2 border-brand-blue/20 pb-4">
         <h2 className="text-3xl md:text-4xl font-black text-brand-black dark:text-white">{category}</h2>
        </div>
        
        <div className="space-y-24">
         {categoryResults.map((item) => (
          <div key={item.id} onClick={() => setSelectedProject(item)} className="cursor-pointer bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col group relative hover:border-brand-blue/30 transition-colors">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:min-h-[500px]">
              
              {/* Media Section: Image or Video Thumbnail */}
              <div className="relative h-64 lg:h-full bg-gray-100 dark:bg-brand-black">
                {item.videoUrl ? (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 hover:bg-black/40 transition-colors pointer-events-none">
                  <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center pl-2 group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(10,50,255,0.8)]">
                   <Play className="w-8 h-8" />
                  </div>
                 </div>
                ) : null}
                {parseImages(item.image).length > 1 ? (
                 <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory pointer-events-none">
                  {parseImages(item.image).map((img, i) => (
                   <MediaRenderer interactive={false} key={i} src={img} alt={`${item.clientName} ${i+1}`} className="w-full h-full flex-shrink-0 object-cover snap-center" />
                  ))}
                 </div>
                ) : (
                 <MediaRenderer interactive={false} src={parseImages(item.image)[0] || item.videoUrl || ''} alt={item.clientName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 block pointer-events-none" />
                )}
                <div className="absolute bottom-6 left-6 right-6">
                 <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-6 rounded-3xl shadow-xl flex items-center justify-between">
                  <div>
                   <h3 className="text-xl font-bold text-brand-black dark:text-white">{item.clientName}</h3>
                   <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{item.industry || 'Business Partner'}</span>
                  </div>
                  {item.ctaLink && (
                   <a href={item.ctaLink} target="_blank" rel="noopener noreferrer" className="bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                   </a>
                  )}
                 </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-[#0a0f1c]">
               
               {(item.metric || item.metricLabel) && (
                <div className="mb-8">
                 <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-brand-blue/10 rounded-full mb-6 text-brand-blue font-bold text-sm tracking-widest uppercase">
                  Headline Result
                 </div>
                 <div className="flex items-baseline gap-4">
                  <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-blue to-blue-400">
                   {item.metric}
                  </h3>
                  <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{item.metricLabel}</span>
                 </div>
                </div>
               )}

               {(item.problem || item.solution) && (
                <div className="space-y-6 mb-8 border-t border-b border-gray-100 dark:border-white/5 py-8">
                 {item.problem && (
                  <div>
                   <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400"></div> The Problem</h4>
                   <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.problem}</p>
                  </div>
                 )}
                 {item.solution && (
                  <div>
                   <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-blue"></div> Our Solution</h4>
                   <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.solution}</p>
                  </div>
                 )}
                </div>
               )}

               {item.resultsAchieved && (
                <div className="mb-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 p-6 rounded-3xl">
                 <h4 className="text-sm font-bold text-green-600 dark:text-green-500 uppercase tracking-widest mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Verified Results</h4>
                 <p className="text-green-900 dark:text-green-100 font-medium leading-relaxed">{item.resultsAchieved}</p>
                </div>
               )}

               {(item.testimonial || item.description) && (
                <div className="mt-auto relative pl-8">
                 <Quote className="w-12 h-12 text-brand-blue/20 absolute -top-4 -left-2" />
                 <p className="text-xl font-medium text-gray-800 dark:text-white leading-relaxed italic relative z-10">
                  "{item.testimonial || item.description}"
                 </p>
                 <div className="mt-4 font-bold text-sm text-gray-500 uppercase">{item.clientName}</div>
                </div>
               )}

              </div>
            </div>
          </div>
         ))}
        </div>
       </div>
      );
     })}

    <div className="mt-32 bg-gradient-to-br from-brand-blue to-blue-800 rounded-[3rem] p-12 md:p-16 text-center border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
     <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-10 mix-blend-overlay"></div>
     <div className="relative z-10">
      <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Want to be our next success story?</h2>
      <p className="text-xl text-blue-100 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
       Stop leaving money on the table. Let's build a custom digital strategy to scale your business, generate leads, and dominate your niche.
      </p>
      <Link
       to="/get-started"
       className="inline-flex items-center gap-3 bg-white text-brand-black hover:bg-gray-100 px-10 py-5 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
      >
       Start Your Project Now
       <ArrowRight className="w-6 h-6" />
      </Link>
     </div>
    </div>
   </div>
   <ProjectModal isOpen={!!selectedProject} project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>
 );
}
