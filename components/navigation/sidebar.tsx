"use client"; // This is CRITICAL. This component uses hooks and state.

import React, { useState } from 'react';
import Link from 'next/link'; // 👈 Use Next.js Link
import { usePathname } from 'next/navigation'; // 👈 Use Next.js usePathname
import { useAuth } from '../../contexts/AuthContext'; // Path to your AuthContext
import { Shield, LayoutDashboard, Package, PlusSquare, AlertTriangle, ChevronsLeft, ChevronsRight, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile, signOut } = useAuth();
  const pathname = usePathname(); // 👈 Get the current URL path

  // This logic remains the same
  const isBusinessInfoComplete = false; 

  const navItems = [
    // Added /business-info route for completeness
    { name: 'Business Info', href: '/business-info', icon: Shield, critical: !isBusinessInfoComplete },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Add Product', href: '/products/new', icon: PlusSquare },
  ];

  return (
    <aside // 👈 Changed to <aside> for semantic HTML
      className={`relative flex flex-col bg-slate-900 border-r border-slate-700/50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* --- Logo / Header --- */}
      <div className="flex items-center p-4 h-16 border-b border-slate-700/50">
        <Shield className="h-8 w-8 text-blue-400 flex-shrink-0" />
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white ml-3 transition-opacity duration-200">Delogi</h1>
        )}
      </div>

      {/* --- Nav Items --- */}
      <nav className="flex-grow p-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            // 👇 Use `pathname` to check for active state
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                {/* 👇 Changed <Link to="..."> to <Link href="..."> */}
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${isActive ? 'bg-slate-800 text-white' : ''}`}
                >
                  <item.icon className={`h-6 w-6 flex-shrink-0 ${item.critical ? 'text-red-500' : ''}`} />
                  {!isCollapsed && (
                    <span className="ml-4 font-medium transition-opacity duration-200">{item.name}</span>
                  )}
                  {item.critical && !isCollapsed && (
                    <AlertTriangle className="ml-auto h-5 w-5 text-red-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* --- Footer / User Profile --- */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-blue-300 flex-shrink-0">
                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {!isCollapsed && (
                <div className="ml-3 transition-opacity duration-200 overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">{profile?.full_name}</p>
                    <p className="text-xs text-slate-400 truncate">{profile?.company_name}</p>
                </div>
            )}
        </div>
        <button 
            onClick={signOut}
            className="w-full flex items-center justify-center mt-4 p-2 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
            <LogOut className={`h-6 w-6 ${isCollapsed ? '' : 'mr-2'}`} />
            {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
      
      {/* --- Collapse Toggle Button --- */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 text-slate-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white z-10"
      >
        {isCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;