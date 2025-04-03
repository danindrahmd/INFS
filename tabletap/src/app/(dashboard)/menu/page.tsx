'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for inventory items
const mockInventoryItems = [
  { 
    id: 1, 
    name: 'Garlic aBread', 
    category: 'Appetizers', 
    stock: 45, 
    threshold: 20, 
    status: 'In Stock', 
    lastUpdated: '2 hours ago' 
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    category: 'Appetizers', 
    stock: 18, 
    threshold: 15, 
    status: 'Low Stock', 
    lastUpdated: '1 hour ago' 
  },
  { 
    id: 3, 
    name: 'Margherita Pizza', 
    category: 'Main Courses', 
    stock: 25, 
    threshold: 10, 
    status: 'In Stock', 
    lastUpdated: '3 hours ago' 
  },
  { 
    id: 4, 
    name: 'Spaghetti Carbonara', 
    category: 'Main Courses', 
    stock: 8, 
    threshold: 10, 
    status: 'Low Stock', 
    lastUpdated: '5 hours ago' 
  },
  { 
    id: 5, 
    name: 'Tiramisu', 
    category: 'Desserts', 
    stock: 0, 
    threshold: 5, 
    status: 'Out of Stock', 
    lastUpdated: '1 day ago' 
  },
];

// Mock data for inventory logs
const mockInventoryLogs = [
  { 
    id: 1, 
    itemName: 'Garlic Bread', 
    changeAmount: -5, 
    reason: 'Order #123', 
    staff: 'John Doe', 
    timestamp: '2 hours ago' 
  },
  { 
    id: 2, 
    itemName: 'Caesar Salad', 
    changeAmount: -2, 
    reason: 'Order #124', 
    staff: 'Jane Smith', 
    timestamp: '1 hour ago' 
  },
  { 
    id: 3, 
    itemName: 'Margherita Pizza', 
    changeAmount: +20, 
    reason: 'Stock Adjustment', 
    staff: 'Admin', 
    timestamp: '3 hours ago' 
  },
  { 
    id: 4, 
    itemName: 'Tiramisu', 
    changeAmount: -5, 
    reason: 'Order #120', 
    staff: 'John Doe', 
    timestamp: '1 day ago' 
  },
];

export default function InventoryPage() {
  const [showAddStock, setShowAddStock] = useState(false);
  const [showSetThreshold, setShowSetThreshold] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'logs'
  
  const handleAdjustStock = (item: any) => {
    setSelectedItem(item);
    setShowAddStock(true);
  };
  
  const handleSetThreshold = (item: any) => {
    setSelectedItem(item);
    setShowSetThreshold(true);
  };

  const getStatusColor = (status: string) => {
    if (status === 'In Stock') return 'bg-green-100 text-green-800';
    if (status === 'Low Stock') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Out of Stock') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getChangeColor = (amount: number) => {
    if (amount > 0) return 'text-green-600';
    if (amount < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.print()}>Export Report</Button>
          <Button>Bulk Update</Button>
        </div>
      </div>

      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'inventory'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Items
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'logs'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('logs')}
        >
          Inventory Logs
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Item Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Current Stock
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Threshold
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockInventoryItems.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.stock}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.threshold}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.lastUpdated}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleAdjustStock(item)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Adjust Stock
                        </button>
                        <button
                          onClick={() => handleSetThreshold(item)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Set Threshold
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Inventory History Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Item Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Change
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Reason
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Staff Member
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockInventoryLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {log.itemName}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${getChangeColor(log.changeAmount)}`}>
                        {log.changeAmount > 0 ? `+${log.changeAmount}` : log.changeAmount}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{log.reason}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{log.staff}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adjust Stock Modal */}
      {showAddStock && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Adjust Stock for {selectedItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">
                    Current Stock
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="currentStock"
                      disabled
                      value={selectedItem.stock}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="adjustment" className="block text-sm font-medium text-gray-700">
                    Adjustment
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      id="adjustment"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Enter positive value to add stock, negative to remove.</p>
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                    Reason
                  </label>
                  <div className="mt-1">
                    <select
                      id="reason"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Stock Adjustment</option>
                      <option>New Delivery</option>
                      <option>Waste/Spoilage</option>
                      <option>Inventory Count</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="notes"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddStock(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddStock(false)}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Set Threshold Modal */}
      {showSetThreshold && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Set Low Stock Threshold for {selectedItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentThreshold" className="block text-sm font-medium text-gray-700">
                    Current Threshold
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="currentThreshold"
                      disabled
                      value={selectedItem.threshold}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="newThreshold" className="block text-sm font-medium text-gray-700">
                    New Threshold
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      id="newThreshold"
                      min="0"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">You'll be alerted when stock falls below this number.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSetThreshold(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSetThreshold(false)}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}