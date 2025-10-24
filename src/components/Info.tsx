import { motion, type Variants, useInView } from "framer-motion";
import React from "react";
import IntroduccionImg from "@/assets/introduccion.png";
import PoblacionObjetivoImg from "@/assets/poblacion.jpg";
import SedesImg from "@/assets/sedes.webp";
import TematicasImg from "@/assets/tematica.jpg";
import ObjGeneralImg from "@/assets/objgeneral.jpg";
import ObjEspecificosImg from "@/assets/objespecificos.jpg";

export default function Info() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id="info" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <div className="inline-flex border-l-4 border-uniblue pl-4 py-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              INFORMACIÓN
            </h2>
          </div>
        </motion.div>

        {/* KPIs con conteo animado */}
        <AnimatedStats />

        <div className="space-y-10 text-gray-700">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-uniblue rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Introducción</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.p
                className="text-gray-700 leading-relaxed text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                La Facultad de Ingeniería de la Fundación Universitaria Católica Lumen Gentium – UNICATÓLICA organiza la XI Semana de la Ingeniería – “360°: Innovación, Liderazgo y Futuro”, un evento académico, investigativo, cultural y empresarial que busca fortalecer la formación integral de los estudiantes, visibilizar los procesos académicos e investigativos de la institución y consolidar el relacionamiento con empresas y comunidades de emprendimiento de la región.
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img
                  src={IntroduccionImg}
                  alt="Introducción"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </motion.div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-uniblue rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Población objetivo</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.ul
                className="space-y-3 text-gray-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
              >
                {[
                  "Estudiantes de pregrado y posgrado de la Facultad de Ingeniería y de otros programas afines.",
                  "Docentes, egresados y directivos académicos.",
                  "Comunidades de emprendimiento y empresarios aliados.",
                  "Instituciones educativas de la región (colegios invitados a la Hackatón).",
                  "Público externo interesado en innovación, ingeniería y desarrollo tecnológico.",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeUp}
                    className="flex items-start gap-2"
                  >
                    <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img
                  src={PoblacionObjetivoImg}
                  alt="Población objetivo"
                  className="w-full h-56 object-cover rounded-xl shadow-md"
                />
              </motion.div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-uniblue rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Sedes</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <motion.p
                className="text-gray-700 leading-relaxed text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                Sede Pance y Meléndez: espacios académicos, culturales y deportivos, incluyendo el Auditorio Lumen, laboratorios, aulas especializadas, zonas deportivas y áreas de exposición para la feria empresarial y de emprendimiento.
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img
                  src={SedesImg}
                  alt="Sedes"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
              </motion.div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 bg-uniblue rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Temáticas a trabajar</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.ul
                className="space-y-3 text-gray-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
              >
                {[
                  "Inteligencia Artificial y transformación digital: aplicaciones, tendencias y retos en la ingeniería.",
                  "Habilidades y competencias profesionales: liderazgo, trabajo en equipo, comunicación efectiva y desarrollo personal.",
                  "Ingeniería aplicada: proyectos de investigación, innovación y desarrollo tecnológico.",
                  "Ámbito académico e investigativo: exposición de trabajos de grado, semilleros de investigación y producción académica de la Facultad.",
                  "Emprendimiento y relacionamiento empresarial: feria de emprendimiento y empresarial, participación de aliados estratégicos y visibilidad de proyectos innovadores.",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeUp}
                    className="flex items-start gap-2"
                  >
                    <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img
                  src={TematicasImg}
                  alt="Temáticas"
                  className="w-full h-56 object-cover rounded-xl shadow-md"
                />
              </motion.div>
            </div>
          </section>
        </div>

        {/* === OBJETIVOS (con animaciones mejoradas) === */}
        <section className="mt-20 space-y-20 text-gray-700">
          <motion.h3
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <div className="inline-flex border-l-4 border-uniblue pl-4 py-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                OBJETIVOS
              </h2>
            </div>
          </motion.h3>

          {/* Objetivo General - Izquierda con imagen derecha */}
          <motion.section
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Contenido del Objetivo General */}
              <motion.div
                className="space-y-6"
                variants={slideRight}
              >
                <motion.div className="flex items-center gap-4" variants={fadeUp}>
                  <div className="inline-flex border-l-4 border-uniblue pl-4 py-2">
                    <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                      Objetivo General
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-700 leading-relaxed"
                  variants={fadeUp}
                >
                  Consolidar la XI Semana de la Ingeniería como un espacio de innovación, liderazgo y futuro, articulando la academia, el sector empresarial y la sociedad mediante actividades académicas, investigativas, culturales y de emprendimiento.
                </motion.p>
              </motion.div>

              {/* Imagen del Objetivo General */}
              <motion.div
                className="flex justify-center lg:justify-end relative"
                variants={slideRight}
              >
                {/* Elemento decorativo de fondo */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-uniblue/10 to-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl" />
                <motion.div
                  className="relative w-full max-w-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[3 /4] rounded-3xl overflow-hidden shadow-2xl">
                    <motion.img
                      src={ObjGeneralImg}
                      alt="Objetivo General - Innovación 360°"
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-uniblue/30 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Objetivos Específicos - Derecha con imagen izquierda */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <motion.div
                className="flex justify-center lg:justify-start order-2 lg:order-1 relative"
                variants={slideRight}
              >
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl" />
                <motion.div
                  className="relative w-full max-w-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <motion.img
                      src={ObjEspecificosImg}
                      alt="Objetivos Específicos - Desarrollo Integral"
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="space-y-6 order-1 lg:order-2"
                variants={fadeUp}
              >
                <motion.div className="inline-flex" variants={fadeUp}>
                  <div className="border-l-4 border-uniblue pl-4 py-2">
                    <span className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                      Objetivos Específicos
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {[
                    { title: "Explorar el futuro digital", text: "Fomentar la reflexión y actualización sobre tendencias en inteligencia artificial y transformación digital." },
                    { title: "Potenciar el talento humano", text: "Fortalecer habilidades blandas y competencias clave para el liderazgo y el trabajo colaborativo." },
                    { title: "Visibilizar el conocimiento", text: "Generar espacios para la divulgación de proyectos académicos, investigativos y de grado." },
                    { title: "Conectar con el ecosistema empresarial", text: "Establecer y fortalecer vínculos con empresas aliadas y comunidades de emprendimiento." },
                  ].map((obj, idx) => (
                    <motion.div
                      key={idx}
                      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-uniblue hover:border-unigold"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
                      }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <h4 className="text-lg font-bold text-gray-800 leading-tight">{obj.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-6">{obj.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </section>
      </div>
    </section>
  );
}

function AnimatedStats() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [values, setValues] = React.useState({
    asistentes: 0,
    aliados: 0,
    actividades: 0,
  });

  React.useEffect(() => {
    if (!isInView) return;
    const targets = { asistentes: 500, aliados: 15, actividades: 20 };
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValues({
        asistentes: Math.floor(targets.asistentes * easeOutCubic(t)),
        aliados: Math.floor(targets.aliados * easeOutCubic(t)),
        actividades: Math.floor(targets.actividades * easeOutCubic(t)),
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isInView]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
      {[
        { label: "Asistentes", value: values.asistentes, suffix: "+" },
        { label: "Aliados", value: values.aliados, suffix: "+" },
        { label: "Actividades", value: values.actividades, suffix: "+" },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 text-center shadow-sm"
        >
          <div className="text-4xl md:text-5xl font-extrabold text-uniblue">
            {stat.value}{stat.suffix}
          </div>
          <div className="mt-1 text-gray-600 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
