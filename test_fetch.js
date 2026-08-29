import { createClient } from '@supabase/supabase-js';

const customFetch = async (url, options) => {
  console.log("Custom fetch called for", url);
  return fetch(url, options);
};

const supabase = createClient('https://sfsczzoztzmiksdqbvtm.supabase.co', process.env.VITE_SUPABASE_ANON_KEY, {
  global: {
    fetch: customFetch
  }
});

supabase.from('brands').select('id').limit(1).then(console.log).catch(console.error);
