import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star } from "lucide-react";
import logo from "@/assets/logo.avif";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const googleMapsUrl = "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYQDIGCAMQRRg5MgoIBBAAGLEDGIAEMg0IBRAAGJIDGIAEGIoFMg0IBhAAGJIdGIAEGIoFMgYIBxBFGD3SAQg1NjQ2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=es&sa=X&geocode=KQsTQVKtgGMNMeUKc17ADUsq&daddr=30500+Molina+de+Segura,+Murcia";
  const googleReviewUrl = "https://www.google.com/search?q=supermercado+esperanza&oq=superme&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYQDIGCAMQRRg5MgoIBBAAGLEDGIAEMg0IBRAAGJIdGIAEGIoFMg0IBhAAGJIdGIAEGIoFMgYIBxBFGD3SAQg1NjQ2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8";

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={logo} 
                alt="Supermercado Esperanza" 
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-background/70 max-w-md mb-6">
              Más de 40 años siendo el supermercado de confianza de Molina de Segura. 
              Calidad, precios competitivos y atención cercana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/sobre-nosotros" className="text-background/70 hover:text-primary transition-colors">
                Sobre Nosotros
              </Link>
              <Link to="/productos" className="text-background/70 hover:text-primary transition-colors">
                Productos
              </Link>
              <Link to="/resenas" className="text-background/70 hover:text-primary transition-colors">
                Reseñas
              </Link>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors"
              >
                Cómo Llegar
              </a>
              <a 
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-primary transition-colors flex items-center gap-1"
              >
                <Star className="w-4 h-4" />
                Dejar Reseña
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
