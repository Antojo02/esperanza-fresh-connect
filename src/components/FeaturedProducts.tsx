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
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl md:rounded-2xl h-48 md:h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-harvest-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-leaf-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-harvest-100 text-harvest-600 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
            <Flame className="w-3 h-3 md:w-4 md:h-4" />
            Ofertas del Día
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4">
            Productos <span className="text-gradient">Destacados</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Los favoritos de nuestros clientes con los mejores precios
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} animation="fade-up" delay={index * 50}>
              <div className="group bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-1 border border-border">
                <div className="relative aspect-square overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-harvest-400 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      Oferta
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mb-0.5 md:mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 md:mb-2 line-clamp-2 min-h-[2.5rem] md:min-h-[1.5rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-base md:text-xl text-foreground">
                        {product.price.toFixed(2)}€
                      </span>
                      <span className="text-[10px] md:text-xs text-muted-foreground ml-0.5 md:ml-1">
                        /{product.unit || "ud"}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="hero"
                      className="rounded-full w-8 h-8 md:w-10 md:h-10"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus className="w-4 h-4 md:w-5 md:h-5" />
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
