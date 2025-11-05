import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioInscripcion.css';
import TallerVueloImg from '@/assets/INICIACION AL VUELO-8.png'; // Asegúrate de tener esta imagen
import facultadesData from '@/assets/facultadesyprogramasacademicos.json';

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
  idEstudiante: string;

  // Campos condicionales según rol
  facultad: string;
  programa: string;
  semestre: string;
  area: string;
  cargo: string;
  empresa: string;
}

// ✅ INTERFACE para errores de duplicidad
interface FieldError {
  field: string;
  message: string;
}

// Componentes de Iconos SVG (los mismos del formulario inaugural)
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IdentificationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

const EnvelopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const FormularioTallerVuelo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    rol: '',
    idEstudiante: '',
    facultad: '',
    programa: '',
    semestre: '',
    area: '',
    cargo: '',
    empresa: ''
  });

  const [programasFiltrados, setProgramasFiltrados] = useState<Programa[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // ✅ ESTADOS CORREGIDOS - Todos dentro del componente
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);
  const [cedulaTimeout, setCedulaTimeout] = useState<NodeJS.Timeout | null>(null);
  const [emailTimeout, setEmailTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

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

  // ✅ FUNCIÓN MEJORADA: Manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
    const { name, value } = 'target' in e ? e.target : e;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // ✅ Limpiar error del campo cuando el usuario empiece a escribir
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

  // ✅ FUNCIÓN: Calcular progreso del formulario
  const calculateProgress = () => {
    let progress = 0;

    // Verificar cada campo string explícitamente
    if (formData.nombre.trim() !== '') progress += 15;
    if (formData.cedula.trim() !== '') progress += 15;
    if (formData.correo.trim() !== '') progress += 15;
    if (formData.telefono.trim() !== '') progress += 15;
    if (formData.rol.trim() !== '') progress += 15;

    if (aceptaTerminos) progress += 25;

    return Math.min(progress, 100);
  };

  // ✅ FUNCIÓN: Limpiar errores de un campo específico
  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => prev.filter(error => !error.field.includes(fieldName)));
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

  // ✅ FUNCIÓN: Verificar disponibilidad de datos en tiempo real
  const verificarDisponibilidad = async (field: string, value: string) => {
    if (!value.trim()) return;

    try {
      setIsCheckingDuplicates(true);
      const response = await fetch(`${API_URL}/tallervuelo/verificar-disponibilidad`, {
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

  // ✅ FUNCIÓN: Obtener mensaje de error para un campo específico
  const getFieldError = (fieldName: string): string | null => {
    const error = fieldErrors.find(err => err.field === fieldName);
    return error ? error.message : null;
  };

  // ✅ FUNCIÓN: Verificar si hay errores de duplicidad
  const hasDuplicateErrors = (): boolean => {
    return fieldErrors.length > 0;
  };

  // ✅ FUNCIÓN: Componente para mostrar errores de campo
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
      if (!formData.idEstudiante.trim() || !formData.facultad || !formData.programa || !formData.semestre) {
        alert('Por favor complete todos los campos requeridos para estudiantes');
        return false;
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

    // ✅ Verificar si hay errores de duplicidad
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
        id: formData.idEstudiante.trim(),
        actividades: ['taller-vuelo-coheteria'] // ✅ Cambiado a taller-vuelo-coheteria
      };

      // Campos condicionales según el rol
      if (formData.rol === 'estudiante') {
        payload.facultad = formData.facultad;
        payload.programa = formData.programa;
        payload.semestre = formData.semestre;
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

      console.log('🚀 Enviando payload:', payload);

      const res = await fetch(`${API_URL}/tallervuelo/registro`, { // ✅ Cambiado a tallervuelo
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // ✅ MANEJO MEJORADO DE ERRORES DE DUPLICIDAD
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
        idEstudiante: '',
        facultad: '',
        programa: '',
        semestre: '',
        area: '',
        cargo: '',
        empresa: ''
      });
      setAceptaTerminos(false);
      setFieldErrors([]); // ✅ Limpiar errores después de éxito

    } catch (error: any) {
      console.error('Error en submit:', error);

      // ✅ Mostrar mensaje de error específico para duplicados
      if (error.message.includes('duplicados')) {
        alert(`❌ ${error.message}\n\nErrores:\n${fieldErrors.map(err => `• ${err.message}`).join('\n')}`);
      } else {
        alert(`❌ ${error.message || 'Error inesperado'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar campos según el rol seleccionado
  const renderCamposPorRol = () => {
    switch (formData.rol) {
      case 'estudiante':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idEstudiante"
                value={formData.idEstudiante}
                onChange={handleInputChange}
                onBlur={(e) => verificarDisponibilidad('idEstudiante', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 ${getFieldError('idEstudiante') ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
                Facultad <span className="text-red-500">*</span>
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
                Programa Académico <span className="text-red-500">*</span>
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
                Semestre <span className="text-red-500">*</span>
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
                Programa de Egreso <span className="text-red-500">*</span>
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
                Empresa donde labora (Opcional)
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
                Área/Departamento <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Ej: Departamento de Sistemas"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                placeholder="Ej: Docente Tiempo Completo"
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
                Empresa/Institución <span className="text-red-500">*</span>
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
                Cargo <span className="text-red-500">*</span>
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

  return (
    <>
      <div className="formulario-container">
        {/* Encabezado - MODIFICADO PARA TALLER DE VUELO Y COHETERÍA */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 relative mb-8 border">
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              TALLER DE VUELO Y COHETERÍA
            </h1>
            <p className="text-lg text-uniblue font-semibold mb-4">
              "XI Semana de la Ingeniería: 360°: Innovación, Liderazgo y Futuro"
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <span className="bg-uniblue text-white px-4 py-2 rounded-full text-sm font-medium">
                Miércoles 12 de Noviembre
              </span>
              <span className="text-gray-600 font-medium">
                10:00 am - 12:00 pm
              </span>
              <span className="text-gray-600 font-medium">
                Auditorio 1 – Sede Pance
              </span>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Taller Teórico – Práctico de Iniciación al Vuelo y a La Cohetería
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Información del Evento - Versión Mejorada PARA TALLER DE VUELO */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-uniblue rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Información del Evento</h2>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={TallerVueloImg}
                  alt="Taller de Vuelo y Cohetería - XI Semana de la Ingeniería"
                />
                <div className="absolute top-4 left-4 bg-uniblue text-white px-3 py-1 rounded-full text-sm font-medium">
                  Taller Práctico
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    Mié, Nov 12
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    10:00 am – 11:00 am
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">Taller Teórico – Práctico de Iniciación al Vuelo y a La Cohetería</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Un espacio práctico para aprender los fundamentos del vuelo y la cohetería, 
                  explorando conceptos básicos de aerodinámica y propulsión mediante actividades 
                  interactivas y demostraciones en vivo.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-5 h-5 text-uniblue mt-0.5" />
                      <div>
                        <strong className="text-gray-700">Lugar:</strong>
                        <p className="text-gray-600">Auditorio 1<br />Sede Pance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ClockIcon className="w-5 h-5 text-uniblue mt-0.5" />
                      <div>
                        <strong className="text-gray-700">Duración:</strong>
                        <p className="text-gray-600">1 hora</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <RocketIcon className="w-5 h-5 text-uniblue mt-0.5" />
                      <div>
                        <strong className="text-gray-700">Ponente:</strong>
                        <p className="text-gray-600">P&D Julián Portocarrero Hermann</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Datos Personales - Mejorada (igual que inaugural) */}
          <div ref={formSectionRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-uniblue rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Datos Personales</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Campo Nombre */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>

                {/* Campo Cédula con validación mejorada */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <IdentificationIcon className="w-4 h-4" />
                    Cédula de Ciudadanía <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={(e) => {
                        // Validación en tiempo real: solo números y máximo 10 caracteres
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleInputChange({ target: { name: 'cedula', value } });

                        // Verificar disponibilidad después de 1 segundo sin cambios
                        if (cedulaTimeout) clearTimeout(cedulaTimeout);
                        setCedulaTimeout(setTimeout(() => {
                          if (value.length >= 8) {
                            verificarDisponibilidad('cedula', value);
                          }
                        }, 1000));
                      }}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200 ${getFieldError('cedula')
                        ? 'border-red-300 bg-red-50'
                        : formData.cedula && !getFieldError('cedula')
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300'
                        }`}
                      placeholder="Solo números (máx. 10 dígitos)"
                      required
                    />
                    {formData.cedula && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getFieldError('cedula') ? (
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {renderFieldError('cedula')}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.cedula.length}/10 dígitos
                  </p>
                </div>

                {/* Campo Email con validación mejorada */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <EnvelopeIcon className="w-4 h-4" />
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={(e) => {
                        handleInputChange(e);
                        // Verificar disponibilidad después de 1 segundo sin cambios
                        if (emailTimeout) clearTimeout(emailTimeout);
                        setEmailTimeout(setTimeout(() => {
                          if (e.target.value.includes('@')) {
                            verificarDisponibilidad('correo', e.target.value);
                          }
                        }, 1000));
                      }}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200 ${getFieldError('correo')
                        ? 'border-red-300 bg-red-50'
                        : formData.correo && !getFieldError('correo')
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300'
                        }`}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                    {formData.correo && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getFieldError('correo') ? (
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {renderFieldError('correo')}
                </div>

                {/* Campo Teléfono con formato */}
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <PhoneIcon className="w-4 h-4" />
                    Número de Celular <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={(e) => {
                      // Limitar a 10 dígitos numéricos y aplicar formato
                      const numericValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                      const formattedValue = numericValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                      handleInputChange({ target: { name: 'telefono', value: formattedValue } });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="3001234567"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.telefono.replace(/\s/g, '').length}/10 dígitos
                  </p>
                </div>

                {/* Campo Rol con iconos */}
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <UserGroupIcon className="w-4 h-4" />
                    Rol <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Seleccionar Rol</option>
                    <option value="estudiante">🎓 Estudiante</option>
                    <option value="egresado">📜 Egresado</option>
                    <option value="docente">👨‍🏫 Docente</option>
                    <option value="administrativo">💼 Administrativo</option>
                    <option value="directivo">⭐ Directivo</option>
                    <option value="externo">🌐 Externo</option>
                  </select>
                </div>
              </div>

              {/* Campos condicionales según el rol */}
              <div className="mt-6 transition-all duration-300">
                {renderCamposPorRol()}
              </div>
            </div>

            {/* Panel de Errores Mejorado */}
            {fieldErrors.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  Se encontraron los siguientes errores:
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  {fieldErrors.map((error, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Barra de Progreso */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso de inscripción</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-uniblue h-2 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>

            {/* Términos y Condiciones Mejorados */}
            <div className="form-group mt-8">
              <div className={`p-4 rounded-lg border transition-all duration-200 ${aceptaTerminos ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={aceptaTerminos}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 text-uniblue rounded focus:ring-uniblue focus:ring-2"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      Acepto el tratamiento de mis datos personales <span className="text-red-500">*</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Acepto que mis datos personales sean utilizados para fines académicos, investigativos y de relacionamiento con empresas y comunidades de emprendimiento de la región.
                    </p>
                    <button
                      type="button"
                      className="text-sm text-uniblue hover:underline mt-2"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Ver términos completos
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {/* Botón de Envío Mejorado */}
            <button
              type="submit"
              disabled={isSubmitting || !aceptaTerminos || hasDuplicateErrors() || isCheckingDuplicates}
              className="w-full bg-gradient-to-r from-uniblue to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100 mt-6 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="w-5 h-5 animate-spin" />
                  Enviando inscripción...
                </>
              ) : isCheckingDuplicates ? (
                <>
                  <SpinnerIcon className="w-5 h-5 animate-spin" />
                  Verificando datos...
                </>
              ) : hasDuplicateErrors() ? (
                <>
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  Corrija los errores para continuar
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Finalizar Inscripción
                </>
              )}
            </button>

            {/* Mensaje de confirmación adicional */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Recibirás un correo de confirmación con los detalles del evento
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Modal de Términos y Condiciones */}
      {showTermsModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTermsModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-uniblue mb-4">Términos y Condiciones</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Al aceptar el tratamiento de datos personales, autorizo a UNICATÓLICA para que, de conformidad con la Ley 1581 de 2012 y el Decreto Reglamentario 1377 de 2013, mis datos personales sean utilizados para los siguientes fines:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Fines académicos e investigativos relacionados con los programas de la institución.</li>
                <li>Gestión de relacionamiento con empresas y comunidades de emprendimiento de la región.</li>
                <li>Invitación a eventos académicos, culturales y de extensión universitaria.</li>
                <li>Envío de información sobre programas académicos, convocatorias y actividades institucionales.</li>
                <li>Procesos de seguimiento a egresados y estudios de impacto laboral.</li>
              </ul>
              <p>
                Declaro que la información suministrada es veraz, completa y exacta. Conozco que puedo ejercer mis derechos de acceso, corrección, actualización y supresión de los datos, así como revocar la autorización otorgada, mediante solicitud presentada en las oficinas de la institución.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="bg-uniblue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {successOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSuccessOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 text-center">
            <h3 className="text-2xl font-bold text-uniblue">Inscripción Registrada</h3>
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
                <a href={qrSrc as string} target="_blank" rel="noopener noreferrer" className="bg-uniblue text-white px-5 py-2 rounded-full font-semibold hover:bg-uniblue/90">Abrir QR</a>
              )}
              <button type="button" onClick={() => setSuccessOpen(false)} className="px-5 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioTallerVuelo;