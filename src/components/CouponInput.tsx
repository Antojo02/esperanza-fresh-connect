import { useState } from "react";
import { Tag, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  min_order_amount: number;
}

interface CouponInputProps {
  orderTotal: number;
  onCouponApplied: (coupon: Coupon | null, discount: number) => void;
  appliedCoupon: Coupon | null;
}

export const CouponInput = ({ orderTotal, onCouponApplied, appliedCoupon }: CouponInputProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCoupon = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase().trim())
      .eq("is_active", true)
      .single();

    if (fetchError || !data) {
      setError("Cupón no válido o expirado");
      setLoading(false);
      return;
    }

    const coupon = data as Coupon;

    // Check minimum order amount
    if (orderTotal < coupon.min_order_amount) {
      setError(`Pedido mínimo de ${coupon.min_order_amount.toFixed(2)}€ requerido`);
      setLoading(false);
      return;
    }

    // Check validity dates
    const now = new Date();
    if (data.valid_from && new Date(data.valid_from) > now) {
      setError("Este cupón aún no está activo");
      setLoading(false);
      return;
    }
    if (data.valid_until && new Date(data.valid_until) < now) {
      setError("Este cupón ha expirado");
      setLoading(false);
      return;
    }

    // Check usage limit
    if (data.max_uses && data.current_uses >= data.max_uses) {
      setError("Este cupón ha alcanzado su límite de usos");
      setLoading(false);
      return;
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discount_type === "percentage") {
      discount = (orderTotal * coupon.discount_value) / 100;
    } else {
      discount = Math.min(coupon.discount_value, orderTotal);
    }

    onCouponApplied(coupon, discount);
    setLoading(false);
  };

  const removeCoupon = () => {
    setCode("");
    setError(null);
    onCouponApplied(null, 0);
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-leaf-50 border border-leaf-200 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-leaf-100 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-leaf-600" />
          </div>
          <div>
            <p className="font-medium text-leaf-700 text-sm">{appliedCoupon.code}</p>
            <p className="text-xs text-leaf-600">
              {appliedCoupon.discount_type === "percentage"
                ? `${appliedCoupon.discount_value}% de descuento`
                : `${appliedCoupon.discount_value.toFixed(2)}€ de descuento`}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-leaf-600 hover:text-leaf-700 hover:bg-leaf-100"
          onClick={removeCoupon}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Código de cupón"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
            }}
            className="pl-9 uppercase"
          />
        </div>
        <Button
          variant="outline"
          onClick={validateCoupon}
          disabled={loading || !code.trim()}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aplicar"}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};
