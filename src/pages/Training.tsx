import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Video } from 'lucide-react';

export default function Training() {
  const programs = [
    {
      title: 'Social Media Mastery Course',
      description: 'A comprehensive online course teaching you how to build, grow, and monetize your social media presence from scratch.',
      icon: <Video className="w-8 h-8" />,
      price: '$497',
      duration: '6 Weeks',
      level: 'Beginner to Intermediate'
    },
    {
      title: 'Advanced Ads Workshop',
      description: 'An intensive 2-day workshop focused entirely on creating, managing, and scaling profitable Facebook and Instagram ad campaigns.',
      icon: <Users className="w-8 h-8" />,
      price: '$997',
      duration: '2 Days',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Content Creation Bootcamp',
      description: 'Learn the secrets of viral content creation, copywriting, and basic graphic design to elevate your brand\'s visual identity.',
      icon: <BookOpen className="w-8 h-8" />,
      price: '$297',
      duration: '4 Weeks',
      level: 'All Levels'
    }
  ];

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Training & Workshops</h1>
          <p className="text-xl text-gray-600">
            Learn the exact strategies and systems we use to generate results for our clients. Empower yourself or your team with our expert-led training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {programs.map((program, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mb-8">
                {program.icon}
              </div>
              <h2 className="text-2xl font-bold text-brand-blue mb-4">{program.title}</h2>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{program.description}</p>
              
              <div className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-brand-blue">{program.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Level</span>
                  <span className="font-semibold text-brand-blue">{program.level}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-3xl font-bold text-brand-blue">{program.price}</span>
                <button className="bg-brand-blue text-brand-white px-6 py-3 rounded-full font-medium hover:bg-brand-blue/90 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-3xl p-16 text-center border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-6">Looking for Corporate Training?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            We offer customized, on-site or virtual training sessions tailored specifically for your marketing team's needs and goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Inquire About Custom Training
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
