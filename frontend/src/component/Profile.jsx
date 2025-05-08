import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Mail, Phone, MapPin, 
  Camera, Edit, Save, 
  Award, ShoppingCart, Heart, 
  Settings 
} from 'lucide-react';

const ProfileManagement = () => {
  const [profileImage, setProfileImage] = useState('/api/placeholder/200/200');
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '', // Include phone number
    address: '' // Include address
  });

  const [stats, setStats] = useState({
    totalOrders: 24,
    totalSpent: 45750,
    favoriteItems: 12
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data
    if (user) {
      setUserDetails(user);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/users/${userDetails._id}`, // Ensure this URL matches your backend route
        {
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          address: userDetails.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state and localStorage with the new user details
      setUserDetails(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      saveProfile();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 relative">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label 
                htmlFor="profile-upload" 
                className="absolute bottom-2 right-2 bg-white text-green-600 rounded-full p-3 cursor-pointer hover:bg-green-100 shadow-md"
              >
                <Camera size={24} />
                <input 
                  type="file" 
                  id="profile-upload" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl font-bold">{userDetails.name}</h2>
              <p className="text-green-200 text-lg">@{userDetails.username}</p>
              <button 
                onClick={toggleEditMode}
                className="mt-2 bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-100 transition flex items-center space-x-2 mx-auto md:mx-0"
              >
                {isEditing ? (
                  <>
                    <Save size={18} /> <span>Save Profile</span>
                  </>
                ) : (
                  <>
                    <Edit size={18} /> <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <User className="mr-2 text-green-600" /> Personal Details
              </h3>
              <div className="space-y-4">
                <ProfileField 
                  label="Full Name" 
                  name="name"
                  value={userDetails.name}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  icon={<User className="text-green-600" />}
                />
                <ProfileField 
                  label="Username" 
                  name="username"
                  value={userDetails.username}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  icon={<Settings className="text-green-600" />}
                />
                <ProfileField 
                  label="Email Address" 
                  name="email"
                  value={userDetails.email}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  type="email"
                  icon={<Mail className="text-green-600" />}
                />
                <ProfileField 
                  label="Phone Number" 
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  type="tel"
                  icon={<Phone className="text-green-600" />}
                />
                <ProfileField 
                  label="Address" 
                  name="address"
                  value={userDetails.address}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  multiline
                  icon={<MapPin className="text-green-600" />}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-100 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Profile Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <ShoppingCart className="mx-auto text-green-600 mb-2" />
                  <p className="font-bold text-green-900">{stats.totalOrders}</p>
                  <p className="text-sm text-green-700">Orders</p>
                </div>
                <div>
                  <Heart className="mx-auto text-green-600 mb-2" />
                  <p className="font-bold text-green-900">{stats.favoriteItems}</p>
                  <p className="text-sm text-green-700">Favorites</p>
                </div>
                <div>
                  <Award className="mx-auto text-green-600 mb-2" />
                  <p className="font-bold text-green-900">Rs {stats.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-green-700">Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, name, value, isEditing, onChange, type = 'text', multiline = false, icon }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-10">{icon}</div>
      <div className="flex-grow">
        <label className="text-green-800 font-medium mb-1 block">{label}</label>
        {isEditing ? (
          multiline ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-y"
              rows={3}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          )
        ) : (
          <p className="text-gray-700 bg-white p-3 rounded-lg border border-green-200">{value}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;