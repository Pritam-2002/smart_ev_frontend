import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
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
      icon: "📱",
      title: "Smart App Control",
      description: "Control charging remotely, schedule sessions, and monitor energy usage from anywhere."
    },
    {
      icon: "⚡",
      title: "Lightning Fast Charging",
      description: "Advanced DC fast charging technology gets you back on the road in minutes, not hours.",
      highlight: true
    },
    {
      icon: "🌱",
      title: "100% Renewable Energy",
      description: "Every charge is powered by clean, renewable energy sources for a truly sustainable drive."
    },
    {
      icon: "🕐",
      title: "Intelligent Scheduling",
      description: "AI-powered scheduling optimizes charging times for lower costs and grid efficiency."
    },
    {
      icon: "📍",
      title: "Nationwide Network",
      description: "Access thousands of charging stations across the country with real-time availability."
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      description: "Bank-level security and 99.9% uptime ensures your charging experience is always safe."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <span className="text-white text-xl font-bold">⚡</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartCharge
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={()=>navigate('/signup')} className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
                <span className="mr-2"></span>
                Join as EV Driver
              </button>
              {/* <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center">
                <span className="mr-2"></span>
                Join as Station Manager
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-xl">☰</span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/50">
                  <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-left flex items-center">
                    <span className="mr-2">🚗</span>
                    Join as EV Driver
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-left flex items-center">
                    <span className="mr-2">🏢</span>
                    Join as Station Manager
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartCharge
                </h1>
              </div>
            </div>

            {/* Hero Heading */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
              The Future of
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Smart EV Charging
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Intelligent charging solutions that adapt to your schedule, optimize energy costs, 
              and power your journey with 100% renewable energy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center">
                Start Charging Smart
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Find Stations
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Charging Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Renewable Energy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Smart Support</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-500 rounded-full animate-pulse opacity-40" style={{animationDelay: '0.7s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Why Choose 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> SmartCharge</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the next generation of EV charging with intelligent features 
                designed for the modern electric vehicle owner.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    feature.highlight ? 'ring-2 ring-blue-500/20 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-full ${
                      feature.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                        : 'bg-gray-100'
                    } transition-all duration-300 group-hover:scale-110`}>
                      <span className={`text-2xl ${
                        feature.highlight ? 'filter brightness-0 invert' : ''
                      }`}>
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="stations" className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
                <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                  <span className="mr-2">📱</span>
                  Download App
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center">
                  <span className="mr-2">📍</span>
                  Find Stations Near You
                </button>
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
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <span className="text-2xl font-bold">SmartCharge</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Leading the future of sustainable transportation with intelligent EV charging solutions 
                powered by renewable energy.
              </p>
              <div className="flex space-x-4">
                <span className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-xl">🐦</span>
                <span className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-xl">📘</span>
                <span className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-xl">💼</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#stations" className="text-gray-400 hover:text-blue-400 transition-colors">Find Stations</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#support" className="text-gray-400 hover:text-blue-400 transition-colors">Support</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <span className="text-blue-400">📧</span>
                  <span className="text-gray-400">smartev@gmail.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-400">📞</span>
                  <span className="text-gray-400">1-800-SMART-EV</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-blue-400">📍</span>
                  <span className="text-gray-400">Kolkata, West Bengal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              ©️ 2024 SmartCharge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</a>
              <a href="#cookies" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;