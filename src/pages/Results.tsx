import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ResultItem, getResults } from '../lib/store';

export default function Results() {
  const categories = ['Social Media Management', 'Facebook & Instagram Ads', 'Content Creation', 'Website Design'];
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    const loadResults = () => {
      setResults(getResults());
    };
    
    loadResults();
    window.addEventListener('resultsUpdated', loadResults);
    return () => window.removeEventListener('resultsUpdated', loadResults);
  }, []);

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Client Results & Proof</h1>
          <p className="text-xl text-blue-800 font-medium">
            We let our numbers do the talking. Explore how we've helped businesses scale, increase visibility, and drive revenue.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-16 text-center mb-24">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">No Results Added Yet</h2>
            <p className="text-blue-800 max-w-2xl mx-auto mb-8">
              Head over to the Admin Dashboard to add your client case studies and results.
            </p>
            <Link to="/admin" className="bg-brand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-900 transition-colors">
              Go to Admin Dashboard
            </Link>
          </div>
        ) : (
          categories.map((category, index) => {
            const categoryResults = results.filter(r => r.category === category);
            
            if (categoryResults.length === 0) return null;

            return (
              <div key={index} className="mb-24 last:mb-0">
                <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
                  <h2 className="text-3xl font-bold text-brand-blue">{category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categoryResults.map((item) => (
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
              </div>
            );
          })
        )}

        <div className="mt-24 bg-blue-50 rounded-3xl p-12 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-brand-blue mb-6">Want to be our next success story?</h2>
          <p className="text-lg text-blue-800 font-medium mb-8 max-w-2xl mx-auto">
            Stop leaving money on the table. Let's build a custom strategy to scale your business online.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-brand-blue text-brand-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-900 transition-colors shadow-md"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
