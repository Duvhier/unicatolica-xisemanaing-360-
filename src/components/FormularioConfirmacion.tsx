import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FormularioConfirmacionAsistencia.css";

// 🔹 Interfaz para los datos del formulario
interface FormData {
  nombres: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  idEstudiante: string;
  telefono: string;
  facultadArea: string;
  perfil: string;
  programaAcademico: string;
  email: string;
}

const FormularioConfirmacionAsistencia: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: "",
    apellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    idEstudiante: "",
    telefono: "",
    facultadArea: "",
    perfil: "",
    programaAcademico: "",
    email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // 🔹 URL de la API para confirmación de asistencia
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        nombres: formData.nombres.trim(),
        apellido: formData.apellido.trim(),
        tipoDocumento: formData.tipoDocumento.trim(),
        numeroDocumento: formData.numeroDocumento.trim(),
        idEstudiante: formData.idEstudiante.trim(),
        telefono: formData.telefono.trim(),
        facultadArea: formData.facultadArea.trim(),
        perfil: formData.perfil.trim(),
        programaAcademico: formData.programaAcademico.trim(),
        email: formData.email.trim(),
        fechaRegistro: new Date().toISOString()
      };

      console.log('📤 Enviando datos de confirmación:', payload);

      const res = await fetch(`${API_URL}/confirmaciondeasistencia/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const responseData = await res.json();
      console.log('✅ Registro exitoso:', responseData);

      // Mostrar confirmación exitosa
      setSuccessOpen(true);

      // Limpiar formulario
      setFormData({
        nombres: "",
        apellido: "",
        tipoDocumento: "",
        numeroDocumento: "",
        idEstudiante: "",
        telefono: "",
        facultadArea: "",
        perfil: "",
        programaAcademico: "",
        email: ""
      });

    } catch (error) {
      console.error('❌ Error al enviar formulario:', error);
      alert("Error al enviar el formulario. Por favor, intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Iconos (puedes reutilizar los mismos del formulario anterior)
  const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const DocumentIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const AcademicCapIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5-9-5-9 5 9 5z" />
    </svg>
  );

  const MailIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="formulario-confirmacion-asistencia">
      {/* HEADER */}
      <header className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 relative mb-8">
        {/* Logo y botón de regresar */}
        <div className="flex justify-between items-start mb-6">
          <img
            src="/unicatolica-logo.svg"
            alt="UNICATÓLICA"
            className="h-16 w-auto"
          />
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-uniblue hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Regresar</span>
          </Link>
        </div>

        {/* Contenido principal */}
        <div className="text-center">
          <div className="border-l-4 border-blue-500 pl-4 mb-4 inline-block">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              ACTO INAUGURAL UNICATÓLICA
            </h1>
          </div>

          <p className="text-lg text-uniblue font-semibold mb-4">
            XI Semana de La Ingeniería
          </p>

          <div className="bg-blue-100 rounded-full px-6 py-3 inline-block">
            <h2 className="text-xl font-bold text-gray-800">
              Confirmación de Asistencia
            </h2>
          </div>
        </div>
      </header>

      {/* FORMULARIO PRINCIPAL */}
      <main className="form-main-content">
        <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Datos Personales</h3>
              <p className="text-sm text-gray-600">Complete la información requerida para confirmar su asistencia</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Nombres */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-blue-500" />
                  Nombres <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese sus nombres"
                />
              </div>

              {/* Apellido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-blue-500" />
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese su apellido"
                />
              </div>

              {/* Tipo de Documento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <DocumentIcon className="w-4 h-4 text-blue-500" />
                  Tipo de Documento <span className="text-red-500">*</span>
                </label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                </select>
              </div>

              {/* Número de Documento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <DocumentIcon className="w-4 h-4 text-blue-500" />
                  Número de Documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Número de documento"
                />
              </div>

              {/* ID Estudiantes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                  ID Estudiantes
                </label>
                <input
                  type="text"
                  name="idEstudiante"
                  value={formData.idEstudiante}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Solo para estudiantes"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Solo si eres estudiante
                </p>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-blue-500" />
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(000) 000-0000"
                />
              </div>

              {/* Facultad/Área */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                  Facultad/Área <span className="text-red-500">*</span>
                </label>
                <select
                  name="facultadArea"
                  value={formData.facultadArea}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccionar facultad/área</option>
                  <option value="Ingeniería">Ingeniería</option>
                  <option value="Ciencias Administrativas">Ciencias Administrativas</option>
                  <option value="Ciencias Sociales">Ciencias Sociales</option>
                  <option value="Educación">Educación</option>
                  <option value="Salud">Salud</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
              </div>

              {/* Perfil */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-blue-500" />
                  Perfil <span className="text-red-500">*</span>
                </label>
                <select
                  name="perfil"
                  value={formData.perfil}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccionar perfil</option>
                  <option value="Estudiante">Estudiante</option>
                  <option value="Docente">Docente</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Egresado">Egresado</option>
                  <option value="Invitado">Invitado</option>
                </select>
              </div>

              {/* Programa Académico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                  Programa Académico
                </label>
                <input
                  type="text"
                  name="programaAcademico"
                  value={formData.programaAcademico}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese su programa académico"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-blue-500" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@unicatolica.edu.co"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirmar Asistencia
                </>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* MODAL DE CONFIRMACIÓN EXITOSA */}
      {successOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSuccessOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-green-600 mb-2">¡Confirmación Exitosa!</h3>
            <p className="text-gray-600 mb-6">
              Su asistencia al Acto Inaugural de la XI Semana de la Ingeniería ha sido confirmada correctamente.
            </p>
            
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-all flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioConfirmacionAsistencia;