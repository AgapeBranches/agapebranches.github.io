-- Create profiles table
CREATE TABLE public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    full_name text,
    role text DEFAULT 'volunteer'::text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
    ON public.profiles FOR UPDATE
    USING ( auth.uid() = id );

-- Create videos table for the website
CREATE TABLE public.videos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    duration text NOT NULL,
    video_url text,
    thumbnail_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS for videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are viewable by everyone."
    ON public.videos FOR SELECT
    USING ( true );

CREATE POLICY "Videos can be inserted by authenticated users."
    ON public.videos FOR INSERT
    TO authenticated
    WITH CHECK ( true );

-- Create food rescues table for tracking logistics
CREATE TABLE public.food_rescues (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    volunteer_id uuid REFERENCES public.profiles(id),
    partner_name text NOT NULL,
    quantity_kg numeric,
    status text DEFAULT 'scheduled'::text,
    pickup_time timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS for food rescues
ALTER TABLE public.food_rescues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Food rescues viewable by authenticated users."
    ON public.food_rescues FOR SELECT
    TO authenticated
    USING ( true );

CREATE POLICY "Food rescues insertable by authenticated users."
    ON public.food_rescues FOR INSERT
    TO authenticated
    WITH CHECK ( true );

CREATE POLICY "Food rescues updatable by authenticated users."
    ON public.food_rescues FOR UPDATE
    TO authenticated
    USING ( true );

-- Create a function to automatically insert a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
