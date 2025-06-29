"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/navigation/header';
import { ArrowLeft, Building, Truck, Shield } from 'lucide-react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: ''
  });

  const handleRoleSelect = (role: string) => {
    setUserRole(role);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', { ...formData, role: userRole });
  };

  const roleOptions = [
    {
      id: 'brand',
      title: 'Luxury Brand',
      description: 'Register and track your products',
      icon: Building,
      features: ['Product registration', 'Digital passport creation', 'Analytics dashboard']
    },
    {
      id: 'logistics',
      title: 'Logistics Partner',
      description: 'Scan and update product journey',
      icon: Truck,
      features: ['QR code scanning', 'Location tracking', 'Status updates']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          {step === 1 && (
            <div className="text-center mb-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Join Delogi</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose your role to get started with luxury goods authentication
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {roleOptions.map((role) => (
                <Card 
                  key={role.id} 
                  className="p-8 cursor-pointer hover:shadow-lg transition-all duration-300 card-glass hover:scale-105"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <role.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <CardDescription className="text-base">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {step === 2 && (
            <Card className="max-w-md mx-auto shadow-2xl card-glass">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                <CardDescription className="text-base">
                  {userRole === 'brand' ? 'Register as a luxury brand' : 'Register as a logistics partner'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 btn-primary">
                      Create Account
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}