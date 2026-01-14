import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Package, ShoppingBag, Star, MapPin, MessageSquare, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/CartButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.avif";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/sobre-nosotros", label: "Sobre Nosotros", icon: ShoppingBag },
    { href: "/productos", label: "Productos", icon: Package },
    { href: "/resenas", label: "Reseñas", icon: Star },
    { href: "/como-llegar", label: "Cómo Llegar", icon: MapPin },
    { href: "/contacto", label: "Contacto", icon: MessageSquare },
  ];

  // FILTRO: Quitar "Inicio" para el menú móvil
  const mobileLinks = navLinks.filter(link => link.label !== "Inicio");

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-white shadow-md border-b border-gray-100" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Logo - Siempre encima con z-120 */}
            <Link to="/" className="z-[120]" onClick={() => setIsMenuOpen(false)}>
              <img 
                src={logo} 
                alt="Supermercado Esperanza" 
                className="h-10 md:h-14 w-auto object-contain transition-transform active:scale-95"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive(link.href) ? "text-leaf-600 bg-leaf-50" : "text-foreground/80 hover:text-leaf-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 z-[120]">
              <CartButton />
              
              {/* Hamburguesa con color forzado cuando está abierto */}
              <button
                className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                  isMenuOpen ? "bg-gray-100 text-gray-900" : "bg-leaf-50 text-leaf-600"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Botones Desktop */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full"><User className="w-5 h-5" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-xs truncate">{user.email}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link to="/mis-pedidos"><Package className="w-4 h-4 mr-2" />Mis Pedidos</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Cerrar sesión</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="sm" asChild className="font-semibold"><Link to="/auth">Iniciar sesión</Link></Button>
                )}
                <Button variant="hero" asChild className="rounded-xl shadow-sm">
                  <a href="tel:968641021" className="flex items-center gap-2"><Phone className="w-4 h-4" /> 968 64 10 21</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MENÚ MÓVIL (PANTALLA COMPLETA TOTAL) --- */}
      <div
        className={`fixed inset-0 bg-white z-[100] lg:hidden flex flex-col transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "translate-y-0 opacity-100 visible" 
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        {/* Contenido del menú - Padding superior para que no choque con el header */}
        <div className="flex flex-col h-full pt-28 pb-8 px-6 overflow-y-auto bg-white">
          <nav className="flex flex-col gap-3">
            {mobileLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-4 p-5 rounded-2xl text-lg font-bold transition-all active:scale-[0.98] ${
                    isActive(link.href) 
                      ? "bg-leaf-600 text-white shadow-lg shadow-leaf-100" 
                      : "bg-gray-50 text-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`w-6 h-6 ${isActive(link.href) ? "text-white" : "text-leaf-600"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-leaf-100 rounded-full">
                    <User className="w-5 h-5 text-leaf-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Mi Perfil</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="h-14 rounded-2xl justify-start font-bold border-gray-200" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/mis-pedidos"><Package className="mr-3 w-5 h-5" /> Mis Pedidos</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="h-14 rounded-2xl justify-start font-bold text-red-500 hover:bg-red-50" 
                  onClick={() => { signOut(); setIsMenuOpen(false); }}
                >
                  <LogOut className="mr-3 w-5 h-5" /> Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="h-14 rounded-2xl font-bold border-2 border-leaf-200 text-leaf-700 active:bg-leaf-50" 
                asChild 
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth"><User className="mr-2 w-5 h-5" /> Iniciar sesión</Link>
              </Button>
            )}

            <Button 
              variant="hero" 
              className="h-16 rounded-2xl text-xl font-bold shadow-xl shadow-leaf-200 active:scale-95 transition-transform" 
              asChild 
              onClick={() => setIsMenuOpen(false)}
            >
              <a href="tel:968641021" className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" /> 968 64 10 21
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
