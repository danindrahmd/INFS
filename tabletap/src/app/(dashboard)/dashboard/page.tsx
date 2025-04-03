'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for dashboard statistics
const mockStats = [
  { id: 1, name: 'Total Orders Today', value: '24' },
  { id: 2, name: 'Active Tables', value: '8' },
  { id: 3, name: 'Menu Items', value: '42' },
  { id: 4, name: 'Average Order Value', value: '$23.50' },
];

// Mock data for recent orders
const mockRecentOrders = [
  { id: 1, table: 'Table 5', items: '2 items', total: '$24.50', status: 'New', time: '2 mins ago' },
  { id: 2, table: 'Table 3', items: '4 items', total: '$42.75', status: 'Preparing', time: '8 mins ago' },
  { id: 3, table: 'Table 7', items: '1 item', total: '$8.99', status: 'Served', time: '15 mins ago' },
  { id: 4, table: 'Table 2', items: '3 items', total: '$35.50', status: 'Completed', time: '24 mins ago' },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
        <div>
          <Link href="/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">{stat.name}</div>
              <div className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Table
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Items
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRecentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {order.table}
                    </td>
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
                      <a href="#" className="text-blue-600 hover:text-blue-900">
                        View
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