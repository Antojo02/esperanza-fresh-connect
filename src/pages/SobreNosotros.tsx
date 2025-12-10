import { Wallet, Leaf, Heart, ShoppingCart, Clock, Award, Users } from "lucide-react";
import Layout from "@/components/Layout";

const SobreNosotros = () => {
  const values = [
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Seleccionamos cuidadosamente cada producto para ofrecerte siempre lo mejor.",
    },
    {
      icon: Wallet,
      title: "Precios Justos",
      description: "Mantenemos precios competitivos sin sacrificar la calidad de nuestros productos.",
    },
    {
      icon: Users,
      title: "Trato Familiar",
      description: "Te conocemos por tu nombre y nos preocupamos por tus necesidades.",
    },
    {
      icon: Clock,
      title: "Constancia",
      description: "Más de 40 años abriendo nuestras puertas para servirte cada día.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Nuestra Historia
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Sobre <span className="text-primary">Nosotros</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Conoce la historia detrás de tu supermercado de confianza
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Más de <span className="text-primary">40 años</span> sirviendo a Molina de Segura
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Desde que abrimos nuestras puertas hace más de cuatro décadas, Supermercado Esperanza se ha convertido en mucho más que una tienda de alimentación. Somos parte del tejido de Molina de Segura, un lugar donde generaciones de familias han hecho su compra semanal.
                </p>
                <p>
                  Nuestra filosofía siempre ha sido sencilla: ofrecer productos de la mejor calidad a precios justos, con un trato cercano y personalizado que ya no se encuentra en las grandes superficies.
                </p>
                <p>
                  Hoy, continuamos ese legado, manteniendo los valores que nos han definido mientras nos adaptamos a las necesidades de nuestros clientes. Porque para nosotros, cada cliente no es solo un número, sino un vecino, un amigo.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=450&fit=crop"
                  alt="Interior del supermercado"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
                <p className="font-heading text-4xl font-bold">+40</p>
                <p className="text-sm opacity-90">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-esperanza-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros <span className="text-primary">Valores</span>
            </h2>
            <p className="text-muted-foreground">
              Los principios que nos guían cada día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-esperanza-green-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default SobreNosotros;
