import { Phone, MapPin, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contacto" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-esperanza-green-dark rounded-full opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-esperanza-green-dark rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Llámanos o visítanos en nuestra tienda. 
            ¡Te esperamos con los brazos abiertos!
          </p>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl">
              <Phone className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Teléfono</h3>
              <a href="tel:968641021" className="text-primary-foreground/90 hover:text-primary-foreground text-lg font-medium">
                968 64 10 21
              </a>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl">
              <MapPin className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Ubicación</h3>
              <p className="text-primary-foreground/90">30500 Molina de Segura, Murcia</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl">
              <Clock className="w-8 h-8 text-primary-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">Horario</h3>
              <p className="text-primary-foreground/90">L-S: 9:00-14:00 / 17:30-20:30</p>
            </div>
          </div>

          {/* CTA */}
          <Button
            variant="accent"
            size="xl"
            asChild
            className="text-foreground"
          >
            <a href="tel:968641021" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Llámanos Ahora
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
