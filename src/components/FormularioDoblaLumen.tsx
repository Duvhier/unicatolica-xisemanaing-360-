import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioInscripcion.css';
import DobleLumenImg from '@/assets/DOBLALUMEN-8.png'; 
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
  BookOpenIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
  DocumentTextIcon
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
  rol: string;
  tipoEstudiante: string;
  idEstudiante: string;

  // Campos condicionales según rol
  facultad: string;
  programa: string;
  semestre: string;
  area: string;
  cargo: string;
  empresa: string;

  // Datos específicos para competencia de inglés
  nivel_ingles: string;
  experiencia_ingles: string;
  modalidad_participacion: string;
  tema_presentacion: string;
  duracion_participacion: string;
  recursos_adicionales: string;
}

// Interface para errores de duplicidad
interface FieldError {
  field: string;
  message: string;
}

const FormularioDobleLumen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    rol: '',
    tipoEstudiante: '',
    idEstudiante: '',
    facultad: '',
    programa: '',
    semestre: '',
    area: '',
    cargo: '',
    empresa: '',
    nivel_ingles: '',
    experiencia_ingles: '',
    modalidad_participacion: '',
    tema_presentacion: '',
    duracion_participacion: '',
    recursos_adicionales: ''
  });

  const [programasFiltrados, setProgramasFiltrados] = useState<Programa[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  
  // Estados para manejar errores de duplicidad
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);
  
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
      const response = await fetch(`${API_URL}/doblalumen/verificar-disponibilidad`, {
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

  // Función para validar el formulario antes del envío
  const validarFormulario = (): boolean => {
    // Limpiar errores previos
    setFieldErrors([]);

    // Validaciones básicas para todos los roles
    if (!formData.nombre.trim() || !formData.cedula.trim() || !formData.correo.trim() || !formData.telefono.trim() || !formData.rol) {
      alert('Por favor complete todos los campos básicos requeridos');
      return false;
    }

    // Validaciones específicas por rol
    if (formData.rol === 'estudiante') {
      if (!formData.tipoEstudiante || !formData.idEstudiante.trim() || !formData.facultad || !formData.programa || !formData.semestre) {
        alert('Por favor complete todos los campos requeridos para estudiantes');
        return false;
      }

      // Validaciones específicas para participantes en competencia de inglés
      if (formData.tipoEstudiante === 'participante') {
        if (!formData.nivel_ingles || 
            !formData.experiencia_ingles || 
            !formData.modalidad_participacion || 
            !formData.tema_presentacion.trim() || 
            !formData.duracion_participacion) {
          alert('Por favor complete todos los campos requeridos para la competencia de inglés');
          return false;
        }
      }
    } else if (formData.rol === 'egresado') {
      if (!formData.programa) {
        alert('Por favor seleccione el programa de egreso');
        return false;
      }
    } else if (formData.rol === 'docente' || formData.rol === 'administrativo' || formData.rol === 'directivo') {
      if (!formData.area.trim() || !formData.cargo.trim()) {
        alert('Por favor complete el área y cargo');
        return false;
      }
    } else if (formData.rol === 'externo') {
      if (!formData.empresa.trim() || !formData.cargo.trim()) {
        alert('Por favor complete la empresa y cargo');
        return false;
      }
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
      const payload: any = {
        nombre: formData.nombre.trim(),
        cedula: formData.cedula.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim(),
        rol: formData.rol,
        tipoEstudiante: formData.tipoEstudiante,
        id: formData.idEstudiante.trim(),
        actividades: ['doble-lumen']
      };

      // Campos condicionales según el rol
      if (formData.rol === 'estudiante') {
        payload.facultad = formData.facultad;
        payload.programa = formData.programa;
        payload.semestre = formData.semestre;
        
        // Solo enviar datos específicos de la competencia si es participante
        if (formData.tipoEstudiante === 'participante') {
          payload.competencia_ingles = {
            nivel: formData.nivel_ingles,
            experiencia: formData.experiencia_ingles,
            modalidad: formData.modalidad_participacion,
            tema: formData.tema_presentacion.trim(),
            duracion: formData.duracion_participacion,
            recursos: formData.recursos_adicionales?.trim() || ''
          };
        }
      } else if (formData.rol === 'egresado') {
        payload.programa = formData.programa;
        if (formData.empresa.trim()) {
          payload.empresa = formData.empresa.trim();
        }
      } else if (formData.rol === 'docente') {
        payload.area = formData.area.trim();
        payload.cargo = formData.cargo.trim();
      } else if (formData.rol === 'administrativo' || formData.rol === 'directivo') {
        payload.area = formData.area.trim();
        payload.cargo = formData.cargo.trim();
      } else if (formData.rol === 'externo') {
        payload.empresa = formData.empresa.trim();
        payload.cargo = formData.cargo.trim();
      }

      console.log('🚀 Enviando payload Doble Lumen:', payload);

      const res = await fetch(`${API_URL}/doblalumen/registro`, {
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
        rol: '',
        tipoEstudiante: '',
        idEstudiante: '',
        facultad: '',
        programa: '',
        semestre: '',
        area: '',
        cargo: '',
        empresa: '',
        nivel_ingles: '',
        experiencia_ingles: '',
        modalidad_participacion: '',
        tema_presentacion: '',
        duracion_participacion: '',
        recursos_adicionales: ''
      });
      setAceptaTerminos(false);
      setFieldErrors([]); // Limpiar errores después de éxito

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

  // Renderizar campos según el rol seleccionado
  const renderCamposPorRol = () => {
    switch (formData.rol) {
      case 'estudiante':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Tipo de Participación <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="tipoEstudiante"
                value={formData.tipoEstudiante}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar Tipo</option>
                <option value="asistente">Asistente (Solo observación)</option>
                <option value="participante">Participante (Competencia activa)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {formData.tipoEstudiante === 'participante'
                  ? 'Los participantes competirán en las diferentes modalidades de inglés'
                  : 'Los asistentes podrán observar la competencia sin participar activamente'}
              </p>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <IdentificationIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  ID Estudiantil <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="idEstudiante"
                value={formData.idEstudiante}
                onChange={handleInputChange}
                onBlur={(e) => verificarDisponibilidad('idEstudiante', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 ${
                  getFieldError('idEstudiante') ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
                  <BuildingLibraryIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Facultad <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="facultad"
                value={formData.facultad}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
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
                  <AcademicCapIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Programa Académico <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="programa"
                value={formData.programa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
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
                  <CalendarIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Semestre <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="semestre"
                value={formData.semestre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
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
        );

      case 'egresado':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Programa de Egreso <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="programa"
                value={formData.programa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar Programa</option>
                {(facultadesData as any).facultades.flatMap((facultad: Facultad) => 
                  facultad.programas.map((programa: Programa) => (
                    <option key={programa.id} value={programa.id}>
                      {programa.nombre}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Empresa donde labora (Opcional)
                </div>
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>
        );

      case 'docente':
      case 'administrativo':
      case 'directivo':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Área/Departamento <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Ej: Departamento de Idiomas"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-uniblue" />
                  Cargo <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Ej: Docente de Inglés"
                required
              />
            </div>
          </div>
        );

      case 'externo':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Empresa/Institución <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Nombre de la empresa o institución"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-uniblue" />
                  Cargo <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Su cargo en la empresa"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Renderizar datos específicos para la competencia de inglés
  const renderDatosCompetenciaIngles = () => {
    if (formData.rol === 'estudiante' && formData.tipoEstudiante === 'participante') {
      return (
        <div className="border-t border-gray-200 pt-8">
          <div className="border-l-4 border-unigold pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <TrophyIcon className="w-6 h-6 text-unigold" />
              Datos de la Competencia de Inglés
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete la información específica para participar en la competencia de inglés
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Nivel de Inglés <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="nivel_ingles"
                value={formData.nivel_ingles}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar nivel</option>
                <option value="A1">A1 - Principiante</option>
                <option value="A2">A2 - Básico</option>
                <option value="B1">B1 - Intermedio</option>
                <option value="B2">B2 - Intermedio Alto</option>
                <option value="C1">C1 - Avanzado</option>
                <option value="C2">C2 - Competente</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Experiencia en Inglés <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="experiencia_ingles"
                value={formData.experiencia_ingles}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar experiencia</option>
                <option value="menos-1-año">Menos de 1 año</option>
                <option value="1-2-años">1-2 años</option>
                <option value="3-5-años">3-5 años</option>
                <option value="mas-5-años">Más de 5 años</option>
                <option value="nativo">Nativo/Bilingüe</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MicrophoneIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Modalidad de Participación <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="modalidad_participacion"
                value={formData.modalidad_participacion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar modalidad</option>
                <option value="speaking">Speaking (Conversación)</option>
                <option value="presentation">Presentation (Presentación)</option>
                <option value="debate">Debate (Debate)</option>
                <option value="storytelling">Storytelling (Narración)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Duración Estimada <span className="text-red-500">*</span>
                </div>
              </label>
              <select
                name="duracion_participacion"
                value={formData.duracion_participacion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                required
              >
                <option value="">Seleccionar duración</option>
                <option value="3-5-min">3-5 minutos</option>
                <option value="5-7-min">5-7 minutos</option>
                <option value="7-10-min">7-10 minutos</option>
                <option value="10-15-min">10-15 minutos</option>
              </select>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <PresentationChartBarIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Tema de Presentación/Discurso <span className="text-red-500">*</span>
                </div>
              </label>
              <input
                type="text"
                name="tema_presentacion"
                value={formData.tema_presentacion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Ej: The importance of artificial intelligence in education"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Escriba el tema en inglés que presentará durante la competencia
              </p>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-uniblue mt-0.5" />
                  Recursos Adicionales Necesarios (Opcional)
                </div>
              </label>
              <textarea
                name="recursos_adicionales"
                value={formData.recursos_adicionales}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 resize-vertical"
                placeholder="Ej: Proyector, pizarra, equipo de sonido, etc."
              />
              <p className="text-sm text-gray-500 mt-1">
                Especifique si necesita algún recurso especial para su presentación
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="formulario-container">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-8 relative mb-8 border">
          <div className="flex justify-between items-start mb-8">
            <img
              src="/unicatolica-logo.svg"
              alt="UNICATÓLICA"
              className="h-14 w-auto"
            />
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-500 hover:text-uniblue transition-colors duration-200 font-medium text-sm"
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
              <TrophyIcon className="w-8 h-8 text-orange-600" />
              DOBLE LUMEN
            </h1>
            <p className="text-lg text-orange-600 font-semibold mb-4">
              "Competencia de Inglés 2025"
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Miércoles 12 de Noviembre
              </span>
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-orange-600" />
                6:30 pm a 9:30 pm
              </span>
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-orange-600" />
                Auditorio 1 - Sede Pance
              </span>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              🏆 Demuestra tus habilidades en speaking, presentation y debate en inglés
            </p>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Competencia diseñada para poner a prueba tus competencias lingüísticas en un ambiente de sana competencia
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información del Evento */}
          <div className="mb-8">
            <div className="border-l-4 border-orange-600 pl-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-orange-600" />
                Información del Evento
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border-2 border-orange-600">
              <img
                className="w-full h-48 object-cover rounded-t-xl"
                src={DobleLumenImg}
                alt="Doble Lumen - Competencia de Inglés"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <ClockIcon className="w-4 h-4 text-orange-600" />
                  <span>Mié, Nov 12 | 6:30 pm - 9:30 pm</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-orange-600" />
                  Doble Lumen - Competencia de Inglés
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Demuestra tus habilidades en speaking, presentation, debate y storytelling en inglés
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm text-orange-800 flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-orange-600" />
                      <strong>Lugar:</strong> Auditorio 1 - Sede Pance
                    </span>
                    <span className="flex items-center gap-2">
                      <MicrophoneIcon className="w-4 h-4 text-orange-600" />
                      <strong>Modalidades:</strong> Speaking, Presentation, Debate, Storytelling
                    </span>
                    <span className="flex items-center gap-2">
                      <PresentationChartBarIcon className="w-4 h-4 text-orange-600" />
                      <strong>Evaluación:</strong> Fluidez, pronunciación, vocabulario, coherencia
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Datos Personales */}
          <div ref={formSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <div className="border-l-4 border-orange-600 pl-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-orange-600" />
                  Datos Personales
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-orange-600" />
                      Nombre Completo <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <IdentificationIcon className="w-4 h-4 text-orange-600" />
                      Cédula de Ciudadanía <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    onBlur={(e) => verificarDisponibilidad('cedula', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors duration-200 ${
                      getFieldError('cedula') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Número de cédula"
                    required
                  />
                  {renderFieldError('cedula')}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-orange-600" />
                      Correo Electrónico <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    onBlur={(e) => verificarDisponibilidad('correo', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors duration-200 ${
                      getFieldError('correo') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                  {renderFieldError('correo')}
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-orange-600" />
                      Número de Celular <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors duration-200"
                    placeholder="3001234567"
                    required
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-orange-600" />
                      Rol <span className="text-red-500">*</span>
                    </div>
                  </label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors duration-200 bg-white"
                    required
                  >
                    <option value="">Seleccionar Rol</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="egresado">Egresado</option>
                    <option value="docente">Docente</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="directivo">Directivo</option>
                    <option value="externo">Externo</option>
                  </select>
                </div>
              </div>

              {/* Campos condicionales según el rol */}
              {renderCamposPorRol()}
            </div>

            {/* Datos específicos para la competencia de inglés */}
            {renderDatosCompetenciaIngles()}

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
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-md font-medium text-base hover:bg-orange-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 border-b-4 border-orange-800 hover:border-orange-900 disabled:border-gray-400 mt-6"
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
            <h3 className="text-2xl font-bold text-orange-600">Inscripción Registrada</h3>
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
                <a href={qrSrc as string} target="_blank" rel="noopener noreferrer" className="bg-orange-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-700">Abrir QR</a>
              )}
              <button type="button" onClick={() => setSuccessOpen(false)} className="px-5 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioDobleLumen;