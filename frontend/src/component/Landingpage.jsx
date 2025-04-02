// App.jsx
import React from 'react';

import { ArrowRight, ShoppingCart, Clock, DollarSign, Tag } from 'lucide-react';
import landingImage from "../assets/app-interface.png";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">GroceryMate</span>
          </div> */}
          {/* <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">Pricing</a>
          </div> */}
          {/* <button 
  className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-sm border border-green-200 hover:shadow-md transition-shadow"
  onClick={() => window.location.href = '/Login'}
>
  Login
</button> */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">Smart Grocery Shopping Made Simple</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-md">
              GroceryMate helps you save time and money by finding the best deals and organizing your shopping list.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
  className="bg-green-600 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
  onClick={() => window.location.href = '/Login'}
>
  Get Started
  <ArrowRight className="ml-2 h-5 w-5" />
</button>

              <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg shadow border border-green-400 hover:shadow-md transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
          <img 
  src={landingImage} 
  alt="GroceryMate App Interface" 
  className="rounded-xl shadow-2xl"
/>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose GroceryMate?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-xl">
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Save Time</h3>
              <p className="text-gray-600">
                Create shopping lists quickly and find the fastest route through the store.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Save Money</h3>
              <p className="text-gray-600">
                Automatically find the best deals and coupons for items on your list.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl">
              <Tag className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Suggestions</h3>
              <p className="text-gray-600">
                Get personalized product recommendations based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How GroceryMate Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Create Your List</h3>
              <p className="text-gray-600">
                Add items to your shopping list using voice commands or text.
              </p>
            </div>
            
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Compare Prices</h3>
              <p className="text-gray-600">
                See which stores have the best deals for your items.
              </p>
            </div>
            
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Shop Efficiently</h3>
              <p className="text-gray-600">
                Follow our optimized route through the store to save time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600 italic mb-4">
                "GroceryMate has saved me so much time and money! I've cut my grocery bill by 20% since I started using it."
              </p>
              <p className="font-bold text-gray-800">- Sarah J.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600 italic mb-4">
                "The smart suggestions feature is amazing. It's like having a personal shopping assistant in my pocket."
              </p>
              <p className="font-bold text-gray-800">- Michael T.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Grocery Shopping?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who are saving time and money with GroceryMate.
          </p>
          <button className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">
            Get Started Today
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShoppingCart className="h-6 w-6 text-green-400" />
              <span className="ml-2 text-xl font-bold">GroceryMate</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2025 GroceryMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;