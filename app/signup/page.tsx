"use client"; // This component uses state and event handlers, so it must be a Client Component.

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link'; // Use Next.js Link
import { Mail, Lock, Building, User, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // Adjusted path for Next.js

// Import shadcn/ui components (or your equivalent UI library components)
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    // 1. Sign up the user (this logic remains the same)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      // You can add metadata here if needed
      options: {
        data: {
          full_name: formData.name,
          company_name: formData.company,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("An unknown error occurred. User not created.");
      setLoading(false);
      return;
    }

    // 2. Insert data into public tables. This is often handled better by a database trigger or edge function
    //    that runs after a new user is created in the auth.users table.
    //    However, doing it on the client-side like this is also fine for smaller projects.
    const { error: profileError } = await supabase.from('users').insert({
      id: data.user.id,
      full_name: formData.name,
      company_name: formData.company,
      role: 'brand',
    });

    const { error: businessError } = await supabase.from('businesses').insert({
      // Assuming the business ID should also be the user's ID for a 1-to-1 relationship
      id: data.user.id, 
      company_name: formData.company,
    });

    if (profileError || businessError) {
      const dbError = profileError || businessError;
      setError(`Could not save profile information: ${dbError?.message}. Please contact support.`);
    } else {
      setSuccess("Success! Please check your email for a confirmation link to activate your account.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-yellow-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-lg">
        <div className="relative p-8 md:p-12 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Begin Your Legacy</h1>
            <p className="text-slate-400">Register your brand and secure your products on the blockchain.</p>
          </div>

          {success ? (
            <div className="text-center p-4 bg-green-900/50 border border-green-700 rounded-lg">
              <h3 className="font-bold text-green-300">Check Your Inbox!</h3>
              <p className="text-green-400 mt-2">{success}</p>
              {/* FIX: Changed <Link to="..."> to <Link href="..."> */}
              <Link href="/login" className="mt-4 inline-block font-medium text-blue-400 hover:text-blue-300">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FIX: Refactored Inputs to work with shadcn/ui structure */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 h-5 w-5 text-slate-400" />
                  <Input id="name" type="text" value={formData.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)} required placeholder="e.g., Jean-Claude Biver" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-5 w-5 text-slate-400" />
                  <Input id="email" type="email" value={formData.email} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)} required placeholder="your@company.com" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-300">Company Name</Label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3 h-5 w-5 text-slate-400" />
                  <Input id="company" type="text" value={formData.company} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('company', e.target.value)} required placeholder="e.g., LVMH" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password"  className="text-slate-300">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-5 w-5 text-slate-400" />
                  <Input id="password" type="password" value={formData.password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)} required placeholder="Create a strong password" className="pl-10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword"  className="text-slate-300">Confirm Password</Label>
                <div className="relative flex items-center">
                    <Lock className="absolute left-3 h-5 w-5 text-slate-400" />
                    <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)} required placeholder="Confirm your password" className="pl-10" />
                </div>
              </div>
              
              {error && <div className="p-3 bg-red-900/40 text-red-300 border border-red-700 rounded-md text-sm">{error}</div>}

              {/* FIX: Refactored Button to handle loading state */}
              <Button type="submit" className="w-full !mt-8" size="lg" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Register Brand & Create Account <ArrowRight className="inline ml-2"/>
              </Button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">Already have a brand account?{' '}
                {/* FIX: Changed <Link to="..."> to <Link href="..."> */}
                <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">Sign In</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;