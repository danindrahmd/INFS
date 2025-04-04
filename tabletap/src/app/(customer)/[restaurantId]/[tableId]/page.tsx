'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import ButtonTwo from '@/components/ui/button-two';
import Image from 'next/image';

const mockRestaurant = {
  id: '123',
  name: 'Golden Dragon',
  logo: '/images/logo/table-tap-high-resolution-logo-transparent.png',
};

const mockCategories = [
  { id: 1, name: 'Dim Sum' },
  { id: 2, name: 'Main Dishes' },
  { id: 3, name: 'Desserts' },
  { id: 4, name: 'Drinks' },
];

const mockMenuItems = [
  { id: 1, name: 'Shrimp Dumplings', description: 'Steamed dumplings filled with fresh shrimp and bamboo shoots.', category: 1, price: 6.99, image: '/images/item-placeholder.jpg' },
  { id: 2, name: 'Pork Siu Mai', description: 'Open-faced dumplings stuffed with minced pork and shrimp.', category: 1, price: 5.99, image: '/images/item-placeholder.jpg' },
  { id: 3, name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts, vegetables, and chili peppers.', category: 2, price: 13.99, image: '/images/item-placeholder.jpg' },
  { id: 4, name: 'Sweet and Sour Pork', description: 'Crispy pork in tangy sweet and sour sauce with bell peppers and pineapple.', category: 2, price: 12.99, image: '/images/item-placeholder.jpg' },
  { id: 5, name: 'Mango Pudding', description: 'Chilled mango dessert with a creamy texture and fruity flavor.', category: 3, price: 4.99, image: '/images/item-placeholder.jpg' },
  { id: 6, name: 'Sesame Balls', description: 'Fried rice balls filled with red bean paste and coated in sesame seeds.', category: 3, price: 5.49, image: '/images/item-placeholder.jpg' },
  { id: 7, name: 'Jasmine Tea', description: 'Fragrant hot tea brewed from jasmine flowers.', category: 4, price: 2.99, image: '/images/item-placeholder.jpg' },
  { id: 8, name: 'Iced Lemon Tea', description: 'Refreshing iced tea with lemon and a hint of sweetness.', category: 4, price: 3.49, image: '/images/item-placeholder.jpg' },
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
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const updatedCart = cart.map(item =>
      item.id === itemId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const placeOrder = () => {
    console.log('Placing order:', cart);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={mockRestaurant.logo} alt="Logo" width={40} height={40} />
              <h1 className="text-xl font-bold text-gray-900">{mockRestaurant.name}</h1>
              <span className="ml-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Table {params.tableId}
              </span>
            </div>
            <ButtonTwo variant="outline" onClick={() => setShowCart(true)}>
              View Cart
              {cart.length > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </ButtonTwo>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {mockCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
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
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  <ButtonTwo onClick={() => addToCart(item)}>Add to Order</ButtonTwo>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <div key={item.id} className="py-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-white">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => removeFromCart(item.id)} className="h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">−</button>
                        <span className="mx-2 text-sm">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-white">Total</span>
                    <span className="text-base font-medium text-white">${calculateTotal()}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <ButtonTwo variant="outline" onClick={() => setShowCart(false)}>Continue Browsing</ButtonTwo>
              <ButtonTwo onClick={placeOrder} disabled={cart.length === 0}>Place Order</ButtonTwo>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-white">
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
              <ButtonTwo onClick={() => {
                setOrderPlaced(false);
                setShowCart(false);
                setCart([]);
              }}>
                Back to Menu
              </ButtonTwo>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
