import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

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

 const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return;

  const newMessages = [...messages, { role: 'user', text: input } as const];
  setMessages(newMessages);
  setInput('');
  setIsLoading(true);

  try {
   const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: newMessages })
   });
   const data = await res.json();
   if (data.text) {
    setMessages((prev) => [...prev, { role: 'ai', text: data.text }]);
   } else {
    setMessages((prev) => [...prev, { role: 'ai', text: data.error || 'Sorry, I encountered an error. Please try again.' }]);
   }
  } catch (error) {
   setMessages((prev) => [...prev, { role: 'ai', text: 'Network error. Please try again later.' }]);
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
