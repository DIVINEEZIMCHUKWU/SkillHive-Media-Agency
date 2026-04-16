import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Results', path: '/results' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Training', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-brand-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-md">
                <span className="text-brand-white font-bold text-2xl">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-brand-blue hidden lg:block">SkillHive Media Agency</span>
              <span className="font-bold text-xl tracking-tight text-brand-blue lg:hidden">SkillHive</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-brand-blue'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-started"
                className="bg-brand-blue text-brand-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-900 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brand-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-white border-b border-gray-100 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-brand-blue hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-started"
                className="block w-full text-center mt-6 bg-brand-blue text-brand-white px-6 py-4 rounded-xl text-base font-bold hover:bg-blue-900 transition-colors shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-blue text-brand-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-white rounded-lg flex items-center justify-center">
                  <span className="text-brand-blue font-bold text-2xl">S</span>
                </div>
                <span className="font-bold text-2xl tracking-tight text-brand-white">SkillHive Media Agency</span>
              </Link>
              <p className="text-blue-100 max-w-sm leading-relaxed">
                We turn social media into a sales machine for your business. Strategy, content, and ads that drive visibility, trust, and sales.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6 text-blue-200">Quick Links</h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-brand-white hover:text-blue-300 transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6 text-blue-200">Contact</h3>
              <ul className="space-y-4 text-brand-white font-medium">
                <li>hello@skillhivemedia.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Growth Avenue, Suite 100<br/>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-blue-200 text-sm font-medium">
              &copy; {new Date().getFullYear()} SkillHive Media Agency. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-brand-white hover:text-blue-300 transition-colors font-semibold">Facebook</a>
              <a href="#" className="text-brand-white hover:text-blue-300 transition-colors font-semibold">Instagram</a>
              <a href="#" className="text-brand-white hover:text-blue-300 transition-colors font-semibold">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1EBE5D] hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-brand-black px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
