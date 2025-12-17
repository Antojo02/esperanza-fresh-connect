import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CouponInput } from '@/components/CouponInput';

const timeSlots = [
  '09:00 - 11:00',
  '11:00 - 13:00',
  '13:00 - 15:00',
  '17:00 - 19:00',
  '19:00 - 21:00',
];

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  min_order_amount: number;
}

export const CartDrawer = () => {
  const { items, updateQuantity, removeItem, total, isOpen, setIsOpen, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState(0);

  const finalTotal = Math.max(0, total - discount);

  const handleCouponApplied = (coupon: Coupon | null, discountAmount: number) => {
    setAppliedCoupon(coupon);
    setDiscount(discountAmount);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para realizar un pedido');
      navigate('/auth');
      setIsOpen(false);
      return;
    }

    if (!deliveryDate || !deliveryTime || !address || !phone) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: items.map(item => ({
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          delivery_date: format(deliveryDate, 'yyyy-MM-dd'),
          delivery_time: deliveryTime,
          delivery_address: address,
          phone,
          notes,
          total: finalTotal,
          coupon_code: appliedCoupon?.code || null,
          discount_amount: discount,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        clearCart();
        setStep('cart');
        setIsOpen(false);
        toast.success('Redirigiendo al pago...');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  const resetCheckout = () => {
    setStep('cart');
    setDeliveryDate(undefined);
    setDeliveryTime('');
    setAddress('');
    setPhone('');
    setNotes('');
    setAppliedCoupon(null);
    setDiscount(0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetCheckout(); }}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-serif">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {step === 'cart' ? 'Tu Cesta' : 'Finalizar Pedido'}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
            <p>Tu cesta está vacía</p>
          </div>
        ) : step === 'cart' ? (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-muted/50 rounded-xl">
                  <img
                    src={item.image_url || '/placeholder.svg'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€/{item.unit}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">
              {/* Coupon Input */}
              <CouponInput
                orderTotal={total}
                onCouponApplied={handleCouponApplied}
                appliedCoupon={appliedCoupon}
              />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-leaf-600">
                    <span>Descuento ({appliedCoupon?.code})</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{finalTotal.toFixed(2)}€</span>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setStep('checkout')}>
                Continuar con el pedido
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Delivery Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Fecha de entrega *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn('w-full justify-start text-left font-normal', !deliveryDate && 'text-muted-foreground')}
                    >
                      {deliveryDate ? format(deliveryDate, 'PPP', { locale: es }) : 'Selecciona una fecha'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      disabled={(date) => date < addDays(new Date(), 1) || date.getDay() === 0}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Delivery Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Hora de entrega *
                </Label>
                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un horario" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Dirección de entrega *
                </Label>
                <Textarea
                  placeholder="Calle, número, piso, código postal..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Teléfono de contacto *
                </Label>
                <Input
                  type="tel"
                  placeholder="600 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notas adicionales (opcional)</Label>
                <Textarea
                  placeholder="Instrucciones especiales, código del portal..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <h4 className="font-medium">Resumen del pedido</h4>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-leaf-600 pt-2 border-t">
                    <span>Descuento ({appliedCoupon?.code})</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total a pagar</span>
                <span className="text-primary">{finalTotal.toFixed(2)}€</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep('cart')}>
                  Volver
                </Button>
                <Button className="flex-1" onClick={handleCheckout} disabled={loading}>
                  {loading ? 'Procesando...' : 'Pagar ahora'}
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
