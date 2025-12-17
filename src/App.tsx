import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import Index from "./pages/Index";
import SobreNosotros from "./pages/SobreNosotros";
import Productos from "./pages/Productos";
import Resenas from "./pages/Resenas";
import ComoLlegar from "./pages/ComoLlegar";
import Contacto from "./pages/Contacto";
import Auth from "./pages/Auth";
import PagoExitoso from "./pages/PagoExitoso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/resenas" element={<Resenas />} />
              <Route path="/como-llegar" element={<ComoLlegar />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CartDrawer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
