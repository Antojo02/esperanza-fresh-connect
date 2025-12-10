import { Apple, Beef, Milk, Package, Wheat, Sandwich } from "lucide-react";

const Products = () => {
  const categories = [
    {
      icon: Apple,
      title: "Frutas y Verduras",
      description: "Productos frescos seleccionados diariamente",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
    },
    {
      icon: Beef,
      title: "Carnicería",
      description: "Carnes de calidad superior",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop",
    },
    {
      icon: Milk,
      title: "Lácteos",
      description: "Leche, quesos y yogures",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop",
    },
    {
      icon: Wheat,
      title: "Panadería",
      description: "Pan recién horneado cada día",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    },
    {
      icon: Package,
      title: "Productos Básicos",
      description: "Todo para tu despensa",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
    },
    {
      icon: Sandwich,
      title: "Embutidos y Quesos",
      description: "Ibéricos, quesos y fiambres de calidad",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section id="productos" className="py-20 md:py-28 bg-esperanza-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nuestros Productos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Variedad y <span className="text-primary">Calidad</span> en Cada Sección
          </h2>
          <p className="text-lg text-muted-foreground">
            Descubre todo lo que tenemos para ti y tu familia
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-esperanza-green-light rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    {category.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
