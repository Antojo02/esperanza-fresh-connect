import { useState } from "react";
import { MapPin, Check, X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Códigos postales donde entregamos (Molina de Segura y alrededores)
const DELIVERY_ZONES = [
  "30500", // Molina de Segura
  "30509", // Molina de Segura
  "30508", // Molina de Segura
  "30507", // Molina de Segura
  "30506", // Molina de Segura
  "30560", // Alguazas
  "30530", // Cieza
  "30540", // Blanca
  "30550", // Abarán
  "30570", // Beniaján
  "30580", // La Alberca
  "30310", // Cartagena área
  "30120", // El Palmar
  "30150", // La Alberca
  "30100", // Espinardo
  "30006", // Murcia
  "30007", // Murcia
  "30008", // Murcia
];

interface PostalCodeCheckerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (postalCode: string) => void;
}

export const PostalCodeChecker = ({ isOpen, onClose, onConfirm }: PostalCodeCheckerProps) => {
  const [postalCode, setPostalCode] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const checkPostalCode = () => {
    const isValid = DELIVERY_ZONES.includes(postalCode.trim());
    setResult(isValid ? "valid" : "invalid");
  };

  const handleConfirm = () => {
    if (result === "valid") {
      onConfirm(postalCode);
      onClose();
    }
  };

  const handleClose = () => {
    setPostalCode("");
    setResult(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Truck className="w-6 h-6 text-leaf-500" />
            Verificar Zona de Entrega
          </DialogTitle>
          <DialogDescription>
            Introduce tu código postal para comprobar si hacemos entregas en tu zona
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ej: 30500"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setResult(null);
                }}
                className="pl-10"
                maxLength={5}
              />
            </div>
            <Button
              variant="hero"
              onClick={checkPostalCode}
              disabled={postalCode.length !== 5}
            >
              Comprobar
            </Button>
          </div>

          {result === "valid" && (
            <div className="flex items-center gap-3 p-4 bg-leaf-50 border border-leaf-200 rounded-xl animate-fade-in">
              <div className="w-10 h-10 bg-leaf-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-leaf-600" />
              </div>
              <div>
                <p className="font-semibold text-leaf-700">¡Perfecto!</p>
                <p className="text-sm text-leaf-600">Hacemos entregas en tu zona</p>
              </div>
            </div>
          )}

          {result === "invalid" && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-700">Lo sentimos</p>
                <p className="text-sm text-red-600">Actualmente no entregamos en esta zona</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button
            variant="hero"
            onClick={handleConfirm}
            disabled={result !== "valid"}
            className="flex-1"
          >
            Continuar Comprando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PostalCodeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmedZone, setConfirmedZone] = useState<string | null>(() => {
    return localStorage.getItem("delivery_postal_code");
  });

  const handleConfirm = (postalCode: string) => {
    localStorage.setItem("delivery_postal_code", postalCode);
    setConfirmedZone(postalCode);
  };

  if (confirmedZone) {
    return (
      <div className="bg-leaf-50 border-b border-leaf-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-leaf-600" />
            <span className="text-leaf-700">
              Entregando en <strong>{confirmedZone}</strong>
            </span>
            <button
              onClick={() => setIsOpen(true)}
              className="text-leaf-600 underline hover:text-leaf-700 ml-2"
            >
              Cambiar
            </button>
          </div>
        </div>
        <PostalCodeChecker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    );
  }

  return (
    <>
      <div className="bg-harvest-50 border-b border-harvest-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Truck className="w-5 h-5 text-harvest-600" />
            <span className="text-harvest-700 font-medium">
              ¿Hacemos entregas en tu zona?
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="border-harvest-300 text-harvest-700 hover:bg-harvest-100"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Verificar Código Postal
            </Button>
          </div>
        </div>
      </div>
      <PostalCodeChecker
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
