import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => {
  const schedule = [
    { day: "Lunes - Viernes", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Sábado", hours: "9:00 - 14:00 / 17:30 - 20:30" },
    { day: "Domingo", hours: "Cerrado" },
  ];

  return (
    <section id="como-llegar" className="py-20 md:py-28 bg-esperanza-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-esperanza-green-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Encuéntranos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cómo <span className="text-primary">Llegar</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos en el corazón de Molina de Segura, fácil de encontrar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.5!2d-1.2!3d38.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAzJzAwLjAiTiAxwrAxMicwMC4wIlc!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Supermercado Esperanza"
            />
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-esperanza-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    Dirección
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    30500 Molina de Segura, Murcia
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://maps.google.com/?q=30500+Molina+de+Segura+Murcia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Cómo llegar
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-esperanza-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-esperanza-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                    Horario de Apertura
                  </h3>
                  <div className="space-y-3">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="font-medium text-foreground">{item.day}</span>
                        <span className={`text-sm ${item.hours === "Cerrado" ? "text-destructive" : "text-muted-foreground"}`}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-esperanza-green-light rounded-lg">
                    <p className="text-sm text-primary font-medium">
                      ⏰ Hoy abierto hasta las 14:00 • Próxima apertura: 17:30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-esperanza-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    Teléfono
                  </h3>
                  <a
                    href="tel:968641021"
                    className="text-2xl font-heading font-bold text-primary hover:text-esperanza-green-dark transition-colors"
                  >
                    968 64 10 21
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Llámanos para cualquier consulta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
