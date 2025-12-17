import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const statusMessages: Record<string, { title: string; description: string; icon: string }> = {
  paid: {
    title: "¡Pago confirmado!",
    description: "Tu pedido ha sido pagado y está siendo procesado.",
    icon: "💳",
  },
  preparing: {
    title: "Preparando tu pedido",
    description: "Estamos seleccionando tus productos con cuidado.",
    icon: "📦",
  },
  ready: {
    title: "Pedido listo",
    description: "Tu pedido está listo para ser enviado.",
    icon: "✅",
  },
  shipped: {
    title: "¡En camino!",
    description: "Tu pedido está en camino a tu dirección.",
    icon: "🚚",
  },
  delivered: {
    title: "¡Entregado!",
    description: "Tu pedido ha sido entregado. ¡Gracias por tu compra!",
    icon: "🎉",
  },
  cancelled: {
    title: "Pedido cancelado",
    description: "Tu pedido ha sido cancelado. Contacta con nosotros si tienes dudas.",
    icon: "❌",
  },
};

export const useOrderNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("order-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newStatus = payload.new.status as string;
          const statusInfo = statusMessages[newStatus];

          if (statusInfo) {
            toast(statusInfo.title, {
              description: statusInfo.description,
              icon: statusInfo.icon,
              duration: 5000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
};
