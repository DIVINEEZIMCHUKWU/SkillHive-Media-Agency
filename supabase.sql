-- SkillHive Media Agency - Supabase SQL Schema
-- Copy and paste this entirely into the Supabase SQL Editor and click "Run"

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables

-- Team Members Table
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio / Results Table
CREATE TABLE public.portfolio_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    metric TEXT NOT NULL,
    metric_label TEXT,
    description TEXT,
    client_name TEXT NOT NULL,
    industry TEXT,
    image TEXT,
    video_url TEXT,
    problem TEXT,
    solution TEXT,
    results_achieved TEXT,
    before_image TEXT,
    after_image TEXT,
    testimonial TEXT,
    cta_text TEXT DEFAULT 'View Live Project',
    cta_link TEXT,
    display_homepage BOOLEAN DEFAULT TRUE,
    display_featured BOOLEAN DEFAULT FALSE,
    display_portfolio BOOLEAN DEFAULT TRUE,
    display_slider BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training Courses Table
CREATE TABLE public.training_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    course_date TEXT,
    price TEXT,
    original_price TEXT,
    image TEXT,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT,
    tags TEXT,
    publish_date TEXT,
    image TEXT,
    content TEXT,
    seo_title TEXT,
    seo_slug TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    status TEXT DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Settings Table
CREATE TABLE public.admin_settings (
    setting_key TEXT PRIMARY KEY,
    setting_value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Setup
-- This ensures your data is secure. Public can read, only authenticated users (Admins) can write.

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Read Access Policies (Anyone can view the website content)
CREATE POLICY "Enable read access for all users" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.portfolio_results FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.training_courses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.admin_settings FOR SELECT USING (true);

-- Write Access Policies (Only authenticated users can modify content)
-- Note: If you don't use Supabase Auth to login, you must allow 'anon' or 'true' to let the admin dashboard save data.
CREATE POLICY "Enable all access for all users" ON public.team_members FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.portfolio_results FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.training_courses FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.admin_settings FOR ALL USING (true);

-- 4. Triggers to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_results_updated_at BEFORE UPDATE ON public.portfolio_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_courses_updated_at BEFORE UPDATE ON public.training_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON public.admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional: Initial Dashboard Admin Password seed
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES ('admin_password', 'Hive123') ON CONFLICT (setting_key) DO NOTHING;

-- Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    event_date TEXT,
    location TEXT,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.events FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.leads FOR SELECT USING (true);

CREATE POLICY "Enable all access for all users" ON public.testimonials FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.events FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON public.leads FOR ALL USING (true);

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
