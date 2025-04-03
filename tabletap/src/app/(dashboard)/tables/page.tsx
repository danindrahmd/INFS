'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';
import QRCode from 'react-qr-code';

// Mock data for tables
const mockTables = [
  { id: 1, tableNumber: '1', seats: 2, status: 'Available' },
  { id: 2, tableNumber: '2', seats: 4, status: 'Occupied' },
  { id: 3, tableNumber: '3', seats: 6, status: 'Available' },
  { id: 4, tableNumber: '4', seats: 2, status: 'Available' },
  { id: 5, tableNumber: '5', seats: 4, status: 'Occupied' },
];

export default function TablesPage() {
  const [showAddTable, setShowAddTable] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);

  const handleShowQRCode = (table: any) => {
    setSelectedTable(table);
    setShowQRCode(true);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
        <div>
          <Button onClick={() => setShowAddTable(true)}>Add Table</Button>
        </div>
      </div>

      {/* Tables List */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Table Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Seats
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
                {mockTables.map((table) => (
                  <tr key={table.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      Table {table.tableNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{table.seats}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          table.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {table.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleShowQRCode(table)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        QR Code
                      </button>
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

      {/* Add Table Modal (simplified for mockup) */}
      {showAddTable && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700">
                    Table Number
                  </label>
                  <input
                    type="text"
                    id="tableNumber"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    id="seats"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddTable(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddTable(false)}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && selectedTable && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>QR Code for Table {selectedTable.tableNumber}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg">
                <QRCode
                  value={`https://tabletap.example.com/restaurant/123/table/${selectedTable.id}`}
                  size={200}
                  level="H"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Scan this QR code or print it to place on Table {selectedTable.tableNumber}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center space-x-2">
              <Button variant="outline" onClick={() => setShowQRCode(false)}>
                Close
              </Button>
              <Button>Download</Button>
              <Button>Print</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}