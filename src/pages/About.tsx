import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">About SkillHive Media</h1>
          <p className="text-xl text-gray-600">
            We are a team of strategists, creatives, and growth experts dedicated to turning your online presence into a profitable asset.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="rounded-3xl aspect-square overflow-hidden shadow-lg">
            <img 
              src="https://picsum.photos/seed/office/800/800" 
              alt="SkillHive Media Agency Office" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-brand-blue mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              SkillHive Media Agency was born out of a simple observation: too many great businesses were struggling to translate their real-world value into online success. They were posting without a plan, running ads without a strategy, and wondering why they weren't growing.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We set out to change that. We don't just offer services; we build comprehensive digital systems designed to capture attention, build trust, and drive consistent sales.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
            <Target className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-brand-blue mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To empower businesses and creators with the strategies, content, and systems they need to dominate their market and achieve sustainable growth.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
            <Eye className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-brand-blue mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the premier growth partner for ambitious brands worldwide, recognized for our transparency, innovation, and undeniable results.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
            <Zap className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-brand-blue mb-4">Our Approach</h3>
            <p className="text-gray-600 leading-relaxed">
              Data-driven decisions combined with scroll-stopping creativity. We test, we measure, and we optimize relentlessly to ensure your success.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-blue text-brand-white rounded-3xl p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to partner with us?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your business goals.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-brand-white text-brand-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
