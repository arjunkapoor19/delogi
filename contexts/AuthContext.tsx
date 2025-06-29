"use client"; // 👈 1. This is the most important change.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 👈 2. Import the Next.js router
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // 👈 3. Adjusted path for Next.js convention

// Define the shape of our user profile data from the 'users' table
interface UserProfile {
  role: 'brand' | 'logistics' | 'admin';
  company_name?: string;
  full_name?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean; // This will be true only on the very first load
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Start as true
  const router = useRouter(); // 👈 4. Initialize the router

  useEffect(() => {
    // This listener is the single source of truth for auth state.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: userProfile, error } = await supabase
            .from('users')
            .select('role, company_name, full_name')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error.message);
            setProfile(null);
          } else {
            setProfile(userProfile);
          }
        } else {
          setProfile(null);
        }
        
        // The listener fires immediately on page load, so we set loading to false here.
        setLoading(false);
      }
    );

    // Cleanup the listener when the provider unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs only once.

  // 👈 5. Improved signOut function for Next.js
  const signOut = async () => {
    await supabase.auth.signOut();
    // After signing out, redirect the user to the login page.
    router.push('/login');
    // You can also use router.refresh() if you need to ensure server components re-fetch data.
  };

  const value = {
    session,
    user,
    profile,
    isAuthenticated: !!user,
    loading,
    signOut,
  };

  // Render a loading state (e.g., a spinner) or null while checking auth.
  // This prevents a "flash" of the wrong content.
  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};