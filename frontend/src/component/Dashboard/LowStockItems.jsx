import React from 'react'
const LowStockItems = () => {
  const items = [
    {
      id: 1,
      name: 'Organic Apples',
      category: 'Fresh Produce',
      current: 5,
      threshold: 10,
    },
    {
      id: 2,
      name: 'Whole Wheat Bread',
      category: 'Bakery',
      current: 0,
      threshold: 15,
    },
    {
      id: 3,
      name: 'Milk 2%',
      category: 'Dairy',
      current: 8,
      threshold: 20,
    },
    {
      id: 4,
      name: 'Chicken Breast',
      category: 'Meat',
      current: 3,
      threshold: 8,
    },
    {
      id: 5,
      name: 'Orange Juice',
      category: 'Beverages',
      current: 4,
      threshold: 12,
    },
  ]
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.current === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                >
                  {item.current === 0 ? 'Out of Stock' : `${item.current} left`}
                </span>
                <button className="ml-4 text-sm font-medium text-green-600 hover:text-green-500">
                  Restock
                </button>
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.current === 0 ? 'bg-red-500' : item.current < item.threshold / 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                style={{
                  width: `${Math.min(100, (item.current / item.threshold) * 100)}%`,
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="text-sm font-medium text-green-600 hover:text-green-500">
          View all low stock items →
        </button>
      </div>
    </div>
  )
}
export default LowStockItems
