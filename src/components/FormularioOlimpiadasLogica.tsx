import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioInscripcion.css';
import LogicaMatematicaImg from '@/assets/OLIMPIADAS_LOGICA_MATEMATICA.jpg';
import facultadesData from '@/assets/facultadesyprogramasacademicos.json';

// Importar iconos de Heroicons
import {
  MapPinIcon,
  ClockIcon,
  TrophyIcon,
  UserIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalculatorIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';

// Interfaces para los tipos de datos
interface Programa {
  id: string;
  nombre: string;
  semestres: number;
  tipo: string;
}

interface Facultad {
  id: string;
  nombre: string;
  programas: Programa[];
}

interface FormData {
  // Datos personales básicos
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  idEstudiante: string;

  // Campos académicos
  facultad: string;
  programa: string;
  semestre: string;

  // Datos específicos para olimpiadas de lógica matemática
  nivel_matematicas: string;
  experiencia_competencia: string;
  modalidad_participacion: string;
  tiempo_preparacion: string;
  herramientas_utilizadas: string;
  motivacion_participacion: string;
}

// Interface para errores de duplicidad
interface FieldError {
  field: string;
  message: string;
}

const FormularioOlimpiadasLogica: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    idEstudiante: '',
    facultad: '',
    programa: '',
    semestre: '',
    nivel_matematicas: '',
    experiencia_competencia: '',
    modalidad_participacion: '',
    tiempo_preparacion: '',
    herramientas_utilizadas: '',
    motivacion_participacion: ''
  });

  const [programasFiltrados, setProgramasFiltrados] = useState<Programa[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // Estados para manejar errores de duplicidad
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);

  // ✅ NUEVO: Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const formSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Efecto para filtrar programas cuando cambia la facultad
  useEffect(() => {
    if (formData.facultad) {
      const facultadSeleccionada = (facultadesData as any).facultades.find(
        (f: Facultad) => f.id === formData.facultad
      );
      setProgramasFiltrados(facultadSeleccionada ? facultadSeleccionada.programas : []);

      // Reset programa cuando cambia la facultad
      setFormData(prev => ({
        ...prev,
        programa: '',
        semestre: ''
      }));
    } else {
      setProgramasFiltrados([]);
    }
  }, [formData.facultad]);

  // Función para limpiar errores de un campo específico
  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => prev.filter(error => !error.field.includes(fieldName)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    clearFieldError(name);

    // ✅ MEJORADO: Limpiar error de validación
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Si cambia el programa, actualizar automáticamente los semestres disponibles
    if (name === 'programa' && value) {
      const programaSeleccionado = programasFiltrados.find(p => p.id === value);
      if (programaSeleccionado) {
        setFormData(prev => ({
          ...prev,
          programa: value,
          semestre: '' // Reset semestre para forzar nueva selección
        }));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAceptaTerminos(e.target.checked);
  };

  // Función para generar opciones de semestres basado en el programa seleccionado
  const generarOpcionesSemestres = () => {
    const programaSeleccionado = programasFiltrados.find(p => p.id === formData.programa);
    const maxSemestres = programaSeleccionado ? programaSeleccionado.semestres : 10;

    const opciones = [];
    for (let i = 1; i <= maxSemestres; i++) {
      const roman = i === 1 ? 'I' :
        i === 2 ? 'II' :
          i === 3 ? 'III' :
            i === 4 ? 'IV' :
              i === 5 ? 'V' :
                i === 6 ? 'VI' :
                  i === 7 ? 'VII' :
                    i === 8 ? 'VIII' :
                      i === 9 ? 'IX' : 'X';
      opciones.push(
        <option key={i} value={roman}>
          {roman} Semestre
        </option>
      );
    }
    return opciones;
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Función: Verificar disponibilidad de datos en tiempo real
  const verificarDisponibilidad = async (field: string, value: string) => {
    if (!value.trim()) return;

    try {
      setIsCheckingDuplicates(true);
      const response = await fetch(`${API_URL}/olimpiadasmatematicas/verificar-disponibilidad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cedula: field === 'cedula' ? value : undefined,
          idEstudiante: field === 'idEstudiante' ? value : undefined,
          correo: field === 'correo' ? value : undefined
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Actualizar errores basado en la respuesta
        const newErrors: FieldError[] = [];
        if (!data.disponibilidad.cedula && field === 'cedula') {
          newErrors.push({ field: 'cedula', message: 'La cédula ya está registrada' });
        }
        if (!data.disponibilidad.idEstudiante && field === 'idEstudiante') {
          newErrors.push({ field: 'idEstudiante', message: 'El ID de estudiante ya está registrado' });
        }
        if (!data.disponibilidad.correo && field === 'correo') {
          newErrors.push({ field: 'correo', message: 'El correo electrónico ya está registrado' });
        }

        setFieldErrors(prev => [
          ...prev.filter(error => error.field !== field),
          ...newErrors
        ]);
      }
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
    } finally {
      setIsCheckingDuplicates(false);
    }
  };

  // Función: Obtener mensaje de error para un campo específico
  const getFieldError = (fieldName: string): string | null => {
    const error = fieldErrors.find(err => err.field === fieldName);
    return error ? error.message : null;
  };

  // Función: Verificar si hay errores de duplicidad
  const hasDuplicateErrors = (): boolean => {
    return fieldErrors.length > 0;
  };

  // ✅ MEJORADO: Función para validar el formulario antes del envío
  const validarFormulario = (): boolean => {
    // Limpiar errores previos
    setValidationErrors({});
    setFieldErrors([]);

    const errors: { [key: string]: string } = {};

    // Validaciones básicas
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.cedula.trim()) errors.cedula = 'La cédula es requerida';
    if (!formData.correo.trim()) errors.correo = 'El correo es requerido';
    if (!formData.telefono.trim()) errors.telefono = 'El teléfono es requerido';
    if (!formData.idEstudiante.trim()) errors.idEstudiante = 'El ID estudiantil es requerido';
    if (!formData.facultad) errors.facultad = 'La facultad es requerida';
    if (!formData.programa) errors.programa = 'El programa es requerido';
    if (!formData.semestre) errors.semestre = 'El semestre es requerido';

    // Validaciones específicas para olimpiadas
    if (!formData.nivel_matematicas) errors.nivel_matematicas = 'El nivel en matemáticas es requerido';
    if (!formData.experiencia_competencia) errors.experiencia_competencia = 'La experiencia en competencias es requerida';
    if (!formData.modalidad_participacion) errors.modalidad_participacion = 'La modalidad de participación es requerida';
    if (!formData.tiempo_preparacion) errors.tiempo_preparacion = 'El tiempo de preparación es requerido';
    if (!formData.motivacion_participacion.trim()) errors.motivacion_participacion = 'La motivación es requerida';

    // Si hay errores, mostrarlos y prevenir envío
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      // Hacer scroll al primer error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      alert('Por favor complete todos los campos requeridos marcados con *');
      return false;
    }

    if (!aceptaTerminos) {
      alert('Debe aceptar el tratamiento de datos personales');
      return false;
    }

    // Verificar si hay errores de duplicidad
    if (hasDuplicateErrors()) {
      alert('Por favor corrija los errores de duplicidad antes de enviar el formulario');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ CORREGIDO: Payload con estructura correcta
      const payload = {
        // Datos personales básicos
        nombre: formData.nombre.trim(),
        cedula: formData.cedula.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim(),
        rol: 'estudiante',
        idEstudiante: formData.idEstudiante.trim(),

        // Campos académicos
        facultad: formData.facultad,
        programa: formData.programa,
        semestre: formData.semestre,

        // ✅ CORREGIDO: Campos de olimpiadas DIRECTAMENTE en el payload
        nivel_matematicas: formData.nivel_matematicas,
        experiencia_competencia: formData.experiencia_competencia,
        modalidad_participacion: formData.modalidad_participacion,
        tiempo_preparacion: formData.tiempo_preparacion,
        herramientas_utilizadas: formData.herramientas_utilizadas?.trim() || '',
        motivacion_participacion: formData.motivacion_participacion.trim(),

        // Información de actividades
        actividades: ['olimpiadas-logica-matematica']
      };

      console.log('🚀 Enviando payload CORREGIDO Olimpiadas Lógica Matemática:', payload);

      const res = await fetch(`${API_URL}/olimpiadasmatematicas/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Manejo de errores de duplicidad
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));

        // Si es error de duplicidad (409), mostrar errores específicos
        if (res.status === 409 && Array.isArray(err.errors)) {
          const duplicateErrors: FieldError[] = err.errors.map((errorMsg: string) => {
            if (errorMsg.includes('cédula')) return { field: 'cedula', message: errorMsg };
            if (errorMsg.includes('ID de estudiante')) return { field: 'idEstudiante', message: errorMsg };
            if (errorMsg.includes('correo')) return { field: 'correo', message: errorMsg };
            return { field: 'general', message: errorMsg };
          });

          setFieldErrors(duplicateErrors);
          throw new Error('Datos duplicados encontrados. Por favor verifique la información.');
        }

        const msg = err?.message || 'Error registrando la inscripción';
        const errors = Array.isArray(err?.errors) ? `\n- ${err.errors.join('\n- ')}` : '';
        throw new Error(`${msg}${errors}`);
      }

      const data = await res.json();
      const qrFromApi: string | undefined = data?.qr || data?.qrData;
      setQrSrc(qrFromApi || null);
      setSuccessOpen(true);

      // Limpiar formulario y errores
      setFormData({
        nombre: '',
        cedula: '',
        correo: '',
        telefono: '',
        idEstudiante: '',
        facultad: '',
        programa: '',
        semestre: '',
        nivel_matematicas: '',
        experiencia_competencia: '',
        modalidad_participacion: '',
        tiempo_preparacion: '',
        herramientas_utilizadas: '',
        motivacion_participacion: ''
      });
      setAceptaTerminos(false);
      setFieldErrors([]);
      setValidationErrors({});

    } catch (error: any) {
      console.error('Error en submit:', error);

      // Mostrar mensaje de error específico para duplicados
      if (error.message.includes('duplicados')) {
        alert(`❌ ${error.message}\n\nErrores:\n${fieldErrors.map(err => `• ${err.message}`).join('\n')}`);
      } else {
        alert(`❌ ${error.message || 'Error inesperado'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // Función: Componente para mostrar errores de campo
  const renderFieldError = (fieldName: string) => {
    const error = getFieldError(fieldName);
    if (!error) return null;

    return (
      <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>{error}</span>
      </div>
    );
  };

  // ✅ MEJORADO: Renderizar campos específicos para las olimpiadas de lógica matemática
  const renderDatosOlimpiadas = () => {
    return (
      <div className="border-t border-gray-200 pt-8">
        <div className="border-l-4 border-purple-600 pl-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CalculatorIcon className="w-6 h-6 text-purple-600" />
            Datos de las Olimpiadas de Lógica Matemática
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Complete la información específica para participar en las olimpiadas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Nivel en Matemáticas */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Nivel en Matemáticas <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              name="nivel_matematicas"
              value={formData.nivel_matematicas}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white ${validationErrors.nivel_matematicas ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              required
            >
              <option value="">Seleccionar nivel</option>
              <option value="basico">Básico</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
              <option value="excelente">Excelente</option>
            </select>
            {validationErrors.nivel_matematicas && (
              <div className="mt-1 text-red-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {validationErrors.nivel_matematicas}
              </div>
            )}
          </div>

          {/* Experiencia en Competencias */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Experiencia en Competencias <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              name="experiencia_competencia"
              value={formData.experiencia_competencia}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white ${validationErrors.experiencia_competencia ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              required
            >
              <option value="">Seleccionar experiencia</option>
              <option value="ninguna">Ninguna experiencia</option>
              <option value="1-2-veces">1-2 competencias</option>
              <option value="3-5-veces">3-5 competencias</option>
              <option value="mas-5-veces">Más de 5 competencias</option>
              <option value="nacional">Ha participado a nivel nacional</option>
            </select>
            {validationErrors.experiencia_competencia && (
              <div className="mt-1 text-red-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {validationErrors.experiencia_competencia}
              </div>
            )}
          </div>

          {/* Modalidad de Participación */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <PuzzlePieceIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Modalidad de Participación <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              name="modalidad_participacion"
              value={formData.modalidad_participacion}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white ${validationErrors.modalidad_participacion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              required
            >
              <option value="">Seleccionar modalidad</option>
              <option value="individual">Individual</option>
              <option value="equipo">En equipo (2-3 personas)</option>
            </select>
            {validationErrors.modalidad_participacion && (
              <div className="mt-1 text-red-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {validationErrors.modalidad_participacion}
              </div>
            )}
          </div>

          {/* Tiempo de Preparación */}
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Tiempo de Preparación <span className="text-red-500">*</span>
              </div>
            </label>
            <select
              name="tiempo_preparacion"
              value={formData.tiempo_preparacion}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white ${validationErrors.tiempo_preparacion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              required
            >
              <option value="">Seleccionar tiempo</option>
              <option value="menos-1-semana">Menos de 1 semana</option>
              <option value="1-2-semanas">1-2 semanas</option>
              <option value="3-4-semanas">3-4 semanas</option>
              <option value="mas-1-mes">Más de 1 mes</option>
            </select>
            {validationErrors.tiempo_preparacion && (
              <div className="mt-1 text-red-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {validationErrors.tiempo_preparacion}
              </div>
            )}
          </div>

          {/* Herramientas Utilizadas */}
          <div className="form-group md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <HashtagIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Herramientas Utilizadas (Opcional)
              </div>
            </label>
            <input
              type="text"
              name="herramientas_utilizadas"
              value={formData.herramientas_utilizadas}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200"
              placeholder="Ej: Calculadora científica, software matemático, etc."
            />
            <p className="text-sm text-gray-500 mt-1">
              Especifique las herramientas que utiliza para estudiar matemáticas
            </p>
          </div>

          {/* Motivación para Participar */}
          <div className="form-group md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <LightBulbIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                Motivación para Participar <span className="text-red-500">*</span>
              </div>
            </label>
            <textarea
              name="motivacion_participacion"
              value={formData.motivacion_participacion}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 resize-vertical ${validationErrors.motivacion_participacion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              placeholder="¿Por qué quieres participar en las olimpiadas de lógica matemática?"
              required
            />
            {validationErrors.motivacion_participacion && (
              <div className="mt-1 text-red-600 text-sm flex items-center gap-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {validationErrors.motivacion_participacion}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Comparte tu motivación y qué esperas lograr participando
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="formulario-container">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-8 relative mb-8 border">
          <div className="flex justify-between items-start mb-8">
            <img
              src="/unicatolica-logo.svg"
              alt="UNICATÓLICA"
              className="h-14 w-auto"
            />
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
              aria-label="Regresar al inicio"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Regresar
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <CalculatorIcon className="w-8 h-8 text-purple-600" />
              OLIMPIADAS EN LÓGICA MATEMÁTICA
            </h1>
            <p className="text-lg text-purple-600 font-semibold mb-4">
              "Desafía tu mente, domina la lógica"
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Miércoles 13 de Noviembre
              </span>
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-purple-600" />
                10:00 am a 12:00 pm
              </span>
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-purple-600" />
                Sala 3 de Sistemas - Sede Pance
              </span>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              🧠 Pon a prueba tus habilidades en resolución de problemas y pensamiento lógico.
            </p>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Competencia exclusiva para estudiantes que buscan desafiar sus capacidades matemáticas y lógicas.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información del Evento */}
          <div className="mb-8">
            <div className="border-l-4 border-purple-600 pl-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-purple-600" />
                Información del Evento
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-purple-600">
              <img
                className="w-full h-48 object-cover rounded-t-xl"
                src={LogicaMatematicaImg}
                alt="Olimpiadas en Lógica Matemática"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <ClockIcon className="w-4 h-4 text-purple-600" />
                  <span>Jue, Nov 13 | 10:00 am - 12:00 pm</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CalculatorIcon className="w-5 h-5 text-purple-600" />
                  Olimpiadas en Lógica Matemática
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Desafía tu mente con problemas de lógica, matemáticas discretas y razonamiento abstracto.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800 flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-purple-600" />
                      <strong>Lugar:</strong> Sala 3 de Sistemas - Sede Pance
                    </span>
                    <span className="flex items-center gap-2">
                      <PuzzlePieceIcon className="w-4 h-4 text-purple-600" />
                      <strong>Áreas:</strong> Lógica proposicional, Teoría de conjuntos, Razonamiento abstracto
                    </span>
                    <span className="flex items-center gap-2">
                      <TrophyIcon className="w-4 h-4 text-purple-600" />
                      <strong>Premios:</strong> Reconocimientos académicos y certificaciones
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Datos Personales y Académicos */}
          <div ref={formSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <div className="border-l-4 border-purple-600 pl-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-purple-600" />
                  Datos Personales y Académicos
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Esta competencia es exclusiva para estudiantes activos de UNICATÓLICA
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-purple-600" />
                      Nombre Completo <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <IdentificationIcon className="w-4 h-4 text-purple-600" />
                      Cédula de Ciudadanía <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    onBlur={(e) => verificarDisponibilidad('cedula', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 ${getFieldError('cedula') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Número de cédula"
                    required
                  />
                  {renderFieldError('cedula')}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-purple-600" />
                      Correo Electrónico <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    onBlur={(e) => verificarDisponibilidad('correo', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 ${getFieldError('correo') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                  {renderFieldError('correo')}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-purple-600" />
                      Número de Celular <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200"
                    placeholder="3001234567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <IdentificationIcon className="w-4 h-4 text-purple-600" />
                      ID Estudiantil <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="idEstudiante"
                    value={formData.idEstudiante}
                    onChange={handleInputChange}
                    onBlur={(e) => verificarDisponibilidad('idEstudiante', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 ${getFieldError('idEstudiante') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    placeholder="Ej: 000123456"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Número de identificación universidad
                  </p>
                  {renderFieldError('idEstudiante')}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <BuildingLibraryIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                      Facultad <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <select
                    name="facultad"
                    value={formData.facultad}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white"
                    required
                  >
                    <option value="">Seleccionar Facultad</option>
                    {(facultadesData as any).facultades.map((facultad: Facultad) => (
                      <option key={facultad.id} value={facultad.id}>
                        {facultad.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <AcademicCapIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                      Programa Académico <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <select
                    name="programa"
                    value={formData.programa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white"
                    required
                    disabled={!formData.facultad}
                  >
                    <option value="">Seleccionar Programa</option>
                    {programasFiltrados.map((programa: Programa) => (
                      <option key={programa.id} value={programa.id}>
                        {programa.nombre} ({programa.tipo})
                      </option>
                    ))}
                  </select>
                  {!formData.facultad && (
                    <p className="text-sm text-gray-500 mt-1">
                      Primero selecciona una facultad
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-purple-600 mt-0.5" />
                      Semestre <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <select
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors duration-200 bg-white"
                    required
                    disabled={!formData.programa}
                  >
                    <option value="">Seleccionar Semestre</option>
                    {generarOpcionesSemestres()}
                  </select>
                  {!formData.programa && (
                    <p className="text-sm text-gray-500 mt-1">
                      Primero selecciona un programa
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Datos específicos para las olimpiadas de lógica matemática */}
            {renderDatosOlimpiadas()}

            {/* Mostrar resumen de errores de duplicidad */}
            {fieldErrors.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Errores de duplicidad encontrados
                </div>
                <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                  {fieldErrors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirmación */}
            <div className="form-group mt-8">
              <label className="checkbox-modern">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={handleCheckboxChange}
                  required
                />
                <div className="checkbox-label">
                  Acepto el tratamiento de mis datos personales. <span className="required">*</span>
                  <span className="text-sm">Acepto que mis datos personales sean utilizados para fines académicos, investigativos y de relacionamiento con empresas y comunidades de emprendimiento de la región.</span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !aceptaTerminos || hasDuplicateErrors() || isCheckingDuplicates}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-medium text-base hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 border-b-4 border-purple-800 hover:border-purple-900 disabled:border-gray-400 mt-6"
            >
              {isSubmitting ? 'Enviando...' :
                isCheckingDuplicates ? 'Verificando...' :
                  hasDuplicateErrors() ? 'Corrija los errores' :
                    'Finalizar Inscripción'}
            </button>
          </div>
        </form>
      </div>

      {successOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSuccessOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">Inscripción Registrada</h3>
            <p className="text-gray-600 mt-2">Guarda o escanea tu código para confirmar.</p>
            <div className="mt-4 flex items-center justify-center">
              {qrSrc ? (
                <img src={qrSrc as string} alt="Código QR de confirmación" className="h-56 w-56 object-contain" />
              ) : (
                <div className="text-gray-500 text-sm">QR no proporcionado por el servidor.</div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              {qrSrc && (
                <a href={qrSrc as string} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700">Abrir QR</a>
              )}
              <button type="button" onClick={() => setSuccessOpen(false)} className="px-5 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioOlimpiadasLogica;