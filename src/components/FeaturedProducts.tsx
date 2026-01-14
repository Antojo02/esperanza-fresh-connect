import { useEffect, useState } from "react";
import { Plus, Flame } from "lucide-react";
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

const categoryFallbacks: Record<string, string> = {
  "Frutas y Verduras": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800",
  "Carnicería": "https://images.unsplash.com/photo-1604908177225-9f5af45f4f54?w=800",
  "Lácteos": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
  "Panadería": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  "Despensa": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "Productos Básicos": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "Bebidas": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800",
  "Embutidos y Quesos": "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800",
};

const productFallbacks: { match: RegExp; url: string }[] = [
  // Bebidas específicas
  { match: /coca-cola|coca cola/i, url: "https://images.unsplash.com/photo-1554866585-acbb2231f86c?w=800" },
  { match: /cerveza/i, url: "https://images.unsplash.com/photo-1608270861620-7911c6b76f66?w=800" },
  { match: /casera|gaseosa/i, url: "https://images.unsplash.com/photo-1599599810694-f3f7d2c5d4b1?w=800" },
  { match: /zumo|jugo/i, url: "https://images.unsplash.com/photo-1600271886742-f049cd1f9d70?w=800" },
  { match: /agua/i, url: "https://images.unsplash.com/photo-1526402462921-9e9dd1b4e47b?w=800" },
  { match: /vino|rioja/i, url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800" },
  
  // Frutas específicas
  { match: /manzana.*roja|roja.*manzana/i, url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800" },
  { match: /naranja|valencia/i, url: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800" },
  { match: /plátano|platano|canarias/i, url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800" },
  { match: /fresa|fresas/i, url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800" },
  { match: /uva/i, url: "https://images.unsplash.com/photo-1537640538855-dbf07daf2e4e?w=800" },
  
  // Verduras específicas
  { match: /tomate.*rama|rama.*tomate|tomates rama/i, url: "https://images.unsplash.com/photo-1590080876878-e1df82cad96f?w=800" },
  { match: /tomate/i, url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800" },
  { match: /lechuga|ensalada/i, url: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800" },
  { match: /papa|patata/i, url: "https://images.unsplash.com/photo-1596386219268-b3a72fdf5d5b?w=800" },
  
  // Carnicería específica
  { match: /pechuga.*pollo|pollo.*pechuga/i, url: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800" },
  { match: /chuleta.*cerdo|cerdo.*chuleta|cerdo ibérico/i, url: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800" },
  { match: /filete.*ternera|ternera|bistec/i, url: "https://images.unsplash.com/photo-1588347818036-558601350947?w=800" },
  { match: /carne picada|picada/i, url: "https://images.unsplash.com/photo-1602473812169-a8e8e6e8b6e3?w=800" },
  
  // Embutidos y Carnes
  { match: /jamón serrano|jamón/i, url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800" },
  { match: /chorizo.*ibérico|ibérico/i, url: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=800" },
  
  // Lácteos específicos
  { match: /queso manchego curado/i, url: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400" },
  { match: /queso manchego/i, url: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800" },
  { match: /queso brie|brie/i, url: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400" },
  { match: /queso/i, url: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800" },
  { match: /huevo|huevos|campero/i, url: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800" },
  { match: /leche|yogur|lácteo/i, url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
  
  // Panadería
  { match: /pan.*pueblo|pueblo/i, url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" },
  { match: /croissant|medialuna/i, url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800" },
  
  // Despensa
  { match: /aceite.*oliva|oliva.*virgen/i, url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800" },
  { match: /arroz.*bomba|bomba/i, url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800" },
  { match: /pasta|espagueti/i, url: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800" },
];

const getFallbackImage = (product: Product) => {
  const specific = productFallbacks.find(({ match }) => match.test(product.name));
  if (specific) return specific.url;
  return categoryFallbacks[product.category] || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800";
};

const dedupeProducts = (items: Product[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

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
        setProducts(dedupeProducts(data));
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
                  <img
                    src={product.image_url || getFallbackImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackImage(product);
                    }}
                  />
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
