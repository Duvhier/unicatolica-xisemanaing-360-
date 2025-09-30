import { motion, type Variants, useInView } from "framer-motion";
import React from "react";
import IntroduccionImg from "@/assets/introduccion.png";
import PoblacionObjetivoImg from "@/assets/poblacion.jpg";
import SedesImg from "@/assets/sedes.webp";
import TematicasImg from "@/assets/tematica.jpg";

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

        <motion.div
          className="mt-16 bg-gradient-to-r from-uniblue to-uniblueLight rounded-3xl p-8 sm:p-12 md:p-14 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Columna izquierda: Objetivo General */}
            <div className="space-y-7">
              <div className="flex items-center gap-5">
                <div className="h-18 w-18 md:h-20 md:w-20 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v18"/>
                    <path d="M3 12h18"/>
                    <circle cx="12" cy="12" r="7"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">Objetivo General</h3>
              </div>
              <p className="text-white/90 leading-relaxed text-lg md:text-xl">
                Consolidar la XI Semana de la Ingeniería como un espacio de innovación, liderazgo y futuro,
                articulando la academia, el sector empresarial y la sociedad mediante actividades académicas,
                investigativas, culturales y de emprendimiento.
              </p>
              {/* Icono 360° */}
              <div className="mt-18 md:mt-20 lg:mt-24 flex justify-center">
                <div className="relative h-36 w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 group">
                  <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm shadow-inner" />
                  <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="grad360" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <g className="origin-center animate-[spin_18s_linear_infinite] group-hover:animate-[spin_6s_linear_infinite]">
                      <circle cx="60" cy="60" r="46" stroke="url(#grad360)" strokeWidth="6" />
                      <path d="M96 60a36 36 0 1 1-10.55-25.45" stroke="#a5b4fc" strokeWidth="6" strokeLinecap="round"/>
                      <path d="M86 26l8 2-2 8" fill="none" stroke="#a5b4fc" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="800" fill="#ffffff">360°</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Columna derecha: Objetivos específicos */}
            <div>
              <div className="inline-flex mb-7">
                <span className="px-8 py-4 rounded-full bg-[#7c4dff] text-white text-2xl md:text-3xl font-extrabold shadow-md">
                  Objetivos Específicos
                </span>
              </div>

              <motion.div className="space-y-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <motion.div variants={fadeUp} className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-indigo-100 flex items-center justify-center ring-1 ring-indigo-200 transition-colors group-hover:bg-indigo-200">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 9a5 5 0 0 1 10 0c0 2-1 3-2 4-.6.6-1 1.2-1 2v1H10v-1c0-.8-.4-1.4-1-2-1-1-2-2-2-4Z"/>
                      <path d="M9 19h6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-extrabold text-uniblue">Explorar el futuro digital</h4>
                    <p className="text-gray-600 mt-2 text-base md:text-lg">
                      Fomentar la reflexión y actualización sobre tendencias en inteligencia artificial y transformación digital.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-indigo-100 flex items-center justify-center ring-1 ring-indigo-200 transition-colors group-hover:bg-indigo-200">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 12l3 3a3 3 0 0 1-6 0l-5-5a3 3 0 1 1 4-4l2 2"/>
                      <path d="M22 8l-7 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-extrabold text-uniblue">Potenciar el talento humano</h4>
                    <p className="text-gray-600 mt-2 text-base md:text-lg">
                      Fortalecer habilidades blandas y competencias clave para el liderazgo y el trabajo colaborativo.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-indigo-100 flex items-center justify-center ring-1 ring-indigo-200 transition-colors group-hover:bg-indigo-200">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 11v2"/>
                      <path d="M7 9v6"/>
                      <path d="M21 8l-8 4v4l8 4V8Z"/>
                      <path d="M13 12H7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-extrabold text-uniblue">Visibilizar el conocimiento</h4>
                    <p className="text-gray-600 mt-2 text-base md:text-lg">
                      Generar espacios para la divulgación de proyectos académicos, investigativos y de grado.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-indigo-100 flex items-center justify-center ring-1 ring-indigo-200 transition-colors group-hover:bg-indigo-200">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8"/>
                      <path d="M2 12h20"/>
                      <path d="M12 2a15 15 0 0 1 0 20"/>
                      <path d="M12 2a15 15 0 0 0 0 20"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-extrabold text-uniblue">Conectar con el ecosistema empresarial</h4>
                    <p className="text-gray-600 mt-2 text-base md:text-lg">
                      Establecer y fortalecer vínculos con empresas aliadas y comunidades de emprendimiento.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
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
    const targets = { asistentes: 1200, aliados: 25, actividades: 40 };
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
  