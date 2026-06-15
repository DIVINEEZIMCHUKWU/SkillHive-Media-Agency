import { supabase } from './supabase';

const inMemoryStorage: Record<string, string> = {};

const safeSetItem = (key: string, value: string) => {
  inMemoryStorage[key] = value;
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn(`localStorage quota exceeded for key: ${key}, falling back to in-memory.`);
  }
};

// Utility to ensure data isn't mangled by base64 trimming
const parseSafeJSON = (data: string | null) => {
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Storage corrupted. Parse error:", e);
    return [];
  }
};

const safeGetItem = (key: string) => {
  if (inMemoryStorage[key]) return inMemoryStorage[key];
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ResultItem {
  id: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  clientName: string;
  industry: string;
  image: string;
  videoUrl?: string;
  problem?: string;
  solution?: string;
  resultsAchieved?: string;
  beforeImage?: string;
  afterImage?: string;
  testimonial?: string;
  ctaText?: string;
  ctaLink?: string;
  displayOptions?: {
    homepage: boolean;
    featured: boolean;
    portfolio: boolean;
    slider: boolean;
  };
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  date: string;
  price: string;
  originalPrice?: string;
  image: string;
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  tags?: string;
  image: string;
  content: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  image: string; // Screenshot of testimonial
  date: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string; // Images/videos of the event
  location: string;
}

const ensureValidUUID = (id: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return crypto.randomUUID();
  }
  return id;
};

export const getTeam = (): TeamMember[] => {
  const data = safeGetItem('skillhive_team');
  return parseSafeJSON(data);
};

export const saveTeam = async (team: TeamMember[]) => {
  let needsUpdate = false;
  team.forEach(t => {
    const validId = ensureValidUUID(t.id);
    if (validId !== t.id) {
      t.id = validId;
      needsUpdate = true;
    }
  });

  safeSetItem('skillhive_team', JSON.stringify(team));
  window.dispatchEvent(new Event('teamUpdated'));
  
  if (supabase) {
    const { error } = await supabase.from('team_members').upsert(team);
    if (error) console.error('Supabase error:', error);
  }
};

export const getResults = (): ResultItem[] => {
  const data = safeGetItem('skillhive_results');
  return parseSafeJSON(data);
};

export const saveResults = async (results: ResultItem[]) => {
  let needsUpdate = false;
  results.forEach(r => {
    const validId = ensureValidUUID(r.id);
    if (validId !== r.id) {
      r.id = validId;
      needsUpdate = true;
    }
  });

  safeSetItem('skillhive_results', JSON.stringify(results));
  window.dispatchEvent(new Event('resultsUpdated'));

  
  if (supabase) {
    const supabaseData = results.map(r => ({
      id: r.id,
      category: r.category,
      metric: r.metric,
      metric_label: r.metricLabel,
      description: r.description,
      client_name: r.clientName,
      industry: r.industry,
      image: r.image,
      video_url: r.videoUrl,
      problem: r.problem,
      solution: r.solution,
      results_achieved: r.resultsAchieved,
      before_image: r.beforeImage,
      after_image: r.afterImage,
      testimonial: r.testimonial,
      cta_text: r.ctaText,
      cta_link: r.ctaLink,
      display_homepage: r.displayOptions?.homepage || false,
      display_featured: r.displayOptions?.featured || false,
      display_portfolio: r.displayOptions?.portfolio || false,
      display_slider: r.displayOptions?.slider || false
    }));
    const { error } = await supabase.from('portfolio_results').upsert(supabaseData);
    if (error) console.error('Supabase error:', error);
  }
};

export const getCourses = (): TrainingCourse[] => {
  const data = safeGetItem('skillhive_courses');
  return parseSafeJSON(data);
};

export const saveCourses = async (courses: TrainingCourse[]) => {
  let needsUpdate = false;
  courses.forEach(c => {
    const validId = ensureValidUUID(c.id);
    if (validId !== c.id) {
      c.id = validId;
      needsUpdate = true;
    }
  });

  safeSetItem('skillhive_courses', JSON.stringify(courses));
  window.dispatchEvent(new Event('coursesUpdated'));
  
  if (supabase) {
    const supabaseData = courses.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      course_date: c.date,
      price: c.price,
      original_price: c.originalPrice,
      image: c.image,
      link: c.link
    }));
    const { error } = await supabase.from('training_courses').upsert(supabaseData);
    if (error) console.error('Supabase error:', error);
  }
};

