import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // Ej: 'https://mdmfmqektvdhttnouacz.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY; // Tu anon key larga tipo JWT

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
