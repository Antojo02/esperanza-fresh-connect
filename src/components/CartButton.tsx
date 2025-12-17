import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useEffect, useState, useRef } from 'react';

export const CartButton = () => {
  const { itemCount, setIsOpen } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCountRef = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCountRef.current) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = itemCount;
  }, [itemCount]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative transition-transform ${isAnimating ? 'animate-cart-bounce' : ''}`}
      onClick={() => setIsOpen(true)}
    >
      <ShoppingCart className={`w-5 h-5 transition-transform ${isAnimating ? 'scale-110' : ''}`} />
      {itemCount > 0 && (
        <span className={`absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium transition-transform ${isAnimating ? 'animate-ping-once' : ''}`}>
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  );
};
