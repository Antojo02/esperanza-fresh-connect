import { MapPin, Clock, Phone, Navigation, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const ComoLlegar = () => {
  const schedule = [
    { day: "Lunes", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Martes", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Miércoles", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Jueves", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Viernes", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Sábado", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Domingo", hours: "Cerrado" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Encuéntranos
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Cómo <span className="text-primary">Llegar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos en el corazón de Molina de Segura, fácil de encontrar y con parking cercano
            </p>
          </div>
        </div>
      </section>

      {/* Map & Info */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.5!2d-1.2!3d38.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAzJzAwLjAiTiAxwrAxMicwMC4wIlc!5e0!3m2!1ses!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Supermercado Esperanza"
              />
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-background p-8 rounded-2xl shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-esperanza-green-light rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Dirección
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      30500 Molina de Segura, Murcia
                    </p>
                    <Button variant="hero" asChild>
                      <a
                        href="https://maps.google.com/?q=30500+Molina+de+Segura+Murcia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Abrir en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-background p-8 rounded-2xl shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-esperanza-green-light rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Teléfono
                    </h3>
                    <a
                      href="tel:968641021"
                      className="text-3xl font-heading font-bold text-primary hover:text-esperanza-green-dark transition-colors"
                    >
                      968 64 10 21
                    </a>
                    <p className="text-muted-foreground mt-2">
                      Llámanos para cualquier consulta
                    </p>
                  </div>
                </div>
              </div>

              {/* Transport */}
              <div className="bg-background p-8 rounded-2xl shadow-card">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Cómo Llegar
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">En coche</p>
                      <p className="text-sm text-muted-foreground">
                        Aparcamiento disponible en las calles cercanas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bus className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">En autobús</p>
                      <p className="text-sm text-muted-foreground">
                        Parada de autobús a pocos metros
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-esperanza-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-esperanza-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-esperanza-orange" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Horario de <span className="text-primary">Apertura</span>
              </h2>
            </div>

            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-8 py-4 ${
                    index !== schedule.length - 1 ? "border-b border-border" : ""
                  } ${item.hours === "Cerrado" ? "bg-destructive/5" : ""}`}
                >
                  <span className="font-medium text-foreground">{item.day}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.hours === "Cerrado"
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-esperanza-green-light rounded-xl text-center">
              <p className="text-primary font-medium">
                ⏰ Hoy abierto hasta las 14:00 • Próxima apertura: 17:30
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ComoLlegar;
