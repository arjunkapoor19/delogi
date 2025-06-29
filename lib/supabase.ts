import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yzdlgykpdtkrusfkuxlx.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6ZGxneWtwZHRrcnVzZmt1eGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTMwMTMsImV4cCI6MjA2NjU4OTAxM30.294rrsHXSn6CevUlt1GJ-CycXQleiwZzNbRYsVaBcP8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)