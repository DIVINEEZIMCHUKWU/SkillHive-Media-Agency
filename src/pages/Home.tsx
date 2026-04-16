import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Megaphone, PenTool, Globe, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ResultItem, getResults } from '../lib/store';

export default function Home() {
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    const loadResults = () => {
      setResults(getResults().slice(0, 3)); // Only show top 3 on home page
    };
    
    loadResults();
    window.addEventListener('resultsUpdated', loadResults);
    return () => window.removeEventListener('resultsUpdated', loadResults);
  }, []);

  const services = [
    {
      title: 'Social Media Management',
      description: 'End-to-end management of your social profiles to build community and drive engagement.',
      icon: <BarChart3 className="w-6 h-6" />,
      link: '/services/social-media-management',
      buttonText: 'View Results'
    },
    {
      title: 'Facebook & Instagram Ads',
      description: 'Data-driven ad campaigns designed to generate high-quality leads and sales.',
      icon: <Megaphone className="w-6 h-6" />,
      link: '/services/facebook-instagram-ads',
      buttonText: 'See Campaign Results'
    },
    {
      title: 'Content Creation',
      description: 'High-converting graphics, videos, and copy that tell your brand story.',
      icon: <PenTool className="w-6 h-6" />,
      link: '/services/content-creation',
      buttonText: 'View Designs & Content'
    },
    {
      title: 'Website Design',
      description: 'Clean, fast, and conversion-optimized websites that turn visitors into clients.',
      icon: <Globe className="w-6 h-6" />,
      link: '/services/website-design',
      buttonText: 'View Websites'
    }
  ];

  const processSteps = [
    { title: 'Audit & Strategy', description: 'We analyze your current presence and build a custom roadmap.' },
    { title: 'Content Planning', description: 'We craft high-converting content tailored to your audience.' },
    { title: 'Execution & Management', description: 'We handle the posting, engagement, and ad management.' },
    { title: 'Growth & Optimization', description: 'We track data and refine our approach for maximum ROI.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-blue mb-8 leading-tight">
              We Turn Social Media Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-blue">Sales Machine</span> for Your Business
            </h1>
            <p className="text-xl md:text-2xl text-blue-900 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Strategy. Content. Ads. Everything you need to grow and sell consistently online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="bg-brand-blue text-brand-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-blue/90 transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/results"
                className="bg-gray-100 text-brand-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0B1C2D 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </section>

      {/* What You Do Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Stop Guessing. Start Growing.</h2>
          <p className="text-xl text-blue-800 leading-relaxed font-medium">
            We help businesses, brands, and creators stop guessing and start growing with structured social media systems that drive visibility, trust, and sales.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Our Core Services</h2>
            <p className="text-lg text-blue-700 font-medium">Everything you need to dominate your market.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-4">{service.title}</h3>
                <p className="text-blue-900/80 font-medium mb-8 flex-grow">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all"
                >
                  {service.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Preview Section */}
      <section className="py-24 bg-brand-blue text-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Real Results for Real Businesses</h2>
              <p className="text-lg text-gray-300">We don't just chase likes. We build systems that generate revenue. Here's what happens when you partner with SkillHive.</p>
            </div>
            <Link
              to="/results"
              className="bg-brand-white text-brand-blue px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              See All Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.length === 0 ? (
              <div className="col-span-1 md:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-gray-300 mb-4">No results added yet. Add your first case study from the Admin Dashboard.</p>
                <Link to="/admin" className="inline-block bg-white text-brand-blue px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Go to Admin Dashboard
                </Link>
              </div>
            ) : (
              results.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                  <div className="text-4xl font-bold text-white mb-2">{item.metric}</div>
                  <div className="text-blue-200 font-medium mb-6">{item.metricLabel}</div>
                  <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-4">"{item.description}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={item.image} alt={item.clientName} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-medium text-white">{item.clientName}</div>
                      <div className="text-xs text-gray-400">{item.industry}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Our Proven Process</h2>
            <p className="text-lg text-blue-700 font-medium">A simple, 4-step system to scale your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {index !== processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gray-100"></div>
                )}
                <div className="relative z-10 bg-white w-16 h-16 rounded-full border-4 border-gray-50 flex items-center justify-center text-xl font-bold text-brand-blue mb-6 mx-auto shadow-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-3 text-center">{step.title}</h3>
                <p className="text-blue-800 text-center text-sm font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-8">Who We Work With</h2>
          <p className="text-xl text-blue-800 leading-relaxed mb-12 font-medium">
            Businesses, personal brands, consultants, and creators ready to grow, build authority, and generate consistent income online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['E-commerce Brands', 'B2B Services', 'Coaches & Consultants', 'Local Businesses', 'Creators'].map((tag) => (
              <span key={tag} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-brand-blue font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue mb-8">Ready to grow your business online?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="bg-brand-blue text-brand-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Book a Call
            </Link>
            <Link
              to="/contact"
              className="bg-white border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
