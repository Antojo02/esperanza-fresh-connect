import { useEffect, useState } from "react";
import { Sparkles, Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  unit: string | null;
  is_featured: boolean | null;
  category: string;
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(8);

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      unit: product.unit || "unidad",
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-harvest-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-leaf-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-harvest-100 text-harvest-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            Ofertas del Día
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Productos <span className="text-gradient">Destacados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los favoritos de nuestros clientes con los mejores precios
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} animation="fade-up" delay={index * 50}>
              <div className="group bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-1 border border-border">
                <div className="relative aspect-square overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-harvest-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Oferta
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-xl text-foreground">
                        {product.price.toFixed(2)}€
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        /{product.unit || "ud"}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="hero"
                      className="rounded-full w-10 h-10"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
