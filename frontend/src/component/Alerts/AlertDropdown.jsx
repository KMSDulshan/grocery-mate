import React, { useState } from 'react'
import { BellIcon } from 'lucide-react'
const AlertDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const alerts = [
    {
      id: 1,
      title: 'Low Stock Alert',
      message: 'Organic Apples are running low (5 units left)',
      time: '10 minutes ago',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Out of Stock',
      message: 'Whole Wheat Bread is out of stock',
      time: '1 hour ago',
      type: 'danger',
    },
    {
      id: 3,
      title: 'Expiring Soon',
      message: 'Milk will expire in 2 days',
      time: '3 hours ago',
      type: 'info',
    },
  ]
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">
                Notifications
              </h3>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-2 h-2 rounded-full mt-1 ${alert.type === 'danger' ? 'bg-red-500' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}
                    ></div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.title}
                      </p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-gray-200">
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default AlertDropdown