export const parseImages = (imgStr: string | undefined): string[] => {
  if (!imgStr) return [];
  
  let resultStr = imgStr;
  
  // Convert Google Drive view links to direct image links
  const gDriveMatch = imgStr.match(/drive\.google\.com\/file\/d\/([^/]+)\/view/);
  if (gDriveMatch && gDriveMatch[1]) {
    resultStr = `https://drive.google.com/uc?id=${gDriveMatch[1]}&export=download`;
  }
  
  try {
    const parsed = JSON.parse(resultStr);
    if (Array.isArray(parsed)) return parsed.map(url => {
        const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)\/view/);
        return driveMatch && driveMatch[1] ? `https://drive.google.com/uc?id=${driveMatch[1]}&export=download` : url;
    });
  } catch (e) {}
  
  return [resultStr];
};

export const getPosts = (): BlogPost[] => {
  const data = safeGetItem('skillhive_posts');
  return parseSafeJSON(data);
}

export const savePosts = async (posts: BlogPost[]) => {
  let needsUpdate = false;
  posts.forEach(p => {
    const validId = ensureValidUUID(p.id);
    if (validId !== p.id) {
      p.id = validId;
      needsUpdate = true;
    }
  });

  safeSetItem('skillhive_posts', JSON.stringify(posts));
  window.dispatchEvent(new Event('postsUpdated'));
  
  if (supabase) {
    const supabaseData = posts.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      tags: p.tags || '',
      publish_date: p.date,
      image: p.image,
      content: p.content
    }));
    const { error } = await supabase.from('blog_posts').upsert(supabaseData);
    if (error) console.error('Supabase error:', error);
  }
}

export const deleteTeamMember = async (id: string, team: TeamMember[]) => {
  safeSetItem('skillhive_team', JSON.stringify(team));
  window.dispatchEvent(new Event('teamUpdated'));
  if (supabase) {
    await supabase.from('team_members').delete().eq('id', id);
  }
};

export const getTestimonials = (): TestimonialItem[] => {
  const data = safeGetItem('skillhive_testimonials');
  return parseSafeJSON(data);
}
export const saveTestimonials = async (items: TestimonialItem[]) => {
  items.forEach(i => { i.id = ensureValidUUID(i.id); });
  safeSetItem('skillhive_testimonials', JSON.stringify(items));
  window.dispatchEvent(new Event('testimonialsUpdated'));
  if (supabase) {
    const supabaseData = items.map(p => ({
      id: p.id, client_name: p.clientName, image: p.image, created_at: p.date
    }));
    await supabase.from('testimonials').upsert(supabaseData);
  }
}

export const getEvents = (): EventItem[] => {
  const data = safeGetItem('skillhive_events');
  return parseSafeJSON(data);
}
export const saveEvents = async (items: EventItem[]) => {
  items.forEach(i => { i.id = ensureValidUUID(i.id); });
  safeSetItem('skillhive_events', JSON.stringify(items));
  window.dispatchEvent(new Event('eventsUpdated'));
  if (supabase) {
    const supabaseData = items.map(p => ({
      id: p.id, title: p.title, description: p.description, 
      event_date: p.date, image: p.image, location: p.location
    }));
    await supabase.from('events').upsert(supabaseData);
  }
}

export const getLeads = (): any[] => {
  const data = safeGetItem('skillhive_leads');
  return parseSafeJSON(data);
}
export const saveLeads = (leads: any[]) => {
  safeSetItem('skillhive_leads', JSON.stringify(leads));
  window.dispatchEvent(new Event('leadsUpdated'));
}


export const deleteTestimonial = async (id: string, items: TestimonialItem[]) => {
  safeSetItem('skillhive_testimonials', JSON.stringify(items));
  window.dispatchEvent(new Event('testimonialsUpdated'));
  if (supabase) await supabase.from('testimonials').delete().eq('id', id);
}

export const deleteEvent = async (id: string, items: EventItem[]) => {
  safeSetItem('skillhive_events', JSON.stringify(items));
  window.dispatchEvent(new Event('eventsUpdated'));
  if (supabase) await supabase.from('events').delete().eq('id', id);
}

export const deleteResult = async (id: string, results: ResultItem[]) => {
  safeSetItem('skillhive_results', JSON.stringify(results));
  window.dispatchEvent(new Event('resultsUpdated'));
  if (supabase) {
    await supabase.from('portfolio_results').delete().eq('id', id);
  }
};

export const deleteCourse = async (id: string, courses: TrainingCourse[]) => {
  safeSetItem('skillhive_courses', JSON.stringify(courses));
  window.dispatchEvent(new Event('coursesUpdated'));
  if (supabase) {
    await supabase.from('training_courses').delete().eq('id', id);
  }
};

