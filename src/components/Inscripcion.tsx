import { useState } from "react";
import ConferenciaImg from "../assets/CONFERENCIA COACHING-8.png";
import ActoInauguralImg from "../assets/ACTO INAUGURAL-8.png";
import Technological from "../assets/TECNOLOGICAL TOUCH-8.png";
import IndustriaAcImg from "../assets/INDUSTRIA EN ACCION-8.png";
import VisitaEmpr12nov from "../assets/VISITA EMPRESARIAL -12-8.png";
import VisitaZonaAmerica from "../assets/VISITA - EMPRESARIAL  -8 ZONAAMERICA.png";
import Visita14nov from "../assets/VISITA EMPRESARIAL - 14-8.png";
import Visita15nov from "../assets/VISITA EMPRESARIAL -8.png";
import XimenaOtero from "../assets/ponentes/ximena-otero.jpg";
import JulianPortocarrero from "../assets/ponentes/julian-portocarrero.jpg";
import LorenaCeron from "../assets/ponentes/lorena-ceron.jpg";
import CarlosMolina from "../assets/ponentes/carlos-molina.jpg";
import JorgeBris from "../assets/ponentes/jorge-bris.jpg";
import BrandoRonald from "../assets/ponentes/HACKATON copia-8.png";
import ComiteHackathon from "../assets/ponentes/comite-hackaton.png";

// Definir tipos TypeScript
interface Ponente {
  nombre: string;
  titulo: string;
  foto: string;
  especialidad: string;
}

interface Actividad {
  id: number;
  hora: string;
  titulo: string;
  ponente: string;
  lugar: string;
  tipo: string;
  destacado: boolean;
  exclusivo?: string;
  aliado?: string;
  botonRegistro?: boolean;
  urlRegistro?: string;
  imagen?: string;
}

interface DiaCronograma {
  dia: string;
  actividades: Actividad[];
}

interface TooltipPosition {
  x: number;
  y: number;
}

