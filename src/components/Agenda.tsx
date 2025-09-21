export default function Agenda() {
    const agenda = [
      {
        dia: "Día 1",
        fecha: "Lunes, 25 de Noviembre",
        tema: "Biotecnología y Gestión Ambiental",
        actividades: [
          { hora: "08:00", evento: "Registro y Bienvenida", tipo: "Registro" },
          { hora: "09:00", evento: "Conferencia: Avances en Biotecnología", tipo: "Conferencia" },
          { hora: "10:30", evento: "Coffee Break", tipo: "Pausa" },
          { hora: "11:00", evento: "Panel: Gestión Ambiental Sostenible", tipo: "Panel" },
          { hora: "12:30", evento: "Almuerzo", tipo: "Almuerzo" },
          { hora: "14:00", evento: "Taller: Tecnologías Verdes", tipo: "Taller" },
          { hora: "16:00", evento: "Presentación de Proyectos Estudiantiles", tipo: "Presentación" }
        ]
      },
      {
        dia: "Día 2",
        fecha: "Martes, 26 de Noviembre",
        tema: "Inteligencia Artificial e Industria 4.0",
        actividades: [
          { hora: "08:30", evento: "Conferencia Magistral: IA en la Ingeniería", tipo: "Conferencia" },
          { hora: "10:00", evento: "Coffee Break", tipo: "Pausa" },
          { hora: "10:30", evento: "Workshop: Machine Learning Aplicado", tipo: "Workshop" },
          { hora: "12:00", evento: "Almuerzo", tipo: "Almuerzo" },
          { hora: "13:30", evento: "Panel: Industria 4.0 en Colombia", tipo: "Panel" },
          { hora: "15:00", evento: "Demostración: IoT y Automatización", tipo: "Demostración" },
          { hora: "16:30", evento: "Networking Empresarial", tipo: "Networking" }
        ]
      },
      {
        dia: "Día 3",
        fecha: "Miércoles, 27 de Noviembre",
        tema: "Ingeniería de Software y Seguridad Alimentaria",
        actividades: [
          { hora: "08:30", evento: "Conferencia: Ciberseguridad en el Software", tipo: "Conferencia" },
          { hora: "10:00", evento: "Coffee Break", tipo: "Pausa" },
          { hora: "10:30", evento: "Taller: Desarrollo de Software Sostenible", tipo: "Taller" },
          { hora: "12:00", evento: "Almuerzo", tipo: "Almuerzo" },
          { hora: "13:30", evento: "Panel: Seguridad Alimentaria Digital", tipo: "Panel" },
          { hora: "15:00", evento: "Presentación Final de Proyectos", tipo: "Presentación" },
          { hora: "16:30", evento: "Clausura y Entrega de Certificados", tipo: "Clausura" }
        ]
      }
    ];

    const getTipoColor = (tipo: string) => {
      switch (tipo) {
        case "Conferencia": return "bg-uniblue text-white";
        case "Panel": return "bg-uniblueLight text-white";
        case "Taller": return "bg-unigold text-black";
        case "Workshop": return "bg-unigold text-black";
        case "Presentación": return "bg-green-500 text-white";
        case "Demostración": return "bg-purple-500 text-white";
        case "Networking": return "bg-orange-500 text-white";
        case "Registro": return "bg-gray-500 text-white";
        case "Pausa": return "bg-yellow-400 text-black";
        case "Almuerzo": return "bg-red-500 text-white";
        case "Clausura": return "bg-uniblue text-white";
        default: return "bg-gray-400 text-white";
      }
    };

    return (
      <section id="agenda" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
              Agenda del Evento
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tres días de aprendizaje, innovación y networking en el mundo de la ingeniería moderna.
            </p>
          </div>
          
          <div className="space-y-12">
            {agenda.map((dia, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-uniblue to-uniblueLight text-white p-8">
                  <h3 className="text-3xl font-bold mb-2">{dia.dia}</h3>
                  <p className="text-xl text-gray-200 mb-2">{dia.fecha}</p>
                  <p className="text-unigold font-semibold">{dia.tema}</p>
                </div>
                
                <div className="p-8">
                  <div className="space-y-4">
                    {dia.actividades.map((actividad, actIndex) => (
                      <div key={actIndex} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="bg-uniblue text-white px-4 py-2 rounded-full font-bold min-w-[80px] text-center">
                          {actividad.hora}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-medium text-gray-800">{actividad.evento}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(actividad.tipo)}`}>
                          {actividad.tipo}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-uniblue mb-6 text-center">Información Importante</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-uniblue mb-3">Lugar del Evento</h4>
                <p className="text-gray-600">
                  Universidad Católica de Colombia<br/>
                  Auditorio Principal<br/>
                  Carrera 13 #24-15, Bogotá D.C.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-uniblue mb-3">Incluye</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Certificado de participación</li>
                  <li>• Material académico</li>
                  <li>• Coffee breaks</li>
                  <li>• Networking con empresas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  