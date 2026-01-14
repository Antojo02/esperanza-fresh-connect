const CallButton = () => {
  const phoneNumber = "+34968641021";
  const phoneNumberDisplay = "968 641 021";

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={`Llamar al ${phoneNumberDisplay}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#2563EB] rounded-full animate-ping opacity-25" />

        <div className="relative w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group-hover:bg-[#1D4ED8]">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3.75 8.75 4.5c.3.07.55.28.66.56l1.3 3.26a.9.9 0 01-.24.99l-1.8 1.67a12.6 12.6 0 005.81 5.82l1.67-1.8a.9.9 0 01.99-.24l3.26 1.3c.28.11.49.36.56.66l.75 3.25a.9.9 0 01-.26.86l-1.51 1.51c-.26.26-.64.35-1 .25-2.7-.77-5.4-2.11-8.04-4.06-2.36-1.73-4.23-3.6-5.6-5.6-1.36-2-2.18-3.97-2.45-5.88-.05-.36.08-.72.33-.98l1.5-1.5a.9.9 0 01.87-.26z"
              fill="white"
            />
          </svg>
        </div>

        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span className="text-sm font-medium">Llámanos al {phoneNumberDisplay}</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
        </div>
      </div>
    </a>
  );
};

export default CallButton;
