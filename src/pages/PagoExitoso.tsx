import Layout from '@/components/Layout';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <AnimatedSection className="max-w-md w-full text-center">
          <div className="bg-card rounded-3xl shadow-organic-lg border border-border p-8">
            <div className="w-20 h-20 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-leaf-500" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tu pedido ha sido recibido correctamente. Te enviaremos un email con los detalles y te contactaremos para confirmar la entrega.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link to="/productos">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Seguir comprando
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Volver al inicio</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

export default PagoExitoso;
