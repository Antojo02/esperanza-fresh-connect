import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Package, Home, ShoppingBag, Star, MapPin, MessageSquare } from "lucide-react";
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

  // Bloquea el scroll del sitio cuando el menú móvil está abierto
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-white shadow-md border-b border-gray-100" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Logo */}
            <Link to="/" className="z-[110]" onClick={() => setIsMenuOpen(false)}>
              <img 
                src={logo} 
                alt="Supermercado Esperanza" 
                className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-leaf-600 bg-leaf-50"
                      : "text-foreground/80 hover:text-leaf-600 hover:bg-leaf-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 z-[110]">
              <CartButton />
              
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative rounded-full">
                        <User className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-muted-foreground text-xs truncate">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/mis-pedidos" className="flex items-center cursor-pointer">
                          <Package className="w-4 h-4 mr-2" />
                          Mis Pedidos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="sm" asChild className="font-semibold">
                    <Link to="/auth">Iniciar sesión</Link>
                  </Button>
                )}

                <Button variant="hero" size="default" asChild className="rounded-xl shadow-sm">
                  <a href="tel:968641021" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    968 64 10 21
                  </a>
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 rounded-xl bg-leaf-50 text-leaf-600 transition-all active:scale-90"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE FULL SCREEN MENU --- */}
      <div
        className={`fixed inset-0 bg-white z-[95] lg:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? "opacity-100 pointer-events-auto translate-y-0" 
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-10 px-6 overflow-y-auto">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all ${
                    isActive(link.href)
                      ? "bg-leaf-600 text-white shadow-lg shadow-leaf-100"
                      : "bg-gray-50 text-gray-700 active:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`p-2 rounded-lg ${isActive(link.href) ? "bg-white/20" : "bg-white"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions Area */}
          <div className="mt-auto pt-8 flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center">
                    <User className="text-leaf-600 w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sesión iniciada</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl justify-start text-base font-semibold"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/mis-pedidos">
                    <Package className="w-5 h-5 mr-3" />
                    Mis Pedidos
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-14 rounded-2xl justify-start text-base font-semibold text-red-500 hover:bg-red-50"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl text-base font-bold border-leaf-200 text-leaf-700 bg-white"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth">
                  <User className="w-5 h-5 mr-2" />
                  Iniciar sesión
                </Link>
              </Button>
            )}

            <Button
              variant="hero"
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-leaf-100 flex items-center justify-center gap-3"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <a href="tel:968641021">
                <Phone className="w-6 h-6" />
                968 64 10 21
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;