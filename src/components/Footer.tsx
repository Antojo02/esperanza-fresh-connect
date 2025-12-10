import { ShoppingCart, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Supermercado</span>
                <span className="font-heading font-bold text-primary text-xl -mt-1">ESPERANZA</span>
              </div>
            </a>
            <p className="text-background/70 max-w-md mb-6">
              Más de 40 años siendo el supermercado de confianza de Molina de Segura. 
              Calidad, precios competitivos y atención cercana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-3">
              <a href="#sobre-nosotros" className="text-background/70 hover:text-primary transition-colors">
                Sobre Nosotros
              </a>
              <a href="#productos" className="text-background/70 hover:text-primary transition-colors">
                Productos
              </a>
              <a href="#resenas" className="text-background/70 hover:text-primary transition-colors">
                Reseñas
              </a>
              <a href="#como-llegar" className="text-background/70 hover:text-primary transition-colors">
                Cómo Llegar
              </a>
              <a href="#contacto" className="text-background/70 hover:text-primary transition-colors">
                Contacto
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <a href="tel:968641021" className="text-background/70 hover:text-primary transition-colors">
                  968 64 10 21
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">
                  30500 Molina de Segura, Murcia
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">
                  L-S: 9:00-14:00 / 17:30-20:30
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © {currentYear} Supermercado Esperanza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
