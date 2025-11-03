import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./FormularioInscripcionLiderazgo.css";
import FullStackImg from "@/assets/ponentes/devsenioform.webp"; // Puedes cambiar esta imagen después
import LogoFullStack from "@/assets/ponentes/devseniologo.png"; // Puedes cambiar esta imagen después

const FormularioFullStack: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        correo: "",
        telefono: "",
        rol: "estudiante",
        idEstudiante: "",
        facultad: "",
        programa: "",
        semestre: "",
        nivelIngles: "",
        experienciaProgramacion: "",
        conocimientoSpring: "",
        conocimientoAngular: "",
        conocimientoAI: "",
        motivacion: "",
        expectativas: ""
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

    // ✅ Conexión con backend Full Stack
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const payload: any = {
                nombre: formData.nombre.trim(),
                cedula: formData.cedula.trim(),
                correo: formData.correo.trim(),
                telefono: formData.telefono.trim(),
                rol: formData.rol,
                actividades: ['fullstack-certification']
            };

            // Campos específicos para estudiantes
            if (formData.rol === "estudiante") {
                payload.idEstudiante = formData.idEstudiante.trim();
                payload.facultad = formData.facultad.trim();
                payload.programa = formData.programa.trim();
                payload.semestre = formData.semestre.trim();
            }

            // Información técnica
            payload.nivelIngles = formData.nivelIngles;
            payload.experienciaProgramacion = formData.experienciaProgramacion;
            payload.conocimientoSpring = formData.conocimientoSpring;
            payload.conocimientoAngular = formData.conocimientoAngular;
            payload.conocimientoAI = formData.conocimientoAI;
            payload.motivacion = formData.motivacion.trim();
            payload.expectativas = formData.expectativas.trim();

            console.log('📤 Enviando payload Full Stack:', payload);

            const res = await fetch(`${API_URL}/desarrollofullstack/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseData = await res.json();

            if (!res.ok) {
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
                        responseData.error || "Lo sentimos, no hay cupos disponibles para esta certificación",
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
                cedula: "",
                correo: "",
                telefono: "",
                rol: "estudiante",
                idEstudiante: "",
                facultad: "",
                programa: "",
                semestre: "",
                nivelIngles: "",
                experienciaProgramacion: "",
                conocimientoSpring: "",
                conocimientoAngular: "",
                conocimientoAI: "",
                motivacion: "",
                expectativas: ""
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
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
        if (formData.rol !== "estudiante") return null;

        return (
            <>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Estudiantil <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="idEstudiante"
                        value={formData.idEstudiante}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: A00123456"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facultad <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="facultad"
                        value={formData.facultad}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Seleccionar facultad</option>
                        <option value="Ingeniería">Facultad de Ingeniería</option>
                        <option value="Ciencias Básicas">Facultad de Ciencias Básicas</option>
                        <option value="Ciencias Económicas">Facultad de Ciencias Económicas</option>
                        <option value="Ciencias Sociales">Facultad de Ciencias Sociales</option>
                    </select>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Seleccionar programa</option>
                        <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                        <option value="Ingeniería Informática">Ingeniería Informática</option>
                        <option value="Tecnología en Desarrollo de Software">Tecnología en Desarrollo de Software</option>
                        <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                        <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                        <option value="Otra">Otra carrera</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Semestre <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="semestre"
                        value={formData.semestre}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="">Seleccionar semestre</option>
                        <option value="1">1° Semestre</option>
                        <option value="2">2° Semestre</option>
                        <option value="3">3° Semestre</option>
                        <option value="4">4° Semestre</option>
                        <option value="5">5° Semestre</option>
                        <option value="6">6° Semestre</option>
                        <option value="7">7° Semestre</option>
                        <option value="8">8° Semestre</option>
                        <option value="9">9° Semestre</option>
                        <option value="10">10° Semestre</option>
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
                        className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 font-medium"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Regresar</span>
                    </Link>
                </div>

                {/* Contenido principal */}
                <div className="text-center">
                    <div className="border-l-4 border-blue-600 pl-4 mb-4 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            XI SEMANA DE LA INGENIERÍA
                        </h1>
                    </div>

                    <p className="text-lg text-blue-600 font-semibold mb-4">
                        "360°: Innovación, Liderazgo y Futuro"
                    </p>

                    <div className="bg-blue-100 rounded-full px-6 py-3 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            CERTIFICACIÓN FULL STACK
                        </h1>
                        <p className="text-sm font-medium text-gray-800">
                            Spring Boot, Angular & AI - Cupo limitado a 30 personas
                        </p>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="form-main-content">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        AGENDA
                    </h2>
                </div>

                {/* Tarjeta Agenda */}
                <section
                    className={`bg-white rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${showEvento ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
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
                                Certificación Full Stack: Spring Boot, Angular & AI
                            </h3>
                            <div className="text-sm text-gray-600">
                                <span>Horario: 8:00 pm a 10:00 pm | 3 sesiones (10, 12, 14 Nov)</span>
                            </div>
                        </div>

                        {/* Flecha */}
                        <div className={`text-gray-400 transition-transform duration-300 ${showEvento ? "rotate-180 text-blue-500" : ""
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
                            {/* Información de la Certificación */}
                            <section className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start gap-6">
                                    {/* Icono de certificación */}
                                    <div className="flex-shrink-0 relative">
                                        <div className="relative">
                                            <img
                                                src={LogoFullStack}
                                                alt="Certificación Full Stack"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                                                <span className="text-xs text-white">🏆</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                                                Certificación Internacional
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            FULL STACK: SPRING BOOT, ANGULAR & AI
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            <strong>DevSeniorCode Academy</strong> Te invita a esta certificación intensiva donde aprenderás a construir aplicaciones inteligentes con las tecnologías más demandadas del mercado. Desarrolla habilidades en backend empresarial, frontend moderno e integración con Inteligencia Artificial.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span><strong>Fechas:</strong> 10, 12, 14 Nov 2025</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span><strong>Lugar:</strong> Modalidad Virtual </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                <span><strong>Duración:</strong> 3 sesiones de 2 horas</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                <span><strong>Certificado:</strong> Internacional DevSeniorCode</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Contenido del Curso */}
                            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">📚 Contenido Académico</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                                        <h5 className="font-semibold text-blue-600 mb-2">Clase 1 - Backend</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Spring Boot & APIs RESTful</li>
                                            <li>• PostgreSQL & Arquitectura</li>
                                            <li>• Integración con APIs de AI</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                                        <h5 className="font-semibold text-blue-600 mb-2">Clase 2 - Frontend</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Angular & Estructura Modular</li>
                                            <li>• Componentes & Consumo de APIs</li>
                                            <li>• Integración con AI</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                                        <h5 className="font-semibold text-blue-600 mb-2">Clase 3 - Integración</h5>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Full Stack Integration</li>
                                            <li>• Flujo de Datos & Lógica</li>
                                            <li>• Casos Reales con AI</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Imagen evento y botón */}
                            <section className="flex flex-col gap-6">
                                {/* Imagen con overlay */}
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                        src={FullStackImg}
                                        alt="Certificación Full Stack"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-white font-semibold text-sm">Certificación Internacional Full Stack</p>
                                    </div>
                                </div>

                                {/* Botón centrado */}
                                <div className="text-center">
                                    <button
                                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-md"
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                </svg>
                                                Inscribirme a la certificación
                                            </span>
                                        )}
                                    </button>

                                    <p className="text-sm text-gray-500 mt-3">
                                        🎯 Cupo limitado a 30 estudiantes | 📜 Certificado internacional incluido
                                    </p>
                                </div>
                            </section>
                        </>
                    )}

                    {/* FORMULARIO */}
                    {showFormulario && (
                        <section ref={formularioRef} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Formulario de Inscripción</h3>
                                    <p className="text-sm text-gray-600">Complete la información requerida para la certificación</p>
                                </div>

                                <div className="grid gap-4">
                                    {/* Información Personal */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Ingrese su nombre completo"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Cédula <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cedula"
                                                value={formData.cedula}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Número de cédula"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Teléfono <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="300 123 4567"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rol <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="rol"
                                            value={formData.rol}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                        >
                                            <option value="estudiante">Estudiante</option>
                                            <option value="egresado">Egresado</option>
                                        </select>
                                    </div>

                                    {/* Campos condicionales para estudiantes */}
                                    {renderCamposEstudiante()}

                                    {/* Información Técnica */}
                                    <div className="border-t pt-4">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">💻 Información Técnica</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nivel de Inglés <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    name="nivelIngles"
                                                    value={formData.nivelIngles}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Experiencia en Programación <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    name="experienciaProgramacion"
                                                    value={formData.experienciaProgramacion}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Seleccionar experiencia</option>
                                                    <option value="ninguna">Ninguna experiencia</option>
                                                    <option value="basica">Básica (cursos introductorios)</option>
                                                    <option value="intermedia">Intermedia (proyectos académicos)</option>
                                                    <option value="avanzada">Avanzada (proyectos personales)</option>
                                                    <option value="experta">Experta (experiencia laboral)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Conocimiento Spring Boot
                                                </label>
                                                <select
                                                    name="conocimientoSpring"
                                                    value={formData.conocimientoSpring}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Seleccionar nivel</option>
                                                    <option value="ninguno">Ninguno</option>
                                                    <option value="basico">Básico</option>
                                                    <option value="intermedio">Intermedio</option>
                                                    <option value="avanzado">Avanzado</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Conocimiento Angular
                                                </label>
                                                <select
                                                    name="conocimientoAngular"
                                                    value={formData.conocimientoAngular}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Seleccionar nivel</option>
                                                    <option value="ninguno">Ninguno</option>
                                                    <option value="basico">Básico</option>
                                                    <option value="intermedio">Intermedio</option>
                                                    <option value="avanzado">Avanzado</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Conocimiento AI/ML
                                                </label>
                                                <select
                                                    name="conocimientoAI"
                                                    value={formData.conocimientoAI}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Seleccionar nivel</option>
                                                    <option value="ninguno">Ninguno</option>
                                                    <option value="basico">Básico</option>
                                                    <option value="intermedio">Intermedio</option>
                                                    <option value="avanzado">Avanzado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Motivación y Expectativas */}
                                    <div className="border-t pt-4">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 Motivación y Expectativas</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    ¿Por qué quieres participar en esta certificación? <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    name="motivacion"
                                                    value={formData.motivacion}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                                    placeholder="Describe tu motivación para participar en esta certificación..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    ¿Qué esperas aprender? <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    name="expectativas"
                                                    value={formData.expectativas}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                                    placeholder="Describe qué esperas aprender y cómo aplicarás estos conocimientos..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
                                >
                                    {isSubmitting ? 'Enviando inscripción...' : 'Confirmar inscripción a la certificación'}
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
                        <h3 className="text-2xl font-bold text-blue-600">¡Inscripción Exitosa!</h3>
                        <p className="text-gray-600 mt-2">Tu registro para la certificación Full Stack ha sido confirmado.</p>
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
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all"
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
                                className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${modalType === "error" ? "bg-red-600 hover:bg-red-700" :
                                    modalType === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
                                        "bg-green-600 hover:bg-green-700"
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

export default FormularioFullStack;