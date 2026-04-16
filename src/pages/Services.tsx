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
      id: 'content-creation',
      title: 'Content Creation',
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
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            Comprehensive digital solutions designed to elevate your brand, engage your audience, and drive measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group border border-gray-200 rounded-3xl p-10 hover:shadow-2xl hover:border-brand-blue/30 transition-all bg-white flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold text-brand-blue mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h2>
              <p className="text-lg text-gray-600 mb-10 flex-grow leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-2 text-brand-blue font-semibold text-lg group-hover:gap-4 transition-all">
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
