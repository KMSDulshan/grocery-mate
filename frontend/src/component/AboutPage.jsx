import React from 'react';
import { Heart, Truck, Leaf, ShieldCheck } from 'lucide-react';

// Import local images
import TeamMember1 from '../assets/team-member-1.jpg';
import TeamMember2 from '../assets/team-member-2.jpg';
import TeamMember3 from '../assets/team-member-3.jpg';
import TeamMember4 from '../assets/team-member-4.jpg';
import StoreImage from '../assets/store-image.jpg';
import HeroImage from '../assets/hero-image.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-10 grid md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Fresh, Sustainable, 
              <br />
              Community-GroceryMate
            </h1>
            <p className="text-xl text-green-100">
              Bringing the best local and organic products.
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src={HeroImage} 
              alt="Grocery Mate Team" 
              className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 object-cover h-96 w-full"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img 
            src={StoreImage} 
            alt="Our Store" 
            className="rounded-xl shadow-lg object-cover h-96 w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-green-800">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Grocery Mate began with a simple mission: to provide fresh, high-quality groceries 
            while supporting local farmers and promoting sustainable agriculture.
          </p>
          <p className="text-gray-700">
            Founded in 2015, we've grown from a small local market to a trusted grocery 
            destination, committed to bringing the best produce directly from farm to table.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-green-600" />,
                title: "Community First",
                description: "Supporting local farmers and producers"
              },
              {
                icon: <Truck className="w-12 h-12 text-green-600" />,
                title: "Fresh Delivery",
                description: "Quick and reliable grocery delivery"
              },
              {
                icon: <Leaf className="w-12 h-12 text-green-600" />,
                title: "Sustainability",
                description: "Environmentally conscious practices"
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
                title: "Quality Assurance",
                description: "Highest standards of product selection"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="text-center bg-green-50 p-6 rounded-xl hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-900">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              name: "K.M.S.Dulshan",
              role: "Founder & CEO",
              image: TeamMember1
            },
            {
              name: "B.P.D.M.K.Ariyathilaka",
              role: "Head of Operations",
              image: TeamMember2
            },
            {
              name: "D.Adithya",
              role: "Sustainability Director",
              image: TeamMember3
            },
            {
              name: "A.B.Amada Prabuddhini",
              role: "Chief Procurement Officer",
              image: TeamMember4
            }
          ].map((member, index) => (
            <div 
              key={index} 
              className="text-center bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Our Grocery Community
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Discover the freshest produce, support local farmers, and enjoy 
            sustainable grocery shopping.
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-full text-lg font-bold hover:bg-green-100 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;