export default function CronogramaActividades() {
  const FORM_URL = "/liderazgo";
  // Estados con tipado correcto
  const [diasAbiertos, setDiasAbiertos] = useState<{ [key: number]: boolean }>({ 0: true });
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [ponenteSeleccionado, setPonenteSeleccionado] = useState<Ponente | null>(null);

  // Función toggleDia con tipado correcto
  const toggleDia = (index: number) => {
    setDiasAbiertos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Base de datos de ponentes con tipado
  const basePonentes: { [key: string]: Ponente } = {
    "Ximena Otero Pilonieta - Coach": {
      nombre: "Ximena Otero Pilonieta",
      titulo: "Coach Profesional & Consultora en Liderazgo",
      foto: XimenaOtero,
      especialidad: "Desarrollo Personal y Liderazgo",
    },
    "Ing. Julián Portocarrero H.": {
      nombre: "Julián Portocarrero Hermann",
      titulo: "Ingeniero de Sistemas & Especialista en IA",
      foto: JulianPortocarrero,
      especialidad: "Inteligencia Artificial y Educación",
    },
    "PhD Julián Portocarrero Hermann": {
      nombre: "Julián Portocarrero Hermann",
      titulo: "PhD en Ciencias de la Computación",
      foto: JulianPortocarrero,
      especialidad: "Investigación en IA y Machine Learning",
    },
    "Mag. Lorena Cerón": {
      nombre: "Lorena Cerón",
      titulo: "Magister en Ingeniería de Software",
      foto: LorenaCeron,
      especialidad: "IA Aplicada y Casos de Uso Empresarial",
    },
    "Mag. Carlos Molina": {
      nombre: "Carlos Molina",
      titulo: "Magister en Educación & Tecnología",
      foto: CarlosMolina,
      especialidad: "Metodologías de Enseñanza y Tecnología Educativa",
    },
    "PhD Jorge Luis Bris": {
      nombre: "Jorge Luis Bris",
      titulo: "PhD en Ingeniería de Sistemas",
      foto: JorgeBris,
      especialidad: "Formación en Ingeniería y Acreditación de Programas",
    },
    "Profesores Brandon Rosero - Ronald Rengifo": {
      nombre: "Brandon Rosero y Ronald Rengifo",
      titulo: "Coordinadores de Competencias Tecnológicas",
      foto: BrandoRonald,
      especialidad: "Hackathons y Competencias de Programación",
    },
    "Profesores Hernando Mosquera, Kellin, Nelson Andrade": {
      nombre: "José Hernando Mosquera, Kellin, Nelson Andrade",
      titulo: "Comité de Hackathon Universidades",
      foto: ComiteHackathon,
      especialidad: "Coordinación de Eventos Tecnológicos Interuniversitarios",
    }
  };

  const cronograma: DiaCronograma[] = [
    {
      dia: "LUNES 10 NOV",
      actividades: [
        {
          id: 1,
          hora: "3:00 pm - 5:00 pm",
          titulo: "Desarrollo Personal y Liderazgo",
          ponente: "Ximena Otero Pilonieta - Coach",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Conferencia",
          destacado: true,
          exclusivo: "Docentes y Administrativos"
        }
      ]
    },
    {
      dia: "MARTES 11 NOV",
      actividades: [
        {
          id: 2,
          hora: "6:30 pm - 7:15 pm",
          titulo: "Acto Inaugural",
          ponente: "",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Ceremonia",
          destacado: true,
          imagen: ActoInauguralImg
        },
        {
          id: 3,
          hora: "7:20 pm - 8:20 pm",
          titulo: "Aplicaciones de la I.A en la Educación",
          ponente: "Ing. Julián Portocarrero H.",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Conferencia",
          aliado: "Escuela Militar de Aviación Marco Fidel Suarez – EMAVI",
          destacado: false
        },
        {
          id: 4,
          hora: "8:30 pm - 9:00 pm",
          titulo: "Conversatorio: La I.A y el Futuro Profesional",
          ponente: "",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Conversatorio",
          destacado: false
        }
      ]
    },
    {
      dia: "MIÉRCOLES 12 NOV",
      actividades: [
        {
          id: 5,
          hora: "8:00 am - 12:00 pm",
          titulo: "Hackathon Colegios",
          ponente: "Profesores Brandon Rosero - Ronald Rengifo",
          lugar: "Salas 1, 2 – Sede Pance",
          tipo: "Competencia",
          destacado: false
        },
        {
          id: 6,
          hora: "9:00 am - 12:00 pm",
          titulo: "Visita Empresarial",
          ponente: "",
          lugar: "Centro de Innovación y Desarrollo Empresarial - CIDE",
          tipo: "Visita",
          destacado: false,
          imagen: VisitaEmpr12nov
        },
        {
          id: 7,
          hora: "10:00 am - 11:00 am",
          titulo: "Conferencia",
          ponente: "PhD Julián Portocarrero Hermann",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Conferencia",
          destacado: false
        },
        {
          id: 8,
          hora: "2:00 pm - 5:00 pm",
          titulo: "Hackathon Unicatólica",
          ponente: "Profesores Brandon Rosero - Ronald Renfigo",
          lugar: "Salas 1, 2, 3 – Sede Pance",
          tipo: "Competencia",
          destacado: false,
        },
        {
          id: 9,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Hackathon Universidades",
          ponente: "Profesores José Hernando Mosquera, Kellin, Nelson Andrade",
          lugar: "Salas 1, 2, 3 – Sede Pance",
          tipo: "Competencia",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario"
        },
        {
          id: 10,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Industria en Acción",
          ponente: "",
          lugar: "Laboratorio de Ingeniería e Innovación – Sede Pance",
          tipo: "Taller",
          destacado: false,
          imagen: IndustriaAcImg
        },
        {
          id: 11,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Dobla Lumen",
          ponente: "",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Evento",
          destacado: false
        },
        {
          id: 12,
          hora: "7:00 pm - 8:00 pm",
          titulo: "IA en la Práctica y Casos de Uso",
          ponente: "Mag. Lorena Cerón",
          lugar: "Salón A201 – Sede Pance",
          tipo: "Conferencia",
          destacado: true
        }
      ]
    },
    {
      dia: "JUEVES 13 NOV",
      actividades: [
        {
          id: 13,
          hora: "9:00 am - 12:00 pm",
          titulo: "Visita Empresarial – ZONAMERICA",
          ponente: "",
          lugar: "Zonamérica - Calle 36, Auto. Cali - Jamundi #760030 128-321",
          tipo: "Visita",
          destacado: true,
          imagen: VisitaZonaAmerica
        },
        {
          id: 14,
          hora: "10:00 am - 12:00 pm",
          titulo: "Olimpiada en Lógica Matemática",
          ponente: "",
          lugar: "Sala 3 de Sistemas – Sede Pance",
          tipo: "Competencia",
          destacado: false
        },
        {
          id: 15,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Technological Touch 2025",
          ponente: "",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Evento",
          destacado: true,
          imagen: Technological
        }
      ]
    },
    {
      dia: "VIERNES 14 NOV",
      actividades: [
        {
          id: 16,
          hora: "9:00 am - 12:00 pm",
          titulo: "Visita Empresarial",
          ponente: "",
          lugar: "Por Confirmar",
          tipo: "Visita",
          destacado: false,
          imagen: Visita14nov
        },
        {
          id: 17,
          hora: "10:00 am - 11:00 am",
          titulo: "Taller Aplicado / Refuerzo",
          ponente: "Mag. Carlos Molina",
          lugar: "Sala 2 de Sistemas – Sede Pance",
          tipo: "Taller",
          destacado: false
        },
        {
          id: 18,
          hora: "11:00 am - 12:00 pm",
          titulo: "Entrevista: La formación de los programas de Ingeniería. Caso Universidad del Norte",
          ponente: "PhD Jorge Luis Bris",
          lugar: "Estudio de Radio Lumen – Sede Meléndez",
          tipo: "Entrevista",
          destacado: false
        },
        {
          id: 19,
          hora: "6:30 pm - 8:00 pm",
          titulo: "Construcción red de ingenieros integrados",
          ponente: "",
          lugar: "Auditorio LUMEN - Sede Meléndez",
          tipo: "Networking",
          destacado: false
        },
        {
          id: 20,
          hora: "8:00 pm - 9:30 pm",
          titulo: "Clausura",
          ponente: "",
          lugar: "Auditorio LUMEN - Sede Meléndez",
          tipo: "Ceremonia",
          destacado: true,
        }
      ]
    },
    {
      dia: "SÁBADO 15 NOV",
      actividades: [
        {
          id: 21,
          hora: "9:00 am - 12:00 pm",
          titulo: "Visita Empresarial CDI ALIMENTOS CÁRNICOS",
          ponente: "",
          lugar: "CDI Alimentos Cárnicos",
          tipo: "Visita",
          destacado: false,
          imagen: Visita15nov
        }
      ]
    }
  ];

  const getIconoTipo = (tipo: string): string => {
    const iconos: { [key: string]: string } = {
      Conferencia: "🎤",
      Taller: "🛠️",
      Competencia: "🏆",
      Visita: "🏢",
      Conversatorio: "💬",
      Ceremonia: "⭐",
      Evento: "🎉",
      Networking: "🤝",
      Entrevista: "🎙️"
    };
    return iconos[tipo] || "📅";
  };

  // Agrega esta función para manejar el clic en la ubicación
  const abrirGoogleMaps = (lugar: string): void => {
    // Mapeo de lugares a coordenadas o direcciones específicas
    const ubicaciones: { [key: string]: string } = {
      "Auditorio Lumen – Sede Meléndez": "3.3761867004376307, -76.54341424861032",
      "Auditorio 1 – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Salas 1, 2 – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Salas 1, 2, 3 – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Laboratorio de Ingeniería e Innovación – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Salón A201 – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Sala 2 de Sistemas – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Sala 3 de Sistemas – Sede Pance": "3.345883489958763, -76.54095280254512",
      "Estudio de Radio Lumen – Sede Meléndez": "3.3783206078612413, -76.54568573174849",
      "Zonamérica - Calle 36, Auto. Cali - Jamundi #760030 128-321": "3.3271130704408827, -76.52122694047287",
      "CDI Alimentos Cárnicos": "3.519970195771467, -76.5100205483301"
    };

    // Buscar la ubicación en el mapeo
    const coordenadas = ubicaciones[lugar];

    if (coordenadas) {
      // Si tenemos coordenadas específicas, usar la URL de coordenadas
      window.open(`https://www.google.com/maps?q=${coordenadas}`, '_blank');
    } else {
      // Si no tenemos coordenadas, hacer búsqueda por texto
      const lugarCodificado = encodeURIComponent(lugar);
      window.open(`https://www.google.com/maps/search/?api=1&query=${lugarCodificado}`, '_blank');
    }
  };

  const handleRegistro = (actividad: Actividad): void => {
    if (actividad.urlRegistro) {
      // Redirigir a la URL específica del Hackathon
      window.location.href = actividad.urlRegistro;
    } else {
      // Comportamiento por defecto para otras actividades
      window.location.href = `${FORM_URL}?actividad=${actividad.id}`;
    }
  };
  // Funciones para manejar el tooltip con tipado correcto
  const mostrarTooltipPonente = (ponenteNombre: string, event: React.MouseEvent): void => {
    const ponenteInfo = basePonentes[ponenteNombre];
    if (ponenteInfo) {
      setPonenteSeleccionado(ponenteInfo);
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      });
      setTooltipVisible(true);
    }
  };

  const ocultarTooltip = (): void => {
    setTooltipVisible(false);
    setPonenteSeleccionado(null);
  };

  const parseFecha = (fechaStr: string): { diaNumero: string; mes: string } => {
    const partes = fechaStr.split(' ');
    return {
      diaNumero: partes[1],
      mes: partes[2]
    };
  };

  return (
    <div className="w-full my-12 relative">
      {/* Tooltip de Ponente */}
      {tooltipVisible && ponenteSeleccionado && (
        <div
          className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm animate-scale-in"
          style={{
            left: `${tooltipPosition.x + 20}px`,
            top: `${tooltipPosition.y - 100}px`,
          }}
          onMouseLeave={ocultarTooltip}
        >
          {/* Header del ponente */}
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar con gradiente de respaldo */}
            <div className="relative flex-shrink-0">
              {ponenteSeleccionado.foto ? (
                <div className="relative">
                  <img
                    src={ponenteSeleccionado.foto}
                    alt={ponenteSeleccionado.nombre}
                    className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-white"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-uniblue to-blue-600 rounded-xl -z-10 opacity-20"></div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-uniblue to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {ponenteSeleccionado.nombre.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              )}
            </div>

            {/* Información principal */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                {ponenteSeleccionado.nombre}
              </h3>
              <div className="inline-block bg-uniblue/10 text-uniblue px-3 py-1 rounded-full text-xs font-semibold mb-2">
                {ponenteSeleccionado.titulo}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {ponenteSeleccionado.especialidad}
              </p>
            </div>
          </div>

          {/* Flecha del tooltip mejorada */}
          <div className="absolute -left-2 top-12 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-white border-l border-b border-gray-100 rotate-45 shadow-sm"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div id="agenda" className="text-center mb-12">
        <div className="inline-flex border-l-4 border-uniblue pl-4 py-2 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            AGENDATE
          </h2>
        </div>
      </div>

      {/* Sección Destacada */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-2xl border-2 border-uniblue/20">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <img
                src={ConferenciaImg}
                alt="Conferencia Desarrollo Personal y Liderazgo"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="bg-uniblue text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                EVENTO DESTACADO
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-unigold rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Desarrollo Personal y Liderazgo
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">📅</span>
                  </div>
                  <span className="text-sm font-medium">Lun 10 Nov, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">🕒</span>
                  </div>
                  <span className="text-sm font-medium">3:00 PM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">📍</span>
                  </div>
                  <span className="text-sm font-medium">Auditorio 1 - Pance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white">🎤</span>
                  </div>
                  <span
                    className="text-sm font-semibold text-uniblue cursor-help hover:text-blue-700 transition-colors duration-200"
                    onMouseEnter={(e) => mostrarTooltipPonente("Ximena Otero Pilonieta - Coach", e)}
                    onMouseLeave={ocultarTooltip}
                  >
                    Ximena Otero Pilonieta
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRegistro(cronograma[0].actividades[0])}
                className="bg-uniblue text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors duration-200 border-b-4 border-blue-800 hover:border-blue-900 mb-4"
              >
                Inscribirme
              </button>

              <p className="text-sm text-gray-600 italic">
                Exclusiva para Docentes y Administrativos de UNICATÓLICA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cronograma por días con acordeón */}
      <div className="max-w-7xl mx-auto px-4">
        {cronograma.map((dia, index) => {
          const { diaNumero, mes } = parseFecha(dia.dia);

          return (
            <div key={index} className="mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* HEADER DEL ACORDEÓN - OPCIÓN 5 */}
              <button
                onClick={() => toggleDia(index)}
                className={`w-full flex items-center justify-between p-5 transition-all duration-300 border-l-4 ${diasAbiertos[index]
                  ? 'bg-blue-50 border-uniblue text-gray-800'
                  : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 text-center shadow-sm border ${diasAbiertos[index]
                    ? 'bg-uniblue text-white border-uniblue'
                    : 'bg-white text-uniblue border-gray-200'
                    }`}>
                    <div className="text-2xl font-bold leading-none">{diaNumero}</div>
                    <div className="text-sm uppercase font-semibold">{mes}</div>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold ${diasAbiertos[index] ? 'text-uniblue' : 'text-gray-800'
                      }`}>
                      {dia.dia}
                    </h3>
                    <p className={`text-sm ${diasAbiertos[index] ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                      Semana de la Ingeniería 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${diasAbiertos[index]
                    ? 'bg-uniblue text-white'
                    : 'bg-gray-200 text-gray-700'
                    }`}>
                    {dia.actividades.length}
                  </span>
                  <span className={`text-xl transition-transform duration-300 ${diasAbiertos[index] ? 'rotate-180 text-uniblue' : 'text-gray-500'
                    }`}>
                    ▼
                  </span>
                </div>
              </button>

              {/* CONTENIDO DEL ACORDEÓN */}
              {diasAbiertos[index] && (
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {dia.actividades.map((actividad) => (
                      <div
                        key={actividad.id}
                        className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md overflow-hidden ${actividad.destacado
                          ? "border-uniblue border-l-4"
                          : "border-gray-200 border-l-4 border-l-gray-300"
                          }`}
                      >
                        {/* Encabezado de la actividad */}
                        <div
                          className={`p-4 ${actividad.destacado
                            ? "bg-gradient-to-r from-uniblue to-blue-600"
                            : "bg-gradient-to-r from-gray-100 to-gray-200"
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className={`font-bold text-lg ${actividad.destacado ? "text-white" : "text-gray-800"
                              }`}>
                              {actividad.hora}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{getIconoTipo(actividad.tipo)}</span>
                              <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${actividad.destacado
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-300 text-gray-700"
                                  }`}
                              >
                                {actividad.tipo}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contenido de la actividad */}
                        <div className="p-6">
                          <h4
                            className={`text-xl font-bold mb-4 leading-tight ${actividad.destacado ? "text-uniblue" : "text-gray-800"
                              }`}
                          >
                            {actividad.titulo}
                          </h4>

                          <div className="space-y-3 mb-4">
                            {/* Ponente */}
                            {actividad.ponente && (
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-uniblue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-uniblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-500 mb-1">Ponente</p>
                                  <span
                                    className="font-medium text-gray-800 cursor-help hover:text-uniblue transition-colors duration-200 border-b border-dashed border-gray-400"
                                    onMouseEnter={(e) => mostrarTooltipPonente(actividad.ponente, e)}
                                    onMouseLeave={ocultarTooltip}
                                  >
                                    {actividad.ponente}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Lugar */}{/* Lugar con tooltip */}
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                                <button
                                  onClick={() => abrirGoogleMaps(actividad.lugar)}
                                  className="font-medium text-gray-800 cursor-pointer hover:text-uniblue transition-colors duration-200 border-b border-dashed border-gray-400 hover:border-uniblue text-left"
                                  title="Haz clic para ver en Google Maps"
                                >
                                  {actividad.lugar}
                                  <span className="ml-1 text-xs text-uniblue">📍</span>
                                </button>
                              </div>
                            </div>

                            {/* Aliado estratégico */}
                            {actividad.aliado && (
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-unigold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-unigold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-500 mb-1">Aliado Estratégico</p>
                                  <span className="font-semibold text-uniblue">{actividad.aliado}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {actividad.destacado && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold border border-yellow-200 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Destacado
                              </span>
                            )}
                            {actividad.exclusivo && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold border border-purple-200 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                {actividad.exclusivo}
                              </span>
                            )}
                          </div>

                          {/* Botón de inscripción para conferencias destacadas */}
                          {(actividad.destacado && actividad.tipo === "Conferencia") || actividad.botonRegistro ? (
                            <button
                              onClick={() => handleRegistro(actividad)}
                              className="w-full bg-uniblue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium border-b-4 border-blue-800 hover:border-blue-900 text-base"
                            >
                              {actividad.botonRegistro ? "🏆 Registrar en Hackathon" : "Inscribirme en esta conferencia"}
                            </button>
                          ) : null}

                          {/* Imagen de la actividad si existe */}
                          {actividad.imagen && (
                            <div className="mb-4">
                              <img
                                src={actividad.imagen}
                                alt={actividad.titulo}
                                className="w-full h-48 object-cover rounded-xl shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}