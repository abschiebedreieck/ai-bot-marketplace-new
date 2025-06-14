import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jueqktmalktlmndexuav.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1ZXFrdG1hbGt0bG1uZGV4dWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDM3MzcsImV4cCI6MjA2NTQ3OTczN30.Zc5XA0q5RLkWvDJnwd0XgjUIG1RebN5AzyKjBnbeMCY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
