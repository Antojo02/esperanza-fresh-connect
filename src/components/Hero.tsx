import { Star, Tag, Clock, Users, Phone, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const features = [
    { icon: Tag, title: "Mejores Precios", description: "Más económico que grandes cadenas" },
    { icon: ShoppingBag, title: "Carnes de Calidad", description: "Frescura y sabor garantizado" },
    { icon: Clock, title: "Horario Amplio", description: "Abierto mañana y tarde" },
    { icon: Users, title: "Trato Cercano", description: "Personal atento y amable" },
  ];

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-hero-pattern overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-esperanza-green-light rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-esperanza-orange-light rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-up">
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-card mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-esperanza-orange text-esperanza-orange" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">Excelentes Reseñas</span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Tu Supermercado de{" "}
              <span className="text-primary">Confianza</span> en Molina de Segura
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Calidad superior en productos frescos, precios competitivos y la atención cercana que mereces. Todo lo que necesitas para tu compra semanal en un solo lugar.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-esperanza-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="hero" size="xl" asChild>
                <a href="#productos" className="flex items-center gap-2">
                  Ver Nuestros Productos
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="tel:968641021" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  968 64 10 21
                </a>
              </Button>
            </div>

            {/* Schedule Badge */}
            <div className="inline-flex items-center gap-3 bg-card px-5 py-3 rounded-xl shadow-card">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-semibold text-foreground">Abierto hoy hasta las 14:00</p>
                <p className="text-xs text-muted-foreground">Próxima apertura: 17:30</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/fb821a7d-53e7-4543-65c7-f3acda964300/public"
                alt="Sección de frutas y verduras frescas en Supermercado Esperanza"
                className="w-full h-auto object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 right-6 bg-card/95 backdrop-blur-sm px-5 py-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-esperanza-orange-light rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-esperanza-orange" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-2xl text-foreground">+40 Años</p>
                    <p className="text-sm text-muted-foreground">Sirviendo a la comunidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
