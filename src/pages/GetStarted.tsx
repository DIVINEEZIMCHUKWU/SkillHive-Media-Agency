import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Let's Grow Your Business</h1>
          <p className="text-xl text-gray-600">
            Fill out the form below to book a free discovery call. We'll discuss your goals, audit your current strategy, and see if we're a good fit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-blue mb-8">Tell us about your project</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  id="website"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Which services are you interested in? *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Social Media Management', 'Facebook & Instagram Ads', 'Content Creation', 'Website Design'].map((service) => (
                    <label key={service} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="checkbox" className="w-5 h-5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue" />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">Monthly Marketing Budget</label>
                <select
                  id="budget"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all bg-white"
                >
                  <option>Less than $1,000</option>
                  <option>$1,000 - $3,000</option>
                  <option>$3,000 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">What are your main goals? *</label>
                <textarea
                  id="goals"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us what you're trying to achieve..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-brand-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-brand-blue/90 transition-colors flex items-center justify-center gap-2"
              >
                Request Discovery Call
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-brand-blue mb-6">What happens next?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-blue text-brand-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-1">Submit Request</h4>
                    <p className="text-sm text-gray-600">Fill out the form with your details and goals.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-blue text-brand-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-1">Schedule Call</h4>
                    <p className="text-sm text-gray-600">We'll send you a link to book a time that works for you.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-blue text-brand-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-1">Discovery Session</h4>
                    <p className="text-sm text-gray-600">A 30-minute deep dive into your business and how we can help.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-blue text-brand-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-brand-blue mb-1">Custom Proposal</h4>
                    <p className="text-sm text-gray-600">We'll deliver a tailored strategy and pricing for your approval.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-brand-blue text-brand-white rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">Why SkillHive?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Data-driven strategies</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Transparent reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Proven track record</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
