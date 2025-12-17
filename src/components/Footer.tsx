import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.avif";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const googleMapsUrl = "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYQDIGCAMQRRg5MgoIBBAAGLEDGIAEMg0IBRAAGJIdGIAEGIoFMg0IBhAAGJIdGIAEGIoFMgYIBxBFGD3SAQg1NjQ2ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=es&sa=X&geocode=KQsTQVKtgGMNMeUKc17ADUsq&daddr=30500+Molina+de+Segura,+Murcia";
  const googleReviewUrl = "https://www.google.com/search?q=supermercado+esperanza&oq=superme&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyBggCEEUYQDIGCAMQRRg5MgoIBBAAGLEDGIAEMg0IBRAAGJIdGIAEGIoFMg0IBhAAGJIdGIAEGIoFMgYIBxBFGD3SAQg1NjQ2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8";

  return (
    <footer className="bg-earth-500 text-earth-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo} 
                alt="Supermercado Esperanza" 
                className="h-16 w-auto object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-earth-200 max-w-md mb-8 leading-relaxed">
              Más de 40 años siendo el supermercado de confianza de Molina de Segura. 
              Calidad, precios competitivos y atención cercana.
            </p>
            <a 
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-harvest-400 text-white px-5 py-3 rounded-xl font-medium hover:bg-harvest-500 transition-all duration-300 hover:-translate-y-0.5 shadow-organic"
            >
              <Star className="w-5 h-5" />
              Déjanos una Reseña
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-6">Navegación</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/sobre-nosotros" className="text-earth-200 hover:text-white transition-colors flex items-center gap-1 group">
                <span>Sobre Nosotros</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/productos" className="text-earth-200 hover:text-white transition-colors flex items-center gap-1 group">
                <span>Productos</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/resenas" className="text-earth-200 hover:text-white transition-colors flex items-center gap-1 group">
                <span>Reseñas</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-200 hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>Ver en Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-6">Contacto</h3>
            <div className="space-y-5">
              <a href="tel:968641021" className="flex items-start gap-3 text-earth-200 hover:text-white transition-colors group">
                <div className="w-10 h-10 bg-earth-400 rounded-xl flex items-center justify-center group-hover:bg-leaf-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">Teléfono</p>
                  <p>968 64 10 21</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-earth-400 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">Dirección</p>
                  <p className="text-earth-200">30500 Molina de Segura, Murcia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-earth-400 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">Horario</p>
                  <p className="text-earth-200">L-S: 9:00-14:00 / 17:30-20:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-earth-400 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-earth-300 text-sm">
            © {currentYear} Supermercado Esperanza. Todos los derechos reservados.
          </p>
          <p className="text-earth-400 text-xs">
            Hecho con 💚 en Molina de Segura
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
