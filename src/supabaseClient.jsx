import {createClient} from '@supabase/supabase-js';

const supabaseURL = "https://ozbfkyxlswtgwtfzbxkk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96YmZreXhsc3d0Z3d0ZnpieGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODg5NjgsImV4cCI6MjAyNzc2NDk2OH0.HsknskVaw5aKP9qSDK9R-gLtRfxSGJNjOWW1zQxl8JA";

export const supabase = createClient(supabaseURL, supabaseAnonKey)
