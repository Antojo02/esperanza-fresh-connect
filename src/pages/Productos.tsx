import { useState, useEffect } from 'react';
import { Apple, Beef, Milk, Package, Wheat, Wine, IceCream, Sandwich, Sparkles, Check, Plus, Search, Filter, Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  unit: string;
  is_featured: boolean;
  is_fresh: boolean;
}

const categoryIcons: Record<string, any> = {
  "Frutas y Verduras": Apple,
  "Carnicería": Beef,
  "Lácteos": Milk,
  "Panadería": Wheat,
  "Despensa": Package,
  "Bebidas": Wine,
  "Congelados": IceCream,
  "Embutidos y Quesos": Sandwich,
};

const categories = [
  "Todos",
  "Frutas y Verduras",
  "Carnicería",
  "Embutidos y Quesos",
  "Lácteos",
  "Panadería",
  "Productos Básicos",
  "Bebidas",
];

const Productos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      toast.error('Error al cargar los productos');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      unit: product.unit,
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  const commitments = [
    {
      number: "1",
      title: "Frescura Diaria",
      description: "Recibimos productos frescos cada mañana para garantizar la máxima calidad.",
    },
    {
      number: "2",
      title: "Precios Justos",
      description: "Competimos con las grandes cadenas ofreciendo mejores precios sin perder calidad.",
    },
    {
      number: "3",
      title: "Origen Conocido",
      description: "Trabajamos con proveedores locales y de confianza para traerte lo mejor.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-organic relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-leaf-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] bg-harvest-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-leaf-100 text-leaf-500 px-4 py-2.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Tienda Online
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Compra <span className="text-gradient">Fresco</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Haz tu pedido online y recíbelo en casa o recógelo en tienda.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-4 md:py-6 bg-card border-b border-border sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Category Filters */}
            <div className="overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl md:rounded-2xl p-3 md:p-4 animate-pulse">
                  <div className="w-full aspect-square bg-muted rounded-lg md:rounded-xl mb-3 md:mb-4" />
                  <div className="h-3 md:h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-2 md:h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <Filter className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-2">
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Prueba con otra categoría o término de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product, index) => (
                <AnimatedSection key={product.id} animation="fade-up" delay={index * 30}>
                  <div className="group bg-card rounded-xl md:rounded-2xl shadow-organic hover:shadow-organic-lg transition-all duration-300 overflow-hidden border border-border hover:border-leaf-200">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.is_fresh && (
                        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-leaf-500 text-primary-foreground px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1">
                          <Leaf className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          Fresco
                        </div>
                      )}
                      {product.is_featured && (
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-harvest-400 text-primary-foreground px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium">
                          Destacado
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3 md:p-4">
                      <div className="mb-1 md:mb-2">
                        <span className="text-[10px] md:text-xs text-muted-foreground">{product.category}</span>
                        <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[1.5rem]">{product.name}</h3>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-base md:text-xl font-bold text-primary">{product.price.toFixed(2)}€</span>
                          <span className="text-[10px] md:text-sm text-muted-foreground">/{product.unit}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="group/btn h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4 md:mr-1 group-hover/btn:rotate-90 transition-transform" />
                          <span className="hidden md:inline">Añadir</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commitment */}
      <section className="py-24 bg-earth-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-leaf-500 font-medium text-sm uppercase tracking-wider mb-4">
                Nuestra promesa
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Nuestro <span className="text-gradient">Compromiso</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {commitments.map((item, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
                  <div className="text-center group">
                    <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-organic-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary-foreground text-3xl font-serif font-bold">{item.number}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-leaf-500 rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-leaf-500 rounded-full opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-8">
              Calidad que se nota en cada producto
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Productos locales", "Selección diaria", "Precios competitivos", "Atención personalizada"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-primary-foreground/10 px-5 py-3 rounded-full border border-primary-foreground/20">
                  <Check className="w-5 h-5 text-harvest-300" />
                  <span className="text-primary-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Productos;
