import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { 
  Shield, 
  Eye, 
  Zap, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              Powered by Algorand Blockchain
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight">
              The Future of
              <span className="block gradient-text">
                Luxury Authenticity
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Delogi revolutionizes luxury goods authentication with blockchain-secured digital passports, 
              ensuring every product's authenticity and provenance from creation to consumer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link href="/verify">
                  Verify a Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose Delogi?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced blockchain technology meets luxury market needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Immutable Security",
                description: "Every transaction recorded permanently on Algorand blockchain"
              },
              {
                icon: Eye,
                title: "Complete Transparency",
                description: "Full supply chain visibility from manufacturer to consumer"
              },
              {
                icon: Zap,
                title: "Instant Verification",
                description: "Real-time authentication through QR code scanning"
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "Trusted by luxury brands and logistics partners worldwide"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-slide-up card-glass">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to secure your luxury goods
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Register & Mint",
                description: "Brands register products and mint digital passports on Algorand blockchain",
                icon: Lock
              },
              {
                step: "02", 
                title: "Track & Verify",
                description: "Logistics partners scan QR codes to update product journey in real-time",
                icon: Eye
              },
              {
                step: "03",
                title: "Authenticate",
                description: "Consumers verify authenticity and view complete product history",
                icon: CheckCircle
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Secure Your Brand?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8 text-white">
            Join leading luxury brands using Delogi to protect their reputation and customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 font-medium" asChild>
              <Link href="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 font-medium transition-all duration-200" asChild>
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}