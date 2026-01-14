import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-leaf-50 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Large 404 */}
            <div className="relative">
              <div className="text-9xl md:text-[150px] font-bold text-leaf-100 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingCart className="w-32 h-32 md:w-48 md:h-48 text-leaf-500 opacity-30" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                ¡Oops! Página no encontrada
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
                Parece que buscabas algo que no existe en <span className="font-semibold text-leaf-500">Supermercado Esperanza</span>. 
                No te preocupes, vuelve al inicio y continúa comprando.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                variant="hero"
                size="lg"
                asChild
                className="gap-2"
              >
                <Link to="/">
                  <Home className="w-5 h-5" />
                  Volver al Inicio
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="gap-2"
              >
                <Link to="/productos">
                  <ShoppingCart className="w-5 h-5" />
                  Ver Productos
                </Link>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="pt-12 space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda? 
                <a 
                  href="tel:968641021"
                  className="ml-2 text-leaf-500 font-semibold hover:underline"
                >
                  Llámanos al 968 64 10 21
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
