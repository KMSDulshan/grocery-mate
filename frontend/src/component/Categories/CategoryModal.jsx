import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

const CategoryModal = ({ isOpen, onClose, category }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#4f46e5',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        color: category.color || '#4f46e5',
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving category:', formData);
    onClose();
  };

  const colorOptions = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#4ade80' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Gray', value: '#a3a3a3' },
  ];

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {category ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <div
                        key={color.value}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${formData.color === color.value ? 'border-gray-900' : 'border-transparent'}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
                  {category ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={onClose} className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
