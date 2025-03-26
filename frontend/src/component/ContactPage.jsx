import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Contact Information Section */}
        <div className="bg-green-600 text-white p-10">
          <h2 className="text-3xl font-bold mb-6">Contact Grocery Mate Sri Lanka</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-8 h-8" />
              <div>
                <p className="font-semibold">Email</p>
                <p>support@grocerymate.lk</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>+94 11 234 5678</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8" />
              <div>
                <p className="font-semibold">Address</p>
                <p>123 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8" />
              <div>
                <p className="font-semibold">Hours</p>
                <p>Mon-Sat: 8am - 8pm</p>
                <p>Sunday: 10am - 6pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                placeholder="+94 11 234 5678"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500"
                placeholder="How can we help you today?"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Location Map Section */}
      <div className="max-w-7xl mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden">
        <h3 className="text-2xl font-bold p-4 text-center bg-green-100">Our Location in Colombo</h3>
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9651206441316!2d79.84659637480645!3d6.90732662198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259175df38425%3A0x8bc95cb8848e2cac!2sGalle%20Road%2C%20Colombo!5e0!3m2!1sen!2slk!4v1710944342612!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;