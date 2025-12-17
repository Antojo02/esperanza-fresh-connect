-- Enable realtime for orders table to support notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;