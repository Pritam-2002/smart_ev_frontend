
import React, { useState } from 'react';
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { 
  Zap, 
  ChevronRight, 
  Smartphone, 
  Leaf, 
  Clock, 
  MapPin, 
  Shield, 
  ArrowRight, 
  Download,
  Menu,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";

import heroImage from "../../../assets/hero-ev-charging.svg";
import smartAppIcon from "../../../assets/smart-app-icon.svg";
import renewableImage from "../../../assets/renewable-charging.svg";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Stations", href: "#stations" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Smart App Control",
      description: "Control charging remotely, schedule sessions, and monitor energy usage from anywhere.",
      image: smartAppIcon
    },
    {
      icon: Zap,
      title: "Lightning Fast Charging",
      description: "Advanced DC fast charging technology gets you back on the road in minutes, not hours.",
      highlight: true
    },
    {
      icon: Leaf,
      title: "100% Renewable Energy",
      description: "Every charge is powered by clean, renewable energy sources for a truly sustainable drive.",
      image: renewableImage
    },
    {
      icon: Clock,
      title: "Intelligent Scheduling",
      description: "AI-powered scheduling optimizes charging times for lower costs and grid efficiency."
    },
    {
      icon: MapPin,
      title: "Nationwide Network",
      description: "Access thousands of charging stations across the country with real-time availability."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security and 99.9% uptime ensures your charging experience is always safe."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-primary shadow-electric">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SmartCharge
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">
                Sign In
              </Button>
              <Button variant="electric" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                  <Button variant="ghost" className="justify-start">
                    Sign In
                  </Button>
                  <Button variant="electric" className="justify-start">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-blue-50/30 to-green-50/20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Smart EV Charging Station" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-primary shadow-electric">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SmartCharge
                </h1>
              </div>
            </div>

            {/* Hero Heading */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Future of
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Smart EV Charging
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Intelligent charging solutions that adapt to your schedule, optimize energy costs, 
              and power your journey with 100% renewable energy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="lg" className="group">
                Start Charging Smart
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Find Stations
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Charging Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-muted-foreground">Renewable Energy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Smart Support</div>
              </div>
            </div>
          </div>

          {/* Animated Electric Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40 animation-delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse opacity-50 animation-delay-1000"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> SmartCharge</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the next generation of EV charging with intelligent features 
                designed for the modern electric vehicle owner.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-card-hover transition-all duration-300 hover:scale-105 bg-gradient-card border-0 ${
                    feature.highlight ? 'ring-2 ring-primary/20 shadow-electric' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        feature.highlight 
                          ? 'bg-gradient-primary shadow-electric' 
                          : 'bg-primary/10'
                      } transition-all duration-300 group-hover:scale-110`}>
                        <feature.icon className={`h-6 w-6 ${
                          feature.highlight ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {feature.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="stations" className="py-20 bg-gradient-hero relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center text-white">
              {/* Main CTA */}
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Go Electric?
              </h2>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
                Join thousands of drivers who have already made the switch to smart, 
                sustainable EV charging. Start your electric journey today.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download App
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Stations Near You
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">5,000+</div>
                  <div className="text-white/80">Charging Stations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-white/80">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">30 min</div>
                  <div className="text-white/80">Average Charge Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-white/80">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-primary shadow-electric">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">SmartCharge</span>
              </div>
              <p className="text-background/80 mb-6 max-w-md">
                Leading the future of sustainable transportation with intelligent EV charging solutions 
                powered by renewable energy.
              </p>
              <div className="flex space-x-4">
                <Twitter className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
                <Facebook className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-background/80 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#stations" className="text-background/80 hover:text-primary transition-colors">Find Stations</a></li>
                <li><a href="#pricing" className="text-background/80 hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#support" className="text-background/80 hover:text-primary transition-colors">Support</a></li>
                <li><a href="#about" className="text-background/80 hover:text-primary transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-background/80">smartev@gmail.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-background/80">1-800-SMART-EV</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-background/80">Kolkata,WestBengal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm">
              © 2024 SmartCharge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-background/60 hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-background/60 hover:text-primary text-sm transition-colors">Terms of Service</a>
              <a href="#cookies" className="text-background/60 hover:text-primary text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
