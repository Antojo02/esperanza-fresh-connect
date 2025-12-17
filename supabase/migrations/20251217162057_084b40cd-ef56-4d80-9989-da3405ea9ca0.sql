-- Create coupons table
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL,
  min_order_amount NUMERIC DEFAULT 0,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Everyone can view active coupons (to validate them)
CREATE POLICY "Coupons are viewable by everyone" 
ON public.coupons 
FOR SELECT 
USING (is_active = true);

-- Add coupon_code to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS coupon_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount_amount NUMERIC DEFAULT 0;

-- Insert some sample coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_amount, max_uses, valid_until) VALUES
('BIENVENIDO10', 'percentage', 10, 20, 100, '2025-12-31'),
('AHORRA5', 'fixed', 5, 30, 50, '2025-12-31'),
('SUPERDESCUENTO', 'percentage', 15, 50, 30, '2025-06-30');