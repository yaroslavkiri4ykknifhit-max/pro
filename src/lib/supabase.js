import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Check if credentials are placeholders
export const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && 
  !supabaseAnonKey.includes('your-anon-key')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * SQL Schema script to easily set up tables in Supabase Console
 */
export const SUPABASE_SQL_SCHEMA = `-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create shops table
CREATE TABLE IF NOT EXISTS public.shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    theme_config JSONB DEFAULT '{
      "primaryColor": "#0066ff",
      "backgroundColor": "#0f172a",
      "textColor": "#ffffff",
      "cardBg": "#1e293b",
      "layout": "grid",
      "font": "Inter",
      "bannerUrl": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80"
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES public.shops(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    size TEXT,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to shops and products
CREATE POLICY "Public shops are viewable by everyone" ON public.shops FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Allow authenticated users to manage their own shops & products
CREATE POLICY "Users can manage their own shops" ON public.shops FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage products in their shops" ON public.products FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.shops 
        WHERE shops.id = products.shop_id AND shops.user_id = auth.uid()
    )
);
`;
