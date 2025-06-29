"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { 
  Search, 
  QrCode, 
  Shield, 
  Calendar, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Package,
  Clock
} from 'lucide-react';

export default function VerifyPage() {
  const [productId, setProductId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Mock product data
  const mockProductData = {
    id: 'DLG-RLX-001-2024',
    name: 'Submariner Date',
    brand: 'Rolex',
    model: 'Submariner 126610LN',
    serialNumber: 'S123456789',
    isAuthentic: true,
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    materials: [
      { name: 'Oystersteel', certification: 'Certified Swiss Steel' },
      { name: 'Cerachrom Bezel', certification: 'Rolex Proprietary' }
    ],
    timeline: [
      {
        event: 'Manufactured',
        date: '2024-01-15',
        location: 'Geneva, Switzerland',
        verified: true,
        txId: '0x123...abc'
      },
      {
        event: 'Quality Control Passed',
        date: '2024-01-20',
        location: 'Geneva, Switzerland', 
        verified: true,
        txId: '0x456...def'
      },
      {
        event: 'Shipped to Retailer',
        date: '2024-02-01',
        location: 'New York, USA',
        verified: true,
        txId: '0x789...ghi'
      },
      {
        event: 'Retail Sale',
        date: '2024-02-15',
        location: 'New York, USA',
        verified: true,
        txId: '0x012...jkl'
      }
    ]
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationResult(mockProductData);
      setIsVerifying(false);
    }, 2000);
  };

  const handleScan = () => {
    // In a real app, this would trigger camera/QR scanner
    setProductId('DLG-RLX-001-2024');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {!verificationResult ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-12">
              <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Verify Product Authenticity</h1>
              <p className="text-xl text-muted-foreground">
                Enter a product ID or scan a QR code to verify authenticity and view provenance
              </p>
            </div>

            <Card className="shadow-lg card-glass">
              <CardHeader>
                <CardTitle>Product Verification</CardTitle>
                <CardDescription>
                  Secure verification powered by Algorand blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter Product ID (e.g., DLG-RLX-001-2024)"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="h-12"
                    />
                    <Button 
                      onClick={handleVerify}
                      disabled={!productId || isVerifying}
                      className="h-12 px-6 btn-primary"
                    >
                      {isVerifying ? (
                        <Clock className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Verify
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12"
                    onClick={handleScan}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Verification Status */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Product Verified</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <Shield className="mr-1 h-3 w-3" />
                Verified on Algorand
              </Badge>
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={verificationResult.images[0]}
                      alt={verificationResult.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold">{verificationResult.name}</h3>
                      <p className="text-muted-foreground">{verificationResult.brand} • {verificationResult.model}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Product ID</span>
                        <p className="font-mono">{verificationResult.id}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Serial Number</span>
                        <p className="font-mono">{verificationResult.serialNumber}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Materials</span>
                      <div className="mt-2 space-y-2">
                        {verificationResult.materials.map((material: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted rounded">
                            <span>{material.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {material.certification}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Provenance Timeline */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Provenance Timeline
                  </CardTitle>
                  <CardDescription>
                    Complete journey verified on blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationResult.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </div>
                          {index < verificationResult.timeline.length - 1 && (
                            <div className="w-px h-16 bg-border mt-2" />
                          )}
                        </div>
                        
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{event.event}</h4>
                            <Badge variant={event.verified ? "default" : "secondary"}>
                              {event.verified ? <CheckCircle className="mr-1 h-3 w-3" /> : <AlertCircle className="mr-1 h-3 w-3" />}
                              {event.verified ? 'Verified' : 'Pending'}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {event.location}
                            </div>
                            <div className="font-mono text-xs">
                              Tx: {event.txId}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setVerificationResult(null)}
                className="mr-4"
              >
                Verify Another Product
              </Button>
              <Button className="btn-primary">
                Download Certificate
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}