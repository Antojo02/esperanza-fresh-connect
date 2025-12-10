import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "María García",
      rating: 5,
      text: "Magnífico supermercado, tiene todo lo necesario y precios más bajos que las grandes cadenas. Siempre encuentro lo que busco.",
      date: "Hace 2 semanas",
    },
    {
      name: "Antonio López",
      rating: 5,
      text: "El mejor supermercado que conozco, precios perfectos y calidad perfecta. Llevo años comprando aquí y nunca me ha defraudado.",
      date: "Hace 1 mes",
    },
    {
      name: "Carmen Martínez",
      rating: 5,
      text: "Calidad superior en carnes. Personal agradable y precios competitivos. La atención es excepcional y siempre muy amables.",
      date: "Hace 3 semanas",
    },
    {
      name: "José Rodríguez",
      rating: 5,
      text: "Supermercado de toda la vida. Productos frescos cada día y un trato cercano que ya no se encuentra en ningún sitio.",
      date: "Hace 1 semana",
    },
    {
      name: "Laura Sánchez",
      rating: 5,
      text: "Frutas y verduras siempre frescas. Me encanta que cuiden tanto la calidad. ¡Muy recomendable para toda la familia!",
      date: "Hace 2 meses",
    },
    {
      name: "Miguel Fernández",
      rating: 5,
      text: "40 años de experiencia se notan. Confío plenamente en la calidad de sus productos. Mis hijos ya compran aquí también.",
      date: "Hace 1 mes",
    },
  ];

  return (
    <section id="resenas" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-esperanza-orange-light text-esperanza-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
            Lo Que Dicen Nuestros Clientes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Opiniones <span className="text-primary">Reales</span> de Nuestros Vecinos
          </h2>
          <p className="text-lg text-muted-foreground">
            Miles de familias confían en nosotros cada semana
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-esperanza-orange text-esperanza-orange" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-6 leading-relaxed relative z-10">
                "{review.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-esperanza-green-light rounded-full flex items-center justify-center">
                  <span className="font-heading font-semibold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "4.9", label: "Valoración Media" },
            { value: "+500", label: "Reseñas Positivas" },
            { value: "40+", label: "Años de Experiencia" },
            { value: "1000+", label: "Clientes Semanales" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-background rounded-2xl shadow-card">
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
