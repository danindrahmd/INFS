'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for staff members
const mockStaffMembers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Manager', 
    status: 'Active',
    lastLogin: '1 hour ago',
    completedOrders: 145
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'Server', 
    status: 'Active',
    lastLogin: '30 mins ago',
    completedOrders: 98
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    role: 'Kitchen Staff', 
    status: 'Active',
    lastLogin: '2 hours ago',
    completedOrders: 210
  },
  { 
    id: 4, 
    name: 'Sarah Williams', 
    email: 'sarah@example.com', 
    role: 'Server', 
    status: 'Inactive',
    lastLogin: '5 days ago',
    completedOrders: 56
  },
];

// Mock data for staff roles
const mockRoles = [
  { id: 1, name: 'Manager', permissions: ['all'] },
  { id: 2, name: 'Server', permissions: ['view_menu', 'create_order', 'view_orders', 'edit_orders'] },
  { id: 3, name: 'Kitchen Staff', permissions: ['view_kitchen_display', 'update_order_status'] },
  { id: 4, name: 'Host', permissions: ['view_tables', 'assign_tables'] },
];

export default function StaffManagementPage() {
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showEditStaff, setShowEditStaff] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showViewPermissions, setShowViewPermissions] = useState(false);
  const [activeTab, setActiveTab] = useState('staff'); // 'staff' or 'roles'
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  const handleEditStaff = (staff: any) => {
    setSelectedStaff(staff);
    setShowEditStaff(true);
  };
  
  const handleViewPermissions = (role: any) => {
    setSelectedRole(role);
    setShowViewPermissions(true);
  };
  
  // Function to get appropriate status badge color
  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <div className="flex space-x-2">
          {activeTab === 'staff' && (
            <Button onClick={() => setShowAddStaff(true)}>Add Staff Member</Button>
          )}
          {activeTab === 'roles' && (
            <Button onClick={() => setShowAddRole(true)}>Add Role</Button>
          )}
        </div>
      </div>

      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'staff'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('staff')}
        >
          Staff Members
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'roles'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('roles')}
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Login
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Orders Completed
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockStaffMembers.map((staff) => (
                    <tr key={staff.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {staff.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.role}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(staff.status)}`}
                        >
                          {staff.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.lastLogin}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{staff.completedOrders}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEditStaff(staff)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                        >
                          Deactivate
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
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Role Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Staff Count
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Permissions
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockRoles.map((role) => (
                    <tr key={role.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {role.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {mockStaffMembers.filter(staff => staff.role === role.name).length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {role.permissions.length === 1 && role.permissions[0] === 'all' 
                          ? 'All Permissions' 
                          : `${role.permissions.length} permissions`}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleViewPermissions(role)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Permissions
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
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

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Staff Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1">
                    <select
                      id="role"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {mockRoles.map(role => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                    PIN Code (for terminal login)
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="pin"
                      maxLength={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Staff will use this 4-digit PIN to login at terminals.</p>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Temporary Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="password"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Staff will be asked to change this password on first login.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddStaff(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddStaff(false)}>
                Add Staff Member
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditStaff && selectedStaff && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Staff Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="edit-name"
                      defaultValue={selectedStaff.name}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="edit-email"
                      defaultValue={selectedStaff.email}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1">
                    <select
                      id="edit-role"
                      defaultValue={selectedStaff.role}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      {mockRoles.map(role => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1">
                    <select
                      id="edit-status"
                      defaultValue={selectedStaff.status}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="edit-pin" className="block text-sm font-medium text-gray-700">
                    Reset PIN Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      id="edit-pin"
                      maxLength={4}
                      placeholder="Leave blank to keep current PIN"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Reset Password
                  </Button>
                  <span className="ml-2 text-xs text-gray-500">
                    Send a password reset email to this user
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditStaff(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEditStaff(false)}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* View Permissions Modal */}
      {showViewPermissions && selectedRole && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Permissions for {selectedRole.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRole.permissions[0] === 'all' ? (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Administrator Role</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          This role has full administrative access to all system features and functionalities. 
                          Use with caution and limit the number of users with this role.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">This role has the following permissions:</p>
                  <div className="max-h-60 overflow-y-auto">
                    <ul className="space-y-2">
                      {selectedRole.permissions.map((permission: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-900">
                            {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setShowViewPermissions(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Add New Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label htmlFor="role-name" className="block text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="role-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Menu Management</h5>
                        <div className="flex items-center">
                          <input
                            id="view_menu"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="view_menu" className="ml-2 text-sm text-gray-900">
                            View Menu
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="edit_menu"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="edit_menu" className="ml-2 text-sm text-gray-900">
                            Edit Menu
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Order Management</h5>
                        <div className="flex items-center">
                          <input
                            id="view_orders"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="view_orders" className="ml-2 text-sm text-gray-900">
                            View Orders
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="create_order"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="create_order" className="ml-2 text-sm text-gray-900">
                            Create Orders
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="edit_orders"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="edit_orders" className="ml-2 text-sm text-gray-900">
                            Edit Orders
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Table Management</h5>
                        <div className="flex items-center">
                          <input
                            id="view_tables"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="view_tables" className="ml-2 text-sm text-gray-900">
                            View Tables
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="assign_tables"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="assign_tables" className="ml-2 text-sm text-gray-900">
                            Assign Tables
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Kitchen Display</h5>
                        <div className="flex items-center">
                          <input
                            id="view_kitchen_display"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="view_kitchen_display" className="ml-2 text-sm text-gray-900">
                            View Kitchen Display
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="update_order_status"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="update_order_status" className="ml-2 text-sm text-gray-900">
                            Update Order Status
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Reports</h5>
                        <div className="flex items-center">
                          <input
                            id="view_reports"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="view_reports" className="ml-2 text-sm text-gray-900">
                            View Reports
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-xs font-semibold uppercase text-gray-500">Administration</h5>
                        <div className="flex items-center">
                          <input
                            id="manage_staff"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="manage_staff" className="ml-2 text-sm text-gray-900">
                            Manage Staff
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="manage_roles"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="manage_roles" className="ml-2 text-sm text-gray-900">
                            Manage Roles
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="manage_settings"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="manage_settings" className="ml-2 text-sm text-gray-900">
                            Manage Settings
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <input
                          id="all_permissions"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="all_permissions" className="ml-2 text-sm font-medium text-gray-900">
                          Grant All Permissions (Administrator)
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        This will override all options above and grant full access to all system features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddRole(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddRole(false)}>
                Add Role
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}