import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import xiSemanaImage from "@/assets/BANNER DE PAGINA-8.jpg";

export default function Hero() {
  const images = [
    { src: xiSemanaImage, alt: "XI Semana 360°" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [isPaused, images.length]);

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    pauseAutoplay();
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    pauseAutoplay();
  };

  return (
    <section
      id="inicio"
      className="relative w-full h-[40vh] sm:h-[50vh] md:h-[68vh] lg:h-[70vh] bg-transparent overflow-hidden flex items-center justify-center"
    >
      {/* Contenedor principal de la imagen */}
      <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-auto h-full max-w-full object-contain sm:object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles del carrusel - Mejorados para móvil */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-4">
        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={goPrev}
          className="pointer-events-auto inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Imagen siguiente"
          onClick={goNext}
          className="pointer-events-auto inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Indicadores (puntos) - Mejorados para móvil */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 sm:gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir a la imagen ${idx + 1}`}
            onClick={() => {
              setCurrentIndex(idx);
              pauseAutoplay();
            }}
            className={
              "h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 border border-white/70 " +
              (idx === currentIndex 
                ? "bg-white scale-125" 
                : "bg-white/30 hover:bg-white/60 scale-100")
            }
          />
        ))}
      </div>

      {/* Capa de gradiente sutil en la parte inferior para mejor contraste */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </section>
  );
}