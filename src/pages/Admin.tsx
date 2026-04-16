import { useState, useEffect } from 'react';
import { TeamMember, ResultItem, getTeam, saveTeam, getResults, saveResults } from '../lib/store';
import { Trash2, Plus, Users, BarChart } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'team' | 'results'>('team');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);

  useEffect(() => {
    setTeam(getTeam());
    setResults(getResults());
  }, []);

  // Team Form State
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '', role: '', image: '', bio: ''
  });

  // Results Form State
  const [newResult, setNewResult] = useState<Partial<ResultItem>>({
    category: 'Social Media Management', metric: '', metricLabel: '', description: '', clientName: '', industry: '', image: ''
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      image: newMember.image || 'https://picsum.photos/seed/team/400/400',
      bio: newMember.bio || ''
    };
    
    const updatedTeam = [...team, member];
    setTeam(updatedTeam);
    saveTeam(updatedTeam);
    setNewMember({ name: '', role: '', image: '', bio: '' });
  };

  const handleDeleteMember = (id: string) => {
    const updatedTeam = team.filter(m => m.id !== id);
    setTeam(updatedTeam);
    saveTeam(updatedTeam);
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.metric || !newResult.description) return;

    const result: ResultItem = {
      id: Date.now().toString(),
      category: newResult.category || 'Social Media Management',
      metric: newResult.metric,
      metricLabel: newResult.metricLabel || 'Growth',
      description: newResult.description,
      clientName: newResult.clientName || 'Anonymous Client',
      industry: newResult.industry || 'Various',
      image: newResult.image || 'https://picsum.photos/seed/results/600/400'
    };

    const updatedResults = [...results, result];
    setResults(updatedResults);
    saveResults(updatedResults);
    setNewResult({
      category: 'Social Media Management', metric: '', metricLabel: '', description: '', clientName: '', industry: '', image: ''
    });
  };

  const handleDeleteResult = (id: string) => {
    const updatedResults = results.filter(r => r.id !== id);
    setResults(updatedResults);
    saveResults(updatedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-brand-blue mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website content directly from here. Changes will reflect immediately on the live site.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'team' ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Manage Team
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === 'results' ? 'bg-brand-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart className="w-5 h-5" />
            Manage Results
          </button>
        </div>

        {/* Team Management */}
        {activeTab === 'team' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Team Member
              </h2>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="Head of Strategy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newMember.image}
                    onChange={(e) => setNewMember({...newMember, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="https://..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank for a random placeholder image.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                  <textarea
                    value={newMember.bio}
                    onChange={(e) => setNewMember({...newMember, bio: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none resize-none"
                    rows={3}
                    placeholder="Brief description of their expertise..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-blue text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
                >
                  Add Member
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.length === 0 ? (
                  <div className="col-span-full bg-white p-12 rounded-2xl text-center border border-gray-100">
                    <p className="text-gray-500">No team members added yet. Add one using the form.</p>
                  </div>
                ) : (
                  team.map(member => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                      <img src={member.image} alt={member.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-brand-blue text-lg">{member.name}</h3>
                        <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-500 hover:text-red-700 p-2 h-fit"
                        title="Delete Member"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results Management */}
        {activeTab === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Result/Case Study
              </h2>
              <form onSubmit={handleAddResult} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={newResult.category}
                    onChange={(e) => setNewResult({...newResult, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                  >
                    <option>Social Media Management</option>
                    <option>Facebook & Instagram Ads</option>
                    <option>Content Creation</option>
                    <option>Website Design</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metric *</label>
                    <input
                      type="text"
                      required
                      value={newResult.metric}
                      onChange={(e) => setNewResult({...newResult, metric: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                      placeholder="+150%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Metric Label</label>
                    <input
                      type="text"
                      value={newResult.metricLabel}
                      onChange={(e) => setNewResult({...newResult, metricLabel: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                      placeholder="Growth"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={newResult.clientName}
                    onChange={(e) => setNewResult({...newResult, clientName: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="TechFlow Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={newResult.industry}
                    onChange={(e) => setNewResult({...newResult, industry: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="SaaS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newResult.image}
                    onChange={(e) => setNewResult({...newResult, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description/Testimonial *</label>
                  <textarea
                    required
                    value={newResult.description}
                    onChange={(e) => setNewResult({...newResult, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none resize-none"
                    rows={4}
                    placeholder="How did you help them?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-blue text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors"
                >
                  Add Result
                </button>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {results.length === 0 ? (
                  <div className="col-span-full bg-white p-12 rounded-2xl text-center border border-gray-100">
                    <p className="text-gray-500">No results added yet. Add one using the form.</p>
                  </div>
                ) : (
                  results.map(result => (
                    <div key={result.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                      <div className="h-32 bg-gray-100 relative">
                        <img src={result.image} alt={result.clientName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          onClick={() => handleDeleteResult(result.id)}
                          className="absolute top-2 right-2 bg-white text-red-500 hover:text-red-700 p-2 rounded-full shadow-md"
                          title="Delete Result"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{result.category}</div>
                        <div className="flex items-end gap-2 mb-4">
                          <div className="text-3xl font-bold text-brand-blue">{result.metric}</div>
                          <div className="text-sm font-semibold text-gray-500 mb-1">{result.metricLabel}</div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">"{result.description}"</p>
                        <div className="mt-auto">
                          <div className="font-medium text-brand-blue">{result.clientName}</div>
                          <div className="text-xs text-gray-500">{result.industry}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
