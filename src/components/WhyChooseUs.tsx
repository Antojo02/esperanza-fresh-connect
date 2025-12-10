import { Wallet, Leaf, Heart, ShoppingCart } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Wallet,
      title: "Precios Competitivos",
      description: "Ofrecemos precios más bajos que las grandes cadenas sin comprometer la calidad. Tu presupuesto familiar rinde más con nosotros.",
    },
    {
      icon: Leaf,
      title: "Productos Frescos",
      description: "Frutas, verduras y carnes de la mejor calidad. Seleccionamos cuidadosamente cada producto para garantizar frescura diaria.",
    },
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Nuestro personal amable te conoce por tu nombre y está siempre dispuesto a ayudarte. Experiencia de compra cercana y familiar.",
    },
    {
      icon: ShoppingCart,
      title: "Todo en un Lugar",
      description: "Amplia variedad de productos para tu compra semanal. Desde alimentos básicos hasta productos especializados.",
    },
  ];

  return (
    <section id="sobre-nosotros" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            ¿Por Qué Elegir{" "}
            <span className="text-primary">Supermercado Esperanza?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Más que un supermercado, somos parte de tu comunidad
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-esperanza-green-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <reason.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
