import { useState, useEffect } from 'react';
import { cart } from 'cart';

export function useCardCount() {
    const [count, setCount] = useState(cart.cartItems.length);

    useEffect(() => {
        cart.subscribe(({ cartItems }) => setCount(cartItems.length));
    }, []);

    return count;
}

