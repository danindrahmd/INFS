'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for active orders
const initialOrders = [
  { 
    id: 1, 
    table: 'Table 5', 
    status: 'New', 
    time: '2:03', 
    createdAt: '2 mins ago',
    items: [
      { id: 1, name: 'Margherita Pizza', quantity: 1, status: 'pending', notes: 'Extra cheese' },
      { id: 2, name: 'Caesar Salad', quantity: 1, status: 'pending', notes: 'No croutons' }
    ]
  },
  { 
    id: 2, 
    table: 'Table 3', 
    status: 'In Progress', 
    time: '8:47', 
    createdAt: '8 mins ago',
    items: [
      { id: 3, name: 'Spaghetti Carbonara', quantity: 2, status: 'in-progress', notes: '' },
      { id: 4, name: 'Garlic Bread', quantity: 1, status: 'ready', notes: '' },
      { id: 5, name: 'Tiramisu', quantity: 1, status: 'pending', notes: '' }
    ]
  },
  { 
    id: 3, 
    table: 'Table 7', 
    status: 'Ready', 
    time: '0:00', 
    createdAt: '15 mins ago',
    items: [
      { id: 6, name: 'Caesar Salad', quantity: 1, status: 'ready', notes: '' }
    ]
  }
];

export default function KitchenDisplaySystem() {
  const [orders, setOrders] = useState(initialOrders);
  const [timers, setTimers] = useState<{[key: number]: number}>({});
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'new', 'in-progress', 'ready'
  const [sortOrder, setSortOrder] = useState('oldest'); // 'oldest' or 'newest'
  
  // Initialize and update timers
  useEffect(() => {
    // Initialize timers for all orders
    const initialTimers: {[key: number]: number} = {};
    orders.forEach(order => {
      if (order.status !== 'Ready') {
        // Extract minutes and seconds from the time string "MM:SS"
        const [minutes, seconds] = order.time.split(':').map(Number);
        initialTimers[order.id] = minutes * 60 + seconds;
      } else {
        initialTimers[order.id] = 0;
      }
    });
    
    setTimers(initialTimers);
    
    // Set up interval to decrease timers
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        
        orders.forEach(order => {
          if (order.status !== 'Ready' && newTimers[order.id] > 0) {
            newTimers[order.id] -= 1;
          }
        });
        
        return newTimers;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [orders]);
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Update item status
  const updateItemStatus = (orderId: number, itemId: number, newStatus: string) => {
    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedItems = order.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          });
          
          // Check if all items are ready
          const allReady = updatedItems.every(item => item.status === 'ready');
          
          return { 
            ...order, 
            items: updatedItems,
            status: allReady ? 'Ready' : (updatedItems.some(item => item.status === 'in-progress') ? 'In Progress' : 'New'),
            time: allReady ? '0:00' : order.time
          };
        }
        return order;
      });
    });
  };
  
  // Mark order as served
  const markAsServed = (orderId: number) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };
  
  // Filter orders based on active filter
  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return order.status === 'New';
    if (activeFilter === 'in-progress') return order.status === 'In Progress';
    if (activeFilter === 'ready') return order.status === 'Ready';
    return true;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    // First by status priority: New > In Progress > Ready
    const statusPriority = { 'New': 0, 'In Progress': 1, 'Ready': 2 };
    const statusDiff = statusPriority[a.status as keyof typeof statusPriority] - statusPriority[b.status as keyof typeof statusPriority];
    
    if (statusDiff !== 0) return statusDiff;
    
    // Then by time (oldest or newest first)
    if (sortOrder === 'oldest') {
      return a.id - b.id; // Using ID as a proxy for creation time
    } else {
      return b.id - a.id;
    }
  });
  
  // Get background color for order card based on status
  const getOrderBackground = (status: string, timeLeft: number) => {
    if (status === 'Ready') return 'bg-green-50 border-green-200';
    if (status === 'New') return 'bg-blue-50 border-blue-200';
    // For In Progress, color based on time
    if (timeLeft < 60) return 'bg-red-50 border-red-200'; // Less than 1 minute
    if (timeLeft < 180) return 'bg-yellow-50 border-yellow-200'; // Less than 3 minutes
    return 'bg-white border-gray-200';
  };

  // Get text color for timer based on time left
  const getTimerColor = (timeLeft: number) => {
    if (timeLeft === 0) return 'text-green-600';
    if (timeLeft < 60) return 'text-red-600';
    if (timeLeft < 180) return 'text-yellow-600';
    return 'text-gray-900';
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
        <div className="flex items-center space-x-4">
          <div>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Orders</option>
              <option value="new">New Orders</option>
              <option value="in-progress">In Progress</option>
              <option value="ready">Ready for Service</option>
            </select>
          </div>
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="oldest">Oldest First</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <Card 
            key={order.id} 
            className={`overflow-hidden border-l-4 ${getOrderBackground(order.status, timers[order.id])}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">{order.table}</CardTitle>
                <div 
                  className={`text-lg font-mono font-semibold ${getTimerColor(timers[order.id])}`}
                >
                  {formatTime(timers[order.id])}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Order #{order.id}</span>
                <span>{order.createdAt}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{item.quantity}x</span>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        {item.notes && (
                          <p className="text-xs text-gray-500">Note: {item.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => updateItemStatus(order.id, item.id, 'in-progress')}
                        >
                          Start
                        </Button>
                      )}
                      {item.status === 'in-progress' && (
                        <Button
                          size="sm"
                          className="text-xs bg-green-600 hover:bg-green-700"
                          onClick={() => updateItemStatus(order.id, item.id, 'ready')}
                        >
                          Ready
                        </Button>
                      )}
                      {item.status === 'ready' && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Ready
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 pt-0">
              <div className="w-full flex justify-between items-center">
                <span 
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    order.status === 'New' 
                      ? 'bg-blue-100 text-blue-800' 
                      : order.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
                <div className="flex space-x-2">
                  {order.status === 'Ready' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={() => markAsServed(order.id)}
                    >
                      Mark as Served
                    </Button>
                  )}
                  <Button
                    variant={order.status === 'Ready' ? 'primary' : 'outline'}
                    size="sm"
                    className="text-sm"
                    onClick={() => {/* Print order ticket */}}
                  >
                    Print Ticket
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}