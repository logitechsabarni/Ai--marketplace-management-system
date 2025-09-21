import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ShoppingCart, User, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: null },
    { name: "Products", href: "/products", icon: null },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "About", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: null },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AC</span>
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              ArtisanConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search artisan products..."
                className="pl-10 bg-muted/50 border-muted focus:bg-background"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart (0)
                  </Button>
                  <Button variant="default" size="sm" className="flex-1 bg-gradient-primary">
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};