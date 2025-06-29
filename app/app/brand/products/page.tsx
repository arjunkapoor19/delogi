"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/navigation/header';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  QrCode, 
  Package,
  Calendar,
  MapPin,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function BrandProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const products = [
    {
      id: 'DLG-RLX-001',
      name: 'Submariner Date',
      model: '126610LN',
      serialNumber: 'S123456789',
      status: 'sold',
      createdAt: '2024-01-15',
      lastUpdate: '2024-02-15',
      location: 'New York, USA',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'DLG-RLX-002',
      name: 'GMT-Master II',
      model: '126710BLRO',
      serialNumber: 'G789012345',
      status: 'in-transit',
      createdAt: '2024-01-20',
      lastUpdate: '2024-02-10',
      location: 'London, UK',
      image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'DLG-RLX-003',
      name: 'Daytona',
      model: '116500LN',
      serialNumber: 'D345678901',
      status: 'production',
      createdAt: '2024-02-01',
      lastUpdate: '2024-02-05',
      location: 'Geneva, Switzerland',
      image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'DLG-RLX-004',
      name: 'Explorer II',
      model: '226570',
      serialNumber: 'E901234567',
      status: 'retail',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-25',
      location: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      production: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'in-transit': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      retail: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      sold: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return colors[status as keyof typeof colors] || colors.production;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      production: 'In Production',
      'in-transit': 'In Transit',
      retail: 'At Retailer',
      sold: 'Sold'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header showAuth userRole="brand" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-muted-foreground">Manage your registered products and their digital passports</p>
          </div>
          <Button className="btn-primary" asChild>
            <Link href="/app/brand/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Register New Product
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 card-glass">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products, models, or serial numbers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="production">In Production</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="retail">At Retailer</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow card-glass">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${getStatusColor(product.status)}`}
                >
                  {getStatusLabel(product.status)}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.model}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/app/brand/products/${product.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCode className="mr-2 h-4 w-4" />
                        Generate QR Code
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="ml-2 font-mono">{product.id}</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Serial:</span>
                  <span className="ml-2 font-mono">{product.serialNumber}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {product.location}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Updated {new Date(product.lastUpdate).toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/app/brand/products/${product.id}`}>
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <QrCode className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="text-center py-12 card-glass">
            <CardContent>
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by registering your first product'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button className="btn-primary" asChild>
                  <Link href="/app/brand/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Register First Product
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}