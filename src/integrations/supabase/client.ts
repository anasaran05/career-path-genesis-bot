// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rtbbeulmvojlvvfgfgpb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0YmJldWxtdm9qbHZ2ZmdmZ3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTkwODksImV4cCI6MjA2NTE5NTA4OX0.kKB3TXFVUCwu_2ze_2-4SSEOQyzZim_KRKcdDW-Z4IA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);