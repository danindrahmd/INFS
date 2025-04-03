'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Button from '@/components/ui/button';

// Mock data for a restaurant
const mockRestaurant = {
  id: '123',
  name: 'La Bella Trattoria',
  logo: '/images/logo-placeholder.png',
};

// Mock data for menu categories
const mockCategories = [
  { id: 1, name: 'Appetizers' },
  { id: 2, name: 'Main Courses' },
  { id: 3, name: 'Desserts' },
  { id: 4, name: 'Beverages' },
];

// Mock data for menu items
const mockMenuItems = [
  { 
    id: 1, 
    name: 'Garlic Bread', 
    description: 'Freshly baked bread with garlic butter and herbs',
    category: 1, 
    price: 5.99, 
    image: '/images/item-placeholder.jpg'
  },
  { 
    id: 2, 
    name: 'Caesar Salad', 
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan',
    category: 1, 
    price: 8.99, 
    image: '/images/item-placeholder.jpg'
  },
  { 
    id: 3, 
    name: 'Margherita Pizza', 
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    category: 2, 
    price: 14.99, 
    image: '/images/item-placeholder.jpg'
  },
  { 
    id: 4, 
    name: 'Spaghetti Carbonara', 
    description: 'Spaghetti with pancetta, egg, black pepper, and cheese',
    category: 2, 
    price: 16.99, 
    image: '/images/item-placeholder.jpg'
  },
  { 
    id: 5, 
    name: 'Tiramisu', 
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
    category: 3, 
    price: 7.99, 
    image: '/images/item-placeholder.jpg'
  },
  { 
    id: 6, 
    name: 'Cheesecake', 
    description: 'Rich and creamy New York style cheesecake with a graham cracker crust',
    category: 3, 
    price: 7.99, 
    image: '/images/item-placeholder.jpg'
  },
];

export default function CustomerOrderingPage({ params }: { params: { restaurantId: string; tableId: string } }) {
  const [activeCategory, setActiveCategory] = useState<number>(mockCategories[0].id);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const filteredItems = mockMenuItems.filter(item => item.category === activeCategory);
  
  const addToCart = (item: any) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Item already in cart, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (itemId: number) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      
      if (updatedCart[existingItemIndex].quantity > 1) {
        // Decrease quantity
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        // Remove item from cart
        updatedCart.splice(existingItemIndex, 1);
      }
      
      setCart(updatedCart);
    }
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  
  const placeOrder = () => {
    // In a real app, this would send the order to the server
    console.log('Placing order:', cart);
    setOrderPlaced(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{mockRestaurant.name}</h1>
              <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Table {params.tableId}
              </span>
            </div>
            <Button
              variant="outline"
              className="relative"
              onClick={() => setShowCart(true)}
            >
              <span>View Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <div className="h-48 w-full bg-gray-200"></div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  <Button onClick={() => addToCart(item)}>Add to Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center justify-center rounded-full h-6 w-6 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="inline-flex items-center justify-center rounded-full h-6 w-6 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {cart.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">${calculateTotal()}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowCart(false)}>
                Continue Browsing
              </Button>
              <Button 
                onClick={placeOrder} 
                disabled={cart.length === 0}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Your order has been sent to the kitchen. The staff will bring your food to your table soon.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => {
                setOrderPlaced(false);
                setShowCart(false);
                setCart([]);
              }}>
                Back to Menu
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}