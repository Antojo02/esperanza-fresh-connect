import { Phone, MapPin, Clock, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const Contacto = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Estamos Aquí Para Ti
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              <span className="text-primary">Contacto</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Phone Card */}
              <div className="bg-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-esperanza-green-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">
                  Llámanos
                </h3>
                <p className="text-muted-foreground mb-6">
                  La forma más rápida de contactarnos
                </p>
                <a
                  href="tel:968641021"
                  className="text-3xl font-heading font-bold text-primary hover:text-esperanza-green-dark transition-colors block mb-4"
                >
                  968 64 10 21
                </a>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href="tel:968641021">Llamar Ahora</a>
                </Button>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-[#25D366]" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">
                  WhatsApp
                </h3>
                <p className="text-muted-foreground mb-6">
                  Escríbenos por WhatsApp
                </p>
                <p className="text-xl font-medium text-foreground mb-4">
                  Respuesta rápida
                </p>
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5C] text-white"
                  asChild
                >
                  <a
                    href="https://wa.me/34968641021?text=Hola,%20me%20gustaría%20obtener%20información%20sobre%20Supermercado%20Esperanza"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-background p-6 rounded-2xl shadow-card text-center">
                <div className="w-14 h-14 bg-esperanza-green-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Ubicación
                </h4>
                <p className="text-muted-foreground">
                  30500 Molina de Segura, Murcia
                </p>
              </div>

              <div className="bg-background p-6 rounded-2xl shadow-card text-center">
                <div className="w-14 h-14 bg-esperanza-orange-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-esperanza-orange" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Horario
                </h4>
                <p className="text-muted-foreground">
                  L-S: 9:00-14:00 / 17:30-20:30
                </p>
              </div>

              <div className="bg-background p-6 rounded-2xl shadow-card text-center">
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-muted-foreground" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
                  Visítanos
                </h4>
                <p className="text-muted-foreground">
                  ¡Te esperamos en tienda!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-esperanza-green-dark rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-esperanza-green-dark rounded-full opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            ¡Te esperamos con los brazos abiertos!
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Más de 40 años siendo tu supermercado de confianza en Molina de Segura
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="text-foreground" asChild>
              <a href="tel:968641021" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
