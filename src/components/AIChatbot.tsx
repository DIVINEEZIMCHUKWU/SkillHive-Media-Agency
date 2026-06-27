import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function AIChatbot() {
 const [isOpen, setIsOpen] = useState(false);
 const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
  {
   role: 'ai',
   text: 'Hello! I am the SkillHive AI Assistant. How can I help you grow your business today?',
  },
 ]);
 const [input, setInput] = useState('');

 const [isLoading, setIsLoading] = useState(false);
 const [backendHealthy, setBackendHealthy] = useState<'unknown' | 'ok' | 'failed'>('unknown');

 const getApiBaseCandidates = () => {
  const envBase = (import.meta as any).env?.VITE_API_BASE?.trim() || '';
  const candidates = new Set<string>();

  if (envBase) {
   candidates.add(envBase.replace(/\/+$/,'').replace(/\/$/, ''));
  }

  if (typeof window !== 'undefined') {
   const currentOrigin = window.location.origin.replace(/\/+$/,'');
   if (currentOrigin) {
    candidates.add(currentOrigin);
   }

   if (window.location.hostname === 'www.skillhive.name.ng') {
    candidates.add('https://skillhive.name.ng');
   }

   if (window.location.hostname === 'skillhive.name.ng') {
    candidates.add('https://www.skillhive.name.ng');
   }
  }

  candidates.add('https://skillhivemediaagency1.vercel.app');
  candidates.add('https://skillhive.name.ng');
  candidates.add('https://www.skillhive.name.ng');

  return Array.from(candidates).filter(Boolean);
 };

 const getApiEndpoints = (path: string) => {
  return getApiBaseCandidates().map((base) => `${base.replace(/\/+$/,'')}${path}`);
 };

 useEffect(() => {
  const checkHealth = async () => {
   const endpoints = getApiEndpoints('/api/chat');
   for (const healthUrl of endpoints) {
    try {
     const res = await fetch(healthUrl, { method: 'OPTIONS' });
     if (res.ok || res.status === 204) {
      setBackendHealthy('ok');
      return;
     }
    } catch {
     // Try the next candidate if this one is unavailable.
    }
   }

   setBackendHealthy('failed');
  };

  checkHealth();
 }, []);

 const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const newMessages = [...messages, { role: 'user', text: input } as const];
  setMessages(newMessages);
  setInput('');
  setIsLoading(true);

  try {
   const endpoints = getApiEndpoints('/api/chat');
   let lastError: any = null;
   let lastEndpoint = '';

   for (const endpoint of endpoints) {
    try {
     const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
     });

     let data: any = null;
     const contentType = res.headers.get('content-type') || '';
     if (contentType.includes('application/json')) {
      try {
       data = await res.json();
      } catch (e) {
       data = null;
      }
     } else {
      const text = await res.text().catch(() => '');
      const isHtml = contentType.includes('text/html') || /<html/i.test(text);
      data = { text: text || null, __isHtml: isHtml };
     }

     if (res.status === 404) {
      lastError = { endpoint, status: res.status, body: data };
      lastEndpoint = endpoint;
      continue;
     }

     if (res.ok && data && data.text) {
      setMessages((prev) => [...prev, { role: 'ai', text: data.text }]);
      return;
     }

     let serverMsg = 'Sorry, I encountered an error. Please try again.';
     if (res.status === 404) serverMsg = 'AI Assistant unavailable — the chat endpoint could not be found. Please ensure the Vercel function is deployed and that VITE_API_BASE points to the correct backend URL if needed.';
     else if (data?.__isHtml) serverMsg = `AI Assistant unavailable — API returned HTML from ${endpoint}. This usually means the frontend is deployed without the backend service or the API path is incorrect.`;
     else if (res.status >= 500) serverMsg = 'AI Assistant server error. Please try again later.';
     else if (data?.text) serverMsg = data.text;
     else if (data?.error) serverMsg = data.error;
     else if (data?.message) serverMsg = data.message;
     else if (res.statusText) serverMsg = `${res.status} ${res.statusText}`;

     console.error('AI assistant error response:', { status: res.status, statusText: res.statusText, body: data, endpoint });
     setMessages((prev) => [...prev, { role: 'ai', text: serverMsg }]);
     return;
    } catch (error) {
     lastError = error;
     lastEndpoint = endpoint;
    }
   }

   const message = (lastError as any)?.message || 'AI Assistant unavailable — the chat endpoint could not be reached. Please ensure the Vercel function is deployed and that VITE_API_BASE points to the correct backend URL if needed.';
   setMessages((prev) => [...prev, { role: 'ai', text: message }]);
  } catch (error) {
    const message = (error as any)?.message || 'Network error. Please try again later.';
    setMessages((prev) => [...prev, { role: 'ai', text: message }]);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <>
   <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
    <AnimatePresence>
     {isOpen && (
      <motion.div
       initial={{ opacity: 0, y: 20, scale: 0.9 }}
       animate={{ opacity: 1, y: 0, scale: 1 }}
       exit={{ opacity: 0, y: 20, scale: 0.9 }}
       transition={{ duration: 0.3 }}
       className="bg-gray-50 dark:bg-[#0F0F12]/80 backdrop-blur-md w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 overflow-hidden border border-gray-200 dark:border-white/10"
      >
       {/* Header */}
       <div className="bg-brand-blue p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
         <div className="bg-white/20 p-2 rounded-full">
          <Bot className="w-5 h-5 text-white" />
         </div>
         <div>
          <h3 className="font-bold text-white text-sm">SkillHive AI Assistant</h3>
          <p className="text-blue-100 text-xs flex items-center gap-1">
           <Sparkles className="w-3 h-3" /> Online
          </p>
         </div>
        </div>
        <button
         onClick={() => setIsOpen(false)}
         className="text-blue-100 hover:text-white transition-colors"
        >
         <X className="w-5 h-5" />
        </button>
       </div>
       {backendHealthy === 'failed' && (
        <div className="bg-red-50 dark:bg-red-900/25 text-red-700 dark:text-red-200 px-4 py-3 text-sm border border-red-200 dark:border-red-800 rounded-b-2xl">
         AI backend is not reachable. Please ensure the Vercel AI function is deployed and the site is configured to use the correct API base.
        </div>
       )}

       {/* Messages Area */}
       <div className="h-80 overflow-y-auto p-4 flex flex-col gap-4 bg-white dark:bg-[#0F0F12]/95 no-scrollbar text-sm">
        {messages.map((msg, idx) => (
         <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-[85%] rounded-2xl p-3 ${
           msg.role === 'ai'
            ? 'bg-gray-100 dark:bg-blue-900/40 text-gray-800 dark:text-blue-50 self-start border border-gray-200 dark:border-blue-500/20'
            : 'bg-brand-blue text-white self-end'
          }`}
         >
          {msg.text}
         </motion.div>
        ))}
       </div>

       {/* Input Area */}
       <div className="p-4 bg-gray-50 dark:bg-[#0F0F12] border-t border-gray-200 dark:border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
         <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-brand-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-blue transition-colors text-sm shadow-sm"
         />
         <button
          type="submit"
          className="absolute right-2 p-1.5 bg-brand-blue text-white rounded-full hover:bg-blue-600 transition-colors"
         >
          <Send className="w-4 h-4" />
         </button>
        </form>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>

   {/* Floating Button */}
   <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsOpen(!isOpen)}
    className="fixed bottom-6 right-24 bg-brand-blue hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:-translate-y-1 transition-all z-50 flex items-center justify-center group border border-blue-400/20"
    aria-label="Open AI Assistant"
   >
    <MessageSquare className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-brand-black dark:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none border border-gray-800">
     Ask our AI!
    </span>
   </motion.button>
  </>
 );
}
