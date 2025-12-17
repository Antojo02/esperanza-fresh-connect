import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Calendar, Clock, MapPin, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  delivery_date: string;
  delivery_time: string;
  delivery_address: string;
  notes: string | null;
  items: OrderItem[];
}

const MisPedidos = () => {
  const { user, loading: authLoading } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        setLoading(false);
        return;
      }

      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          return { ...order, items: items || [] };
        })
      );

      setOrders(ordersWithItems);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-leaf-100 text-leaf-600";
      case "pending":
        return "bg-harvest-100 text-harvest-600";
      case "delivered":
        return "bg-blue-100 text-blue-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagado";
      case "pending":
        return "Pendiente";
      case "delivered":
        return "Entregado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const repeatOrder = async (order: Order) => {
    for (const item of order.items) {
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", item.id)
        .single();

      if (product) {
        for (let i = 0; i < item.quantity; i++) {
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            unit: product.unit || "unidad",
          });
        }
      }
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-organic">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-leaf-100 text-leaf-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Mi Cuenta
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Historial de <span className="text-gradient">Pedidos</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Revisa tus compras anteriores y repite tus pedidos favoritos
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          {orders.length === 0 ? (
            <AnimatedSection className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                No tienes pedidos aún
              </h2>
              <p className="text-muted-foreground mb-6">
                ¡Explora nuestros productos y haz tu primer pedido!
              </p>
              <Button variant="hero" onClick={() => navigate("/productos")}>
                Ver Productos
              </Button>
            </AnimatedSection>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <AnimatedSection key={order.id} animation="fade-up" delay={index * 50}>
                  <div className="bg-background rounded-2xl shadow-organic border border-border overflow-hidden">
                    <div
                      className="p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-leaf-100 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-leaf-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              Pedido #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <span className="font-serif font-bold text-lg text-foreground">
                            {order.total.toFixed(2)}€
                          </span>
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedOrder === order.id && (
                      <div className="border-t border-border p-6 bg-muted/20">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-leaf-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Fecha de entrega</p>
                              <p className="font-medium text-foreground">
                                {new Date(order.delivery_date).toLocaleDateString("es-ES", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-leaf-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Hora de entrega</p>
                              <p className="font-medium text-foreground">{order.delivery_time}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 md:col-span-2">
                            <MapPin className="w-5 h-5 text-leaf-500 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">Dirección de entrega</p>
                              <p className="font-medium text-foreground">{order.delivery_address}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-foreground mb-3">Productos</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                <span className="text-foreground">
                                  {item.quantity}x {item.product_name}
                                </span>
                                <span className="font-medium text-foreground">
                                  {(item.price * item.quantity).toFixed(2)}€
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          variant="hero-outline"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            repeatOrder(order);
                          }}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Repetir Pedido
                        </Button>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MisPedidos;
