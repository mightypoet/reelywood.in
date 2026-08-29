import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Custom fetch to automatically retry on Supabase gateway clock skew errors (PGRST303)
const customFetch = async (url: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const clone = response.clone();
      try {
        const errorData = await clone.json();
        if (errorData?.code === 'PGRST303' || errorData?.message === 'JWT issued at future') {
          attempt++;
          console.warn(`[Supabase Fetch] JWT clock skew detected. Retrying attempt ${attempt}...`);
          // Wait a bit to let the clock skew pass or hit a healthy node
          await new Promise(resolve => setTimeout(resolve, 500 * attempt));
          continue;
        }
      } catch (e) {
        // Not a JSON error or couldn't parse, just return the response below
      }
    }
    
    return response;
  }
  
  // Final fallback attempt if all retries fail
  return fetch(url, options);
};

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    global: {
      fetch: customFetch
    }
  }
);
