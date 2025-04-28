import React, { useState } from 'react';
import { PencilIcon, TrashIcon, ChevronRightIcon } from 'lucide-react';

const mockCategories = [
  { id: 1, name: 'Fresh Produce', description: 'Fresh fruits and vegetables', productCount: 45, color: '#4ade80' },
  { id: 2, name: 'Bakery', description: 'Bread, pastries, and baked goods', productCount: 28, color: '#f97316' },
  { id: 3, name: 'Dairy', description: 'Milk, cheese, and other dairy products', productCount: 32, color: '#3b82f6' },
  { id: 4, name: 'Meat', description: 'Fresh and frozen meat products', productCount: 18, color: '#ef4444' },
  { id: 5, name: 'Seafood', description: 'Fresh and frozen seafood', productCount: 12, color: '#06b6d4' },
  { id: 6, name: 'Frozen', description: 'Frozen meals and ingredients', productCount: 24, color: '#a3a3a3' },
  { id: 7, name: 'Beverages', description: 'Drinks and beverage products', productCount: 36, color: '#8b5cf6' },
  { id: 8, name: 'Snacks', description: 'Chips, cookies, and snack foods', productCount: 42, color: '#eab308' }
];

const CategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState(mockCategories);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id} className="py-4 flex items-center hover:bg-gray-50">
            <div className="w-3 h-10 mr-4" style={{ backgroundColor: category.color }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{category.name}</p>
              <p className="text-sm text-gray-500 truncate">{category.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {category.productCount} Products
              </span>
              <button onClick={() => onEdit(category)} className="text-blue-600 hover:text-blue-900" title="Edit">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900" title="Delete">
                <TrashIcon className="h-4 w-4" />
              </button>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
