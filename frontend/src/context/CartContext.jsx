import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

// Fee constants for the bill summary
export const DELIVERY_FEE = 21;
export const PLATFORM_FEE = 5;
export const GST_RATE = 0.05; // 5% GST and restaurant charges

// Build a stable key so the same item with the same customizations stacks
// into one line, while different customizations are treated as separate lines.
const buildCartId = (itemId, customizations) =>
    `${itemId}__${[...customizations].sort().join(',')}`;

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = ({ id, name, image, basePrice, unitPrice, customizations = [], quantity = 1 }) => {
        const cartId = buildCartId(id, customizations);
        setItems((prev) => {
            const existing = prev.find((line) => line.cartId === cartId);
            if (existing) {
                return prev.map((line) =>
                    line.cartId === cartId
                        ? { ...line, quantity: line.quantity + quantity }
                        : line
                );
            }
            return [
                ...prev,
                { cartId, id, name, image, basePrice, unitPrice, customizations, quantity }
            ];
        });
    };

    const increment = (cartId) => {
        setItems((prev) =>
            prev.map((line) =>
                line.cartId === cartId ? { ...line, quantity: line.quantity + 1 } : line
            )
        );
    };

    const decrement = (cartId) => {
        setItems((prev) =>
            prev
                .map((line) =>
                    line.cartId === cartId ? { ...line, quantity: line.quantity - 1 } : line
                )
                // drop any line that hits zero
                .filter((line) => line.quantity > 0)
        );
    };

    const removeItem = (cartId) => {
        setItems((prev) => prev.filter((line) => line.cartId !== cartId));
    };

    const clearCart = () => setItems([]);

    const totals = useMemo(() => {
        const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
        const itemTotal = items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
        const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
        const platformFee = items.length > 0 ? PLATFORM_FEE : 0;
        const gst = Math.round(itemTotal * GST_RATE);
        const totalPay = itemTotal + deliveryFee + platformFee + gst;
        return { itemCount, itemTotal, deliveryFee, platformFee, gst, totalPay };
    }, [items]);

    const value = {
        items,
        addItem,
        increment,
        decrement,
        removeItem,
        clearCart,
        ...totals
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
