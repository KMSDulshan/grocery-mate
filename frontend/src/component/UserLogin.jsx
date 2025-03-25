import React from 'react';

const Login = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Decorative with Logo and Tagline */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center text-white p-10" 
             style={{ background: 'linear-gradient(135deg,rgb(0, 116, 43) 0%, rgb(0, 116, 43)' }}>
          <div className="mb-8">
            <i className="fas fa-shopping-cart text-5xl"></i>
          </div>
          <h1 className="text-4xl font-bold mb-6">Smart Grocery Shopping Assisstant</h1>
          <p className="text-xl mb-6 text-center">Experience smart shopping with personalized recommendations</p>
          <div className="space-y-6 mt-8">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-3 text-green-300"></i>
              <p>Smart item recommendations</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-3 text-green-300"></i>
              <p>Complementary product suggestions</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-3 text-green-300"></i>
              <p>Seamless shopping list analysis</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center bg-white p-5">
          <div className="w-full max-w-md p-8">
            {/* Mobile Logo display */}
            <div className="md:hidden flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                   style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' }}>
                <i className="fas fa-shopping-cart text-white text-2xl"></i>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">Welcome Back</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">Log in to continue smart shopping</p>
            
            <form>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Log In
              </button>

              {/* Google Login Button */}
              <button 
                type="button" 
                className="w-full py-3 mt-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 font-medium transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <i className="fab fa-google mr-3 text-red-500"></i>
                Log in with Google
              </button>

              <p className="mt-8 text-center text-gray-600">
                Don't have an account? 
                <a href="Signup" className="text-green-600 hover:text-green-800 font-medium ml-1">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
