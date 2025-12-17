import { Apple, Beef, Milk, Package, Wheat, Wine, IceCream, Sandwich, Sparkles, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";

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
      <section className="pt-32 pb-20 bg-organic relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-leaf-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] bg-harvest-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-leaf-100 text-leaf-500 px-4 py-2.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Nuestros Productos
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Variedad y <span className="text-gradient">Calidad</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Descubre todo lo que tenemos para ti y tu familia. Productos frescos cada día.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-card relative">
        <div className="absolute inset-0 bg-leaf-gradient opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 75}>
                <div className="group bg-background rounded-3xl shadow-organic hover:shadow-organic-lg transition-all duration-500 overflow-hidden border border-border hover:border-leaf-200 hover:-translate-y-2 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-organic-lg border border-border">
                        <category.icon className="w-6 h-6 text-leaf-500" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="bg-leaf-50 text-leaf-500 text-xs px-3 py-1.5 rounded-full font-medium border border-leaf-100"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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