"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/navigation/header';
import { 
  Package, 
  TrendingUp, 
  Eye, 
  Plus, 
  Activity,
  BarChart3,
  MapPin,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function BrandDashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '1,247',
      change: '+12%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Products in Transit',
      value: '89',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-yellow-600'
    },
    {
      title: 'Verifications Today',
      value: '156',
      change: '+23%',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Active Locations',
      value: '34',
      change: '+2',
      icon: MapPin,
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Product verified',
      product: 'Submariner Date #S123456',
      location: 'New York, USA',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'New product registered',
      product: 'GMT-Master II #G789012',
      location: 'Geneva, Switzerland',
      time: '15 minutes ago',
      status: 'info'
    },
    {
      id: 3,
      action: 'Location updated',
      product: 'Daytona #D345678',
      location: 'Tokyo, Japan',
      time: '1 hour ago',
      status: 'warning'
    },
    {
      id: 4,
      action: 'Quality check passed',
      product: 'Explorer II #E901234',
      location: 'Geneva, Switzerland',
      time: '2 hours ago',
      status: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showAuth userRole="brand" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Brand Dashboard</h1>
            <p className="text-muted-foreground">Monitor your products and verification activities</p>
          </div>
          <Button className="btn-primary" asChild>
            <Link href="/app/brand/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Register Product
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-glass">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Card */}
          <Card className="lg:col-span-2 card-glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Product Registrations
              </CardTitle>
              <CardDescription>
                Monthly registration trends over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would be displayed here</p>
                  <p className="text-sm">Integration with charting library</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest product and verification events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.product}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {activity.location}
                        <span className="mx-2">•</span>
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}  
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer card-glass" asChild>
              <Link href="/app/brand/products">
                <div className="text-center">
                  <Package className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">View All Products</h3>
                  <p className="text-sm text-muted-foreground">Manage your product portfolio</p>
                </div>
              </Link>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer card-glass" asChild>
              <Link href="/app/brand/analytics">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Detailed insights and reports</p>
                </div>
              </Link>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer card-glass" asChild>
              <Link href="/app/brand/products/new">
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Register Product</h3>
                  <p className="text-sm text-muted-foreground">Add new product to blockchain</p>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}