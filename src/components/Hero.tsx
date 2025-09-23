import { motion } from "framer-motion";
import heroImage from "@/assets/XISemana360.svg";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full h-[70vh] md:h-screen bg-uniblue overflow-hidden flex items-center justify-center"
    >
      {/* Imagen de fondo */}
      <motion.img
        src={heroImage}
        alt="XI Semana 360°"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Capa oscura opcional */}
      <div className="absolute inset-0 bg-black/20"></div>
    </section>
  );
}
