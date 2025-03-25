import React from 'react';

const Signup = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Decorative with Logo and Tagline */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white p-10" 
             style={{ background: 'linear-gradient(135deg,rgb(0, 116, 43) 0%, rgb(0, 116, 43)' }}>
          <div className="mb-8">
            <i className="fas fa-shopping-cart text-5xl"></i>
          </div>
          <h1 className="text-4xl font-bold mb-6">Join Smart Grocery Shopping</h1>
          <p className="text-xl mb-6 text-center">Create an account to enjoy personalized recommendations</p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-white p-5">
          <div className="w-full max-w-md p-8">
            {/* Mobile Logo display */}
            <div className="md:hidden flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                   style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
                <i className="fas fa-shopping-cart text-white text-2xl"></i>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">Create an Account</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">Sign up to start your smart shopping journey</p>

            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="John Doe" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="your@email.com" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="••••••••" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                  placeholder="••••••••" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>

              <p className="mt-8 text-center text-gray-600">
                Already have an account? 
                <a href="Login" className="text-green-600 hover:text-green-800 font-medium ml-1">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
