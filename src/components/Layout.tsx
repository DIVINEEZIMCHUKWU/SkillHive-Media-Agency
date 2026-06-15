import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle, Sun, Moon, Facebook, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import AIChatbot from './AIChatbot';
import { AnimatePresence, motion } from 'motion/react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Layout() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [theme, setTheme] = useState<'light' | 'dark'>('dark');
 const location = useLocation();

 useEffect(() => {
  setIsMenuOpen(false);
  if (!location.hash) {
   window.scrollTo(0, 0);
  } else {
   setTimeout(() => {
    const id = location.hash.replace('#', '');
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
   }, 0);
  }
 }, [location.pathname, location.hash]);

 useEffect(() => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (savedTheme) {
   setTheme(savedTheme);
   if (savedTheme === 'dark') document.documentElement.classList.add('dark');
   else document.documentElement.classList.remove('dark');
  } else {
   document.documentElement.classList.add('dark');
   localStorage.setItem('theme', 'dark');
  }
 }, []);

 const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  if (newTheme === 'dark') {
   document.documentElement.classList.add('dark');
  } else {
   document.documentElement.classList.remove('dark');
  }
 };

 const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Events', path: '/events' },
  { name: 'AI Solutions', path: '/ai-solutions' },
  { name: 'Blog', path: '/blog' },
  { name: 'Team', path: '/team' },
  { name: 'Training', path: '/training' },
  { name: 'Contact', path: '/contact' },
 ];

 return (
  <div className="flex flex-col min-h-screen">
   {/* Navigation */}
   <nav className="fixed w-full z-50 bg-white/80 dark:bg-brand-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center h-20">
      <Link to="/" className="flex items-center gap-2 group">
       <img src="https://i.ibb.co/dwQtCCjV/20260528-120300.png" alt="SkillHive Media Logo" className="h-8 md:h-10 w-auto transform group-hover:scale-105 transition-all bg-white p-1.5 rounded-lg" />
       <span className="font-black text-lg md:text-xl tracking-tight text-brand-black dark:text-white">SkillHive Media</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-2 lg:gap-6">
       {navLinks.map((link) => (
        <Link
         key={link.path}
         to={link.path}
         className={`text-xs lg:text-sm font-bold transition-colors px-1 ${
          location.pathname === link.path ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-300 hover:text-brand-black dark:hover:text-white'
         }`}
        >
         {link.name}
        </Link>
       ))}
       <div className="flex items-center gap-3 lg:gap-4 border-l border-gray-200 dark:border-white/10 pl-4 lg:pl-8">
        <button
         onClick={toggleTheme}
         className="p-1.5 lg:p-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-brand-black dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
         aria-label="Toggle theme"
        >
         {theme === 'dark' ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
        </button>
        <Link
         to="/book-consultation"
         className="bg-brand-blue text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg whitespace-nowrap"
        >
         Book Consultation
        </Link>
       </div>
      </div>

      {/* Mobile menu button */}
      <div className="flex md:hidden items-center gap-4">
       <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-brand-black dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle theme"
       >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
       </button>
       <button
        className="p-2 text-brand-black dark:text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
       >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
       </button>
      </div>
     </div>
    </div>

    {/* Mobile Nav */}
    <AnimatePresence>
     {isMenuOpen && (
      <motion.div
       initial={{ opacity: 0, height: 0 }}
       animate={{ opacity: 1, height: 'auto' }}
       exit={{ opacity: 0, height: 0 }}
       className="md:hidden bg-white/95 dark:bg-brand-black/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 overflow-hidden"
      >
       <div className="px-4 pt-2 pb-6 space-y-1 shadow-xl">
        {navLinks.map((link) => (
         <Link
          key={link.path}
          to={link.path}
          className={`block px-3 py-3 rounded-lg text-base font-bold ${
           location.pathname === link.path ? 'bg-brand-blue/10 text-brand-blue' : 'text-brand-black dark:text-white hover:bg-white/5'
          }`}
         >
          {link.name}
         </Link>
        ))}
        <Link
         to="/book-consultation"
         className="mt-4 block w-full text-center bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors"
        >
         Book Consultation
        </Link>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </nav>

   {/* Main Content */}
   <AnimatePresence mode="wait">
    <motion.main 
     key={location.pathname}
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -20 }}
     transition={{ duration: 0.3 }}
     className="flex-grow pt-20"
    >
     <Outlet />
    </motion.main>
   </AnimatePresence>

   {/* Footer */}
   <footer className="bg-brand-white dark:bg-brand-black text-brand-black dark:text-white pt-20 pb-10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <div className="lg:col-span-1">
       <Link to="/" className="flex items-center gap-3 mb-6">
        <img src="https://i.ibb.co/dwQtCCjV/20260528-120300.png" alt="SkillHive Media Logo" className="h-8 md:h-10 w-auto bg-white p-1.5 rounded-lg" />
        <span className="font-bold text-lg md:text-xl tracking-tight text-brand-black dark:text-white">SkillHive Media</span>
       </Link>
       <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
        Empowering businesses and equipping individuals with in-demand digital skills since day one.
       </p>
       <div className="flex gap-4">
        <a href="https://www.facebook.com/SalesSurgeon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors text-brand-black dark:text-gray-300 bg-white/50 dark:bg-white/5">
         <Facebook className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/skillhivemediaagency?igsh=MXJrd3AydWNjZ3NiOA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors text-brand-black dark:text-gray-300 bg-white/50 dark:bg-white/5">
         <Instagram className="w-5 h-5" />
        </a>
        <a href="https://vm.tiktok.com/ZS9263scY9Nv5-uw2kP/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors text-brand-black dark:text-gray-300 bg-white/50 dark:bg-white/5">
         <TikTokIcon className="w-5 h-5" />
        </a>
       </div>
      </div>
      
      <div>
       <h3 className="font-bold text-lg mb-6 text-brand-black dark:text-white">Company</h3>
       <ul className="space-y-4 text-sm">
        <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue dark:text-blue-400 transition-colors">About Us</Link></li>
        <li><Link to="/team" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue dark:text-blue-400 transition-colors">Our Team</Link></li>
        <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue dark:text-blue-400 transition-colors">Careers</Link></li>
        <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue dark:text-blue-400 transition-colors">Contact Us</Link></li>
       </ul>
      </div>

      <div>
       <h3 className="font-bold text-lg mb-6 text-brand-black dark:text-white">Services</h3>
       <ul className="space-y-4 text-sm">
        <li><Link to="/portfolio#social-media-management" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:text-blue-400 transition-colors">Social Media Management</Link></li>
        <li><Link to="/portfolio#facebook-instagram-ads" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:text-blue-400 transition-colors">Facebook & IG Ads</Link></li>
        <li><Link to="/portfolio#content-creation-graphic-design" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:text-blue-400 transition-colors">Content Creation/Graphic Design</Link></li>
        <li><Link to="/portfolio#website-design" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:text-blue-400 transition-colors">Website Development</Link></li>
       </ul>
      </div>

      <div>
       <h3 className="font-bold text-lg mb-6 text-brand-black dark:text-white">Contact</h3>
       <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <li>Skillhivedigitalagency@gmail.com</li>
        <li>08125650249</li>
        <li>Abia State, Imo State, Enugu State and Remotely</li>
       </ul>
       <Link to="/book-consultation" className="inline-block bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors w-full text-center">
        Book a Consultation
       </Link>
      </div>
     </div>
     
     <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-gray-500 text-sm">
       &copy; {new Date().getFullYear()} SkillHive Media Agency. All rights reserved.
      </p>
      <div className="flex gap-6 text-sm">
       <Link to="/privacy" className="text-gray-500 hover:text-brand-black dark:text-white transition-colors">Privacy Policy</Link>
       <Link to="/terms" className="text-gray-500 hover:text-brand-black dark:text-white transition-colors">Terms of Service</Link>
       <Link to="/faq" className="text-gray-500 hover:text-brand-black dark:text-white transition-colors">FAQ</Link>
      </div>
     </div>
    </div>
   </footer>

   {/* Floating Buttons */}
   <AIChatbot />
   
   <a
    href="https://wa.me/2348125650249"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1EBE5D] hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
    aria-label="Chat on WhatsApp"
   >
    <MessageCircle className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-white text-brand-black dark:text-brand-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
     WhatsApp Us
    </span>
   </a>
  </div>
 );
}
