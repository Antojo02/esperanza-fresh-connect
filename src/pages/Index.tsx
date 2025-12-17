import { Link } from "react-router-dom";
import { Star, Tag, Clock, Users, Phone, ArrowRight, ShoppingBag, Wallet, Leaf, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { PredictiveSearch } from "@/components/PredictiveSearch";
import { useOrderNotifications } from "@/hooks/useOrderNotifications";

const Index = () => {
  useOrderNotifications();

  const features = [
    { icon: Tag, title: "Mejores Precios", description: "Más económico que grandes cadenas" },
    { icon: ShoppingBag, title: "Carnes de Calidad", description: "Frescura y sabor garantizado" },
    { icon: Clock, title: "Horario Amplio", description: "Abierto mañana y tarde" },
    { icon: Users, title: "Trato Cercano", description: "Personal atento y amable" },
  ];

  const reasons = [
    {
      icon: Wallet,
      title: "Precios Competitivos",
      description: "Ofrecemos precios más bajos que las grandes cadenas sin comprometer la calidad.",
    },
    {
      icon: Leaf,
      title: "Productos Frescos",
      description: "Frutas, verduras y carnes de la mejor calidad seleccionadas cuidadosamente.",
    },
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Nuestro personal amable te conoce y está siempre dispuesto a ayudarte.",
    },
    {
      icon: ShoppingCart,
      title: "Todo en un Lugar",
      description: "Amplia variedad de productos para tu compra semanal en un solo lugar.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-organic overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-leaf-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-harvest-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-leaf-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Search Bar */}
          <AnimatedSection animation="fade-up" className="max-w-2xl mx-auto mb-12">
            <PredictiveSearch className="w-full" />
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="space-y-8">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-card px-4 py-2.5 rounded-full shadow-organic border border-border">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-harvest-300 text-harvest-300" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">Excelentes Reseñas</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Tu Supermercado de{" "}
                  <span className="text-gradient">Confianza</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Calidad superior en productos frescos, precios competitivos y la atención cercana que mereces. <span className="text-foreground font-medium">40 años</span> sirviendo a Molina de Segura.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="group flex items-start gap-3 p-4 rounded-2xl bg-card/50 border border-border/50 hover:bg-card hover:border-leaf-200 hover:shadow-organic transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-leaf-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-leaf-200 transition-colors">
                        <feature.icon className="w-5 h-5 text-leaf-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={400}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" asChild className="group">
                    <Link to="/productos" className="flex items-center gap-2">
                      Ver Nuestros Productos
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="xl" asChild>
                    <a href="tel:968641021" className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      968 64 10 21
                    </a>
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={500}>
                <div className="inline-flex items-center gap-4 bg-card px-6 py-4 rounded-2xl shadow-organic border border-border">
                  <div className="relative">
                    <div className="w-3 h-3 bg-leaf-400 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-leaf-400 rounded-full animate-ping opacity-75" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Abierto hoy hasta las 14:00</p>
                    <p className="text-xs text-muted-foreground">Próxima apertura: 17:30</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="scale-in" delay={200} className="relative">
              <div className="relative">
                {/* Decorative badge */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className="bg-harvest-300 text-white px-4 py-2 rounded-full shadow-organic-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-semibold">Productos Frescos</span>
                  </div>
                </div>

                {/* Main image */}
                <div className="rounded-3xl overflow-hidden shadow-organic-xl border-4 border-white">
                  <img
                    src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/fb821a7d-53e7-4543-65c7-f3acda964300/public"
                    alt="Sección de frutas y verduras frescas en Supermercado Esperanza"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-card p-5 rounded-2xl shadow-organic-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-harvest-100 rounded-2xl flex items-center justify-center">
                      <ShoppingBag className="w-7 h-7 text-harvest-400" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-3xl text-foreground">+40</p>
                      <p className="text-sm text-muted-foreground">Años de experiencia</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-card relative">
        <div className="absolute inset-0 bg-leaf-gradient opacity-30" />
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-leaf-500 font-medium text-sm uppercase tracking-wider mb-4">
              Por qué elegirnos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Más que un supermercado, somos{" "}
              <span className="text-gradient">parte de tu comunidad</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre por qué miles de familias confían en nosotros cada día
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="group bg-background p-8 rounded-3xl shadow-organic hover:shadow-organic-lg transition-all duration-500 hover:-translate-y-2 border border-border hover:border-leaf-200 h-full">
                  <div className="w-16 h-16 bg-leaf-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-leaf-200 group-hover:scale-110 transition-all duration-300">
                    <reason.icon className="w-8 h-8 text-leaf-500" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-foreground mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <Button variant="hero" size="lg" asChild>
              <Link to="/sobre-nosotros">Conoce Más Sobre Nosotros</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-leaf-500 rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-leaf-500 rounded-full opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              ¿Listo para hacer tu compra?
            </h2>
            <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg">
              Visítanos y descubre por qué somos el supermercado favorito de Molina de Segura
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="xl" asChild>
                <Link to="/como-llegar">Cómo Llegar</Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl" 
                className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary" 
                asChild
              >
                <Link to="/resenas">Ver Reseñas</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;