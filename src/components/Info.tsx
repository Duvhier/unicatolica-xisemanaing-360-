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
          <div className="inline-flex">
            <h2 className="px-8 py-4 rounded-full bg-uniblue text-white text-3xl md:text-4xl font-extrabold shadow-lg tracking-wide">
              INFORMACIÓN
            </h2>
          </div>
        </motion.div>

        {/* KPIs con conteo animado */}
        <AnimatedStats />

        <div className="space-y-10 text-gray-700">
          <section>
            <h3 className="text-2xl font-semibold text-uniblue mb-3">Introducción</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <motion.p className="leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
                La Facultad de Ingeniería de la Fundación Universitaria Católica Lumen Gentium – UNICATÓLICA organiza la XI Semana de la Ingeniería – “360°: Innovación, Liderazgo y Futuro”, un evento académico, investigativo, cultural y empresarial que busca fortalecer la formación integral de los estudiantes, visibilizar los procesos académicos e investigativos de la institución y consolidar el relacionamiento con empresas y comunidades de emprendimiento de la región.
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img src={IntroduccionImg} alt="Introducción" style={{ height: 220, width: "100%", objectFit: "cover", borderRadius: 16 }} />
              </motion.div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-uniblue mb-3">Población objetivo</h3>
            <motion.ul
              className="list-disc pl-6 space-y-2"
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
                <motion.li key={idx} variants={fadeUp}>{text}</motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={slideRight}
              className="w-full"
            >
              <img src={PoblacionObjetivoImg} alt="Población objetivo" style={{ height: 200, width: "100%", objectFit: "cover", borderRadius: 16, marginTop: 12 }} />
            </motion.div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-uniblue mb-3">Sedes</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <motion.p className="leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
                Sede Pance y Meléndez : espacios académicos, culturales y deportivos, incluyendo el Auditorio Lumen, laboratorios, aulas especializadas, zonas deportivas y áreas de exposición para la feria empresarial y de emprendimiento.
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={slideRight}
                className="w-full"
              >
                <img src={SedesImg} alt="Sedes" style={{ height: 220, width: "100%", objectFit: "cover", borderRadius: 16 }} />
              </motion.div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold text-uniblue mb-3">Temáticas a trabajar</h3>
            <motion.ul
              className="list-disc pl-6 space-y-2"
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
                <motion.li key={idx} variants={fadeUp}>{text}</motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={slideRight}
              className="w-full"
            >
              <img src={TematicasImg} alt="Temáticas" style={{ height: 200, width: "100%", objectFit: "cover", borderRadius: 16, marginTop: 12 }} />
            </motion.div>
          </section>
        </div>

        {/* === OBJETIVOS (con animaciones mejoradas) === */}
        <section className="mt-20 space-y-20 text-gray-700">
          <motion.h3 
            className="mb-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          > <h2 className="px-8 py-4 rounded-full bg-uniblue text-white text-3xl md:text-4xl font-extrabold shadow-lg tracking-wide">
            OBJETIVOS
            </h2>
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
                <span className="px-6 py-3 rounded-full bg-uniblue text-white text-xl md:text-2xl font-bold shadow-lg">
                    Objetivo General
                  </span>
                </motion.div>

                <motion.p 
                  className="text-lg leading-relaxed text-gray-700"
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
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Imagen de los Objetivos Específicos */}
              <motion.div 
                className="flex justify-center lg:justify-start order-2 lg:order-1 relative"
                variants={slideRight}
              >
                {/* Elemento decorativo de fondo */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl" />
                <motion.div 
                  className="relative w-full max-w-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <motion.img
                      src={ObjEspecificosImg}
                      alt="Objetivos Específicos - Desarrollo Integral"
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Contenido de los Objetivos Específicos */}
              <motion.div 
                className="space-y-6 order-1 lg:order-2"
                variants={fadeUp}
              >
                <motion.div className="inline-flex" variants={fadeUp}>
                  <span className="px-6 py-3 rounded-full bg-uniblue text-white text-xl md:text-2xl font-bold shadow-lg">
                    Objetivos Específicos
                  </span>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  variants={stagger}
                >
                  {[
                    {
                      title: "Explorar el futuro digital",
                      text: "Fomentar la reflexión y actualización sobre tendencias en inteligencia artificial y transformación digital.",
                      icon: (
                        <>
                          <path d="M7 9a5 5 0 0 1 10 0c0 2-1 3-2 4-.6.6-1 1.2-1 2v1H10v-1c0-.8-.4-1.4-1-2-1-1-2-2-2-4Z" />
                          <path d="M9 19h6" />
                        </>
                      ),
                    },
                    {
                      title: "Potenciar el talento humano",
                      text: "Fortalecer habilidades blandas y competencias clave para el liderazgo y el trabajo colaborativo.",
                      icon: (
                        <>
                          <path d="M12 12l3 3a3 3 0 0 1-6 0l-5-5a3 3 0 1 1 4-4l2 2" />
                          <path d="M22 8l-7 7" />
                        </>
                      ),
                    },
                    {
                      title: "Visibilizar el conocimiento",
                      text: "Generar espacios para la divulgación de proyectos académicos, investigativos y de grado.",
                      icon: (
                        <>
                          <path d="M3 11v2" />
                          <path d="M7 9v6" />
                          <path d="M21 8l-8 4v4l8 4V8Z" />
                          <path d="M13 12H7" />
                        </>
                      ),
                    },
                    {
                      title: "Conectar con el ecosistema empresarial",
                      text: "Establecer y fortalecer vínculos con empresas aliadas y comunidades de emprendimiento.",
                      icon: (
                        <>
                          <circle cx="12" cy="12" r="8" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15 15 0 0 1 0 20" />
                          <path d="M12 2a15 15 0 0 0 0 20" />
                        </>
                      ),
                    },
                  ].map((obj, idx) => (
                    <motion.div
                      key={idx}
                      className="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                      variants={fadeUp}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center ring-1 ring-purple-200 transition-colors group-hover:from-purple-200 group-hover:to-indigo-200">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-6 w-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            {obj.icon}
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg md:text-xl font-bold text-uniblue mb-2">
                            {obj.title}
                          </h4>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {obj.text}
                          </p>
                        </div>
                      </div>
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
