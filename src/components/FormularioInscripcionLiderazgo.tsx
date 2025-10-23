import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./FormularioInscripcionLiderazgo.css";
import ConferenciaImg from "../assets/CONFERENCIA COACHING-8.png";
import ximena from "@/assets/ximenaotero.jpg";

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
            <header className="liderazgo-header">
                <img src="/unicatolica-logo.svg" alt="UNICATÓLICA" className="liderazgo-logo" />
                <Link to="/" className="btn-atras">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="btn-text">Regresar</span>
                </Link>
                <h1>XI Semana de la Ingeniería <br />"360°: Innovación, Liderazgo y Futuro"</h1>
                <p className="subtext">Exclusiva para docentes y administrativos de UNICATÓLICA</p>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="form-main-content">
                <h2 className="agenda-title">Agenda</h2>

                {/* Tarjeta Agenda */}
                <section className={`event-card ${showEvento ? "expanded" : ""}`} onClick={toggleEvento}>
                    <div className="event-date">
                        <div className="date-day">10</div>
                        <div className="date-month">NOV</div>
                    </div>
                    <div className="event-details">
                        <h3 className="event-name">Conferencia: Desarrollo Personal y Liderazgo</h3>
                        <div className="event-meta">
                            <span className="location">Auditorio 1 | Sede Pance | </span>
                            <span className="time">3:00 pm – 5:00 pm</span>
                        </div>
                    </div>
                    <div className="event-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d={showEvento ? "M6 15L12 9L18 15" : "M6 9L12 15L18 9"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </section>

                {/* DESPLIEGUE EN CASCADA */}
                <div ref={expandableRef} className={`expandable-content ${showEvento ? "expanded" : ""}`}>
                    {showEvento && (
                        <>
                            {/* Coach Card */}
                            <section className="speaker-section">
                                <div className="speaker-card">
                                    <div className="speaker-photo">
                                        <img src={ximena} alt="Ximena Otero Pilonieta" />
                                    </div>
                                    <div className="speaker-info">
                                        <span className="speaker-role">Ponente</span>
                                        <h3 className="speaker-name">Ximena Otero Pilonieta</h3>
                                        <p className="speaker-bio">
                                            Abogada & Coach en Eneagrama, Desarrollo Personal y Liderazgo.
                                            Conferencista 🎤
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Imagen evento y botón */}
                            <section className="event-expanded-details">
                                <div className="event-image-container">
                                    <img src={ConferenciaImg} alt="Conferencia Liderazgo" className="event-image" />
                                </div>
                                <button className="cta-button primary" onClick={toggleFormulario}>
                                    {showFormulario ? "Ocultar formulario" : "Inscribirme en este evento"}
                                </button>
                            </section>
                        </>
                    )}

                    {/* FORMULARIO */}
                    {showFormulario && (
                        <section ref={formularioRef} className="registration-form-section">
                            <form onSubmit={handleSubmit} className="registration-form">
                                <div className="form-header">
                                    <h2>Formulario de Inscripción</h2>
                                    <p>Complete todos los campos obligatorios (*)</p>
                                </div>

                                <div className="form-grid">
                                    {[
                                        { id: "nombre", label: "Nombre Completo", type: "text" },
                                        { id: "cedula", label: "Cédula", type: "text" },
                                        { id: "correo", label: "Correo Institucional", type: "email" },
                                        { id: "telefono", label: "Teléfono", type: "tel" },
                                        { id: "area", label: "Área a la que pertenece", type: "text" },
                                    ].map(({ id, label, type }) => (
                                        <div className="form-group" key={id}>
                                            <label htmlFor={id} className="form-label">
                                                {label} <span className="required">*</span>
                                            </label>
                                            <input
                                                id={id}
                                                type={type}
                                                name={id}
                                                value={(formData as any)[id]}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input"
                                            />
                                        </div>
                                    ))}

                                    <div className="form-group">
                                        <label htmlFor="rol" className="form-label">
                                            Rol <span className="required">*</span>
                                        </label>
                                        <select
                                            id="rol"
                                            name="rol"
                                            value={formData.rol}
                                            onChange={handleInputChange}
                                            required
                                            className="form-select"
                                        >
                                            <option value="">Seleccionar Rol</option>
                                            <option value="Docente">Docente</option>
                                            <option value="Administrativo">Administrativo</option>
                                            <option value="Directivo">Directivo</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`submit-button ${isSubmitting ? "loading" : ""}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner"></div> Registrando...
                                        </>
                                    ) : (
                                        "Confirmar mi participación"
                                    )}
                                </button>

                                {error && <p className="error-message">❌ {error}</p>}
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
                        <h3 className="text-2xl font-bold text-[#001b5e]">Inscripción registrada</h3>
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
                                    className="bg-[#001b5e] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#002b8a] transition-all"
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
                        <h3 className={`text-2xl font-bold ${
                            modalType === "error" ? "text-red-600" : 
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
                                className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
                                    modalType === "error" ? "bg-red-600 hover:bg-red-700" : 
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

export default FormularioInscripcionLiderazgo;