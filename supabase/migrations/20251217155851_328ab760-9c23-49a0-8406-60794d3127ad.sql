-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  unit TEXT DEFAULT 'unidad',
  stock INTEGER DEFAULT 100,
  is_featured BOOLEAN DEFAULT false,
  is_fresh BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_time TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  product_name TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products are public read
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can insert order items for their orders" ON public.order_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image_url, unit, is_featured, is_fresh) VALUES
-- Frutas y Verduras
('Manzanas Rojas', 'Manzanas rojas frescas de temporada', 2.50, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', 'kg', true, true),
('Plátanos de Canarias', 'Plátanos maduros de las Islas Canarias', 1.99, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', 'kg', true, true),
('Naranjas de Valencia', 'Naranjas dulces para zumo', 1.80, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', 'kg', false, true),
('Tomates Rama', 'Tomates maduros en rama', 2.99, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1546470427-227c7eb14f36?w=400', 'kg', true, true),
('Lechuga Iceberg', 'Lechuga fresca y crujiente', 1.20, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400', 'unidad', false, true),
('Patatas', 'Patatas para todo uso', 1.50, 'Frutas y Verduras', 'https://images.unsplash.com/photo-1518977676601-b53f82ber9eb?w=400', 'kg', false, false),
-- Carnicería
('Pechuga de Pollo', 'Pechuga de pollo fresca', 7.99, 'Carnicería', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', 'kg', true, true),
('Carne Picada Mixta', 'Mezcla de cerdo y ternera', 8.50, 'Carnicería', 'https://images.unsplash.com/photo-1602473812169-a8e8e6e8b6e3?w=400', 'kg', false, true),
('Chuletas de Cerdo', 'Chuletas frescas de cerdo ibérico', 9.99, 'Carnicería', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400', 'kg', true, true),
('Filetes de Ternera', 'Ternera de primera calidad', 14.99, 'Carnicería', 'https://images.unsplash.com/photo-1588347818036-558601350947?w=400', 'kg', true, true),
-- Lácteos
('Leche Entera', 'Leche fresca entera 1L', 1.15, 'Lácteos', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', 'litro', false, true),
('Yogur Natural', 'Pack de 4 yogures naturales', 1.99, 'Lácteos', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', 'pack', false, false),
('Queso Manchego', 'Queso manchego curado', 12.99, 'Lácteos', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', 'kg', true, false),
('Huevos Camperos', 'Docena de huevos camperos', 3.50, 'Lácteos', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', 'docena', true, true),
-- Panadería
('Pan de Pueblo', 'Pan artesanal recién horneado', 1.80, 'Panadería', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'unidad', true, true),
('Barra de Pan', 'Barra tradicional crujiente', 0.90, 'Panadería', 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400', 'unidad', false, true),
('Croissants', 'Croissants de mantequilla (4 uds)', 2.99, 'Panadería', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 'pack', false, false),
-- Despensa
('Aceite de Oliva Virgen Extra', 'AOVE primera presión 1L', 8.99, 'Despensa', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', 'litro', true, false),
('Arroz Bomba', 'Arroz especial para paella', 3.50, 'Despensa', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 'kg', false, false),
('Pasta Integral', 'Espaguetis integrales 500g', 1.85, 'Despensa', 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400', 'paquete', false, false),
-- Bebidas
('Agua Mineral', 'Pack 6 botellas 1.5L', 2.50, 'Bebidas', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', 'pack', false, false),
('Zumo de Naranja', 'Zumo natural 1L', 2.99, 'Bebidas', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', 'litro', false, true),
('Vino Tinto Rioja', 'Crianza D.O. Rioja', 7.99, 'Bebidas', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', 'botella', true, false),
-- Embutidos y Quesos
('Jamón Serrano', 'Jamón serrano curado', 15.99, 'Embutidos y Quesos', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400', 'kg', true, false),
('Chorizo Ibérico', 'Chorizo de bellota', 18.50, 'Embutidos y Quesos', 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400', 'kg', true, false),
('Queso Brie', 'Queso brie francés cremoso', 9.99, 'Embutidos y Quesos', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400', 'unidad', false, false);