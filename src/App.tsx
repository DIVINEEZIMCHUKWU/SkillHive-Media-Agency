/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Results from './pages/Results';
import About from './pages/About';
import Team from './pages/Team';
import Training from './pages/Training';
import Contact from './pages/Contact';
import GetStarted from './pages/GetStarted';
import Admin from './pages/Admin';
import AISolutions from './pages/AISolutions';
import FAQ from './pages/FAQ';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Events from './pages/Events';

import { useEffect } from 'react';
import { syncFromSupabase } from './lib/store';

export default function App() {
  useEffect(() => {
    syncFromSupabase();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          {/* Results is aliased to Portfolio based on layout links, keeping Results logic */}
          <Route path="results" element={<Results />} /> 
          <Route path="portfolio" element={<Results />} />
          
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="training" element={<Training />} />
          <Route path="ai-solutions" element={<AISolutions />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="book-consultation" element={<GetStarted />} />
          
          {/* New specific pages */}
          <Route path="faq" element={<FAQ />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
