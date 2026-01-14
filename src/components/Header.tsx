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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-card/95 backdrop-blur-lg shadow-organic border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 md:h-22">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
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
                    ? "text-leaf-500 bg-leaf-50"
                    : "text-foreground/80 hover:text-leaf-500 hover:bg-leaf-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <CartButton />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-muted-foreground text-sm">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/mis-pedidos" className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Mis Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Iniciar sesión</Link>
              </Button>
            )}

            <Button variant="hero" size="default" asChild>
              <a href="tel:968641021" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                968 64 10 21
              </a>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <CartButton />
            <button
              className="p-3 hover:bg-leaf-50 rounded-xl transition-all duration-300 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <>
          {/* Backdrop */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: "fadeIn 0.3s ease-out"
              }}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-18 bottom-0 w-72 bg-card/98 border-r border-border shadow-2xl z-40 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              animation: isMenuOpen ? "slideInLeft 0.3s ease-out" : undefined
            }}
          >
            <nav className="p-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-white bg-leaf-500 shadow-md"
                        : "text-foreground hover:bg-leaf-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-border/30 p-4 bg-gradient-to-t from-card/50 space-y-3">
              {user ? (
                <>
                  <div className="px-4 py-3 bg-leaf-50 rounded-xl border border-leaf-200">
                    <p className="text-xs text-muted-foreground font-medium">Cuenta</p>
                    <p className="text-sm font-semibold text-foreground truncate mt-1">{user.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-leaf-50"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/mis-pedidos">
                      <Package className="w-4 h-4 mr-2" />
                      Mis Pedidos
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-red-50"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-leaf-50"
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
                className="w-full justify-center gap-2 shadow-lg font-semibold"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="tel:968641021">
                  <Phone className="w-4 h-4" />
                  Llamar Ahora
                </a>
              </Button>
            </div>
          </div>
        </>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
