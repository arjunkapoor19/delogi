"use client"; // This is essential because the component uses hooks and browser APIs.

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Use the Next.js Link component
import { ChevronDown, Shield, Zap, Globe, CheckCircle, ArrowRight, Eye, Users, Award } from 'lucide-react';

// NOTE: The CustomCursor is now global via layout.tsx, so we don't import or render it here.

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect(); // Disconnect after starting the animation
      }
    });

    const currentRef = countRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const localMousePosRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

    useEffect(() => {
      const handleLocalMouseMove = (e: MouseEvent) => {
        localMousePosRef.current.x = e.clientX;
        localMousePosRef.current.y = e.clientY;
      };
      window.addEventListener('mousemove', handleLocalMouseMove);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      }));

      let animationFrameId: number;
      const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          const distance = Math.sqrt(Math.pow(particle.x - localMousePosRef.current.x, 2) + Math.pow(particle.y - localMousePosRef.current.y, 2));
          const influence = Math.max(0, 1 - distance / 150);
          particle.opacity = 0.2 + influence * 0.5;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
          ctx.fill();
        });

        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          });
        });
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleLocalMouseMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, []);

    return (
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
    );
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    }, observerOptions);

    const elements = Array.from(document.querySelectorAll('.scroll-animate'));
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20 animate-pulse" style={{ zIndex: 2 }} />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <h1 className={`text-6xl md:text-8xl font-bold mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-white via-blue-200 to-yellow-200 bg-clip-text text-transparent bg-size-200 animate-shimmer">Delogi</span>
          </h1>
          <div className={`text-2xl md:text-4xl mb-4 font-light transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">Verifiable Luxury. Immutable Trust.</span>
          </div>
          <p className={`text-xl text-gray-300 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Authenticating the world's finest goods on the Algorand blockchain. Experience the new standard of provenance.
          </p>
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link href="/verify" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">Verify a Product<Eye className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" /></span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            </Link>
            <Link href="/login" className="group relative px-8 py-4 border-2 border-yellow-400 rounded-full text-lg font-semibold hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-blue-600/10 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">Brand & Partner Portal<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" /></span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="scroll-animate text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Unveiling Truth: The Delogi Protocol
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[{icon: Shield, title: "Digital Passport Minting", description: "Each luxury item receives a unique, tamper-proof digital identity on the blockchain.", delay: "delay-100"}, {icon: Zap, title: "Immutable Ledger", description: "Every transaction and ownership change is permanently recorded with cryptographic security.", delay: "delay-300"}, {icon: Globe, title: "Instant Verification", description: "Consumers can verify authenticity in seconds using our seamless verification portal.", delay: "delay-500"}].map((step, index) => (
              <div key={index} className={`scroll-animate ${step.delay} group`}>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <step.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:text-blue-300 transition-colors duration-300" />
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="scroll-animate">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">For Brands</h3>
              <div className="space-y-6">
                {[{icon: Shield, title: "Enhanced Security", desc: "Protect your brand from counterfeiting with blockchain-backed authentication."}, {icon: Award, title: "Increased Value", desc: "Authenticated products command premium prices and build customer trust."}, {icon: Globe, title: "Global Reach", desc: "Reach customers worldwide with universally verifiable authenticity."}].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <benefit.icon className="w-6 h-6 text-yellow-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-animate">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">For Consumers</h3>
              <div className="space-y-6">
                {[{icon: CheckCircle, title: "Guaranteed Authenticity", desc: "Know with absolute certainty that your luxury purchase is genuine."}, {icon: Eye, title: "Transparent History", desc: "Access complete provenance information from manufacture to sale."}, {icon: Users, title: "Community Trust", desc: "Join a community of verified luxury goods owners and collectors."}].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <benefit.icon className="w-6 h-6 text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorand Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="scroll-animate">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Powered by Algorand</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">Built on the world's most advanced blockchain technology for speed, security, and sustainability.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[{label: "Transaction Speed", value: 1000, suffix: "/sec"}, {label: "Finality Time", value: 4, suffix: " seconds"}, {label: "Energy Efficiency", value: 99.9, suffix: "% less energy"}].map((stat, index) => (
              <div key={index} className="scroll-animate p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50">
                <div className="text-4xl font-bold text-blue-400 mb-2"><AnimatedCounter end={stat.value} suffix={stat.suffix} /></div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="scroll-animate">
            <h2 className="text-5xl font-bold mb-8">Ready to Transform Luxury Authentication?</h2>
            <p className="text-xl text-gray-300 mb-12">Join the future of verified luxury goods today.</p>
            <Link href="/signup" className="group relative inline-block px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl no-underline">
              <span className="relative z-10 flex items-center justify-center gap-3">Get Started Now<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" /></span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .animate-shimmer { background-size: 200% auto; animation: shimmer 3s ease-in-out infinite; }
        .bg-size-200 { background-size: 200% auto; }
        .scroll-animate { opacity: 0; transform: translateY(50px); transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .scroll-animate.animate-in { opacity: 1; transform: translateY(0); }
        .delay-100.animate-in { transition-delay: 0.1s; }
        .delay-300.animate-in { transition-delay: 0.3s; }
        .delay-500.animate-in { transition-delay: 0.5s; }
      `}</style>
    </div>
  );
}