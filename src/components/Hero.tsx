import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full h-[70vh] md:h-screen bg-uniblue overflow-hidden flex items-center justify-center"
    >
      {/* Imagen de fondo más horizontal */}
      <motion.img
        src="./src/assets/XISemana360.svg"
        alt="XI Semana 360°"
        className="absolute inset-0 w-full h-full object-contain md:object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Capa oscura opcional */}
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  );
}
