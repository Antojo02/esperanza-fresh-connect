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

  // Bloquear el scroll del cuerpo cuando el menú está abierto
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
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <img 
              src={logo} 
              alt="Supermercado Esperanza" 
              className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <CartButton />
            
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

          {/* Mobile Actions (Botones que se ven siempre en el móvil) */}
          <div className="flex lg:hidden items-center gap-2">
            <CartButton />
            <button
              className="p-2 hover:bg-leaf-50 rounded-lg transition-all active:scale-90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7 text-foreground" />
              ) : (
                <Menu className="w-7 h-7 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop Oscuro */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Panel Lateral (Sidebar) */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo superior en el menú móvil */}
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <span className="font-bold text-leaf-600">MENÚ</span>
            <X className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>

          {/* Enlaces principales */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-colors ${
                    isActive(link.href)
                      ? "text-leaf-600 bg-leaf-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive(link.href) ? "text-leaf-600" : "text-gray-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Pie del Menú (Login, Pedidos y Teléfono) */}
          <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Mi Cuenta</p>
                  <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 rounded-xl bg-white"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/mis-pedidos">
                    <Package className="w-4 h-4 mr-3 text-gray-500" />
                    Mis Pedidos
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-12 rounded-xl text-red-500 hover:bg-red-50"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-center h-12 rounded-xl border-leaf-200 text-leaf-700 font-bold bg-white"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Iniciar sesión
                </Link>
              </Button>
            )}

            <Button
              variant="hero"
              className="w-full justify-center h-12 rounded-xl font-bold shadow-lg shadow-leaf-100"
              asChild
              onClick={() => setIsMenuOpen(false)}
            >
              <a href="tel:968641021" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                968 64 10 21
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;