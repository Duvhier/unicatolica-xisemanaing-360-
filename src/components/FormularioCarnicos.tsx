import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./FormularioInscripcionLiderazgo.css";
import CarnicosImg from "@/assets/VISITA EMPRESARIAL -8.png";


const FormularioCarnicos: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        tipoDocumento: "",
        numeroDocumento: "",
        correo: "",
        telefono: "",
        perfil: "",
        id: "",
        programa: "",
        eps: "",
        placasVehiculo: ""
    });

    const [showEvento, setShowEvento] = useState(false);
    const [showFormulario, setShowFormulario] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [qrSrc, setQrSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Estados para modales
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"error" | "warning" | "success">("error");

    const expandableRef = useRef<HTMLDivElement | null>(null);
    const formularioRef = useRef<HTMLDivElement | null>(null);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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

    // ✅ Conexión con backend para Cárnicos
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const payload: any = {
                nombre: formData.nombre.trim(),
                tipoDocumento: formData.tipoDocumento.trim(),
                numeroDocumento: formData.numeroDocumento.trim(),
                correo: formData.correo.trim(),
                telefono: formData.telefono.trim(),
                perfil: formData.perfil.trim(),
            };

            // Campos específicos para estudiantes
            if (formData.perfil === "Estudiante") {
                payload.id = formData.id.trim();
                payload.programa = formData.programa.trim();
            }

            // Campos opcionales
            if (formData.eps.trim()) {
                payload.eps = formData.eps.trim();
            }
            if (formData.placasVehiculo.trim()) {
                payload.placasVehiculo = formData.placasVehiculo.trim();
            }

            console.log('📤 Enviando payload:', payload);

            const res = await fetch(`${API_URL}/visitacarnicos/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json();

            if (!res.ok) {
                // 🔹 Manejo específico de errores de validación
                if (responseData.errors && Array.isArray(responseData.errors)) {
                    showModal(
                        "Error de validación",
                        responseData.errors.join('\n') || "Por favor, corrija los errores en el formulario",
                        "error"
                    );
                    return;
                }

                // 🔹 Manejo específico de errores del backend
                if (responseData.message?.includes("duplicados")) {
                    showModal(
                        "Registro duplicado",
                        responseData.errors?.join('\n') || "Ya existe un registro con estos datos",
                        "warning"
                    );
                    return;
                }

                if (responseData.message?.includes("Cupo agotado")) {
                    showModal(
                        "Cupo agotado",
                        responseData.error || "Lo sentimos, no hay cupos disponibles para esta actividad",
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

            // Limpiar formulario
            setFormData({
                nombre: "",
                tipoDocumento: "",
                numeroDocumento: "",
                correo: "",
                telefono: "",
                perfil: "",
                id: "",
                programa: "",
                eps: "",
                placasVehiculo: ""
            });

        } catch (err: any) {
            console.error(err);
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

    // 🔹 Renderizar campos condicionales para estudiantes
    const renderCamposEstudiante = () => {
        if (formData.perfil !== "Estudiante") return null;

        return (
            <>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Ej: A00123456"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Programa Académico <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="programa"
                        value={formData.programa}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                    >
                        <option value="">Seleccionar programa</option>
                        <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                        <option value="Tecnología en Desarrollo de Software">Tecnología en Desarrollo de Software</option>
                        <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                        <option value="Administración de Empresas">Administración de Empresas</option>
                        <option value="Contaduría Pública">Contaduría Pública</option>
                        <option value="Tecnología en Gestión de Logística Empresarial">Tecnología en Gestión de Logística Empresarial</option>
                    </select>
                </div>
            </>
        );
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
                        className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 font-medium"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Regresar</span>
                    </Link>
                </div>

                {/* Contenido principal */}
                <div className="text-center">
                    <div className="border-l-4 border-orange-500 pl-4 mb-4 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            XI SEMANA DE LA INGENIERÍA
                        </h1>
                    </div>

                    <p className="text-lg text-orange-600 font-semibold mb-4">
                        "360°: Innovación, Liderazgo y Futuro"
                    </p>

                    <div className="bg-orange-100 rounded-full px-6 py-3 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            CDI Alimentos Cárnicos
                        </h1>
                        <p className="text-sm font-medium text-gray-800">
                            Visita empresarial - Cupo limitado a 23 personas
                        </p>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="form-main-content">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        AGENDA
                    </h2>
                </div>

                {/* Tarjeta Agenda */}
                <section
                    className={`bg-white rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${showEvento ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-orange-500 hover:bg-gray-50"
                        }`}
                    onClick={toggleEvento}
                >
                    <div className="flex items-center gap-4 p-4">
                        {/* Fecha */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md w-14 h-14 flex-shrink-0">
                            <div className="text-lg font-bold text-gray-800">15</div>
                            <div className="text-xs font-medium text-gray-600 uppercase">NOV</div>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1">
                                Visita Empresarial: CDI Alimentos Cárnicos
                            </h3>
                            <div className="text-sm text-gray-600">
                                <span>Horario: 9:00 am a 12:00 pm </span>
                            </div>
                        </div>

                        {/* Flecha */}
                        <div className={`text-gray-400 transition-transform duration-300 ${showEvento ? "rotate-180 text-orange-500" : ""
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
                            {/* Información de la Visita */}
                            <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start gap-6">
                                    {/* Icono de visita empresarial */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="relative">
                                            <img
                                                src={"https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/alimentoscarnicos_w1biva.png"}
                                                alt="CDI Alimentos Cárnicos"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-md"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-orange-400 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                                                <span className="text-xs text-white">🏭</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-orange-600 uppercase tracking-wide">
                                                Visita Empresarial
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            CDI Alimentos Cárnicos
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            <strong>CDI Alimentos Cárnicos</strong> te invita a descubrir los procesos de producción,
                                            calidad y logística en la industria alimentaria. Vive una experiencia única donde
                                            podrás conocer de primera mano las operaciones de una planta procesadora de alimentos
                                            y su impacto en la cadena de suministro.
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1 font-medium">
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                CDI Alimentos Cárnicos, Yumbo
                                            </span>
                                            <span className="flex items-center gap-1 font-medium">
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Hora: 9:00 am a 12:00 pm
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
                                        src={CarnicosImg}
                                        alt="Visita CDI Alimentos Cárnicos"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-white font-semibold text-sm">CDI Alimentos Cárnicos - Procesos Industriales</p>
                                    </div>
                                </div>

                                {/* Botón centrado */}
                                <div className="text-center">
                                    <button
                                        className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-md"
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

                                    <p className="text-sm text-gray-500 mt-3">
                                        ⚡ Cupo limitado a 23 personas
                                    </p>
                                </div>
                            </section>
                        </>
                    )}

                    {/* FORMULARIO */}
                    {showFormulario && (
                        <section ref={formularioRef} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Formulario de Inscripción</h3>
                                    <p className="text-sm text-gray-600">Complete la información requerida para la visita</p>
                                </div>

                                <div className="grid gap-4">
                                    {/* Campos básicos */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Ingrese su nombre completo"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tipo de Documento <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="tipoDocumento"
                                                value={formData.tipoDocumento}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                            >
                                                <option value="">Seleccionar tipo</option>
                                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                                <option value="Cédula Digital">Cédula Digital</option>
                                                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                                <option value="Pasaporte">Pasaporte</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Número de Documento <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="numeroDocumento"
                                                value={formData.numeroDocumento}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Número de documento"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Correo Electrónico <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Número de Celular <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="3001234567"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Perfil <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="perfil"
                                            value={formData.perfil}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                        >
                                            <option value="">Seleccionar perfil</option>
                                            <option value="Estudiante">Estudiante</option>
                                            <option value="Docente">Docente</option>
                                            <option value="Administrativo">Administrativo</option>
                                        </select>
                                    </div>

                                    {/* Campos condicionales para estudiantes */}
                                    {renderCamposEstudiante()}

                                    {/* Campos opcionales */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            EPS (Opcional)
                                        </label>
                                        <input
                                            type="text"
                                            name="eps"
                                            value={formData.eps}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Nombre de su EPS"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Placas del Vehículo (Opcional)
                                        </label>
                                        <input
                                            type="text"
                                            name="placasVehiculo"
                                            value={formData.placasVehiculo}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Ej: ABC123"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Solo si planea llevar vehículo (estacionamiento sujeto a disponibilidad)
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 transition-colors duration-200"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Confirmar Inscripción'}
                                </button>

                                {error && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
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
                        <h3 className="text-2xl font-bold text-orange-600">Inscripción registrada</h3>
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
                                    className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 transition-all"
                                >
                                    Abrir QR
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="px-6 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-all"
                            >
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
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Título y mensaje */}
                        <h3 className={`text-2xl font-bold ${modalType === "error" ? "text-red-600" :
                            modalType === "warning" ? "text-yellow-600" :
                                "text-orange-600"
                            }`}>
                            {modalTitle}
                        </h3>
                        <p className="text-gray-600 mt-4 whitespace-pre-line">{modalMessage}</p>

                        {/* Botón de acción */}
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={closeModal}
                                className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${modalType === "error" ? "bg-red-600 hover:bg-red-700" :
                                    modalType === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
                                        "bg-orange-600 hover:bg-orange-700"
                                    }`}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioCarnicos;