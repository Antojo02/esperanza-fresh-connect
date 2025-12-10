import { Apple, Beef, Milk, Package, Wheat, Wine, IceCream, Sandwich } from "lucide-react";
import Layout from "@/components/Layout";

const Productos = () => {
  const categories = [
    {
      icon: Apple,
      title: "Frutas y Verduras",
      description: "Productos frescos seleccionados diariamente de los mejores proveedores locales",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=350&fit=crop",
      highlights: ["Producto local", "Selección diaria", "Temporada"],
    },
    {
      icon: Beef,
      title: "Carnicería",
      description: "Carnes de calidad superior con cortes personalizados según tus necesidades",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=350&fit=crop",
      highlights: ["Calidad premium", "Cortes a medida", "Frescura diaria"],
    },
    {
      icon: Sandwich,
      title: "Embutidos y Quesos",
      description: "Selección de embutidos ibéricos, quesos curados y fiambres de calidad",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&h=350&fit=crop",
      highlights: ["Ibéricos", "Quesos curados", "Fiambres"],
    },
    {
      icon: Milk,
      title: "Lácteos y Huevos",
      description: "Leche, quesos, yogures y huevos de la mejor procedencia",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&h=350&fit=crop",
      highlights: ["Frescos", "Variedad", "Origen local"],
    },
    {
      icon: Wheat,
      title: "Panadería",
      description: "Pan recién horneado cada día con recetas tradicionales",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=350&fit=crop",
      highlights: ["Recién hecho", "Tradicional", "Variedad"],
    },
    {
      icon: Package,
      title: "Despensa",
      description: "Productos básicos, conservas y todo lo esencial para tu hogar",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&h=350&fit=crop",
      highlights: ["Esenciales", "Marcas", "Buenos precios"],
    },
    {
      icon: Wine,
      title: "Bebidas",
      description: "Refrescos, zumos, vinos y bebidas para toda la familia",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=350&fit=crop",
      highlights: ["Gran variedad", "Vinos locales", "Refrescos"],
    },
    {
      icon: IceCream,
      title: "Congelados",
      description: "Helados, verduras congeladas y productos preparados de calidad",
      image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=350&fit=crop",
      highlights: ["Calidad", "Preparados", "Helados"],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Nuestros Productos
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Variedad y <span className="text-primary">Calidad</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubre todo lo que tenemos para ti y tu familia
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-lg">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="bg-esperanza-green-light text-primary text-xs px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-esperanza-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nuestro <span className="text-primary">Compromiso</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">1</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Frescura Diaria</h3>
                <p className="text-muted-foreground text-sm">
                  Recibimos productos frescos cada mañana para garantizar la máxima calidad.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">2</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Precios Justos</h3>
                <p className="text-muted-foreground text-sm">
                  Competimos con las grandes cadenas ofreciendo mejores precios sin perder calidad.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">3</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Origen Conocido</h3>
                <p className="text-muted-foreground text-sm">
                  Trabajamos con proveedores locales y de confianza para traerte lo mejor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Productos;
