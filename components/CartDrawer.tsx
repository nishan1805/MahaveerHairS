'use client';

import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onBrowseProducts: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBrowseProducts,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E1E7EB]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#01B1EE]" />
            <h2 id="cart-drawer-title" className="text-token-18 font-bold text-[#111315]">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#47515A] hover:text-[#111315] rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF8FE] flex items-center justify-center text-[#01B1EE]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-token-18 font-semibold text-[#111315]">
                  Your shopping bag is empty
                </p>
                <p className="text-token-14 text-[#697780] max-w-xs">
                  Explore our hair patches, custom wigs, and volumizing extensions to get started.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBrowseProducts();
                }}
                className="py-2.5 px-6 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-14 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Hair Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#E1E7EB] bg-[#F7FAFC] flex gap-4 items-start"
                >
                  <div className="w-16 h-16 rounded-lg bg-white border border-[#E1E7EB] flex items-center justify-center shrink-0 text-[#01B1EE]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-token-12 text-[#697780] uppercase tracking-wider">
                      {item.category}
                    </p>
                    <h3 className="text-token-16 font-semibold text-[#111315] truncate">
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p className="text-token-12 text-[#47515A]">Variant: {item.variant}</p>
                    )}
                    <p className="text-token-16 font-bold text-[#111315] mt-1 tabular-nums">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E1E7EB]">
                      <div className="flex items-center border border-[#E1E7EB] rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-100 text-[#47515A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-token-14 font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-100 text-[#47515A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#697780] hover:text-[#B42318] p-1 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E1E7EB] bg-[#F7FAFC] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-token-14 text-[#47515A]">Subtotal</span>
              <span className="text-token-20 font-bold text-[#111315] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-token-12 text-[#697780]">
              Taxes calculated at checkout. Free custom consultation included with all hair systems.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Thank you for trying the Mahaveer Hair Solution storefront prototype! Online order processing and checkout will be integrated in the full deployment.');
                }}
                className="w-full py-3 px-4 bg-[#01B1EE] hover:bg-[#00A2D9] text-[#111315] font-semibold text-token-16 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-token-14 font-medium text-[#006F96] hover:underline text-center"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
