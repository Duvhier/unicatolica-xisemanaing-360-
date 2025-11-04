import { useState, useEffect, useRef } from "react";
import ConferenciaImg from "../assets/CONFERENCIA COACHING-8.png";
import ActoInauguralImg from "../assets/ACTO INAUGURAL-8.png";
import Technological from "../assets/TECNOLOGICAL TOUCH-8.png";
import IndustriaAcImg from "../assets/INDUSTRIA EN ACCION-8.png";
import VisitaEmpr12nov from "../assets/VISITA EMPRESARIAL -12-8.png";
import VisitaZonaAmerica from "../assets/VISITA - EMPRESARIAL  -8 ZONAAMERICA.png";
import Visita14nov from "../assets/VISITA EMPRESARIAL - 14-8.png";
import Visita15nov from "../assets/VISITA EMPRESARIAL -8.png";
import HackathonImg from "../assets/HACKATON copia-8.png";
import HackathonMonitoriaImg from "../assets/HACKATON monitoria-8.png";
import ActoClausuraImg from "../assets/ACTO CLAUSURA-8.png";
import OlimpiadaImg from "../assets/OLIMPIADAS MATEMATICAS -8.png";
import VueloImg from "../assets/INICIACION AL VUELO-8.png";
import IAImg from "../assets/CONFERENCIA-IAPRACTICA-8.png";
import EntrevistaImg from "../assets/ENTREVISTA-8.png";
import XimenaOtero from "../assets/ponentes/ximena-otero.jpg";
import WordpressImg from "../assets/WORDPRESS.jpg";
import JulianPortocarrero from "../assets/ponentes/julian-portocarrero.jpg";
import LorenaCeron from "../assets/ponentes/lorena-ceron.jpg";
import CarlosMolina from "../assets/ponentes/carlos-molina.jpg";
import JorgeBris from "../assets/ponentes/jorge-bris.jpg";
import BrandoRonald from "../assets/ponentes/HACKATON copia-8.png";
import ComiteHackathon from "../assets/ponentes/comite-hackaton.png";
import Vicerrector from "../assets/ponentes/jorge-silva.jpg";
import VicSiigo from "../assets/ponentes/jaime-adalberto-lópez.jpg";
import DecanaClara from "../assets/ponentes/clara-eugenia-satizabal.png";
import ProfesorComputacion from "../assets/ponentes/josé-ordóñez-córdoba.jpg";

// Definir tipos TypeScript
interface Ponente {
  nombre: string;
  titulo: string;
  foto: string;
  especialidad: string;
  experiencia?: string;
  linkTrayectoria?: string;
}

interface CupoInfo {
  disponible: boolean;
  cuposDisponibles: number;
  cupoMaximo: number;
  inscritos: number;
  actividad: string;
  mensaje?: string;
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
  organizador?: string;
  participantes?: string[];
  estado?: string; // ← NUEVA PROPIEDAD
  mostrarRegistro?: boolean; // ← NUEVA PROPIEDAD
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
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Estados con tipado correcto
  const [diasAbiertos, setDiasAbiertos] = useState<{ [key: number]: boolean }>({ 0: true });
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [ponenteSeleccionado, setPonenteSeleccionado] = useState<Ponente | null>(null);
  const [cuposActividades, setCuposActividades] = useState<{ [key: number]: CupoInfo }>({});
  const [cargandoCupos, setCargandoCupos] = useState<boolean>(true);

  // Estados para el carrusel
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Estados para el temporizador del tooltip
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // ✅ NUEVA FUNCIÓN: Obtener cupos por defecto específicos para cada actividad
  const obtenerCuposPorDefecto = (): { [key: number]: CupoInfo } => {
    return {
      1: { // Liderazgo
        disponible: true,
        cuposDisponibles: 80,
        cupoMaximo: 100,
        inscritos: 20,
        actividad: "Desarrollo Personal y Liderazgo",
        mensaje: "Usuarios Registrados: 20/100"
      },
      2: { // Inaugural
        disponible: true,
        cuposDisponibles: 500,
        cupoMaximo: 500,
        inscritos: 0,
        actividad: "Acto Inaugural",
        mensaje: "Usuarios Registrados: 0/500"
      },
      5: { // Hackathon Colegios - NUEVO
        disponible: true,
        cuposDisponibles: 50,
        cupoMaximo: 80,
        inscritos: 30,
        actividad: "Hackathon Colegios",
        mensaje: "Usuarios Registrados: 30/80"
      },
      6: { // EMAVI
        disponible: true,
        cuposDisponibles: 40,
        cupoMaximo: 40,
        inscritos: 0,
        actividad: "Visita Emavi",
        mensaje: "Usuarios Registrados: 0/40"
      },
      7: { // Iniciación al Vuelo y a La Cohetería
        disponible: true,
        cuposDisponibles: 40,
        cupoMaximo: 40,
        inscritos: 0,
        actividad: "Iniciación al Vuelo y a La Cohetería",
        mensaje: "Usuarios Registrados: 0/40"
      },
      8: { // Hackathon Monitoría Remota
        disponible: true,
        cuposDisponibles: 50,
        cupoMaximo: 50,
        inscritos: 0,
        actividad: "Hackathon Monitoría Remota",
        mensaje: "Usuarios Registrados: 0/50"
      },
      9: { // Hackathon Universidades
        disponible: true,
        cuposDisponibles: 150,
        cupoMaximo: 150,
        inscritos: 0,
        actividad: "Hackathon Universidades",
        mensaje: "Usuarios Registrados: 0/150"
      },
      11: { // Dobla Lumen - NUEVO
        disponible: true,
        cuposDisponibles: 100,
        cupoMaximo: 100,
        inscritos: 0,
        actividad: "Dobla Lumen",
        mensaje: "Usuarios Registrados: 0/100"
      },
      12: { // IA en la Práctica y Casos de Uso - NUEVO
        disponible: true,
        cuposDisponibles: 40,
        cupoMaximo: 40,
        inscritos: 0,
        actividad: "IA en la Práctica y Casos de Uso",
        mensaje: "Usuarios Registrados: 0/40"
      },
      13: { // Zona América
        disponible: true,
        cuposDisponibles: 40,
        cupoMaximo: 40,
        inscritos: 0,
        actividad: "Visita Empresarial – ZONAMERICA",
        mensaje: "Usuarios Registrados: 0/40"
      },
      14: { // Olimpiada en Lógica Matemática - NUEVO
        disponible: true,
        cuposDisponibles: 100,
        cupoMaximo: 100,
        inscritos: 0,
        actividad: "Olimpiada en Lógica Matemática",
        mensaje: "Usuarios Registrados: 0/100"
      },
      15: { // Technological Touch
        disponible: true,
        cuposDisponibles: 200,
        cupoMaximo: 200,
        inscritos: 0,
        actividad: "Technological Touch 2025",
        mensaje: "Usuarios Registrados: 0/200"
      },
      21: { // Visita Empresarial CDI Alimentos Cárnicos - NUEVO
        disponible: true,
        cuposDisponibles: 24,
        cupoMaximo: 24,
        inscritos: 0,
        actividad: "Visita Empresarial CDI ALIMENTOS CÁRNICOS",
        mensaje: "Usuarios Registrados: 0/24"
      },
      22: { // Certificación Full Stack - Día 1
        disponible: true,
        cuposDisponibles: 30,
        cupoMaximo: 30,
        inscritos: 0,
        actividad: "Certificación Full Stack: Spring Boot, Angular & AI",
        mensaje: "Usuarios Registrados: 0/30"
      },
      23: { // Certificación Full Stack - Día 2
        disponible: true,
        cuposDisponibles: 30,
        cupoMaximo: 30,
        inscritos: 0,
        actividad: "Certificación Full Stack: Frontend Empresarial con Angular + AI",
        mensaje: "Usuarios Registrados: 0/30"
      },
      24: { // Certificación Full Stack - Día 3
        disponible: true,
        cuposDisponibles: 30,
        cupoMaximo: 30,
        inscritos: 0,
        actividad: "Certificación Full Stack: Integración Full Stack con AI",
        mensaje: "Usuarios Registrados: 0/30"
      },
    };
  };

