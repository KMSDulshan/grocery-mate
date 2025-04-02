import React from 'react';
import { ShoppingCart, Truck, Leaf, Award } from 'lucide-react';

const OrganicProduceHomepage = () => {
  // Sample product data
  const products = [
    { 
      id: 1, 
      name: 'Fresh Tomatoes', 
      price: 'Rs.120.00', 
      image: '/tomato.jpg' 
    },
    { 
      id: 2, 
      name: 'Ripe Bananas', 
      price: 'Rs.60.00', 
      image: '/banana.jpg' 
    },
    { 
      id: 3, 
      name: 'Classic Bite', 
      price: 'Rs.280.00', 
      image: '/bite.jpg' 
    },
    { 
      id: 4, 
      name: 'Watermelon', 
      price: 'Rs.150.00', 
      image: '/watermelon.jpg' 
    },
    { 
      id: 5, 
      name: 'Milk Bottle', 
      price: 'Rs.1050.00', 
      image: '/milk.jpg' 
    },
    { 
      id: 6, 
      name: 'Eggs', 
      price: 'Rs.580.00', 
      image: '/Eggs.jpg' 
    },
    { 
      id: 7, 
      name: 'Biscutes', 
      price: 'Rs.380.00', 
      image: '/Biscuite.jpg' 
    },
    { 
      id: 8, 
      name: 'Shampoo', 
      price: 'Rs.3420.00', 
      image: '/shampoo.jpg' 
    }
  ];

  return (
    <div className="bg-white">
      {/* Header Section */}
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Leaf className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Organic & Healthy Product</h1>
          </div>
          
          
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative">
        <div className="bg-green-600 text-white py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Providing Smart Grocery Shopping Experience</h2>
          <p className="text-xl mb-6">Fresh, Organic, and Locally Sourced</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50">
            Shop Now
          </button>
        </div>
      </div>

      {/* Discount Banners */}
      <div className="container mx-auto px-4 mt-[-50px] grid md:grid-cols-3 gap-4 z-10 relative">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">50% OFF</h3>
          <p>Selected Products</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">40% OFF</h3>
          <p>Hot Grill Items</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">Free</h3>
          <p>Delivery on First Order</p>
        </div>
      </div>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold">{product.price}</p>
                <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shopping Smarter, Happy Perfect Life</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Truck className="mx-auto w-12 h-12 text-green-600 mb-4" />
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-gray-600">On Orders Above $50</p>
            </div>
            <div className="text-center">
              <Leaf className="mx-auto w-12 h-12 text-green-600 mb-4" />
              <h3 className="font-semibold">100% Organic</h3>
              <p className="text-gray-600">Certified Organic Produce</p>
            </div>
            <div className="text-center">
              <Award className="mx-auto w-12 h-12 text-green-600 mb-4" />
              <h3 className="font-semibold">High Quality</h3>
              <p className="text-gray-600">Premium Quality Guarantee</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="mx-auto w-12 h-12 text-green-600 mb-4" />
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-gray-600">Hassle Free Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Smart Grocery Shopping Produce. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrganicProduceHomepage;