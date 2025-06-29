"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// FIX: Import Loader2 for the loading spinner
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
// FIX: Import the Label component
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button'; // Assuming the filename is lowercase
import { Input } from '../../components/ui/input';   // Assuming the filename is lowercase
import { useAuth } from '../../contexts/AuthContext';

const GoogleIcon = () => (
    /* ... SVG code remains the same ... */
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.021,35.596,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
);

const LoginPage: React.FC = () => {
    // ... state and handlers remain the same ...
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.error_description || err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // ... handleGoogleSignIn remains the same ...
    const handleGoogleSignIn = async () => { /* ... */ };

    if (authLoading || user) {
        return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    
    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* ... Background elements ... */}
            <div className="relative w-full max-w-md">
                <div className="relative p-8 md:p-12 rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
                    {/* ... Header and Google Button ... */}
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        {/* FIX 1: Refactored the Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@company.com"
                                    className="pl-10" // Add padding to not overlap the icon
                                />
                            </div>
                        </div>

                        {/* FIX 2: Refactored the Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">Password</Label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                    required
                                    placeholder="Your password"
                                    className="pl-10" // Add padding to not overlap the icon
                                />
                            </div>
                        </div>

                        {error && <div className="p-3 bg-red-900/40 text-red-300 border border-red-700 rounded-md text-sm">{error}</div>}

                        <div className="flex items-center justify-end">
                            <Link href="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300">Forgot password?</Link>
                        </div>

                        {/* FIX 3: Refactored the Submit Button */}
                        <Button type="submit" className="w-full !mt-6" size="lg" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-400">
                            {/* FIX 4: Escaped the apostrophe */}
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;