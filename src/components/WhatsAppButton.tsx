const WhatsAppButton = () => {
  const phoneNumber = "34968641021";
  const message = "Hola, me gustaría obtener información sobre Supermercado Esperanza";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group-hover:bg-[#20BA5C]">
          <svg 
            viewBox="0 0 32 32" 
            className="w-9 h-9 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.924 15.924 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.342 22.616c-.39 1.1-1.932 2.012-3.178 2.278-.854.18-1.968.324-5.72-1.23-4.798-1.986-7.882-6.856-8.122-7.174-.23-.318-1.932-2.574-1.932-4.91 0-2.336 1.222-3.482 1.656-3.96.39-.432 1.028-.648 1.638-.648.198 0 .376.01.536.018.432.018.65.044.936.724.358.852 1.23 2.992 1.336 3.21.108.218.216.514.068.812-.14.306-.262.442-.48.69-.218.248-.424.44-.642.708-.198.24-.42.496-.178.936.242.432 1.076 1.774 2.312 2.874 1.59 1.414 2.93 1.854 3.344 2.06.318.158.696.128.948-.148.32-.352.716-.936 1.118-1.512.286-.41.648-.462.998-.318.356.136 2.252 1.062 2.64 1.256.386.194.644.29.74.452.094.162.094.936-.296 2.036z"/>
          </svg>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span className="text-sm font-medium">¿Necesitas ayuda?</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
