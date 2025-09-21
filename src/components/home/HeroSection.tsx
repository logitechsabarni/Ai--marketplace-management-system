import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-warm min-h-[60vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wide">AI-Powered Discovery</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Discover Unique
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Handcrafted Treasures
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with local artisans and discover one-of-a-kind pieces. 
              Our AI helps you find the perfect handcrafted items that match your style.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-card">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search for handmade jewelry, pottery, art..."
                  className="pl-12 py-3 border-0 bg-transparent text-lg focus:ring-0"
                />
              </div>
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 px-8">
                Explore Now
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>500+ Local Artisans</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>AI-Powered Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-glow rounded-full" />
              <span>Authentic Handcrafted Items</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};