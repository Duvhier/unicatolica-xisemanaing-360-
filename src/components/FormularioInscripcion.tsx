import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioInscripcion.css';
import HackathonImg from '@/assets/hackathonevento.jpg';
import TechTouchImg from '@/assets/technologicaltouchevento.jpg';
import SemanaImg from '@/assets/visitasevento.jpg';
import AsistenciaImg from '@/assets/asistenciaevento.jpg';

interface FormData {
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  programa: string;
  semestre: string;
  evento: string;
  nombre_equipo: string;
  nombre_proyecto: string;
  descripcion_proyecto: string;
  categoria_participacion: string;
  institucion_equipo: string;
  email_equipo: string;
  telefono_equipo: string;
}


const FormularioInscripcion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    programa: '',
    semestre: '',
    evento: '',
    nombre_equipo: '',
    nombre_proyecto: '',
    descripcion_proyecto: '',
    categoria_participacion: '',
    institucion_equipo: '',
    email_equipo: '',
    telefono_equipo: ''
  });

  const [showTeamFields, setShowTeamFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formData.evento && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [formData.evento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      evento: value
    }));

    // Mostrar campos del equipo solo para hackathon y technological
    const shouldShowTeamFields = value === 'hackathon' || value === 'technological';
    setShowTeamFields(shouldShowTeamFields);

    // Limpiar campos del equipo si se cambia a otra opción
    if (!shouldShowTeamFields) {
      setFormData(prev => ({
        ...prev,
        nombre_equipo: '',
        nombre_proyecto: '',
        descripcion_proyecto: '',
        categoria_participacion: '',
        institucion_equipo: '',
        email_equipo: '',
        telefono_equipo: ''
      }));
    }
  };

  const handleSelectEvent = (value: string) => {
    const fakeEvent = { target: { value } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleEventChange(fakeEvent);
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // construir payload para el backend
      const actividades = formData.evento ? [formData.evento] : [];
      const hasGrupo = showTeamFields;

      const payload: any = {
        nombre: formData.nombre.trim(),
        cedula: formData.cedula.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim(),
        programa: formData.programa,
        semestre: formData.semestre,
        actividades
      };

      if (hasGrupo) {
        payload.grupo = {
          nombre: formData.nombre_equipo.trim(),
          integrantes: [formData.nombre.trim()], // puedes agregar más integrantes si luego los capturas
          proyecto: {
            nombre: formData.nombre_proyecto.trim(),
            descripcion: formData.descripcion_proyecto.trim(),
            categoria: formData.categoria_participacion
          },
          institucion: formData.institucion_equipo.trim(),
          correo: formData.email_equipo.trim(),
          telefono: formData.telefono_equipo?.trim() || undefined
        };
      }

      console.log('🚀 Enviando payload:', payload);


      const res = await fetch(`${API_URL}/inscripciones/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || 'Error registrando la inscripción';
        const errors = Array.isArray(err?.errors) ? `\n- ${err.errors.join('\n- ')}` : '';
        throw new Error(`${msg}${errors}`);
      }

      const data = await res.json();
      // data: { message, id, qr, qrData, estudiante }
      const qrFromApi: string | undefined = data?.qr || data?.qrData;
      setQrSrc(qrFromApi || null);
      setSuccessOpen(true);

      // Enviar correo de confirmación (best-effort, sin bloquear UX)
      try {
        const emailPayload = {
          to: formData.correo.trim(),
          nombre: formData.nombre.trim(),
          evento: formData.evento,
          cedula: formData.cedula.trim(),
          programa: formData.programa,
          semestre: formData.semestre,
          qrSrc: qrFromApi,
          id: data?.id
        };
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload)
        }).catch(() => { });
      } catch { }

      // limpiar formulario
      setFormData({
        nombre: '',
        cedula: '',
        correo: '',
        telefono: '',
        programa: '',
        semestre: '',
        evento: '',
        nombre_equipo: '',
        nombre_proyecto: '',
        descripcion_proyecto: '',
        categoria_participacion: '',
        institucion_equipo: '',
        email_equipo: '',
        telefono_equipo: ''
      });
      setShowTeamFields(false);
    } catch (error: any) {
      alert(`❌ ${error.message || 'Error inesperado'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="formulario-container">
        {/* Encabezado */}
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
              XI SEMANA DE LA INGENIERÍA
            </h1>
            <p className="text-lg text-uniblue font-semibold mb-4">
              "360°: Innovación, Liderazgo y Futuro"
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <span className="bg-uniblue text-white px-4 py-2 rounded-full text-sm font-medium">
                Del 11 al 14 de noviembre de 2025
              </span>
              <span className="text-gray-600 font-medium">
                Sedes Pance y Meléndez
              </span>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Un espacio académico, investigativo, cultural y de relacionamiento
              con nuestros aliados estratégicos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Selección de Actividades */}
          <div className="mb-8">
            <div className="border-l-4 border-uniblue pl-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Eventos Disponibles</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hackathon */}
              <label className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${formData.evento === 'hackathon' ? 'border-uniblue shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input
                  className="hidden"
                  type="radio"
                  name="evento"
                  value="hackathon"
                  checked={formData.evento === 'hackathon'}
                  onChange={handleEventChange}
                  required
                />
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={HackathonImg}
                  alt="Hackathon"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>📅</span>
                    <span>Mié, Nov 12 | Sede Pance</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Hackathon</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Competencia de programación y desarrollo (máx. 12 grupos de 3–5 estudiantes)
                  </p>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${formData.evento === 'hackathon'
                        ? 'bg-uniblue text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => handleSelectEvent('hackathon')}
                  >
                    {formData.evento === 'hackathon' ? 'Seleccionado' : 'Inscribirse'}
                  </button>
                </div>
              </label>

              {/* Technological Touch */}
              <label className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${formData.evento === 'technological' ? 'border-uniblue shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input
                  className="hidden"
                  type="radio"
                  name="evento"
                  value="technological"
                  checked={formData.evento === 'technological'}
                  onChange={handleEventChange}
                />
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={TechTouchImg}
                  alt="Technological Touch"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>📅</span>
                    <span>Jue, Nov 13 | Sede Meléndez</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Technological Touch</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Presentación de proyectos innovadores y demostraciones tecnológicas
                  </p>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${formData.evento === 'technological'
                        ? 'bg-uniblue text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => handleSelectEvent('technological')}
                  >
                    {formData.evento === 'technological' ? 'Seleccionado' : 'Inscribirse'}
                  </button>
                </div>
              </label>

              {/* Visitas Empresariales */}
              <label className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${formData.evento === 'visitas' ? 'border-uniblue shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input
                  className="hidden"
                  type="radio"
                  name="evento"
                  value="visitas"
                  checked={formData.evento === 'visitas'}
                  onChange={handleEventChange}
                />
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={SemanaImg}
                  alt="Visitas Empresariales"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>📅</span>
                    <span>Mié 12 y Jue 13 | Zona América</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Visitas Empresariales</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Recorridos guiados por empresas líderes en tecnología e innovación
                  </p>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${formData.evento === 'visitas'
                        ? 'bg-uniblue text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => handleSelectEvent('visitas')}
                  >
                    {formData.evento === 'visitas' ? 'Seleccionado' : 'Inscribirse'}
                  </button>
                </div>
              </label>

              {/* Asistencia a Eventos */}
              <label className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${formData.evento === 'asistencia' ? 'border-uniblue shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input
                  className="hidden"
                  type="radio"
                  name="evento"
                  value="asistencia"
                  checked={formData.evento === 'asistencia'}
                  onChange={handleEventChange}
                />
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={AsistenciaImg}
                  alt="Asistencia a Eventos"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>📅</span>
                    <span>Del Mar al Vie, Nov 11 al 14</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Asistencia a Eventos</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Participación como público en foros, conferencias y actividades académicas
                  </p>
                  <button
                    type="button"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${formData.evento === 'asistencia'
                        ? 'bg-uniblue text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    onClick={() => handleSelectEvent('asistencia')}
                  >
                    {formData.evento === 'asistencia' ? 'Seleccionado' : 'Confirmar asistencia'}
                  </button>
                </div>
              </label>
            </div>
          </div>

          {!formData.evento && (
            <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 font-medium">
                Selecciona un evento para continuar con la inscripción
              </p>
            </div>
          )}

          {formData.evento && (
            <div ref={formSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Sección de Datos del Estudiante */}
              <div className="mb-8">
                <div className="border-l-4 border-uniblue pl-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Datos del Estudiante</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de documento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cedula"
                      value={formData.cedula}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo institucional <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                      required
                    />
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
                    >
                      <option value="">Seleccionar Programa</option>
                      <option value="ingenieria-industrial">Ingeniería Industrial</option>
                      <option value="ingenieria-sistemas">Ingeniería de Sistemas</option>
                      <option value="tecnologia-desarrollo-software">Tecnología en Desarrollo de Software</option>
                      <option value="tecnologia-gestion-logistica">Tecnología en Gestión Logística Empresarial</option>
                    </select>
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
                    >
                      <option value="">Seleccionar Semestre</option>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                      <option value="IX">IX</option>
                      <option value="X">X</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Campos del equipo */}
              {showTeamFields && (
                <div className="border-t border-gray-200 pt-8">
                  <div className="border-l-4 border-unigold pl-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Datos del Equipo</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del equipo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre_equipo"
                        value={formData.nombre_equipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                        placeholder="Un nombre único que lo identifique en la competencia"
                        required
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proyecto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre_proyecto"
                        value={formData.nombre_proyecto}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                        placeholder="Nombre del proyecto de ingeniería"
                        required
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción del proyecto <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="descripcion_proyecto"
                        value={formData.descripcion_proyecto}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 resize-vertical"
                        placeholder="Breve descripción del concepto y los objetivos principales del proyecto"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría de participación <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="categoria_participacion"
                        value={formData.categoria_participacion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200 bg-white"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="robotica">Robótica</option>
                        <option value="construccion">Construcción</option>
                        <option value="programacion">Programación</option>
                        <option value="diseno-sostenible">Diseño Sostenible</option>
                        <option value="inteligencia-artificial">Inteligencia Artificial</option>
                        <option value="iot">Internet de las Cosas (IoT)</option>
                        <option value="realidad-virtual">Realidad Virtual/Aumentada</option>
                        <option value="otra">Otra</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institución o empresa <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="institucion_equipo"
                        value={formData.institucion_equipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                        placeholder="Universidad, colegio o empresa que representa el equipo"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo electrónico del equipo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email_equipo"
                        value={formData.email_equipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                        placeholder="Correo para comunicaciones oficiales del equipo"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono del equipo (opcional)
                      </label>
                      <input
                        type="tel"
                        name="telefono_equipo"
                        value={formData.telefono_equipo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent transition-colors duration-200"
                        placeholder="Número de contacto del equipo"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmación */}
              <div className="form-group">
                <label className="checkbox-modern">
                  <input type="checkbox" required />
                  <div className="checkbox-label">
                    Acepto el tratamiento de mis datos personales. <span className="required">*</span>
                    <span className="text-sm">Acepto que mis datos personales sean utilizados para fines académicos, investigativos y de relacionamiento con empresas y comunidades de emprendimiento de la región.</span>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-uniblue text-white py-3 px-6 rounded-md font-medium text-base hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200 border-b-4 border-blue-800 hover:border-blue-900 disabled:border-gray-400"
              >
                {isSubmitting ? 'Enviando...' : 'Finalizar inscripción'}
              </button>
            </div>
          )}
        </form>

      </div>

      {successOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSuccessOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 text-center">
            <h3 className="text-2xl font-bold text-uniblue">Inscripción registrada</h3>
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

export default FormularioInscripcion;
