'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for menu categories
const mockCategories = [
  { id: 1, name: 'Appetizers', itemCount: 8 },
  { id: 2, name: 'Main Courses', itemCount: 12 },
  { id: 3, name: 'Desserts', itemCount: 6 },
  { id: 4, name: 'Beverages', itemCount: 10 },
];

// Mock data for menu items with inventory
const mockMenuItems = [
  { 
    id: 1, 
    name: 'Garlic Bread', 
    category: 'Appetizers', 
    price: '$5.99', 
    available: true,
    stock: 45,
    threshold: 20,
    stockStatus: 'In Stock'
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    category: 'Appetizers', 
    price: '$8.99', 
    available: true,
    stock: 18,
    threshold: 15,
    stockStatus: 'Low Stock'
  },
  { 
    id: 3, 
    name: 'Margherita Pizza', 
    category: 'Main Courses', 
    price: '$14.99', 
    available: true,
    stock: 25,
    threshold: 10,
    stockStatus: 'In Stock'
  },
  { 
    id: 4, 
    name: 'Spaghetti Carbonara', 
    category: 'Main Courses', 
    price: '$16.99', 
    available: true,
    stock: 8,
    threshold: 10,
    stockStatus: 'Low Stock'
  },
  { 
    id: 5, 
    name: 'Tiramisu', 
    category: 'Desserts', 
    price: '$7.99', 
    available: false,
    stock: 0,
    threshold: 5,
    stockStatus: 'Out of Stock'
  },
  { 
    id: 6, 
    name: 'Cheesecake', 
    category: 'Desserts', 
    price: '$7.99', 
    available: false,
    stock: 0,
    threshold: 5,
    stockStatus: 'Out of Stock'
  },
];

export default function MenuPage() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setShowEditItem(true);
  };
  
  const filteredItems = selectedCategory 
    ? mockMenuItems.filter(item => item.category === selectedCategory)
    : mockMenuItems;
  
  // Function to get appropriate stock status badge color
  const getStockStatusColor = (status: string) => {
    if (status === 'In Stock') return 'bg-green-100 text-green-800';
    if (status === 'Low Stock') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Out of Stock') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowAddCategory(true)}>
            Add Category
          </Button>
          <Button onClick={() => setShowAddItem(true)}>Add Menu Item</Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
        <button
          className={`px-3 py-1.5 text-sm font-medium rounded-full ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </button>
        {mockCategories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1.5 text-sm font-medium rounded-full ${
              selectedCategory === category.name
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Categories */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Categories</CardTitle>
          <div className="text-sm text-gray-500">
            {mockCategories.length} categories
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Category Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Items
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockCategories.map((category) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {category.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.itemCount} items</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </a>
                      <a href="#" className="text-red-600 hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Menu Items</CardTitle>
          <div className="text-sm text-gray-500">
            {filteredItems.length} items
          </div>
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
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Available
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.category}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <button
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            item.available ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`${
                              item.available ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {item.stock} / {item.threshold}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStockStatusColor(item.stockStatus)}`}
                      >
                        {item.stockStatus}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <a href="#" className="text-red-600 hover:text-red-900">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Management
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="stock" className="block text-xs font-medium text-gray-500">
                        Initial Stock
                      </label>
                      <input
                        type="number"
                        id="stock"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="threshold" className="block text-xs font-medium text-gray-500">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        id="threshold"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="available"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="track-inventory"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="track-inventory" className="ml-2 block text-sm text-gray-900">
                    Track Inventory
                  </label>
                  <span className="ml-2 text-xs text-gray-500">
                    Automatically update availability based on stock level
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddItem(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddItem(false)}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditItem && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-itemName" className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="edit-itemName"
                    defaultValue={selectedItem.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="edit-category"
                    defaultValue={selectedItem.category}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="edit-price"
                      defaultValue={selectedItem.price.replace('$', '')}
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Management
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-stock" className="block text-xs font-medium text-gray-500">
                        Current Stock
                      </label>
                      <input
                        type="number"
                        id="edit-stock"
                        min="0"
                        defaultValue={selectedItem.stock}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-threshold" className="block text-xs font-medium text-gray-500">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        id="edit-threshold"
                        min="0"
                        defaultValue={selectedItem.threshold}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="edit-available"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked={selectedItem.available}
                  />
                  <label htmlFor="edit-available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
                <div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Navigate to inventory management for this item
                      }}
                    >
                      View Inventory History
                    </button>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Add stock adjustment modal
                      }}
                    >
                      Adjust Stock
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditItem(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditItem(false)}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Add Category Modal (simplified for mockup) */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700">
                  Display Order
                </label>
                <input
                  type="number"
                  id="displayOrder"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  min="1"
                  defaultValue="1"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Categories are displayed in ascending order. Lower numbers appear first.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddCategory(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddCategory(false)}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Low Stock Alert (fixed position notification) */}
      <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-4 max-w-md border-l-4 border-yellow-500 animate-bounce">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">Low Stock Alert</h3>
            <div className="mt-1 text-sm text-gray-500">
              <p>2 items are running low on stock. <a href="#" className="font-medium text-yellow-700 hover:text-yellow-600">View all</a></p>
            </div>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button className="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600">
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}