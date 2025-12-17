import { Star, Quote, ThumbsUp } from "lucide-react";
import Layout from "@/components/Layout";

const Resenas = () => {
  const reviews = [
    {
      name: "SoloconlaJ :P",
      rating: 5,
      text: "Magnífico supermercado, cuenta con todo lo necesario para hacer la compra de la semana. Precios más bajos que las grandes cadenas de supermercados.",
      date: "Hace 9 meses",
      source: "Google",
    },
    {
      name: "juangamerELcrack3247",
      rating: 5,
      text: "El mejor supermercado que conozco, precios perfectos y calidad perfecta.",
      date: "Hace 4 meses",
      source: "Google",
    },
    {
      name: "Emilio Fernandez",
      rating: 5,
      text: "Calidad superior en carnes. Personal agradable y precios competitivos.",
      date: "Hace 9 meses",
      source: "Google",
    },
    {
      name: "Cristina Abenza Muller",
      rating: 5,
      text: "Es una tienda pequeña, tiene casi de todo, y el personal, además de ser agradable es bastante servicial. 😉",
      date: "Hace 2 años",
      source: "Google",
    },
    {
      name: "Teresa Sanchez Gomez",
      rating: 5,
      text: "Buena atención, mucha higiene, me gusta.",
      date: "Hace 2 años",
      source: "Google",
    },
    {
      name: "Jose Nay",
      rating: 5,
      text: "Excelente supermercado, muy recomendable para la compra del día a día.",
      date: "Hace 9 meses",
      source: "Google",
    },
    {
      name: "luna sangrienta",
      rating: 5,
      text: "Gran variedad de productos y muy buen trato al cliente.",
      date: "Hace un año",
      source: "Google",
    },
    {
      name: "Cintia Jiménez Mora",
      rating: 5,
      text: "Siempre encuentro todo lo que necesito. Muy satisfecha con el servicio.",
      date: "Hace 2 años",
      source: "Google",
    },
    {
      name: "Angela Jiménez",
      rating: 5,
      text: "Productos frescos y de calidad. Un supermercado de toda la vida.",
      date: "Hace 2 años",
      source: "Google",
    },
    {
      name: "Pedro Marin",
      rating: 5,
      text: "Trato cercano y precios competitivos. Mi supermercado de confianza.",
      date: "Hace 2 años",
      source: "Google",
    },
    {
      name: "Martin Requena Requena",
      rating: 5,
      text: "Muy contento con las compras que hago aquí. Recomendado 100%.",
      date: "Hace 2 años",
      source: "Google",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-esperanza-orange-light text-esperanza-orange px-4 py-2 rounded-full text-sm font-medium mb-4">
              Lo Que Dicen Nuestros Clientes
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Reseñas de <span className="text-primary">Google</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Opiniones reales de nuestros vecinos y clientes
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                4.9
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-esperanza-yellow text-esperanza-yellow" />
                ))}
              </div>
              <p className="text-primary-foreground/80 text-sm">Valoración Media</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                50+
              </p>
              <p className="text-primary-foreground/80 text-sm">Reseñas en Google</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                98%
              </p>
              <p className="text-primary-foreground/80 text-sm">Clientes Satisfechos</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                40+
              </p>
              <p className="text-primary-foreground/80 text-sm">Años de Confianza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 relative"
              >
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-esperanza-green-light rounded-full flex items-center justify-center">
                    <span className="font-heading font-semibold text-lg text-primary">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.source} • {review.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 transition-all duration-300 ${
                        i < review.rating 
                          ? 'fill-harvest-400 text-harvest-400' 
                          : 'fill-muted text-muted'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed relative z-10">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-esperanza-cream">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <ThumbsUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Ya nos has visitado?
            </h2>
            <p className="text-muted-foreground mb-6">
              Tu opinión nos ayuda a seguir mejorando. Déjanos una reseña en Google y cuéntanos tu experiencia.
            </p>
            <a
              href="https://g.page/r/supermercado-esperanza/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-esperanza-green-dark transition-colors"
            >
              <Star className="w-5 h-5" />
              Dejar una Reseña
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resenas;
