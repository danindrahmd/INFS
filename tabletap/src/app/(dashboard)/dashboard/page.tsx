'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { EyeIcon } from '@heroicons/react/24/outline';

// Dashboard metrics and orders
const mockStats = [
  { id: 1, name: 'Total Orders Today', value: '24' },
  { id: 2, name: 'Active Tables', value: '8' },
  { id: 3, name: 'Menu Items', value: '42' },
  { id: 4, name: 'Average Order Value', value: '$23.50' },
];

const mockRecentOrders = [
  { id: 1, table: 'Table 5', items: '2 items', total: '$24.50', status: 'New', time: '2 mins ago' },
  { id: 2, table: 'Table 3', items: '4 items', total: '$42.75', status: 'Preparing', time: '8 mins ago' },
  { id: 3, table: 'Table 7', items: '1 item', total: '$8.99', status: 'Served', time: '15 mins ago' },
  { id: 4, table: 'Table 2', items: '3 items', total: '$35.50', status: 'Completed', time: '24 mins ago' },
];

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
        <Link href="/orders">
          <Button variant="primary">View All Orders</Button>
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Table</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Time</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRecentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-sm text-gray-900">{order.table}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{order.items}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">{order.total}</td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${
                          order.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Preparing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Served'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{order.time}</td>
                    <td className="px-4 py-4 text-sm text-right">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <EyeIcon className="h-4 w-4" /> View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
