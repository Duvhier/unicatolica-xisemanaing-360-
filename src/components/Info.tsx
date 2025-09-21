export default function Info() {
    const ejesTematicos = [
      {
        titulo: "Biotecnología",
        descripcion: "Fusión de biología con tecnología para desarrollar aplicaciones innovadoras en salud, industria, medioambiente y agricultura.",
        icono: "🧬"
      },
      {
        titulo: "Inteligencia Artificial",
        descripcion: "Revolución en múltiples sectores mediante procesamiento de grandes volúmenes de datos con alta precisión y sistemas predictivos.",
        icono: "🤖"
      },
      {
        titulo: "Industria 4.0",
        descripcion: "Cuarta revolución industrial con automatización, digitalización y conectividad de procesos productivos mediante IoT y robótica.",
        icono: "⚙️"
      },
      {
        titulo: "Ingeniería de Software",
        descripcion: "Disciplina fundamental para la transformación digital, creación de aplicaciones inteligentes y soluciones en ciberseguridad.",
        icono: "💻"
      },
      {
        titulo: "Gestión Ambiental",
        descripcion: "Estrategias para minimizar el impacto humano en ecosistemas, promoviendo el uso responsable de recursos naturales.",
        icono: "🌱"
      },
      {
        titulo: "Seguridad Alimentaria",
        descripcion: "Garantizar el acceso a alimentos nutritivos mediante tecnologías innovadoras en agricultura y sistemas de distribución.",
        icono: "🍎"
      }
    ];

    return (
      <section id="info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
              Ejes Temáticos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora los avances científicos y tecnológicos que están moldeando el futuro 
              de la ingeniería y el desarrollo sostenible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ejesTematicos.map((eje, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{eje.icono}</div>
                  <h3 className="text-2xl font-bold text-uniblue mb-4">{eje.titulo}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  {eje.descripcion}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-uniblue to-uniblueLight rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">Objetivos del Evento</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-unigold">Explorar</h4>
                <p className="text-gray-200">
                  Avances científicos y tecnológicos en cada eje temático, analizando su aplicación 
                  en la resolución de problemáticas actuales.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 text-unigold">Promover</h4>
                <p className="text-gray-200">
                  Diálogo interdisciplinario entre investigadores, académicos, estudiantes y 
                  profesionales para el desarrollo de nuevas ideas.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4 text-unigold">Difundir</h4>
                <p className="text-gray-200">
                  Impacto de la tecnología en la sociedad a través de ponencias, estudios de caso 
                  y experiencias prácticas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  