import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import xiSemanaImage from "@/assets/BANNER DE PAGINA-8.png";

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
  }, [isPaused]);

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
      className="relative w-full h-[56vh] md:h-[68vh] bg-transparent overflow-hidden flex items-center justify-center"
    >
      {/* Carrusel de fondo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-auto object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Controles del carrusel */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-4">
        <button
          type="button"
          aria-label="Imagen anterior"
          onClick={goPrev}
          className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Imagen siguiente"
          onClick={goNext}
          className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
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
              "h-2.0 w-2.0 rounded-full transition border border-white/70 " +
              (idx === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/60")
            }
          />
        ))}
      </div>

      {/* Capa oscura removida para respetar los colores originales de las imágenes */}
    </section>
  );
}
