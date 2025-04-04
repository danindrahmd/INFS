'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface OrderDetail {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  table: string;
  items: string;
  total: string;
  status: string;
  time: string;
  details: OrderDetail[];
}

const mockOrders: Order[] = [
  {
    id: 1,
    table: 'Table 5',
    items: '2 items',
    total: '$24.50',
    status: 'New',
    time: '2 mins ago',
    details: [
      { name: 'Margherita Pizza', quantity: 1, price: '$14.99' },
      { name: 'Caesar Salad', quantity: 1, price: '$9.51' },
    ],
  },
  {
    id: 2,
    table: 'Table 3',
    items: '4 items',
    total: '$42.75',
    status: 'Preparing',
    time: '8 mins ago',
    details: [
      { name: 'Spaghetti Carbonara', quantity: 2, price: '$33.98' },
      { name: 'Garlic Bread', quantity: 1, price: '$5.99' },
      { name: 'Tiramisu', quantity: 1, price: '$7.99' },
    ],
  },
  {
    id: 3,
    table: 'Table 7',
    items: '1 item',
    total: '$8.99',
    status: 'Served',
    time: '15 mins ago',
    details: [{ name: 'Caesar Salad', quantity: 1, price: '$8.99' }],
  },
  {
    id: 4,
    table: 'Table 2',
    items: '3 items',
    total: '$35.50',
    status: 'Completed',
    time: '24 mins ago',
    details: [
      { name: 'Margherita Pizza', quantity: 1, price: '$14.99' },
      { name: 'Tiramisu', quantity: 2, price: '$15.98' },
      { name: 'Soft Drink', quantity: 1, price: '$4.53' },
    ],
  },
];

export default function OrdersPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleShowDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    console.log(`Changing order ${orderId} status to ${newStatus}`);
    // Implement API update here
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Order ID</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Table</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                  <th className="py-3.5 pl-3 pr-4 text-right sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.table}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.items}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{order.total}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          order.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Preparing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Served'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.time}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleShowDetails(order)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Order"
                      >
                        <EyeIcon className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Order #{selectedOrder.id} Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Table</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedOrder.table}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Time</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedOrder.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedOrder.total}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Item</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.details.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-3 py-4 text-sm text-right text-gray-900">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                {selectedOrder.status === 'New' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Preparing')}>
                    Start Preparing
                  </Button>
                )}
                {selectedOrder.status === 'Preparing' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Served')}>
                    Mark as Served
                  </Button>
                )}
                {selectedOrder.status === 'Served' && (
                  <Button onClick={() => handleStatusChange(selectedOrder.id, 'Completed')}>
                    Mark as Completed
                  </Button>
                )}
              </div>
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