  // ✅ NUEVA FUNCIÓN: Obtener cupo por defecto para una actividad específica
  const obtenerCupoPorDefecto = (id: number): { id: number, data: CupoInfo } => {
    const cuposPorDefecto = obtenerCuposPorDefecto();
    const cupoDefault = cuposPorDefecto[id] || {
      disponible: true,
      cuposDisponibles: 40,
      cupoMaximo: 40,
      inscritos: 0,
      actividad: `Actividad ${id}`,
      mensaje: "Usuarios Registrados: 0/40"
    };

    return { id, data: cupoDefault };
  };

  // Función para cargar los cupos de las actividades
  const cargarCuposActividades = async () => {
    try {
      setCargandoCupos(true);

      // IDs de actividades que tienen registro
      const actividadesConRegistro = [1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 21, 22, 23, 24];

      const promesasCupos = actividadesConRegistro.map(async (id) => {
        try {
          // ✅ CAMBIO: Usar el nuevo endpoint de estado-registros
          let endpoint = '';
          switch (id) {
            case 1: // Liderazgo
              endpoint = `${API_URL}/liderazgo/estado-registros`;
              break;
            case 2: // Inaugural
              endpoint = `${API_URL}/asistenciainaugural/estado-registros`;
              break;
            case 5: // Hackathon Colegios - NUEVO
              endpoint = `${API_URL}/hackathoncolegios/estado-registros`;
              break;
            case 6: // EMAVI
              endpoint = `${API_URL}/visitaemavi/estado-registros`;
              break;
            case 7: // Iniciación al Vuelo y a La Cohetería
              endpoint = `${API_URL}/tallervuelo/estado-registros`;
              break;
            case 8: // Hackathon Monitoría Remota
              endpoint = `${API_URL}/hackathonmonitoria/estado-registros`;
              break;
            case 9: // Hackathon Universidades
              endpoint = `${API_URL}/inscripciones/estado-registros`;
              break;
            case 10: // Industria en Acción - CORREGIDO: usar endpoint existente
              endpoint = `${API_URL}/industriaenaccion/estado-registros`;
              break;
            case 11: // DoblaLumen
              endpoint = `${API_URL}/doblalumen/estado-registros`;
              break;
            case 12: // IA en la Práctica - NUEVO
              endpoint = `${API_URL}/ia-practica/estado-registros`;
              break;
            case 13: // Zona América
              endpoint = `${API_URL}/visitazonaamerica/estado-registros`;
              break;
            case 14: // Olimpiada Matemática - NUEVO
              endpoint = `${API_URL}/olimpiadasmatematicas/estado-registros`;
              break;
            case 15: // Technological Touch
              endpoint = `${API_URL}/technological/estado-registros`;
              break;
            case 17: // WordPress
              endpoint = `${API_URL}/tallerwordpress/estado-registros`;
              break;
            case 21: // CDI Alimentos Cárnicos
              endpoint = `${API_URL}/visitacarnicos/estado-registros`;
              break;
            case 22: // Certificación Full Stack Día 1
            case 23: // Certificación Full Stack Día 2  
            case 24: // Certificación Full Stack Día 3
              endpoint = `${API_URL}/desarrollofullstack/estado-registros`;
              break;
            default:
              endpoint = `${API_URL}/api/actividades/estadisticas/${id}`;
          }
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();

            // ✅ ADAPTAR la respuesta según el endpoint
            let cupoInfo;
            if (endpoint.includes('estado-registros')) {
              cupoInfo = {
                disponible: data.data.disponible,
                cuposDisponibles: data.data.cupoMaximo - data.data.inscritos,
                cupoMaximo: data.data.cupoMaximo,
                inscritos: data.data.inscritos,
                actividad: `Actividad ${id}`,
                mensaje: data.data.mensaje
              };
            } else {
              cupoInfo = data;
            }

            return { id, data: cupoInfo };
          } else {
            console.warn(`Error en respuesta para actividad ${id}:`, response.status);
            // ✅ NUEVO: Retornar valores por defecto específicos para cada actividad
            return obtenerCupoPorDefecto(id);
          }
        } catch (error) {
          console.error(`Error cargando registros para actividad ${id}:`, error);
          // ✅ NUEVO: Retornar valores por defecto específicos para cada actividad
          return obtenerCupoPorDefecto(id);
        }
      });

      const resultados = await Promise.all(promesasCupos);

      const nuevosCupos: { [key: number]: CupoInfo } = {};
      resultados.forEach(({ id, data }) => {
        if (data) {
          nuevosCupos[id] = data;
        }
      });

      setCuposActividades(nuevosCupos);
    } catch (error) {
      console.error('Error cargando registros:', error);
      // ✅ NUEVO: Estado por defecto actualizado con los nuevos cupos
      setCuposActividades(obtenerCuposPorDefecto());
    } finally {
      setCargandoCupos(false);
    }
  };

  // Cargar cupos al montar el componente
  useEffect(() => {
    cargarCuposActividades();
  }, []);

  // Función para obtener información de cupos de una actividad 
  const obtenerInfoCupos = (actividadId: number): CupoInfo => {
    const info = cuposActividades[actividadId];

    // ✅ SIEMPRE retorna un objeto CupoInfo, nunca null
    if (!info) {
      // ✅ NUEVO: Usar los valores por defecto específicos
      const cuposPorDefecto = obtenerCuposPorDefecto();
      return cuposPorDefecto[actividadId] || {
        disponible: true,
        cuposDisponibles: 40,
        cupoMaximo: 40,
        inscritos: 0,
        actividad: `Actividad ${actividadId}`,
        mensaje: "Usuarios Registrados: 0/40"
      };
    }

    return info;
  };

  // Función para renderizar el badge de usuarios registrados - MODIFICADA
  const renderBadgeCupos = (actividadId: number) => {
    // ✅ Ahora obtenerInfoCupos siempre retorna un objeto, no null
    const infoCupos = obtenerInfoCupos(actividadId);

    if (cargandoCupos) {
      return (
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium border border-gray-200 flex items-center gap-1">
          <div className="w-2 h-2 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Cargando</span>
        </span>
      );
    }

    // ✅ infoCupos nunca es null ahora
    const { inscritos, cupoMaximo, disponible } = infoCupos;

    // ✅ Verificar que los valores sean números válidos
    const inscritosNum = Number(inscritos) || 0;
    const cupoMaximoNum = Number(cupoMaximo) || 0;

    // ✅ NUEVO: Mostrar usuarios registrados en lugar de cupos disponibles
    if (!disponible) {
      return (
        <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold border border-red-200 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {inscritosNum}/{cupoMaximoNum} Registrados
        </span>
      );
    }

    // ✅ NUEVO: Mostrar siempre el número de usuarios registrados
    const porcentaje = (inscritosNum / cupoMaximoNum) * 100;

    if (porcentaje >= 90) {
      return (
        <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-semibold border border-orange-200 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {inscritosNum}/{cupoMaximoNum} Registrados
        </span>
      );
    }

    return (
      <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-semibold border border-green-300 flex items-center gap-2 transition-all duration-300 hover:shadow-md">
        <div className="relative">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
          <svg className="w-3 h-3 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-bold">{inscritosNum}</span>
        <span className="text-green-600">/</span>
        <span>{cupoMaximoNum}</span>
        <span className="text-green-700">Registrados</span>
      </span>
    );
  };

  // Función toggleDia con tipado correcto
  const toggleDia = (index: number) => {
    setDiasAbiertos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // ✅ NUEVA FUNCIÓN: Obtener estado del evento
  const getEstadoEvento = (actividad: Actividad) => {
    if (actividad.estado === "activo") {
      return "activo";
    }
    return "normal";
  };

  // ✅ NUEVA FUNCIÓN: Renderizar badge de estado
  const renderBadgeEstado = (actividad: Actividad) => {
    const estado = getEstadoEvento(actividad);
    
    if (estado === "activo") {
      return (
        <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold border border-red-200 flex items-center gap-1 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          EN VIVO AHORA
        </span>
      );
    }
    return null;
  };

  // Base de datos de ponentes con tipado
  const basePonentes: { [key: string]: Ponente } = {
    "Coach Ximena Otero Pilonieta": {
      nombre: "Coach Ximena Otero Pilonieta",
      titulo: "Abogada & Coach en Eneagrama, Desarrollo Personal y Liderazgo",
      foto: XimenaOtero,
      especialidad: "Desarrollo Personal y Liderazgo",
      experiencia: "Profesional Especializado Grado 33, Corte Constitucional",
      linkTrayectoria: "https://www.linkedin.com/in/ximena-otero-pilonieta-73482339/"
    },
    "P&D Julián Portocarrero Hermann": {
      nombre: "P&D Julián Portocarrero Hermann",
      titulo: "Ingeniero Mecánico",
      foto: JulianPortocarrero,
      especialidad: "Ingeniero Mecánico",
      experiencia: "Gerente Técnico, P&D Ingeniería SAS; Docente, UNICUCES & EMAVI; Gerente Técnico, Pincay Ingenieros SAS; Docente-Investigador UAO",
      linkTrayectoria: "https://www.linkedin.com/in/juli%C3%A1n-portocarrero-77b95148/"
    },
    "Mag. Lorena Cerón": {
      nombre: "Ing. Lorena Cerón",
      titulo: "Ingeniera de Sistemas, Especialista y Magíster en Informática Educativa",
      foto: LorenaCeron,
      especialidad: "IA Aplicada y Casos de Uso Empresarial",
      experiencia: "Profesora Facultad de Ingeniería, Programa Ingeniería de Sistemas, Modalidad Virtual y Sincrónica Universidad Santiago de Cali",
      linkTrayectoria: "https://www.linkedin.com/in/lorena-cer%C3%B3n-9b485247/"
    },
    "Mag. Carlos Molina": {
      nombre: "Ing. Carlos Molina",
      titulo: "Profesor de Ingeniería Informática",
      foto: CarlosMolina,
      especialidad: "Director de Proyectos de Ingeniería Informática, Redtauros",
      experiencia: "Profesor de Ingeniería Informática, Unicatólica; Director de Proyectos de Ingeniería Informática, Redtauros y Prometheus Techs; Lider Formación y Desarrollo, Cafeto Software; Docente en Redes, Telecomunicaciones, Linux y Windows Server, Utap Cali",
      linkTrayectoria: "https://www.linkedin.com/in/carlos-eduardo-molina-contreras-455a0931/"
    },
    "P&D Jorge Luis Bris": {
      nombre: "P&D Jorge Luis Bris",
      titulo: "Full Professor - Mechanical Engineering Department en Universidad del Norte",
      foto: JorgeBris,
      especialidad: "Formación en Ingeniería y Acreditación de Programas",
      experiencia: "Sala de Ingeniería, Industria y Construcción CONACES, Ministerio de Educación Nacional; Full Professor - Mechanical Engineering Department, Universidad del Norte",
      linkTrayectoria: "https://www.linkedin.com/in/jorge-bris-4355a673/"
    },
    "Profesores Brandon Rosero - Ronald Rengifo": {
      nombre: "Brandon Rosero y Ronald Rengifo",
      titulo: "Coordinadores de Competencias Tecnológicas",
      foto: BrandoRonald,
      especialidad: "Hackathons y Competencias de Programación",
    },
    "Profesores José Hernando Mosquera & Nelson Andrade": {
      nombre: "Profesores José Hernando Mosquera & Nelson Andrade",
      titulo: "Comité de Hackathon Universidades",
      foto: ComiteHackathon,
      especialidad: "Coordinación de Eventos Tecnológicos Interuniversitarios",
    },
    "P&D Jorge Antonio Silva Leal": {
      nombre: "P&D Jorge Antonio Silva Leal",
      titulo: "Vicerrector Académico",
      foto: Vicerrector,
      especialidad: "Gestión Académica y Planeación Educativa",
      experiencia: "Vicerrector Académico, Unicatólica; Vicerrector Académico, Decano Facultad de Ingeniería, Universidad Santiago de Cali",
      linkTrayectoria: "https://www.linkedin.com/in/jorge-antonio-silva-leal-a36394326/"
    },
    "P&D Jaime Adalberto López Vivas": {
      nombre: "P&D Jaime Adalberto López Vivas",
      titulo: "Senior VP of Engineering at SIIGO | Software Architect | Tech Mentor",
      foto: VicSiigo,
      especialidad: "Liderazgo Empresarial y Tecnología",
      experiencia: "Senior VP of Engineering at SIIGO, Software Architect, Software Engineer, SIIGO; University Teacher, Universidad del Cauca",
      linkTrayectoria: "https://www.linkedin.com/in/jaimelopezv/"
    },
    "Ing. Clara Eugenia Satizabal Serna": {
      nombre: "Ing. Clara Eugenia Satizabal Serna",
      titulo: "Decana Facultad de Ingeniería",
      foto: DecanaClara,
      especialidad: "Gerencia de Proyectos, Maestría en Gestión de Proyectos Tecnológicos y candidata a Doctora en Ciencias de la Educación",
      experiencia: "Docente, Investigadora y Directora de Programas Académicos",
      linkTrayectoria: "https://lnkd.in/gqGwkJvX"
    },
    "Ing. José Armando Ordóñez Córdoba": {
      nombre: "Ing. José Armando Ordóñez Córdoba",
      titulo: "Profesor del Dpto. Computación y Sistemas Inteligentes - Universidad ICESI",
      foto: ProfesorComputacion,
      especialidad: "Acompañando organizaciones en la adopción de IA, a través de diagnóstico, formación ejecutiva y desarrollo de soluciones con impacto medible",
      experiencia: "Artificial Intelligence Masters Director, Director of Data Science Masters, Universidad ICESI; PostDoctoral AI Researcher, AI Researcher, Universidad del Cauca",
      linkTrayectoria: "https://www.linkedin.com/in/armandoordonez/"
    },
    "DevSeniorCode Academy": {
      nombre: "DevSeniorCode Academy",
      titulo: "Academia Especializada en Desarrollo de Software e Inteligencia Artificial",
      foto: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762102414/devsenioform_rjas9y.jpg", // Puedes cambiar esta imagen
      especialidad: "Formación en Spring Boot, Angular, AI y Desarrollo Full Stack",
      experiencia: "Capacitación en tecnologías modernas para el desarrollo de aplicaciones empresariales; Especialistas en integración de Inteligencia Artificial en aplicaciones web; Formación con certificación internacional",
      linkTrayectoria: "https://www.devseniorcode.com"
    },
    "Docente Jenny Alejandra Cadena Solarte": {
      nombre: "Docente Jenny Alejandra Cadena Solarte",
      titulo: "Docente en Fundación Universitaria Católica Lumen Gentium",
      foto: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762200946/jenny-cadena_skjthl.jpg",
      especialidad: "Administración y atención al cliente. Experiencia como Administrador, Auxiliar administrativo, Auxiliar de apoyo y Ejecutivo de servicio.",
      experiencia: "Coordinadora Fundación Universitaria Católica Lumen Gentium; Docente Universitaria Corporación Universitaria Minuto de Dios",
      linkTrayectoria: "https://www.linkedin.com/in/jenny-alejandra-cadena-solarte-a60a2929/?trk=opento_nprofile_details"
    },
  };

  const cronograma: DiaCronograma[] = [
    {
      dia: "LUNES 10 NOV",
      actividades: [
        {
          id: 1,
          hora: "3:00 pm - 5:00 pm",
          titulo: "Desarrollo Personal y Liderazgo",
          ponente: "Coach Ximena Otero Pilonieta",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Conferencia",
          destacado: true,
          imagen: ConferenciaImg,
          exclusivo: "Docentes y Administrativos"
        },
        // NUEVO EVENTO - CERTIFICACIÓN FULL STACK
        {
          id: 22,
          hora: "8:00 pm - 10:00 pm",
          titulo: "Certificación Full Stack: Spring Boot, Angular & AI",
          ponente: "DevSeniorCode Academy",
          lugar: "Modalidad Virtual",
          tipo: "Curso",
          destacado: true,
          exclusivo: "Estudiantes",
          aliado: "DevSeniorCode Academy",
          botonRegistro: true,
          urlRegistro: "/formulario-fullstack",
          imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762102414/devsenioform_rjas9y.jpg" // Puedes cambiar esta imagen después
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
          imagen: ActoInauguralImg,
          botonRegistro: true,
          urlRegistro: "/formulario-inaugural"
        },
        {
          id: 3,
          hora: "7:20 pm - 8:20 pm",
          titulo: "Aplicaciones de La IA en La Educación",
          ponente: "P&D Julián Portocarrero Hermann",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Conferencia",
          aliado: "Escuela Militar de Aviación Marco Fidel Suarez – EMAVI",
          destacado: false,
          mostrarRegistro: false // ← NUEVA PROPIEDAD
        },
        {
          id: 4,
          hora: "8:30 pm - 9:00 pm",
          titulo: "Conversatorio: La IA y El Futuro Profesional",
          ponente: "",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Conversatorio",
          destacado: false,
          participantes: [
            "Ing. Clara Eugenia Satizabal Serna - Decana Facultad de Ingeniería",
            "Ing. José Armando Ordóñez Córdoba - Profesor del Dpto. Computación y Sistemas Inteligentes - Universidad ICESI",
            "P&D Jaime Adalberto López Vivas - Senior VP of Engineering at SIIGO",
            "P&D Jorge Antonio Silva Leal - Vicerrector Académico",
            "P&D Julián Portocarrero Hermann - Ingeniero Mecánico",
          ]
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
          ponente: "",
          lugar: "Salas de Sistemas 1, 2 – Bloque B – Sede Pance",
          tipo: "Competencia",
          destacado: false,
          organizador: "Profesores Brandon Rosero - Ronald Rengifo"
        },
        {
          id: 6,
          hora: "8:00 am - 12:00 pm",
          titulo: "Visita Empresarial - EMAVI",
          ponente: "",
          lugar: "Escuela Militar de Aviación - EMAVI",
          tipo: "Visita",
          destacado: true,
          imagen: VisitaEmpr12nov,
          botonRegistro: true,
          urlRegistro: "/formulario-visitaemavi"
        },
        {
          id: 7,
          hora: "10:00 am - 12:00 pm",
          titulo: "Taller Teórico – Práctico de Iniciación al Vuelo y a La Cohetería ",
          ponente: "P&D Julián Portocarrero Hermann",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Conferencia",
          destacado: true,
          imagen: VueloImg,
          botonRegistro: true,
          urlRegistro: "/formulario-tallervuelo"
        },
        {
          id: 8,
          hora: "2:00 pm - 5:00 pm",
          titulo: "Hackathon Unicatólica",
          ponente: "",
          lugar: "Monitoría Remota",
          tipo: "Competencia",
          destacado: true,
          organizador: "Profesores Brandon Rosero - Ronald Rengifo",
          imagen: HackathonMonitoriaImg,
          botonRegistro: true,
          urlRegistro: "/formulario-hackathonmonitoria"
        },
        {
          id: 9,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Hackathon Universidades",
          ponente: "",
          lugar: "Salas de Sistemas 1, 2, 3 – Bloque B – Sede Pance",
          tipo: "Competencia",
          destacado: true,
          imagen: HackathonImg,
          botonRegistro: true,
          urlRegistro: "/formulario",
          organizador: "Profesores José Hernando Mosquera & Nelson Andrade"
        },
        {
          id: 10,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Industria en Acción",
          ponente: "",
          lugar: "Laboratorio de Ingeniería e Innovación – Sede Pance",
          tipo: "Taller",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-industriaenaccion",
          imagen: IndustriaAcImg
        },
        {
          id: 11,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Dobla Lumen",
          ponente: "",
          lugar: "Auditorio 1 – Sede Pance",
          tipo: "Evento",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-doblalumen",
          imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762091474/DOBLALUMEN-8_toblne.png",
        },
        {
          id: 12,
          hora: "7:00 pm - 8:00 pm",
          titulo: "IA en la Práctica y Casos de Uso",
          ponente: "Mag. Lorena Cerón",
          lugar: "Salón A201 – Sede Pance",
          tipo: "Conferencia",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-ia-practica",
          imagen: IAImg
        },
        {
          id: 23,
          hora: "8:00 pm - 10:00 pm",
          titulo: "Certificación Full Stack: Frontend Empresarial con Angular + AI",
          ponente: "DevSeniorCode Academy",
          lugar: "Modalidad Virtual",
          tipo: "Curso",
          destacado: true,
          exclusivo: "Estudiantes",
          aliado: "DevSeniorCode Academy",
          botonRegistro: true,
          urlRegistro: "/formulario-fullstack",
          imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762102414/devsenioform_rjas9y.jpg"
        }
      ]
    },
    {
      dia: "JUEVES 13 NOV",
      actividades: [
        {
          id: 13,
          hora: "10:00 am - 11:30 pm",
          titulo: "Visita Empresarial – ZONAMERICA",
          ponente: "",
          lugar: "Zonamérica - Calle 36, Auto. Cali - Jamundi #760030 128-321",
          tipo: "Visita",
          destacado: true,
          imagen: VisitaZonaAmerica,
          botonRegistro: true,
          urlRegistro: "/formulario-zona-america"
        },
        {
          id: 14,
          hora: "10:00 am - 12:00 pm",
          titulo: "Olimpiada en Lógica Matemática",
          ponente: "",
          lugar: "Sala 3 de Sistemas – Sede Pance",
          tipo: "Competencia",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-olimpiadasmatematicas",
          imagen: OlimpiadaImg,
          organizador: "Docente Jenny Alejandra Cadena Solarte"
        },
        {
          id: 15,
          hora: "6:30 pm - 9:30 pm",
          titulo: "Technological Touch 2025",
          ponente: "",
          lugar: "Auditorio Lumen – Sede Meléndez",
          tipo: "Evento",
          destacado: true,
          imagen: Technological,
          botonRegistro: true,
          urlRegistro: "/formulario-technological"
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
          titulo: "Taller Instalación de WordPress ",
          ponente: "Mag. Carlos Molina",
          lugar: "Sala 2 de Sistemas – Sede Pance",
          tipo: "Taller",
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-tallerwordpress",
          imagen: WordpressImg
        },
        {
          id: 18,
          hora: "11:00 am - 12:00 pm",
          titulo: "Entrevista: La Formación de Los Programas de Ingeniería. Caso Universidad del Norte",
          ponente: "P&D Jorge Luis Bris",
          lugar: "Estudio de Radio Lumen – Sede Meléndez",
          tipo: "Entrevista",
          destacado: false,
          imagen: EntrevistaImg
        },
        {
          id: 19,
          hora: "6:30 pm - 8:00 pm",
          titulo: "Construcción Red de Ingenieros Integrados",
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
          imagen: ActoClausuraImg,
          destacado: false,
        },
        {
          id: 24,
          hora: "8:00 pm - 10:00 pm",
          titulo: "Certificación Full Stack: Integración Full Stack con AI",
          ponente: "DevSeniorCode Academy",
          lugar: "Modalidad Virtual",
          tipo: "Curso",
          destacado: true,
          exclusivo: "Estudiantes",
          aliado: "DevSeniorCode Academy",
          botonRegistro: true,
          urlRegistro: "/formulario-fullstack",
          imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762102414/devsenioform_rjas9y.jpg"
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
          destacado: true,
          botonRegistro: true,
          urlRegistro: "/formulario-visitacarnicos",
          imagen: Visita15nov
        }
      ]
    }
  ];

  // Obtener todos los eventos destacados
  const eventosDestacados = cronograma.flatMap(dia =>
    dia.actividades.filter(actividad => actividad.destacado)
  );

  // Funciones para el carrusel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventosDestacados.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventosDestacados.length) % eventosDestacados.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  // Función para detener el ocultamiento automático
  const detenerOcultamiento = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    // Detener la animación de la barra de progreso
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = 'none';
      progressBarRef.current.style.width = '100%';
    }
  };

  // Función para iniciar el ocultamiento después de tiempo
  const iniciarOcultamiento = () => {
    // Esperar 5 segundos antes de ocultar
    const id = setTimeout(() => {
      ocultarTooltip();
    }, 5000);
    setTimeoutId(id);

    // Reiniciar animación de barra de progreso
    if (progressBarRef.current) {
      progressBarRef.current.style.transition = 'width 5s linear';
      progressBarRef.current.style.width = '0%';
    }
  };

  // Función para mostrar tooltip de ponente
  const mostrarTooltipPonente = (ponenteNombre: string, event: React.MouseEvent): void => {
    const ponenteInfo = basePonentes[ponenteNombre];
    if (ponenteInfo) {
      setPonenteSeleccionado(ponenteInfo);
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      });
      setTooltipVisible(true);

      // Iniciar temporizador para ocultar automáticamente después de 5 segundos
      const id = setTimeout(() => {
        ocultarTooltip();
      }, 5000);
      setTimeoutId(id);

      // Iniciar animación de barra de progreso
      setTimeout(() => {
        if (progressBarRef.current) {
          progressBarRef.current.style.transition = 'width 5s linear';
          progressBarRef.current.style.width = '0%';
        }
      }, 100);
    }
  };

  // Función para ocultar tooltip
  const ocultarTooltip = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setTooltipVisible(false);
    setPonenteSeleccionado(null);
  };

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

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
      Entrevista: "🎙️",
      Curso: "💻"
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
    // Verificar cupos antes de redirigir - CORREGIDA
    const infoCupos = obtenerInfoCupos(actividad.id);
    if (!infoCupos.disponible) { // ✅ Ya no necesitamos verificar null
      alert('Lo sentimos, no hay cupos disponibles para esta actividad.');
      return;
    }

    if (actividad.urlRegistro) {
      // Redirigir a la URL específica del evento
      window.location.href = actividad.urlRegistro;
    } else {
      // Comportamiento por defecto para otras actividades
      window.location.href = `${FORM_URL}?actividad=${actividad.id}`;
    }
  };

  const parseFecha = (fechaStr: string): { diaNumero: string; mes: string } => {
    const partes = fechaStr.split(' ');
    return {
      diaNumero: partes[1],
      mes: partes[2]
    };
  };

  // Función para obtener el texto del botón unificado
  const getTextoBoton = (_actividad: Actividad, infoCupos: CupoInfo): string => {
    if (!infoCupos.disponible) {
      return "Cupo Agotado";
    }
    return "Inscríbete";
  };

  // Función para obtener la clase CSS del botón unificada
  const getClaseBoton = (infoCupos: CupoInfo): string => {
    const baseClass = "w-full py-3 px-6 rounded-lg transition-all duration-300 font-semibold border-b-4 text-base transform hover:scale-105 active:scale-95 ";

    if (!infoCupos.disponible) {
      return baseClass + "bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed hover:scale-100";
    }

    return baseClass + "bg-gradient-to-r from-uniblue to-blue-600 text-white border-blue-800 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl";
  };

  // Función para renderizar la información del organizador o ponente
  const renderOrganizadorPonente = (actividad: Actividad) => {
    if (actividad.organizador) {
      return (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Organizador</p>
            <span
              className="font-medium text-gray-800 cursor-help hover:text-green-600 transition-colors duration-200 border-b border-dashed border-gray-400"
              onMouseEnter={(e) => mostrarTooltipPonente(actividad.organizador!, e)}
              onMouseLeave={ocultarTooltip}
            >
              {actividad.organizador}
            </span>
          </div>
        </div>
      );
    } else if (actividad.ponente) {
      return (
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
      );
    }
    return null;
  };

  // Función para renderizar participantes de conversatorios - CON IMÁGENES REALES
  const renderParticipantesConversatorio = (actividad: Actividad) => {
    if (actividad.tipo === "Conversatorio" && actividad.participantes && actividad.participantes.length > 0) {
      return (
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-uniblue/10 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-uniblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-sm font-semibold text-gray-800">Participantes</h4>
          </div>

          <div className="space-y-2">
            {actividad.participantes.map((participante, index) => {
              const nombreCompleto = participante.split(' - ')[0].trim();
              const esModerador = participante.toLowerCase().includes('moderador');
              const ponenteInfo = basePonentes[nombreCompleto];

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors duration-200 group cursor-help"
                  onMouseEnter={(e) => mostrarTooltipPonente(nombreCompleto, e)}
                  onMouseLeave={ocultarTooltip}
                >
                  {/* Avatar con imagen real o iniciales */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${esModerador ? 'ring-1 ring-unigold' : ''
                    }`}>
                    {ponenteInfo?.foto ? (
                      <img
                        src={ponenteInfo.foto}
                        alt={nombreCompleto}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-xs font-semibold ${esModerador
                        ? 'bg-unigold/20 text-unigold'
                        : 'bg-uniblue/10 text-uniblue'
                        }`}>
                        {nombreCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className={`text-sm font-semibold text-gray-900 break-words ${esModerador ? 'text-unigold-dark' : ''
                        } group-hover:text-uniblue transition-colors duration-200`}>
                        {nombreCompleto}
                      </span>
                      {esModerador && (
                        <span className="bg-unigold/10 text-unigold text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap flex-shrink-0">
                          Mod
                        </span>
                      )}
                    </div>
                    {participante.includes(' - ') && (
                      <p className="text-xs text-gray-600 mt-0.5 leading-tight">
                        {participante.split(' - ')[1]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full my-12 relative">
      {tooltipVisible && ponenteSeleccionado && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-2xl p-5 max-w-md border border-gray-200/80 backdrop-blur-sm"
          style={{
            left: `${Math.min(tooltipPosition.x + 15, window.innerWidth - 420)}px`,
            top: `${Math.max(tooltipPosition.y - 200, 20)}px`,
          }}
          onMouseEnter={detenerOcultamiento}
          onMouseLeave={iniciarOcultamiento}
        >
          {/* Indicador de tiempo */}
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500 font-medium">Disponible</span>
          </div>

          {/* Header con gradiente sutil */}
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100">
            <div className="relative flex-shrink-0">
              {ponenteSeleccionado.foto ? (
                <div className="relative">
                  <img
                    src={ponenteSeleccionado.foto}
                    alt={ponenteSeleccionado.nombre}
                    className="w-20 h-20 rounded-lg object-cover shadow-md border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900/10 rounded-lg"></div>
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-uniblue to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {ponenteSeleccionado.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                {ponenteSeleccionado.nombre}
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3">
                <p className="text-sm font-semibold text-blue-800 leading-tight">
                  {ponenteSeleccionado.titulo}
                </p>
              </div>

              {ponenteSeleccionado.especialidad && (
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm text-gray-700 font-medium">
                    {ponenteSeleccionado.especialidad}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contenido informativo */}
          <div className="space-y-3">
            {ponenteSeleccionado.experiencia && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-800">Experiencia Profesional</h4>
                </div>
                <div className="space-y-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {ponenteSeleccionado.experiencia.split(';').map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ponenteSeleccionado.linkTrayectoria && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-uniblue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-800">Conecta con el profesional</h4>
                </div>
                <a
                  href={ponenteSeleccionado.linkTrayectoria}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-uniblue to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg group"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Navegando a LinkedIn de:', ponenteSeleccionado.nombre);
                  }}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="flex-1 text-center">Ver Perfil en LinkedIn</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 text-center mt-2">
                  El enlace se abrirá en una nueva pestaña
                </p>
              </div>
            )}
          </div>

          {/* Barra de tiempo */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-5000 ease-linear"
              style={{ width: '100%' }}
              ref={progressBarRef}
            ></div>
          </div>

          {/* Flecha del tooltip */}
          <div className="absolute -left-2 top-8">
            <div className="w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45"></div>
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

      {/* CARRUSEL DE EVENTOS DESTACADOS */}
      <div className="max-w-6xl mx-auto mb-16 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-2xl border-2 border-uniblue/20">
          {/* Header del carrusel */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="w-3 h-8 bg-uniblue rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">Eventos Destacados</h3>
            </div>

            {/* Controles del carrusel */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Auto:</span>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`relative p-3 rounded-full transition-all duration-300 ${isAutoPlaying
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-red-500 text-white shadow-lg'
                    }`}
                  title={isAutoPlaying ? 'Carrusel activo - Click para pausar' : 'Carrusel pausado - Click para activar'}
                >
                  {isAutoPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-uniblue text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  title="Evento anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 bg-uniblue text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  title="Siguiente evento"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Carrusel */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {eventosDestacados.map((evento) => {
                const infoCupos = obtenerInfoCupos(evento.id);
                const textoBoton = getTextoBoton(evento, infoCupos);
                const claseBoton = getClaseBoton(infoCupos);

                return (
                  <div key={evento.id} className="w-full flex-shrink-0">
                    <div className="flex flex-col lg:flex-row items-center gap-6 p-6">
                      {/* Imagen del evento */}
                      <div className="flex-1">
                        <img
                          src={evento.imagen || ConferenciaImg}
                          alt={evento.titulo}
                          className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                        />
                      </div>

                      {/* Información del evento */}
                      <div className="flex-1 text-center lg:text-left">
                        <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                          <div className="bg-uniblue text-white px-4 py-1 rounded-full text-sm font-bold">
                            EVENTO DESTACADO
                          </div>
                          <div className="bg-unigold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <span>{getIconoTipo(evento.tipo)}</span>
                            {evento.tipo}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                          {evento.titulo}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">📅</span>
                            </div>
                            <span className="text-sm font-medium">
                              {cronograma.find(dia =>
                                dia.actividades.some(a => a.id === evento.id)
                              )?.dia.replace('LUNES ', 'Lun ').replace('MARTES ', 'Mar ').replace('MIÉRCOLES ', 'Mié ').replace('JUEVES ', 'Jue ').replace('VIERNES ', 'Vie ').replace('SÁBADO ', 'Sáb ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">🕒</span>
                            </div>
                            <span className="text-sm font-medium">{evento.hora}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white">📍</span>
                            </div>
                            <span className="text-sm font-medium">{evento.lugar}</span>
                          </div>
                          {(evento.ponente || evento.organizador) && (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-uniblue rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-white">
                                  {evento.organizador ? "👥" : "🎤"}
                                </span>
                              </div>
                              <span
                                className="text-sm font-semibold text-uniblue cursor-help hover:text-blue-700 transition-colors duration-200"
                                onMouseEnter={(e) => mostrarTooltipPonente(evento.organizador || evento.ponente, e)}
                                onMouseLeave={ocultarTooltip}
                              >
                                {(evento.organizador || evento.ponente).split(' - ')[0]}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Cupos para la actividad */}
                        <div className="mb-4">
                          {renderBadgeCupos(evento.id)}
                        </div>

                        <button
                          onClick={() => handleRegistro(evento)}
                          disabled={!infoCupos.disponible}
                          className={claseBoton}
                        >
                          {textoBoton}
                        </button>

                        {evento.exclusivo && (
                          <p className="text-sm text-gray-600 italic">
                            {evento.exclusivo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indicadores de slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {eventosDestacados.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-uniblue w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir al evento ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Contador de slides */}
          <div className="text-center mt-4 text-sm text-gray-600">
            {currentSlide + 1} de {eventosDestacados.length} eventos destacados
          </div>
        </div>
      </div>

      {/* Cronograma por días con acordeón */}
      <div className="max-w-7xl mx-auto px-4">
        {cronograma.map((dia, index) => {
          const { diaNumero, mes } = parseFecha(dia.dia);

          return (
            <div key={index} className="mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {dia.actividades.map((actividad) => {
                      const infoCupos = obtenerInfoCupos(actividad.id);
                      const textoBoton = getTextoBoton(actividad, infoCupos);
                      const claseBoton = getClaseBoton(infoCupos);

                      return (
                        <div
                          key={actividad.id}
                          className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md overflow-hidden ${actividad.destacado
                            ? "border-uniblue border-l-4"
                            : "border-gray-200 border-l-4 border-l-gray-300"
                            } ${actividad.estado === "activo" ? "border-l-4 border-l-red-500 bg-gradient-to-r from-white to-red-50" : ""}`}
                        >
                          {/* Encabezado de la actividad */}
                          <div
                            className={`p-4 ${actividad.destacado
                              ? "bg-gradient-to-r from-uniblue to-blue-600"
                              : actividad.estado === "activo"
                                ? "bg-gradient-to-r from-red-500 to-red-600"
                                : "bg-gradient-to-r from-gray-100 to-gray-200"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`font-bold text-lg ${actividad.destacado ? "text-white" : actividad.estado === "activo" ? "text-white" : "text-gray-800"
                                }`}>
                                {actividad.hora}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{getIconoTipo(actividad.tipo)}</span>
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${actividad.destacado
                                    ? "bg-white/20 text-white"
                                    : actividad.estado === "activo"
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
                              className={`text-xl font-bold mb-4 leading-tight ${actividad.destacado ? "text-uniblue" : actividad.estado === "activo" ? "text-red-700" : "text-gray-800"
                                }`}
                            >
                              {actividad.titulo}
                            </h4>

                            <div className="space-y-3 mb-4">
                              {/* Organizador o Ponente */}
                              {renderOrganizadorPonente(actividad)}

                              {/* Participantes del Conversatorio */}
                              {renderParticipantesConversatorio(actividad)}

                              {/* Lugar */}
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
                                    {actividad.lugar.toLowerCase().includes('virtual') && (
                                      <span className="ml-1 text-xs text-green-600">🌐</span> // Icono de globo para virtual
                                    )}
                                    {!actividad.lugar.toLowerCase().includes('virtual') && (
                                      <span className="ml-1 text-xs text-uniblue">📍</span> // Icono de ubicación para presencial
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Aliado estratégico */}
                              {actividad.aliado && (
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-unigold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-unigold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
                              {/* Badge de estado activo */}
                              {renderBadgeEstado(actividad)}
                              
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
                              {/* Badge de cupos para actividades con registro */}
                              {(actividad.botonRegistro || (actividad.destacado && actividad.tipo === "Conferencia")) && 
                              actividad.id !== 3 && ( // ← EXCLUIR EVENTO CON ID 3(
                                renderBadgeCupos(actividad.id)
                              )}
                            </div>

                            {/* Imagen de la actividad si existe */}
                            {actividad.imagen && (
                              <div className="mb-6">
                                <img
                                  src={actividad.imagen}
                                  alt={actividad.titulo}
                                  className="w-full h-48 object-cover rounded-xl shadow-md"
                                />
                              </div>
                            )}

                            {/* Botón de inscripción para conferencias destacadas */}
                            {((actividad.destacado && actividad.tipo === "Conferencia") || actividad.botonRegistro) && 
                             actividad.mostrarRegistro !== false ? (
                              <div className="mt-4">
                                <button
                                  onClick={() => handleRegistro(actividad)}
                                  disabled={!infoCupos.disponible}
                                  className={claseBoton}
                                >
                                  {textoBoton}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
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