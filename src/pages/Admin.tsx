import React, { useState, useEffect } from 'react';
 import { TeamMember, ResultItem, getTeam, saveTeam, getResults, saveResults, parseImages, deleteTeamMember, deleteResult, deleteCourse, deletePost, getPosts, savePosts, getCourses, saveCourses, TestimonialItem, EventItem, getTestimonials, saveTestimonials, getEvents, saveEvents, deleteTestimonial, deleteEvent, getLeads, saveLeads } from '../lib/store';
import { supabase } from '../lib/supabase';
import { Trash2, Edit2, Plus, Users, LayoutDashboard, Trophy, BrainCircuit, MessageSquare, GraduationCap, Inbox, Lock, Settings, Eye, EyeOff, Sparkles, MessageCircle, Calendar, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import MediaRenderer from '../components/MediaRenderer';

export default function Admin() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 
 const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'portfolio' | 'blog' | 'courses' | 'ai' | 'leads' | 'settings' | 'testimonials' | 'events'>('portfolio');
 const [team, setTeam] = useState<TeamMember[]>([]);
 const [results, setResults] = useState<ResultItem[]>([]);
 const [posts, setPosts] = useState<any[]>([]);
 const [courses, setCourses] = useState<any[]>([]);
 const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
 const [events, setEvents] = useState<EventItem[]>([]);

 const [oldPassword, setOldPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [settingsMsg, setSettingsMsg] = useState('');

 useEffect(() => {
  const loadData = () => {
    setTeam(getTeam());
    setResults(getResults());
    setPosts(getPosts());
    setCourses(getCourses());
    setTestimonials(getTestimonials());
    setEvents(getEvents());
  };
  
  loadData();
  
  window.addEventListener('teamUpdated', loadData);
  window.addEventListener('resultsUpdated', loadData);
  window.addEventListener('postsUpdated', loadData);
  window.addEventListener('coursesUpdated', loadData);
  window.addEventListener('testimonialsUpdated', loadData);
  window.addEventListener('eventsUpdated', loadData);
  
  return () => {
    window.removeEventListener('teamUpdated', loadData);
    window.removeEventListener('resultsUpdated', loadData);
    window.removeEventListener('postsUpdated', loadData);
    window.removeEventListener('coursesUpdated', loadData);
    window.removeEventListener('testimonialsUpdated', loadData);
    window.removeEventListener('eventsUpdated', loadData);
  };
 }, []);

 // Editing States
 const [editingResultId, setEditingResultId] = useState<string | null>(null);
 const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
 const [editingPostId, setEditingPostId] = useState<string | null>(null);
 const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
 const [editingEventId, setEditingEventId] = useState<string | null>(null);
 const [newTestimonial, setNewTestimonial] = useState<Partial<TestimonialItem>>({ clientName: '', image: '', date: '' });
 const [newEvent, setNewEvent] = useState<Partial<EventItem>>({ title: '', description: '', date: '', location: '', image: '' });
 const [newPost, setNewPost] = useState<any>({
  title: '', category: 'Marketing', tags: '', image: '', content: ''
 });
 const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
 const [newCourse, setNewCourse] = useState<any>({
  title: '', description: '', date: '', price: '', originalPrice: '', image: '', link: ''
 });

 const handleAddTestimonial = async (e: React.FormEvent) => {
  e.preventDefault();
  const itemToSave = {
   id: editingTestimonialId || crypto.randomUUID(),
   clientName: newTestimonial.clientName || '',
   image: newTestimonial.image || '',
   date: newTestimonial.date || new Date().toISOString()
  };
  const updated = editingTestimonialId 
   ? testimonials.map(t => t.id === editingTestimonialId ? itemToSave : t)
   : [...testimonials, itemToSave];
  await saveTestimonials(updated);
  setNewTestimonial({ clientName: '', image: '', date: '' });
  setEditingTestimonialId(null);
 };

 const handleDeleteTestimonial = async (id: string) => {
  const updated = testimonials.filter(t => t.id !== id);
  await deleteTestimonial(id, updated);
 };

 const handleAddEvent = async (e: React.FormEvent) => {
  e.preventDefault();
  const itemToSave = {
   id: editingEventId || crypto.randomUUID(),
   title: newEvent.title || '',
   description: newEvent.description || '',
   date: newEvent.date || '',
   location: newEvent.location || '',
   image: newEvent.image || ''
  };
  const updated = editingEventId 
   ? events.map(ev => ev.id === editingEventId ? itemToSave : ev)
   : [...events, itemToSave];
  await saveEvents(updated);
  setNewEvent({ title: '', description: '', date: '', location: '', image: '' });
  setEditingEventId(null);
 };

 const handleDeleteEvent = async (id: string) => {
  const updated = events.filter(ev => ev.id !== id);
  await deleteEvent(id, updated);
 };

 // Team Form State
 const [newMember, setNewMember] = useState<Partial<TeamMember>>({
  name: '', role: '', image: '', bio: ''
 });

 // Results Form State
 const [newResult, setNewResult] = useState<Partial<ResultItem>>({
  category: 'Social Media Management', metric: '', metricLabel: '', description: '', clientName: '', industry: '', image: '',
  problem: '', solution: '', resultsAchieved: '', testimonial: '', videoUrl: '', ctaText: 'View Live Project', ctaLink: '',
  displayOptions: { homepage: true, featured: false, portfolio: true, slider: false }
 });

 const [blogImage, setBlogImage] = useState('');
 const [courseImage, setCourseImage] = useState('');
 
 const [showPassword, setShowPassword] = useState(false);
 const [showOldPassword, setShowOldPassword] = useState(false);
 const [showNewPassword, setShowNewPassword] = useState(false);

 const [seoTitle, setSeoTitle] = useState('');
 const [seoDesc, setSeoDesc] = useState('');
 const [seoKeywords, setSeoKeywords] = useState('');
 const [seoSlug, setSeoSlug] = useState('');
 const [seoScore, setSeoScore] = useState<{score: string, color: string, recommendations: string[]}>({ score: 'Poor', color: 'text-red-500', recommendations: ['Generate SEO to analyze content']});
 const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);

 const generateSEO = () => {
  setIsGeneratingSeo(true);
  const titleInput = document.querySelector('input[name="title"]') as HTMLInputElement;
  const contentInput = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
  
  setTimeout(() => {
   const title = titleInput?.value || 'Untitled Blog Post';
   setSeoTitle(`${title} | SkillHive Media`);
   setSeoDesc(`Read our latest insights on ${title}. Discover expert tips, strategies, and industry trends to elevate your brand.`);
   setSeoKeywords('social media strategy, digital marketing, business growth, brand awareness');
   setSeoSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
   setSeoScore({
    score: 'Excellent',
    color: 'text-green-500',
    recommendations: ['Title length is optimal', 'Focus keyword found in first paragraph', 'Good keyword density']
   });
   setIsGeneratingSeo(false);
  }, 1500);
 };

 const categories = ['Social Media Management', 'Facebook & Instagram Ads', 'Content Creation/Graphic Design', 'Website Development'];

 const handleAddMember = (e: React.FormEvent) => {
  e.preventDefault();
  
  const member: TeamMember = {
   id: editingMemberId || crypto.randomUUID(),
   name: newMember.name || 'Anonymous',
   role: newMember.role || 'Member',
   image: newMember.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(newMember.name || 'A')}&background=0A32FF&color=fff`,
   bio: newMember.bio || ''
  };
  
  const updatedTeam = editingMemberId ? team.map(m => m.id === editingMemberId ? member : m) : [...team, member];
  setTeam(updatedTeam);
  saveTeam(updatedTeam);
  setNewMember({ name: '', role: '', image: '', bio: '' });
  setEditingMemberId(null);
 };

 const handleDeleteMember = async (id: string) => {
  const updatedTeam = team.filter(m => m.id !== id);
  setTeam(updatedTeam);
  await deleteTeamMember(id, updatedTeam);
 };

 const handleAddResult = (e: React.FormEvent) => {
  e.preventDefault();

  const result: ResultItem = {
   id: editingResultId || crypto.randomUUID(),
   category: newResult.category || 'Social Media Management',
   metric: newResult.metric as string || '',
   metricLabel: newResult.metricLabel || '',
   description: newResult.description as string || '',
   clientName: newResult.clientName || '',
   industry: newResult.industry || 'Various',
   image: newResult.image || '',
   problem: newResult.problem,
   solution: newResult.solution,
   resultsAchieved: newResult.resultsAchieved,
   testimonial: newResult.testimonial,
   videoUrl: newResult.videoUrl,
   ctaText: newResult.ctaText,
   ctaLink: newResult.ctaLink,
   displayOptions: newResult.displayOptions || { homepage: true, featured: false, portfolio: true, slider: false }
  };

  const updatedResults = editingResultId ? results.map(r => r.id === editingResultId ? result : r) : [...results, result];
  setResults(updatedResults);
  saveResults(updatedResults);
  setNewResult({
   category: 'Social Media Management', metric: '', metricLabel: '', description: '', clientName: '', industry: '', image: '',
   problem: '', solution: '', resultsAchieved: '', testimonial: '', videoUrl: '', ctaText: 'View Live Project', ctaLink: '',
   displayOptions: { homepage: true, featured: false, portfolio: true, slider: false }
  });
  setEditingResultId(null);
 };

 const handleDeleteResult = async (id: string) => {
  const updatedResults = results.filter(r => r.id !== id);
  setResults(updatedResults);
  await deleteResult(id, updatedResults);
 };

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void, currentImages?: string) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;
  
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const result = e.target?.result as string;
        if (!result.startsWith('data:image/')) {
          return resolve(result);
        }
        
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;

          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/webp', 0.6));
          } else {
            resolve(result);
          }
        };
        img.onerror = () => resolve(result);
        img.src = result;
      };
      reader.readAsDataURL(file);
    });
  };

  const promises = files.map(file => resizeImage(file));
  const results = await Promise.all(promises);
  
  let existing: string[] = [];
  if (currentImages) {
    existing = parseImages(currentImages);
  }
  
  const combined = [...existing, ...results];
  if (combined.length === 1) {
    setter(combined[0]);
  } else {
    setter(JSON.stringify(combined));
  }
 };

 const handleRemoveImage = (index: number, imageStr: string | undefined, setter: (value: string) => void) => {
  if (!imageStr) return;
  const parsed = parseImages(imageStr);
  const updated = parsed.filter((_, i) => i !== index);
  if (updated.length === 0) {
   setter('');
  } else if (updated.length === 1) {
   setter(updated[0]);
  } else {
   setter(JSON.stringify(updated));
  }
 };



 const SidebarItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
  <button
   onClick={() => setActiveTab(id)}
   className={`w-auto md:w-full whitespace-nowrap flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
    activeTab === id 
    ? 'bg-brand-blue text-white shadow-lg ' 
    : 'text-gray-600 hover:bg-gray-100'
   }`}
  >
   <Icon className="w-5 h-5 shrink-0" />
   {label}
  </button>
 );

 if (!isAuthenticated) {
  return (
   <div className="min-h-screen bg-brand-white dark:bg-brand-black flex items-center justify-center p-6 pt-20">
    <div className="bg-white dark:bg-[#0a0f1c] border border-gray-200 dark:border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
     <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center">
       <Lock className="w-8 h-8 text-brand-blue" />
      </div>
     </div>
     <h2 className="text-2xl font-black text-center mb-8 text-brand-black dark:text-white">Admin Access</h2>
     <form onSubmit={(e) => {
      e.preventDefault();
      if (password === (localStorage.getItem('skillhive_admin_password') || 'Hive123')) {
       setIsAuthenticated(true);
      } else {
       setError('Incorrect password');
      }
     }}>
      <div className="mb-6 relative">
       <input 
        type={showPassword ? 'text' : 'password'} 
        value={password}
        onChange={(e) => {
         setPassword(e.target.value);
         setError('');
        }}
        placeholder="Enter Password"
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-brand-black text-brand-black dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all pr-12"
       />
       <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute right-3 top-3.5 text-gray-400 hover:text-brand-blue transition-colors"
       >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
       </button>
       {error && <p className="text-red-500 text-sm mt-4 font-bold">{error}</p>}
      </div>
      <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
       Login
      </button>
     </form>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-20">
   {/* Sidebar */}
   <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-auto md:min-h-screen shrink-0">
    <div className="mb-10 px-2 mt-4 hidden md:block border-b border-gray-100 pb-6">
     <img src="https://i.ibb.co/dwQtCCjV/20260528-120300.png" alt="SkillHive Media Logo" className="h-14 w-auto mb-4" />
     <h2 className="text-xl font-black text-brand-black tracking-tight">Admin Console</h2>
    </div>

    {!supabase && (
     <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div className="text-xs text-red-800">
       <span className="font-bold block text-sm">Supabase Offline</span>
       Add VITE_SUPABASE_URL and ANON_KEY to environment variables to enable cloud sync.
      </div>
     </div>
    )}
    
    <nav className="flex-1 flex flex-row overflow-x-auto md:flex-col pb-4 md:pb-0 gap-2 md:gap-2 no-scrollbar">
     <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
     <SidebarItem id="leads" icon={Inbox} label="Leads & Forms" />
     <SidebarItem id="portfolio" icon={Trophy} label="Portfolio" />
     <SidebarItem id="testimonials" icon={MessageCircle} label="Testimonials" />
     <SidebarItem id="events" icon={Calendar} label="Events" />
     <SidebarItem id="team" icon={Users} label="Team" />
     <SidebarItem id="blog" icon={MessageSquare} label="Blog" />
     <SidebarItem id="courses" icon={GraduationCap} label="Training" />
     <SidebarItem id="settings" icon={Settings} label="Settings" />
    </nav>
   </aside>

   {/* Main Content */}
   <main className="flex-1 w-full max-w-full p-6 md:p-12 overflow-y-auto overflow-x-hidden">
    <header className="mb-10 flex justify-between items-center">
     <h1 className="text-3xl md:text-4xl font-black text-brand-black dark:text-white capitalize">
      {activeTab === 'courses' ? 'Training' : activeTab === 'leads' ? 'Leads & Forms' : activeTab}
     </h1>
    </header>

    <AnimatePresence mode="wait">
     {activeTab === 'leads' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="leads">
       <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-6 text-brand-black flex items-center gap-2"><Inbox className="w-5 h-5 text-brand-blue"/> Form Submissions</h2>
        
        <div className="space-y-4">
         {getLeads().reverse().map((lead: any) => (
          <div key={lead.id} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl">
           <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 gap-4">
            <div>
             <h4 className="font-bold text-lg">{lead.firstName} {lead.lastName} {lead.name && lead.name}</h4>
             <p className="text-sm text-gray-500">{lead.email}</p>
            </div>
            <span className="text-xs font-bold bg-white px-3 py-1 rounded-full border border-gray-200">
             {new Date(lead.date).toLocaleString()}
            </span>
           </div>
           
           {lead.subject && <p className="mb-2"><span className="font-bold">Subject:</span> {lead.subject}</p>}
           {lead.company && <p className="mb-2"><span className="font-bold">Company:</span> {lead.company}</p>}
           {lead.budget && <p className="mb-2"><span className="font-bold">Budget:</span> {lead.budget}</p>}
           {lead.goals && <p className="mb-2"><span className="font-bold">Goals:</span> {lead.goals}</p>}
           
           {lead.message && (
            <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100">
             <p className="whitespace-pre-wrap text-sm text-gray-700">{lead.message}</p>
            </div>
           )}

           <div className="mt-4 flex justify-end">
            <button 
             onClick={() => {
              const leads = getLeads();
              const updated = leads.filter((l: any) => l.id !== lead.id);
              saveLeads(updated);
              // refresh trick
              setActiveTab('overview');
              setTimeout(() => setActiveTab('leads'), 0);
             }}
             className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1"
            >
             <Trash2 className="w-4 h-4" /> Delete
            </button>
           </div>
          </div>
         ))}
         
         {getLeads().length === 0 && (
          <div className="text-center py-12 text-gray-500">
           <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
           <p>No new form submissions yet.</p>
          </div>
         )}
        </div>
       </div>
      </motion.div>
     )}

     {activeTab === 'portfolio' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="portfolio">
       <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2"><Plus className="w-5 h-5 text-brand-blue"/> {editingResultId ? 'Update' : 'Add'} Portfolio Case Study</h2>
        <form onSubmit={handleAddResult} className="gap-6 grid grid-cols-1 md:grid-cols-2">
         <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Basic Info</h3>
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Service Category</label>
          <select
           value={newResult.category}
           onChange={e => setNewResult({...newResult, category: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
          >
           {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Client Name / Brand (Optional)</label>
          <input
           type="text"
           value={newResult.clientName}
           onChange={e => setNewResult({...newResult, clientName: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
           placeholder="e.g. Acme Corp"
          />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Video Source URL (YouTube, Vimeo, Google Drive, MP4)</label>
          <input type="text" value={newResult.videoUrl || ''} onChange={e => setNewResult({...newResult, videoUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="https://youtube.com/..., https://vimeo.com/..., or Google Drive URL" />
         </div>

         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Custom Thumbnail / Gallery Images (Optional)</label>
          <p className="text-xs text-gray-500 mb-2">If left empty, a thumbnail will be automatically generated for YouTube and Google Drive videos.</p>
          <input type="text" placeholder="https://example.com/img1.jpg" onChange={e => setNewResult({...newResult, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-3" />
          <input type="file" multiple accept="image/*" onChange={e => handleImageUpload(e, (val) => setNewResult({...newResult, image: val}), newResult.image)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          <div className="mt-4 flex flex-wrap gap-4">
           {parseImages(newResult.image).map((img, i) => (
            <div key={i} className="relative group">
             <img src={img} alt="Preview" className="h-32 w-32 rounded-xl object-cover border-2 border-gray-100" />
             <button type="button" onClick={() => handleRemoveImage(i, newResult.image, (val) => setNewResult({...newResult, image: val}))} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-red-500 font-bold block w-4 h-4 flex items-center justify-center">×</span>
             </button>
            </div>
           ))}
          </div>
         </div>

         <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Description / Notes</h3>
          <textarea
           rows={4}
           value={newResult.description}
           onChange={e => setNewResult({...newResult, description: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
           placeholder="General project description..."
          />
         </div>

         {newResult.category === 'Social Media Management' && (
          <>
           <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Social Media Management Details</h3>
           </div>
           <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Client Problem</label>
            <textarea rows={2} value={newResult.problem} onChange={e => setNewResult({...newResult, problem: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="What challenge was the client facing?" />
           </div>
           <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Solution Provided</label>
            <textarea rows={2} value={newResult.solution} onChange={e => setNewResult({...newResult, solution: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="What did SkillHive Media do?" />
           </div>

           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Headline Metric (e.g., 300%)</label>
            <input
             type="text"
             value={newResult.metric}
             onChange={e => setNewResult({...newResult, metric: e.target.value})}
             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
            />
           </div>
           <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Metric Label (e.g., ROI Increase)</label>
            <input
             type="text"
             value={newResult.metricLabel}
             onChange={e => setNewResult({...newResult, metricLabel: e.target.value})}
             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
            />
           </div>
           <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Results Achieved / Summary</label>
            <textarea
             rows={3}
             value={newResult.resultsAchieved}
             onChange={e => setNewResult({...newResult, resultsAchieved: e.target.value})}
             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
            />
           </div>
           <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Client Testimonial</label>
            <textarea
             rows={2}
             value={newResult.testimonial}
             onChange={e => setNewResult({...newResult, testimonial: e.target.value})}
             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium"
             placeholder="Client quote..."
            />
           </div>
          </>
         )}

         <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Call to Action & Display</h3>
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">CTA Button Text</label>
          <input type="text" value={newResult.ctaText} onChange={e => setNewResult({...newResult, ctaText: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="View Live Project" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">CTA Link</label>
          <input type="text" value={newResult.ctaLink} onChange={e => setNewResult({...newResult, ctaLink: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="https://" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-3">Display On:</label>
          <div className="flex flex-wrap gap-4">
           <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <input type="checkbox" checked={newResult.displayOptions?.homepage || false} onChange={e => setNewResult({...newResult, displayOptions: {...newResult.displayOptions!, homepage: e.target.checked}})} className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue" />
            Homepage
           </label>
           <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <input type="checkbox" checked={newResult.displayOptions?.featured || false} onChange={e => setNewResult({...newResult, displayOptions: {...newResult.displayOptions!, featured: e.target.checked}})} className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue" />
            Featured Projects
           </label>
           <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <input type="checkbox" checked={newResult.displayOptions?.portfolio || false} onChange={e => setNewResult({...newResult, displayOptions: {...newResult.displayOptions!, portfolio: e.target.checked}})} className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue" />
            Portfolio Page
           </label>
           <label className="flex items-center gap-2 font-medium text-sm text-gray-700">
            <input type="checkbox" checked={newResult.displayOptions?.slider || false} onChange={e => setNewResult({...newResult, displayOptions: {...newResult.displayOptions!, slider: e.target.checked}})} className="w-5 h-5 text-brand-blue rounded focus:ring-brand-blue" />
            Homepage Slider
           </label>
          </div>
         </div>

         <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">
           {editingResultId ? 'Update Case Study' : 'Save Case Study'}
          </button>
         </div>
        </form>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {results.map(result => (
         <div key={result.id} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-start justify-between shadow-sm hover:shadow-md transition-shadow gap-6 relative">
          {result.image && (
           <img src={parseImages(result.image)[0]} alt={result.clientName} className="w-full md:w-32 h-32 rounded-2xl object-cover" />
          )}
          <div className="flex-1">
           <div className="flex gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">{result.category}</span>
            {result.displayOptions?.featured && <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">★ Featured</span>}
            {result.displayOptions?.homepage && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Homepage</span>}
           </div>
           <h3 className="text-3xl font-black text-brand-black mt-2">{result.metric} <span className="text-lg text-gray-500 font-medium ml-2">{result.metricLabel}</span></h3>
           <p className="text-gray-800 font-bold mt-2 text-lg">{result.clientName}</p>
           {result.resultsAchieved && <p className="text-gray-600 leading-relaxed text-sm mt-3 border-l-4 border-brand-blue/20 pl-4">{result.resultsAchieved}</p>}
           {(result.problem || result.solution) && (
            <div className="mt-4 flex gap-4 text-sm text-gray-500">
             {result.problem && <span><strong>Problem:</strong> Logged ✓</span>}
             {result.solution && <span><strong>Solution:</strong> Logged ✓</span>}
            </div>
           )}
          </div>
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4 transition-opacity">
           <button type="button" onClick={() => {
            setEditingResultId(result.id);
            setNewResult(result);
            window.scrollTo({ top: 0, behavior: 'smooth' });
           }} className="text-gray-300 hover:text-brand-blue transition-colors">
            <Edit2 className="w-5 h-5" />
           </button>
           <button type="button" onClick={() => handleDeleteResult(result.id)} className="text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
           </button>
          </div>
         </div>
        ))}
       </div>
      </motion.div>
     )}

     {activeTab === 'team' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="team">
       <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2"><Plus className="w-5 h-5 text-brand-blue"/> {editingMemberId ? 'Update' : 'Add'} Team Member</h2>
        <form onSubmit={handleAddMember} className="gap-6 grid grid-cols-1 md:grid-cols-2">
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input type="text" required value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Role / Position</label>
          <input type="text" required value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo (Upload or Enter URL)</label>
          <input type="text" placeholder="https://..." onChange={e => setNewMember({...newMember, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-3" />
          <input type="file" accept="image/*" onChange={e => handleImageUpload(e, (val) => setNewMember({...newMember, image: val}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          {newMember.image && newMember.image.length > 0 && (
           <div className="relative group inline-block mt-4">
            <img src={parseImages(newMember.image)[0]} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-brand-blue" />
            <button type="button" onClick={() => handleRemoveImage(0, newMember.image, (val) => setNewMember({...newMember, image: val}))} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
             <span className="text-red-500 font-bold block w-3 h-3 flex items-center justify-center text-xs">×</span>
            </button>
           </div>
          )}
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio</label>
          <textarea rows={2} value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">{editingMemberId ? 'Update Member' : 'Add Member'}</button>
         </div>
        </form>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
         <div key={member.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm relative group hover:shadow-md transition-shadow">
          <img src={parseImages(member.image)[0]} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-blue/20" />
          <div>
           <h4 className="font-bold text-white text-lg">{member.name}</h4>
           <p className="text-sm text-gray-500 font-medium">{member.role}</p>
          </div>
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4 transition-opacity">
           <button type="button" onClick={() => {
            setEditingMemberId(member.id);
            setNewMember(member);
            window.scrollTo({ top: 0, behavior: 'smooth' });
           }} className="text-gray-300 hover:text-brand-blue transition-colors">
            <Edit2 className="w-5 h-5" />
           </button>
           <button type="button" onClick={() => handleDeleteMember(member.id)} className="text-gray-300 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
           </button>
          </div>
         </div>
        ))}
       </div>
      </motion.div>
     )}

     {activeTab === 'testimonials' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="testimonials" className="space-y-8">
       <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">{editingTestimonialId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label className="block text-sm font-bold text-brand-black mb-2">Client Name</label>
          <input type="text" value={newTestimonial.clientName} onChange={e => setNewTestimonial({...newTestimonial, clientName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div>
          <label className="block text-sm font-bold text-brand-black mb-2">Date Uploaded</label>
          <input type="date" value={newTestimonial.date?.split('T')[0] || ''} onChange={e => setNewTestimonial({...newTestimonial, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-brand-black mb-2">Screenshot Image (Upload or Enter URL)</label>
          <input type="text" value={newTestimonial.image || ''} onChange={e => setNewTestimonial({...newTestimonial, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-4" placeholder="Enter Image URL" />
          <input type="file" accept="image/*" onChange={e => handleImageUpload(e, (val) => setNewTestimonial({...newTestimonial, image: val}))} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          {newTestimonial.image && (
           <div className="mt-4">
            <img src={parseImages(newTestimonial.image)[0]} alt="Preview" className="h-32 rounded-xl object-contain border-2 border-gray-100" />
           </div>
          )}
         </div>
         <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">{editingTestimonialId ? 'Update' : 'Add'} Testimonial</button>
         </div>
        </form>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(t => (
         <div key={t.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all">
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4">
           <button onClick={() => { setEditingTestimonialId(t.id); setNewTestimonial(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-300 hover:text-brand-blue"><Edit2 className="w-5 h-5" /></button>
           <button onClick={() => handleDeleteTestimonial(t.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
          </div>
          <h4 className="font-bold text-lg mb-2">{t.clientName}</h4>
          <img src={parseImages(t.image)[0]} alt={t.clientName} className="w-full h-48 object-contain bg-gray-50 rounded-xl" />
         </div>
        ))}
       </div>
      </motion.div>
     )}

     {activeTab === 'events' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="events" className="space-y-8">
       <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">{editingEventId ? 'Edit Event' : 'Add New Event'}</h3>
        <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label className="block text-sm font-bold text-brand-black mb-2">Event Title</label>
          <input type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div>
          <label className="block text-sm font-bold text-brand-black mb-2">Date</label>
          <input type="text" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="e.g. October 12, 2024" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-brand-black mb-2">Description</label>
          <textarea rows={3} value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-brand-black mb-2">Event Image/Video (Upload or Enter URL)</label>
          <input type="text" value={newEvent.image || ''} onChange={e => setNewEvent({...newEvent, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-4" placeholder="Enter Image or Video URL" />
          <input type="file" multiple accept="image/*,video/*" onChange={e => handleImageUpload(e, (val) => setNewEvent({...newEvent, image: val}), newEvent.image)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          {newEvent.image && (
           <div className="mt-4 flex flex-wrap gap-4">
            {parseImages(newEvent.image).map((img, i) => (
             <div key={i} className="relative h-32 w-48 rounded-xl overflow-hidden border-2 border-gray-100">
               <MediaRenderer interactive={true} src={img} alt="Preview" className="w-full h-full object-cover block" />
             </div>
            ))}
           </div>
          )}
         </div>
         <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">{editingEventId ? 'Update' : 'Add'} Event</button>
         </div>
        </form>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => (
         <div key={ev.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col shadow-sm relative group hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4 z-10 transition-opacity">
           <button onClick={() => { setEditingEventId(ev.id); setNewEvent(ev); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-300 hover:text-brand-blue"><Edit2 className="w-5 h-5" /></button>
           <button onClick={() => handleDeleteEvent(ev.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
          </div>
          <MediaRenderer interactive={false} src={parseImages(ev.image)[0]} alt={ev.title} className="w-full h-40 object-cover rounded-xl mb-4 pointer-events-none" />
          <h4 className="font-bold text-xl mb-1">{ev.title}</h4>
          <p className="text-brand-blue text-sm mb-2">{ev.date}</p>
          <p className="text-gray-600 text-sm line-clamp-3">{ev.description}</p>
         </div>
        ))}
       </div>
      </motion.div>
     )}

     {['overview'].includes(activeTab) && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
         <h3 className="text-gray-500 font-bold text-sm">Total Leads</h3>
         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue"><Inbox className="w-5 h-5"/></div>
        </div>
        <p className="text-4xl font-black text-brand-black dark:text-gray-800">{getLeads().length}</p>
       </div>
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
         <h3 className="text-gray-500 font-bold text-sm">Team Members</h3>
         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue"><Users className="w-5 h-5"/></div>
        </div>
        <p className="text-4xl font-black text-brand-black dark:text-gray-800">{team.length}</p>
       </div>
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
         <h3 className="text-gray-500 font-bold text-sm">Blog Posts</h3>
         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue"><MessageSquare className="w-5 h-5"/></div>
        </div>
        <p className="text-4xl font-black text-brand-black dark:text-gray-800">{posts.length}</p>
       </div>
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
         <h3 className="text-gray-500 font-bold text-sm">Active Courses</h3>
         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue"><GraduationCap className="w-5 h-5"/></div>
        </div>
        <p className="text-4xl font-black text-brand-black dark:text-gray-800">{courses.length}</p>
       </div>
      </motion.div>
     )}

     {activeTab === 'blog' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="blog">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Total Posts</h3>
          <p className="text-3xl font-black text-brand-black">{posts.length}</p>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Drafts</h3>
          <p className="text-3xl font-black text-gray-400">0</p>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Scheduled</h3>
          <p className="text-3xl font-black text-brand-blue">0</p>
         </div>
         <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Total Views</h3>
          <p className="text-3xl font-black text-green-500">12K+</p>
         </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-6 text-brand-black dark:text-gray-800 flex items-center gap-2"><Plus className="w-5 h-5 text-brand-blue"/> {editingPostId ? 'Update' : 'Add'} Blog Post</h2>
        <form 
         onSubmit={(e) => {
          e.preventDefault();
          
          const postToSave = {
           id: editingPostId || crypto.randomUUID(),
           title: newPost.title,
           category: newPost.category || 'Marketing',
           tags: newPost.tags,
           date: newPost.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
           image: blogImage || newPost.image,
           content: newPost.content,
          };

          const updatedPosts = editingPostId ? posts.map((p: any) => p.id === editingPostId ? postToSave : p) : [...posts, postToSave];
          savePosts(updatedPosts);
          setNewPost({ title: '', category: 'Marketing', tags: '', image: '', content: '' });
          setBlogImage('');
          setEditingPostId(null);
          // trigger re-render
          setActiveTab('overview');
          setTimeout(() => setActiveTab('blog'), 0);
         }} 
         className="gap-6 grid grid-cols-1 md:grid-cols-2"
        >
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
          <input type="text" value={newPost.title || ''} onChange={e => setNewPost({...newPost, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
          <select value={newPost.category || 'Marketing'} onChange={e => setNewPost({...newPost, category: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium">
           {['Social Media Marketing', 'AI', 'Website Design', 'Branding', 'Business Growth', 'Facebook Ads', 'Personal Branding', 'Content Marketing'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
           ))}
          </select>
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (Upload or Enter URL)</label>
          <input type="text" placeholder="https://..." value={blogImage} onChange={e => setBlogImage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-3" />
          <input type="hidden" name="image" value={blogImage} />
          <input type="file" multiple accept="image/*" onChange={e => handleImageUpload(e, setBlogImage, blogImage)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          <div className="mt-4 flex flex-wrap gap-4">
           {parseImages(blogImage).map((img, i) => (
            <div key={i} className="relative group">
             <img src={img} alt="Preview" className="h-24 w-24 rounded-xl object-cover border-2 border-gray-100" />
             <button type="button" onClick={() => handleRemoveImage(i, blogImage, setBlogImage)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-red-500 font-bold block w-4 h-4 flex items-center justify-center">×</span>
             </button>
            </div>
           ))}
          </div>
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
          <input type="text" value={newPost.tags || ''} onChange={e => setNewPost({...newPost, tags: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="e.g. Marketing, Growth, Tips" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
          <div className="bg-white rounded-xl overflow-hidden pb-12">
           <ReactQuill 
            theme="snow" 
            value={newPost.content || ''} 
            onChange={(val) => setNewPost({...newPost, content: val})} 
            className="h-64"
           />
          </div>
         </div>

         <div className="md:col-span-2 mt-4 mb-4">
          <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-8">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
             <h3 className="text-xl font-bold text-brand-black dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-blue" />
              AI-Powered SEO Settings
             </h3>
             <p className="text-sm text-gray-500 mt-1">Let AI generate optimized meta tags to rank your post higher.</p>
            </div>
            <button type="button" onClick={generateSEO} disabled={isGeneratingSeo} className="bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors disabled:opacity-50">
             {isGeneratingSeo ? 'Generating AI SEO...' : <><Sparkles className="w-4 h-4"/> Generate SEO with AI</>}
            </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-gray-100">
            <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">SEO Title</label>
             <input type="text" name="seoTitle" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
            </div>
            <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug & Canonical</label>
             <input type="text" name="seoSlug" value={seoSlug} onChange={e => setSeoSlug(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
            </div>
            <div className="md:col-span-2">
             <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
             <textarea name="seoDescription" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
            </div>
            <div className="md:col-span-2">
             <label className="block text-sm font-bold text-gray-700 mb-2">Focus Keywords (comma separated)</label>
             <input type="text" name="seoKeywords" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
             <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-xs font-bold text-gray-500 py-1">Suggestions:</span>
              {['Social Media Marketing', 'AI Tools', 'Website Growth', 'Brand Authority'].map(k => (
               <button type="button" key={k} onClick={() => setSeoKeywords(prev => prev ? `${prev}, ${k}` : k)} className="text-xs font-medium bg-gray-100 hover:bg-brand-blue hover:text-white px-3 py-1 rounded-full transition-colors">
                + {k}
               </button>
              ))}
             </div>
            </div>
            <div className="md:col-span-2 mt-2 p-5 bg-gray-50 rounded-xl border border-gray-100">
             <h4 className="font-bold text-gray-700 mb-2">SEO Score: <span className={seoScore.color}>{seoScore.score}</span></h4>
             <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
              {seoScore.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
             </ul>
            </div>
           </div>
          </div>
         </div>

         <div className="md:col-span-2 flex justify-end gap-4">
          <button type="button" className="bg-white border border-gray-200 text-gray-600 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">Save Draft</button>
          <button type="button" className="bg-white border border-gray-200 text-brand-blue px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm">Schedule Post</button>
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">{editingPostId ? 'Update Post' : 'Publish Now'}</button>
         </div>
        </form>
       </div>

       <div className="grid grid-cols-1 gap-6">
        {posts.map((post: any) => (
         <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm relative group hover:shadow-md transition-shadow">
          {post.image ? (
           <img src={parseImages(post.image)[0]} alt={post.title} className="w-24 h-24 rounded-xl object-cover" />
          ) : (
           <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
            <MessageSquare className="w-8 h-8" />
           </div>
          )}
          <div className="flex-1">
           <h4 className="font-bold text-white text-xl mb-1">{post.title}</h4>
           <div className="flex gap-4 text-sm text-gray-500 font-medium mb-2 items-center">
            <span>{post.date}</span>
            <span>•</span>
            <span className="text-brand-blue font-bold">{post.category}</span>
            {post.tags && (
             <>
              <span>•</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{post.tags}</span>
             </>
            )}
           </div>
           <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>
          </div>
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4 transition-opacity">
           <button type="button" onClick={() => {
            setEditingPostId(post.id);
            setNewPost(post);
            setBlogImage(post.image);
            window.scrollTo({ top: 0, behavior: 'smooth' });
           }} className="text-gray-300 hover:text-brand-blue transition-colors">
            <Edit2 className="w-5 h-5" />
           </button>
           <button type="button" 
            onClick={async () => {
             const updated = posts.filter((p: any) => p.id !== post.id);
             await deletePost(post.id, updated);
            }} 
            className="text-gray-300 hover:text-red-500 transition-colors"
           >
            <Trash2 className="w-5 h-5" />
           </button>
          </div>
         </div>
        ))}
       </div>
      </motion.div>
     )}

     {activeTab === 'courses' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="courses">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2"><Plus className="w-5 h-5 text-brand-blue"/> {editingCourseId ? 'Update' : 'Add'} Training/Course</h2>
        <form 
         onSubmit={(e) => {
          e.preventDefault();
          
          const courseToSave = {
           id: editingCourseId || crypto.randomUUID(),
           title: newCourse.title,
           description: newCourse.description,
           date: newCourse.date,
           price: newCourse.price,
           originalPrice: newCourse.originalPrice,
           image: courseImage || newCourse.image,
           link: newCourse.link,
          };

          const updatedCourses = editingCourseId ? courses.map((c: any) => c.id === editingCourseId ? courseToSave : c) : [...courses, courseToSave];
          saveCourses(updatedCourses);
          setNewCourse({ title: '', description: '', date: '', price: '', originalPrice: '', image: '', link: '' });
          setCourseImage('');
          setEditingCourseId(null);
          // trigger re-render
          setActiveTab('overview');
          setTimeout(() => setActiveTab('courses'), 0);
         }} 
         className="gap-6 grid grid-cols-1 md:grid-cols-2"
        >
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Course Title</label>
          <input type="text" value={newCourse.title || ''} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Date/Duration (Optional)</label>
          <input type="text" value={newCourse.date || ''} onChange={(e) => setNewCourse({...newCourse, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="e.g. 4 Weeks" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Price (Current)</label>
          <input type="text" value={newCourse.price || ''} onChange={(e) => setNewCourse({...newCourse, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="e.g. $497 or ₦200,000" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (Strikethrough)</label>
          <input type="text" value={newCourse.originalPrice || ''} onChange={(e) => setNewCourse({...newCourse, originalPrice: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" placeholder="e.g. $997 or ₦400,000" />
         </div>
         <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Registration Link</label>
          <input type="text" value={newCourse.link || ''} onChange={(e) => setNewCourse({...newCourse, link: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Flyer/Image Gallery (Upload Multiple or Enter URL)</label>
          <input type="text" value={courseImage.includes('data:image/') ? '' : courseImage} onChange={e => setCourseImage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium mb-4" placeholder="Optional: Provide Image URL instead of Upload" />
          <input type="hidden" name="image" value={courseImage} />
          <input type="file" multiple accept="image/*" onChange={e => handleImageUpload(e, setCourseImage, courseImage)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
          <div className="mt-4 flex flex-wrap gap-4">
           {parseImages(courseImage).map((img, i) => (
            <div key={i} className="relative group">
             <img src={img} alt="Preview" className="h-32 w-32 rounded-xl object-cover border-2 border-gray-100" />
             <button type="button" onClick={() => handleRemoveImage(i, courseImage, setCourseImage)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-red-500 font-bold block w-4 h-4 flex items-center justify-center">×</span>
             </button>
            </div>
           ))}
          </div>
         </div>
         <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea value={newCourse.description || ''} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} rows={3} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium" />
         </div>
         <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="bg-brand-black text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg">{editingCourseId ? 'Update' : 'Save'} Course</button>
         </div>
        </form>
       </div>

       <div className="grid grid-cols-1 gap-6">
        {courses.map((course: any) => (
         <div key={course.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 shadow-sm relative group hover:shadow-md transition-shadow">
          {course.image && <img src={parseImages(course.image)[0]} alt={course.title} className="w-24 h-24 rounded-xl object-cover" />}
          <div className="flex-1">
           <h4 className="font-bold text-white text-xl mb-1">{course.title}</h4>
           <div className="flex gap-4 text-sm text-gray-500 font-medium mb-2">
            <span>{course.date}</span>
            <span>•</span>
            <span className="text-brand-blue font-bold">{course.price || 'Free'}</span>
            {course.originalPrice && (
             <span className="text-gray-400 font-bold line-through ml-2">{course.originalPrice}</span>
            )}
           </div>
           <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
          </div>
          <div className="absolute top-4 right-4 flex bg-brand-black/90 p-2 rounded-2xl items-center gap-4 transition-opacity">
           <button type="button" onClick={() => {
            setEditingCourseId(course.id);
            setNewCourse(course);
            setCourseImage(course.image);
            window.scrollTo({ top: 0, behavior: 'smooth' });
           }} className="text-gray-300 hover:text-brand-blue transition-colors">
            <Edit2 className="w-5 h-5" />
           </button>
           <button type="button"
            onClick={async () => {
             const updated = courses.filter((c: any) => c.id !== course.id);
             await deleteCourse(course.id, updated);
             // trigger re-render
             setActiveTab('overview');
             setTimeout(() => setActiveTab('courses'), 0);
            }} 
            className="text-gray-300 hover:text-red-500 transition-colors"
           >
            <Trash2 className="w-5 h-5" />
           </button>
          </div>
         </div>
        ))}
       </div>
      </motion.div>
     )}
     {activeTab === 'settings' && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="settings">
       <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-brand-black flex items-center gap-2"><Settings className="w-6 h-6 text-brand-blue"/> Security Settings</h2>
        
        <form onSubmit={(e) => {
         e.preventDefault();
         const currentRealPassword = localStorage.getItem('skillhive_admin_password') || 'Hive123';
         if (oldPassword !== currentRealPassword) {
          setSettingsMsg('Error: Incorrect current password');
          return;
         }
         if (newPassword.length < 6) {
          setSettingsMsg('Error: New password must be at least 6 characters');
          return;
         }
         localStorage.setItem('skillhive_admin_password', newPassword);
         setSettingsMsg('Success: Password updated successfully');
         setOldPassword('');
         setNewPassword('');
        }}>
         <div className="space-y-6">
          <div className="relative">
           <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
           <input type={showOldPassword ? 'text' : 'password'} required value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium pr-12" />
           <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 bottom-3 text-gray-400 hover:text-brand-blue transition-colors">
            {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
           </button>
          </div>
          <div className="relative">
           <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
           <input type={showNewPassword ? 'text' : 'password'} required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50 font-medium pr-12" />
           <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 bottom-3 text-gray-400 hover:text-brand-blue transition-colors">
            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
           </button>
          </div>
          {settingsMsg && (
           <p className={`font-bold text-sm ${settingsMsg.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{settingsMsg}</p>
          )}
          <button type="submit" className="w-full bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">Change Password</button>
         </div>
        </form>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </main>
  </div>
 );
}
