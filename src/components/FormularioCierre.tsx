import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FormularioCierreInaugural.css";
import facultadesData from '@/assets/facultadesyprogramasacademicos.json';

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

// 🔹 Interfaces para la estructura del JSON
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

interface FacultadesData {
    facultades: Facultad[];
}

// 🔹 Interfaz para errores detallados
interface ErrorDetail {
    type?: string;
    message: string;
    existingData?: {
        nombres?: string;
        apellido?: string;
        email?: string;
        numeroDocumento?: string;
    };
}

const FormularioCierreInaugural: React.FC = () => {
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

    const [programasAcademicos, setProgramasAcademicos] = useState<Programa[]>([]);
    const [facultadesList, setFacultadesList] = useState<Facultad[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorDetails, setErrorDetails] = useState<ErrorDetail[]>([]);

    // 🔹 Determinar si la facultad es requerida basado en el perfil
    const isFacultadRequerida = formData.perfil === "Estudiante" || formData.perfil === "Docente" || formData.perfil === "Egresado";
    
    // 🔹 Determinar si el programa académico es requerido basado en el perfil
    const isProgramaRequerido = formData.perfil === "Estudiante" || formData.perfil === "Docente" || formData.perfil === "Egresado";

    // 🔹 URL de la API para cierre inaugural
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

    // 🔹 Cargar facultades al inicializar el componente
    useEffect(() => {
        try {
            console.log('📂 Datos de facultades cargados:', facultadesData);
            const data = facultadesData as FacultadesData;
            setFacultadesList(data.facultades);
            console.log('🎯 Facultades disponibles:', data.facultades);
        } catch (error) {
            console.error('❌ Error al cargar facultades:', error);
        }
    }, []);

    // 🔹 Cargar programas académicos cuando cambie la facultad
    useEffect(() => {
        if (formData.facultadArea) {
            try {
                console.log('🔍 Buscando programas para:', formData.facultadArea);

                const facultadSeleccionada = facultadesList.find(
                    (facultad: Facultad) => facultad.nombre === formData.facultadArea
                );

                console.log('📊 Facultad encontrada:', facultadSeleccionada);

                if (facultadSeleccionada) {
                    setProgramasAcademicos(facultadSeleccionada.programas);
                    console.log('📚 Programas encontrados:', facultadSeleccionada.programas);
                } else {
                    console.log('⚠️ No se encontró la facultad');
                    setProgramasAcademicos([]);
                }

                // Resetear programa académico si la facultad cambia
                setFormData(prev => ({ ...prev, programaAcademico: "" }));
            } catch (error) {
                console.error('❌ Error al cargar programas:', error);
                setProgramasAcademicos([]);
            }
        } else {
            setProgramasAcademicos([]);
        }
    }, [formData.facultadArea, facultadesList]);

    // 🔹 Resetear campos cuando cambie el perfil
    useEffect(() => {
        if (!isFacultadRequerida) {
            setFormData(prev => ({ 
                ...prev, 
                facultadArea: "",
                programaAcademico: "" 
            }));
            setProgramasAcademicos([]);
        }
        
        if (!isProgramaRequerido) {
            setFormData(prev => ({ 
                ...prev, 
                programaAcademico: "" 
            }));
        }

        // Resetear ID de estudiante si no es estudiante
        if (formData.perfil !== "Estudiante") {
            setFormData(prev => ({ 
                ...prev, 
                idEstudiante: "" 
            }));
        }
    }, [formData.perfil, isFacultadRequerida, isProgramaRequerido]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 🔹 Función para mostrar errores detallados
    const showErrorDetails = (errors: ErrorDetail[]) => {
        setErrorDetails(errors);
        setErrorOpen(true);
    };

    // 🔹 Función para formatear mensajes de error
    const formatErrorMessage = (error: ErrorDetail): string => {
        let message = `• ${error.message}`;
        
        if (error.existingData) {
            const { nombres, apellido, email, numeroDocumento } = error.existingData;
            if (nombres && apellido) {
                message += `\n  Registrado a: ${nombres} ${apellido}`;
            }
            if (email && error.type !== 'email') {
                message += `\n  Email: ${email}`;
            }
            if (numeroDocumento && error.type !== 'documento') {
                message += `\n  Documento: ${numeroDocumento}`;
            }
        }
        
        return message;
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

            console.log('📤 Enviando datos de cierre inaugural:', payload);

            const res = await fetch(`${API_URL}/cierreinaugural/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json();

            if (!res.ok) {
                // 🔥 MANEJO MEJORADO DE ERRORES
                if (res.status === 409 && responseData.errors) {
                    // Error de duplicados con detalles
                    showErrorDetails(responseData.errors);
                } else if (res.status === 400 && responseData.errors) {
                    // Error de validación
                    const validationErrors: ErrorDetail[] = responseData.errors.map((error: string) => ({
                        message: error
                    }));
                    showErrorDetails(validationErrors);
                } else if (res.status === 409 && responseData.error) {
                    // Cupo agotado
                    showErrorDetails([{
                        message: `Cupo agotado: ${responseData.error}`
                    }]);
                } else {
                    throw new Error(responseData.message || `Error ${res.status}: ${res.statusText}`);
                }
                return;
            }

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
            // Error genérico de red o servidor
            showErrorDetails([{
                message: `Error de conexión: ${error instanceof Error ? error.message : 'No se pudo conectar con el servidor'}`
            }]);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 🔹 Iconos (reutilizados del formulario anterior)
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
        <div className="formulario-cierre-inaugural">
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
                            CONFIRMACIÓN DE ASISTENCIA
                        </h1>
                    </div>

                    {/* Banner de la imagen */}
                    <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="https://res.cloudinary.com/dufzjm2mn/image/upload/v1762982095/bannerportadasemanaingenieria_vambgb.jpg"
                            alt="XI Semana de la Ingeniería - UNICATÓLICA"
                            className="w-full h-auto max-h-64 object-cover"
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-full px-8 py-4 inline-block shadow-sm">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h2 className="text-xl font-bold text-blue-700">
                                Miércoles, 12 de Noviembre
                            </h2>
                        </div>
                    </div>
                </div>
            </header>

            {/* FORMULARIO PRINCIPAL */}
            <main className="form-main-content">
                <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="border-l-4 border-blue-500 pl-4 mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">Datos Personales</h3>
                            <p className="text-sm text-gray-600">Complete la información requerida para confirmar su asistencia a los eventos de este Miércoles</p>
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
                                    <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                    <option value="Pasaporte">Pasaporte</option>
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
                                    disabled={formData.perfil !== "Estudiante"}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    placeholder={formData.perfil === "Estudiante" ? "Ingrese su ID de estudiante" : "Solo para estudiantes"}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.perfil === "Estudiante" ? "Requerido para estudiantes" : "Solo si eres estudiante"}
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

                            {/* Facultad/Área */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                                    Facultad/Área 
                                    {isFacultadRequerida && <span className="text-red-500">*</span>}
                                </label>
                                <select
                                    name="facultadArea"
                                    value={formData.facultadArea}
                                    onChange={handleInputChange}
                                    required={isFacultadRequerida}
                                    disabled={!isFacultadRequerida}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">
                                        {isFacultadRequerida ? "Seleccionar facultad/área" : "No requerido para su perfil"}
                                    </option>
                                    {facultadesList.map((facultad: Facultad) => (
                                        <option key={facultad.id} value={facultad.nombre}>
                                            {facultad.nombre}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isFacultadRequerida 
                                        ? "Requerido para estudiantes, docentes y egresados" 
                                        : "No requerido para administrativos e invitados"}
                                </p>
                            </div>

                            {/* Programa Académico */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                    <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                                    Programa Académico
                                    {isProgramaRequerido && <span className="text-red-500">*</span>}
                                </label>
                                <select
                                    name="programaAcademico"
                                    value={formData.programaAcademico}
                                    onChange={handleInputChange}
                                    disabled={!formData.facultadArea || programasAcademicos.length === 0 || !isProgramaRequerido}
                                    required={isProgramaRequerido}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">
                                        {!isProgramaRequerido 
                                            ? "No requerido para su perfil" 
                                            : !formData.facultadArea
                                                ? "Primero seleccione una facultad"
                                                : programasAcademicos.length === 0
                                                    ? "No hay programas disponibles"
                                                    : "Seleccionar programa"}
                                    </option>
                                    {programasAcademicos.map((programa: Programa) => (
                                        <option key={programa.id} value={programa.nombre}>
                                            {programa.nombre} ({programa.tipo})
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    {isProgramaRequerido 
                                        ? "Requerido para estudiantes, docentes y egresados" 
                                        : "No requerido para administrativos e invitados"}
                                </p>
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
                                    Confirmar Asistencia al Cierre
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
                        <p className="text-gray-600 mb-4">
                            Su asistencia al <strong>Acto de Clausura de la XI Semana de la Ingeniería</strong> ha sido confirmada correctamente.
                        </p>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left">
                            <h4 className="font-semibold text-green-800 mb-2">📧 Correo de Confirmación</h4>
                            <p className="text-sm text-green-700">
                                Se ha enviado un correo electrónico a <strong>{formData.email}</strong> con su código QR de acceso.
                            </p>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            <strong>Recuerde:</strong> Presente su código QR en la entrada del evento para el acceso.
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

            {/* MODAL DE ERROR DETALLADO */}
            {errorOpen && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setErrorOpen(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-red-600 mb-4 text-center">Error en el Registro</h3>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
                            <h4 className="font-semibold text-red-800 mb-3">Detalles del error:</h4>
                            <div className="space-y-2 text-sm text-red-700">
                                {errorDetails.map((error, index) => (
                                    <div key={index} className="whitespace-pre-line">
                                        {formatErrorMessage(error)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Sugerencia:</strong> {errorDetails.some(e => e.type === 'documento' || e.type === 'email') 
                                    ? 'Verifique sus datos personales o contacte al administrador si cree que esto es un error.'
                                    : 'Por favor, revise la información ingresada y vuelva a intentarlo.'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setErrorOpen(false)}
                                className="flex-1 bg-gray-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                            >
                                Entendido
                            </button>
                            {errorDetails.some(e => e.type === 'documento' || e.type === 'email') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setErrorOpen(false);
                                        // Aquí podrías redirigir a una página de contacto o soporte
                                    }}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                                >
                                    Contactar Soporte
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCierreInaugural;