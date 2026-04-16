import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, UploadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ResultItem, getResults } from '../lib/store';

const serviceData = {
  'social-media-management': {
    title: 'Social Media Management',
    benefit: 'Build a loyal community and drive consistent engagement.',
    description: 'We handle everything from strategy to posting, engaging with your audience, and building a loyal community around your brand. Stop worrying about what to post and let us turn your social channels into a growth engine.',
    whoItsFor: 'Businesses and creators who want a professional online presence but lack the time or expertise to manage it themselves.',
    whatYouGet: [
      'Comprehensive Social Media Audit',
      'Custom Content Strategy',
      'Profile Optimization',
      'Content Creation & Scheduling',
      'Community Management & Engagement',
      'Monthly Analytics & Reporting'
    ]
  },
  'facebook-instagram-ads': {
    title: 'Facebook & Instagram Ads',
    benefit: 'Generate high-quality leads and sales predictably.',
    description: 'Stop wasting money on ads that don\'t convert. We build data-driven campaigns designed to generate high-quality leads and sales. We handle the targeting, creative, and optimization to ensure maximum ROI.',
    whoItsFor: 'E-commerce brands and service-based businesses looking to scale their revenue predictably.',
    whatYouGet: [
      'In-depth Audience Research',
      'Ad Copywriting & Creative Design',
      'Campaign Setup & Launch',
      'A/B Testing & Optimization',
      'Retargeting Campaigns',
      'Detailed Performance Tracking'
    ]
  },
  'content-creation': {
    title: 'Content Creation',
    benefit: 'Tell your brand story with high-converting visuals and copy.',
    description: 'High-converting graphics, engaging videos, and persuasive copy that tell your brand story and capture attention. We create content that stops the scroll and drives action.',
    whoItsFor: 'Brands that need professional, on-brand content to stand out in a crowded market.',
    whatYouGet: [
      'Brand Identity Alignment',
      'Graphic Design (Posts, Stories, Covers)',
      'Short-form Video Editing (Reels, TikToks)',
      'Persuasive Copywriting',
      'Content Calendar Planning',
      'High-Resolution Asset Delivery'
    ]
  },
  'website-design': {
    title: 'Website Design',
    benefit: 'Turn visitors into paying clients with a conversion-optimized site.',
    description: 'Clean, fast, and conversion-optimized websites that serve as the ultimate destination for your online traffic. We build sites that not only look great but are engineered to sell.',
    whoItsFor: 'Businesses that need a professional, high-performing website to establish authority and capture leads.',
    whatYouGet: [
      'Custom UI/UX Design',
      'Mobile-Responsive Development',
      'SEO Optimization',
      'Fast Loading Speeds',
      'Clear Call-to-Actions',
      'Easy-to-Manage CMS'
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = serviceData[id as keyof typeof serviceData];
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    const loadResults = () => {
      if (service) {
        const allResults = getResults();
        setResults(allResults.filter(r => r.category === service.title));
      }
    };
    
    loadResults();
    window.addEventListener('resultsUpdated', loadResults);
    return () => window.removeEventListener('resultsUpdated', loadResults);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-blue mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-blue text-brand-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl md:text-2xl text-blue-200 font-medium">{service.benefit}</p>
        </div>
      </section>

      {/* Description & Who It's For */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue mb-6">What It Is</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">{service.description}</p>
              
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Who It's For</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{service.whoItsFor}</p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100">
              <h2 className="text-3xl font-bold text-brand-blue mb-8">What You Get</h2>
              <ul className="space-y-6">
                {service.whatYouGet.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Results Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Results from Our {service.title}</h2>
            <p className="text-lg text-gray-600">Real numbers, real growth, real clients.</p>
          </div>

          {results.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center bg-white">
              <UploadCloud className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-brand-blue mb-2">Upload Client Results Here</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                This section is dedicated for screenshots, before/after comparisons, testimonials, and video case studies specific to {service.title}.
              </p>
              <Link to="/admin" className="inline-block bg-brand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-900 transition-colors">
                Go to Admin Dashboard
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {results.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-48 bg-gray-100 border-b border-gray-100 relative">
                    <img src={item.image} alt={item.clientName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="text-3xl font-bold text-brand-blue mb-2">{item.metric}</div>
                    <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">{item.metricLabel}</div>
                    <p className="text-gray-600 mb-6 flex-grow">
                      "{item.description}"
                    </p>
                    <div className="mt-auto">
                      <div className="font-medium text-brand-blue">{item.clientName}</div>
                      <div className="text-sm text-gray-500">{item.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Our simple 4-step process to success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Audit & Strategy', 'Content Planning', 'Execution & Management', 'Growth & Optimization'].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 bg-brand-blue text-brand-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-3">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-blue text-brand-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to scale your business?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-started"
              className="bg-brand-white text-brand-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Work With Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-brand-white text-brand-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