export const deletePost = async (id: string, posts: BlogPost[]) => {
  safeSetItem('skillhive_posts', JSON.stringify(posts));
  window.dispatchEvent(new Event('postsUpdated'));
  if (supabase) {
    await supabase.from('blog_posts').delete().eq('id', id);
  }
};

export const syncFromSupabase = async () => {
  if (!supabase) return;
  
  try {
    const [resTeam, resPortfolio, resCourses, resPosts] = await Promise.all([
      supabase.from('team_members').select('*'),
      supabase.from('portfolio_results').select('*'),
      supabase.from('training_courses').select('*'),
      supabase.from('blog_posts').select('*')
    ]);

    if (resTeam.data && resTeam.data.length > 0) {
      safeSetItem('skillhive_team', JSON.stringify(resTeam.data));
      window.dispatchEvent(new Event('teamUpdated'));
    } else {
      const localTeam = getTeam();
      if (localTeam.length > 0) {
        await saveTeam(localTeam);
      }
    }

    if (resPortfolio.data && resPortfolio.data.length > 0) {
      const parsedResults: ResultItem[] = resPortfolio.data.map(r => ({
        id: r.id,
        category: r.category,
        metric: r.metric,
        metricLabel: r.metric_label,
        description: r.description,
        clientName: r.client_name,
        industry: r.industry,
        image: r.image,
        videoUrl: r.video_url,
        problem: r.problem,
        solution: r.solution,
        resultsAchieved: r.results_achieved,
        beforeImage: r.before_image,
        afterImage: r.after_image,
        testimonial: r.testimonial,
        ctaText: r.cta_text,
        ctaLink: r.cta_link,
        displayOptions: {
          homepage: r.display_homepage,
          featured: r.display_featured,
          portfolio: r.display_portfolio,
          slider: r.display_slider
        }
      }));
      safeSetItem('skillhive_results', JSON.stringify(parsedResults));
      window.dispatchEvent(new Event('resultsUpdated'));
    } else {
      const localResults = getResults();
      if (localResults.length > 0) {
        await saveResults(localResults);
      }
    }

    if (resCourses.data && resCourses.data.length > 0) {
      const parsedCourses: TrainingCourse[] = resCourses.data.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        date: c.course_date,
        price: c.price,
        originalPrice: c.original_price,
        image: c.image,
        link: c.link
      }));
      safeSetItem('skillhive_courses', JSON.stringify(parsedCourses));
      window.dispatchEvent(new Event('coursesUpdated'));
    } else {
      const localCourses = getCourses();
      if (localCourses.length > 0) {
        await saveCourses(localCourses);
      }
    }

    if (resPosts.data && resPosts.data.length > 0) {
      const parsedPosts: BlogPost[] = resPosts.data.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        tags: p.tags,
        date: p.publish_date,
        image: p.image,
        content: p.content
      }));
      safeSetItem('skillhive_posts', JSON.stringify(parsedPosts));
      window.dispatchEvent(new Event('postsUpdated'));
    } else {
      const localPosts = getPosts();
      if (localPosts.length > 0) {
        await savePosts(localPosts);
      }
    }

    try {
      const [resTestimonials, resEvents] = await Promise.all([
        supabase.from('testimonials').select('*'),
        supabase.from('events').select('*')
      ]);

      if (resTestimonials.data && resTestimonials.data.length > 0) {
        const parsedTestimonials: TestimonialItem[] = resTestimonials.data.map(t => ({
          id: t.id,
          clientName: t.client_name,
          image: t.image,
          date: t.created_at
        }));
        safeSetItem('skillhive_testimonials', JSON.stringify(parsedTestimonials));
        window.dispatchEvent(new Event('testimonialsUpdated'));
      } else {
        const localTestimonials = getTestimonials();
        if (localTestimonials.length > 0) {
          await saveTestimonials(localTestimonials);
        }
      }

      if (resEvents.data && resEvents.data.length > 0) {
        const parsedEvents: EventItem[] = resEvents.data.map(e => ({
          id: e.id,
          title: e.title,
          description: e.description,
          date: e.event_date,
          location: e.location,
          image: e.image
        }));
        safeSetItem('skillhive_events', JSON.stringify(parsedEvents));
        window.dispatchEvent(new Event('eventsUpdated'));
      } else {
        const localEvents = getEvents();
        if (localEvents.length > 0) {
          await saveEvents(localEvents);
        }
      }
    } catch (err) {
      console.error('Error syncing testimonials/events', err);
    }
  } catch (err) {
    console.error('Failed to sync from Supabase', err);
  }
};
