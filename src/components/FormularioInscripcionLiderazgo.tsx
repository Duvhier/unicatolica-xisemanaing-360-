import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./FormularioInscripcionLiderazgo.css";
import ConferenciaImg from "../assets/CONFERENCIA COACHING-8.png";
import ximena from "@/assets/ximenaotero.jpg";

// 🔹 Importar los iconos que necesitas
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

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

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
  </svg>
);

const FormularioInscripcionLiderazgo: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        correo: "",
        telefono: "",
        rol: "",
        area: "",
    });

    const [showEvento, setShowEvento] = useState(false);
    const [showFormulario, setShowFormulario] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [qrSrc, setQrSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Nuevos estados para modales específicos
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"error" | "warning" | "success">("error");

    const expandableRef = useRef<HTMLDivElement | null>(null);
    const formularioRef = useRef<HTMLDivElement | null>(null);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // 🔹 Función para mostrar modales
    const showModal = (title: string, message: string, type: "error" | "warning" | "success" = "error") => {
        setModalTitle(title);
        setModalMessage(message);
        setModalType(type);
        setModalOpen(true);
    };

    // 🔹 Función para cerrar modal
    const closeModal = () => {
        setModalOpen(false);
        setModalTitle("");
        setModalMessage("");
    };

    // ✅ Conexión con backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                nombre: formData.nombre.trim(),
                cedula: formData.cedula.trim(),
                correo: formData.correo.trim(),
                telefono: formData.telefono.trim(),
                rol: formData.rol.trim(),
                area: formData.area.trim(),
            };

            const res = await fetch(`${API_URL}/liderazgo/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json();

            if (!res.ok) {
                // 🔹 Manejo específico de errores del backend
                if (responseData.message?.includes("correo institucional")) {
                    showModal(
                        "Correo no válido",
                        "El correo debe ser institucional (ejemplo@unicatolica.edu.co)",
                        "warning"
                    );
                    return;
                }

                if (responseData.message?.includes("Ya existe un registro")) {
                    showModal(
                        "Registro duplicado",
                        responseData.message || "Ya existe un registro con estos datos",
                        "warning"
                    );
                    return;
                }

                // 🔹 Error genérico
                throw new Error(responseData.message || `Error ${res.status}`);
            }

            // 🔹 Éxito
            setQrSrc(responseData?.qr || responseData?.qrData || null);
            setSuccessOpen(true);
            setFormData({
                nombre: "",
                cedula: "",
                correo: "",
                telefono: "",
                rol: "",
                area: "",
            });

        } catch (err: any) {
            console.error(err);
            // 🔹 Error de conexión o genérico
            showModal(
                "Error de conexión",
                err.message || "Error inesperado al enviar el formulario. Por favor, intente nuevamente.",
                "error"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEvento = () => {
        setShowEvento((prev) => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => {
                    expandableRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 300);
            } else setShowFormulario(false);
            return newState;
        });
    };

    const toggleFormulario = () => {
        setShowFormulario((prev) => {
            const newState = !prev;
            if (newState) {
                setTimeout(() => {
                    formularioRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 400);
            }
            return newState;
        });
    };

    return (
        <div className="formulario-profesional">
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
                    <div className="border-l-4 border-uniblue pl-4 mb-4 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            XI SEMANA DE LA INGENIERÍA
                        </h1>
                    </div>

                    <p className="text-lg text-uniblue font-semibold mb-4">
                        "360°: Innovación, Liderazgo y Futuro"
                    </p>

                    <div className="bg-unigold/20 rounded-full px-6 py-3 inline-block">
                        <p className="text-sm font-medium text-gray-800 flex items-center justify-center gap-2">
                            <ShieldCheckIcon className="w-4 h-4 text-unigold" />
                            Exclusiva para docentes y administrativos de UNICATÓLICA
                        </p>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="form-main-content">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-8 bg-unigold rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        AGENDA
                    </h2>
                </div>

                {/* Tarjeta Agenda */}
                <section
                    className={`bg-white rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${showEvento ? "border-uniblue bg-blue-50" : "border-gray-300 hover:border-uniblue hover:bg-gray-50"
                        }`}
                    onClick={toggleEvento}
                >
                    <div className="flex items-center gap-4 p-4">
                        {/* Fecha */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md w-14 h-14 flex-shrink-0">
                            <div className="text-lg font-bold text-gray-800">10</div>
                            <div className="text-xs font-medium text-gray-600 uppercase">NOV</div>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1">
                                Conferencia: Desarrollo Personal y Liderazgo
                            </h3>
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                                <ClockIcon className="w-4 h-4 text-uniblue" />
                                <span>3:00 PM - 5:00 PM</span>
                                <MapPinIcon className="w-4 h-4 text-uniblue" />
                                <span>Auditorio 1 - Sede Pance</span>
                            </div>
                        </div>

                        {/* Flecha */}
                        <div className={`text-gray-400 transition-transform duration-300 ${showEvento ? "rotate-180 text-uniblue" : ""
                            }`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 9L12 15L18 9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* DESPLIEGUE EN CASCADA */}
                <div ref={expandableRef} className={`expandable-content ${showEvento ? "expanded" : ""}`}>
                    {showEvento && (
                        <>
                            {/* Coach Card */}
                            <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start gap-6">
                                    {/* Imagen con estilo circular profesional */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="relative">
                                            <img
                                                src={ximena}
                                                alt="Coach Ximena Otero Pilonieta"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-uniblue shadow-md"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-unigold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                                                <span className="text-xs text-white">⭐</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-unigold rounded-full"></div>
                                            <span className="text-sm font-bold text-uniblue uppercase tracking-wide">
                                                Ponente Principal
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            Ximena Otero Pilonieta
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            <strong>Abogada & Coach</strong> especializada en Eneagrama, Desarrollo Personal y Liderazgo.
                                            Conferencista con enfoque en el crecimiento profesional y personal.
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1 font-medium">
                                                <ShieldCheckIcon className="w-4 h-4 text-uniblue" />
                                                Coach Certificada
                                            </span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <BriefcaseIcon className="w-4 h-4 text-uniblue" />
                                                Abogada
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Imagen evento y botón */}
                            <section className="flex flex-col gap-6">
                                {/* Imagen con overlay */}
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                        src={ConferenciaImg}
                                        alt="Conferencia Desarrollo Personal y Liderazgo"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-white font-semibold text-sm">Desarrollo Personal y Liderazgo</p>
                                    </div>
                                </div>

                                {/* Botón centrado */}
                                <div className="text-center">
                                    <button
                                        className="bg-uniblue text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-md"
                                        onClick={toggleFormulario}
                                    >
                                        {showFormulario ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                                Cerrar formulario
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                Reservar mi cupo
                                            </span>
                                        )}
                                    </button>

                                    <p className="text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
                                        <TrophyIcon className="w-4 h-4 text-unigold" />
                                        ⚡ Confirmación inmediata
                                    </p>
                                </div>
                            </section>
                        </>
                    )}

                    {/* FORMULARIO */}
                    {showFormulario && (
                        <section ref={formularioRef} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="border-l-4 border-uniblue pl-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Formulario de Inscripción</h3>
                                    <p className="text-sm text-gray-600">Complete la información requerida</p>
                                </div>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <UserIcon className="w-4 h-4 text-uniblue" />
                                            Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent"
                                            placeholder="Ingrese su nombre completo"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <DocumentIcon className="w-4 h-4 text-uniblue" />
                                            Documento <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cedula"
                                            value={formData.cedula}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent"
                                            placeholder="Número de documento"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <MailIcon className="w-4 h-4 text-uniblue" />
                                            Correo Electrónico <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent"
                                            placeholder="correo@unicatolica.edu.co"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <PhoneIcon className="w-4 h-4 text-uniblue" />
                                            Teléfono <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent"
                                            placeholder="3001234567"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <BuildingIcon className="w-4 h-4 text-uniblue" />
                                            Área/Departamento <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="area"
                                            value={formData.area}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent"
                                            placeholder="Ej: Facultad de Ingeniería"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <BriefcaseIcon className="w-4 h-4 text-uniblue" />
                                            Rol <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="rol"
                                            value={formData.rol}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-uniblue focus:border-transparent bg-white"
                                        >
                                            <option value="">Seleccionar rol</option>
                                            <option value="Docente">Docente</option>
                                            <option value="Administrativo">Administrativo</option>
                                            <option value="Directivo">Directivo</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-uniblue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2"
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
                                            Confirmar Inscripción
                                        </>
                                    )}
                                </button>

                                {error && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {error}
                                    </div>
                                )}
                            </form>
                        </section>
                    )}
                </div>
            </main>

            {/* 🔹 MODAL DE ÉXITO (QR) */}
            {successOpen && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSuccessOpen(false)}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">
                        <h3 className="text-2xl font-bold text-uniblue">Inscripción registrada</h3>
                        <p className="text-gray-600 mt-2">Guarda o escanea tu código para confirmar.</p>
                        <div className="mt-5 flex items-center justify-center">
                            {qrSrc ? (
                                <img
                                    src={qrSrc}
                                    alt="Código QR de confirmación"
                                    className="h-56 w-56 object-contain rounded-lg border border-gray-200 shadow-sm"
                                />
                            ) : (
                                <div className="text-gray-500 text-sm">QR no proporcionado por el servidor.</div>
                            )}
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-4">
                            {qrSrc && (
                                <a
                                    href={qrSrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-uniblue text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Abrir QR
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="px-6 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 MODAL DE ERRORES Y ADVERTENCIAS */}
            {modalOpen && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={closeModal}
                    />
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 text-center">
                        {/* Icono según el tipo */}
                        <div className="flex justify-center mb-4">
                            {modalType === "error" && (
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                            {modalType === "warning" && (
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                            )}
                            {modalType === "success" && (
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Título y mensaje */}
                        <h3 className={`text-2xl font-bold ${modalType === "error" ? "text-red-600" :
                            modalType === "warning" ? "text-yellow-600" :
                                "text-green-600"
                            }`}>
                            {modalTitle}
                        </h3>
                        <p className="text-gray-600 mt-4 whitespace-pre-line">{modalMessage}</p>

                        {/* Botón de acción */}
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={closeModal}
                                className={`px-8 py-3 rounded-full font-semibold text-white transition-all flex items-center gap-2 ${modalType === "error" ? "bg-red-600 hover:bg-red-700" :
                                    modalType === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
                                        "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioInscripcionLiderazgo;