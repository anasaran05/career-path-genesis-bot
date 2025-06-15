
-- Add extra user profile fields to the main profiles table
ALTER TABLE public.profiles
  ADD COLUMN bio TEXT,
  ADD COLUMN location TEXT,
  ADD COLUMN dob DATE,
  ADD COLUMN profile_image TEXT;

-- If you want to store LinkedIn/Portfolio link, add this too:
ALTER TABLE public.profiles
  ADD COLUMN profile_url TEXT;

-- (Optional) Add a last_profile_update timestamp
ALTER TABLE public.profiles
  ADD COLUMN last_profile_update TIMESTAMP WITH TIME ZONE DEFAULT now();
