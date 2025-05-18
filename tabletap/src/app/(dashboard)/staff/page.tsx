'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data for staff members
const mockStaffMembers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Active', lastLogin: '1 hour ago', completedOrders: 145 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Server', status: 'Active', lastLogin: '30 mins ago', completedOrders: 98 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Kitchen Staff', status: 'Active', lastLogin: '2 hours ago', completedOrders: 210 },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Server', status: 'Inactive', lastLogin: '5 days ago', completedOrders: 56 },
];

const mockRoles = [
  { id: 1, name: 'Manager', permissions: ['all'] },
  { id: 2, name: 'Server', permissions: ['view_menu', 'create_order', 'view_orders', 'edit_orders'] },
  { id: 3, name: 'Kitchen Staff', permissions: ['view_kitchen_display', 'update_order_status'] },
  { id: 4, name: 'Host', permissions: ['view_tables', 'assign_tables'] },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<'staff' | 'roles'>('staff');

  const getStatusColor = (status: string) =>
    status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <div className="flex space-x-2">
          <Button>{activeTab === 'staff' ? 'Add Staff' : 'Add Role'}</Button>
        </div>
      </div>

      <div className="mb-6 flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'staff' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Staff Members
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'roles' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Roles & Permissions
        </button>
      </div>

      {activeTab === 'staff' ? (
        <Card>
          <CardHeader>
            <CardTitle>Staff List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Login</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Orders</th>
                    <th className="py-3.5 pl-3 pr-4 text-right sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockStaffMembers.map((staff) => (
                    <tr key={staff.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{staff.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.role}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(staff.status)}`}>{staff.status}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.lastLogin}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{staff.completedOrders}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Edit">
                          <PencilSquareIcon className="h-5 w-5 inline" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Deactivate">
                          <TrashIcon className="h-5 w-5 inline" />
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
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Role</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"># Staff</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permissions</th>
                    <th className="py-3.5 pl-3 pr-4 text-right sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockRoles.map((role) => (
                    <tr key={role.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{role.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{mockStaffMembers.filter((s) => s.role === role.name).length}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{role.permissions[0] === 'all' ? 'All Permissions' : `${role.permissions.length} permissions`}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View/Edit">
                          <PencilSquareIcon className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}