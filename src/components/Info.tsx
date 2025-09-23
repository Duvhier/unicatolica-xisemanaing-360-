 

export default function Info() {
    return (
      <section id="info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex">
              <h2 className="px-8 py-4 rounded-full bg-uniblue text-white text-3xl md:text-4xl font-extrabold shadow-lg tracking-wide">
                INFORMACIÓN
              </h2>
            </div>
          </div>
          
          <div className="space-y-10 text-gray-700">
            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">1. Introducción</h3>
              <p className="leading-relaxed">
                La Facultad de Ingeniería de la Fundación Universitaria Católica Lumen Gentium – UNICATÓLICA organiza la XI Semana de la Ingeniería – “360°: Innovación, Liderazgo y Futuro”, un evento académico, investigativo, cultural y empresarial que busca fortalecer la formación integral de los estudiantes, visibilizar los procesos académicos e investigativos de la institución y consolidar el relacionamiento con empresas y comunidades de emprendimiento de la región.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">2. Población objetivo</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Estudiantes de pregrado y posgrado de la Facultad de Ingeniería y de otros programas afines.</li>
                <li>Docentes, egresados y directivos académicos.</li>
                <li>Comunidades de emprendimiento y empresarios aliados.</li>
                <li>Instituciones educativas de la región (colegios invitados a la Hackatón).</li>
                <li>Público externo interesado en innovación, ingeniería y desarrollo tecnológico.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">3. Sedes</h3>
              <p className="leading-relaxed">
                Sede Pance y Meléndez : espacios académicos, culturales y deportivos, incluyendo el Auditorio Lumen, laboratorios, aulas especializadas, zonas deportivas y áreas de exposición para la feria empresarial y de emprendimiento.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">4. Temáticas a trabajar</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Inteligencia Artificial y transformación digital: aplicaciones, tendencias y retos en la ingeniería.</li>
                <li>Habilidades y competencias profesionales: liderazgo, trabajo en equipo, comunicación efectiva y desarrollo personal.</li>
                <li>Ingeniería aplicada: proyectos de investigación, innovación y desarrollo tecnológico.</li>
                <li>Ámbito académico e investigativo: exposición de trabajos de grado, semilleros de investigación y producción académica de la Facultad.</li>
                <li>Emprendimiento y relacionamiento empresarial: feria de emprendimiento y empresarial, participación de aliados estratégicos y visibilidad de proyectos innovadores.</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-uniblue to-uniblueLight rounded-3xl p-8 sm:p-12 md:p-14 text-white">
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
                {/* Icono 360° animado y alineado con la columna derecha */}
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

                <div className="space-y-5">
                  <div className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
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
                  </div>

                  <div className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
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
                  </div>

                  <div className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
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
                  </div>

                  <div className="group bg-white text-uniblue rounded-2xl p-6 md:p-7 shadow-lg flex items-start gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-indigo-200">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  