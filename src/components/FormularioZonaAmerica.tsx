import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./FormularioInscripcionLiderazgo.css";
import ZonaAmericaImg from "@/assets/VISITA - EMPRESARIAL  -8 ZONAAMERICA.png";
import LogoZonaAmerica from "@/assets/visitasevento.jpg";

// Importar HeroIcons
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  BookOpenIcon,
  HeartIcon,
  TruckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QrCodeIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

import {
  CalendarDaysIcon,
  BuildingStorefrontIcon as BuildingStorefrontSolidIcon
} from "@heroicons/react/24/solid";

const FormularioZonaAmerica: React.FC = () => {
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

    // ✅ Conexión con backend Zona América
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

            const res = await fetch(`${API_URL}/visitazonaamerica/registro`, {
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
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <IdentificationIcon className="w-4 h-4 text-green-600" />
                        ID Estudiantil <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <IdentificationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                            placeholder="Ej: A00123456"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                        <BookOpenIcon className="w-4 h-4 text-green-600" />
                        Programa Académico <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <BookOpenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            name="programa"
                            value={formData.programa}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white pl-10"
                        >
                            <option value="">Seleccionar programa</option>
                            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                            <option value="Tecnología en Desarrollo de Software">Tecnología en Desarrollo de Software</option>
                        </select>
                    </div>
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
                        className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 font-medium"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Regresar</span>
                    </Link>
                </div>

                {/* Contenido principal */}
                <div className="text-center">
                    <div className="border-l-4 border-green-600 pl-4 mb-4 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                            XI SEMANA DE LA INGENIERÍA
                        </h1>
                    </div>

                    <p className="text-lg text-green-600 font-semibold mb-4">
                        "360°: Innovación, Liderazgo y Futuro"
                    </p>

                    <div className="bg-green-100 rounded-full px-6 py-3 inline-block">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight flex items-center justify-center gap-2">
                            <BuildingStorefrontIcon className="w-8 h-8" />
                            ZONA AMERICA
                        </h1>
                        <p className="text-sm font-medium text-gray-800 flex items-center justify-center gap-1 mt-1">
                            <UserGroupIcon className="w-4 h-4" />
                            Visita empresarial - Cupo limitado a 40 personas
                        </p>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="form-main-content">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        AGENDA
                    </h2>
                </div>

                {/* Tarjeta Agenda */}
                <section
                    className={`bg-white rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${showEvento ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500 hover:bg-gray-50"
                        }`}
                    onClick={toggleEvento}
                >
                    <div className="flex items-center gap-4 p-4">
                        {/* Fecha */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md w-14 h-14 flex-shrink-0">
                            <CalendarDaysIcon className="w-6 h-6 text-green-600" />
                            <div className="text-xs font-medium text-gray-600 uppercase mt-1">NOV</div>
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1">
                                Visita Empresarial: Zona América
                            </h3>
                            <div className="text-sm text-gray-600 flex items-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    10:00 am - 11:30 am
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    Zona América, Cali
                                </span>
                            </div>
                        </div>

                        {/* Flecha */}
                        <div className={`text-gray-400 transition-transform duration-300 ${showEvento ? "rotate-180 text-green-500" : ""
                            }`}>
                            <ChevronDownIcon className="w-6 h-6" />
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
                                                src={LogoZonaAmerica}
                                                alt="Zona América"
                                                className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-md"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                                                <BuildingStorefrontSolidIcon className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-sm font-bold text-green-600 uppercase tracking-wide flex items-center gap-1">
                                                <BuildingOfficeIcon className="w-4 h-4" />
                                                Visita Empresarial
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                            ZONA AMERICA
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            <strong>Zona América</strong> te invita a descubrir cómo la programación puede marcar el futuro de los negocios. Vive una experiencia donde la programación se conecta con el mundo real de la empresa y la innovación.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <CalendarDaysIcon className="w-4 h-4 text-green-500" />
                                                <span><strong>Fecha:</strong> 13 Nov 2025</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon className="w-4 h-4 text-green-500" />
                                                <span><strong>Lugar:</strong> Zona América, Cali</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ClockIcon className="w-4 h-4 text-green-500" />
                                                <span><strong>Horario:</strong> 10:00 am - 11:30 am</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <UserGroupIcon className="w-4 h-4 text-green-500" />
                                                <span><strong>Cupo:</strong> 40 personas</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Imagen evento y botón */}
                            <section className="flex flex-col gap-6">
                                {/* Imagen con overlay */}
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                        src={ZonaAmericaImg}
                                        alt="Visita Zona América"
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-white font-semibold text-sm flex items-center gap-2">
                                            <BuildingStorefrontIcon className="w-4 h-4" />
                                            Zona América - Centro Comercial y Empresarial
                                        </p>
                                    </div>
                                </div>

                                {/* Botón centrado */}
                                <div className="text-center">
                                    <button
                                        className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-md flex items-center justify-center gap-2"
                                        onClick={toggleFormulario}
                                    >
                                        {showFormulario ? (
                                            <>
                                                <ChevronUpIcon className="w-5 h-5" />
                                                Cerrar formulario
                                            </>
                                        ) : (
                                            <>
                                                <BuildingStorefrontIcon className="w-5 h-5" />
                                                Reservar mi cupo
                                            </>
                                        )}
                                    </button>

                                    <p className="text-sm text-gray-500 mt-3 flex items-center justify-center gap-2">
                                        <UserGroupIcon className="w-4 h-4" />
                                        Cupo limitado a 40 personas
                                    </p>
                                </div>
                            </section>
                        </>
                    )}

                    {/* FORMULARIO */}
                    {showFormulario && (
                        <section ref={formularioRef} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5 text-green-600" />
                                        Formulario de Inscripción
                                    </h3>
                                    <p className="text-sm text-gray-600">Complete la información requerida para la visita</p>
                                </div>

                                <div className="grid gap-4">
                                    {/* Campos básicos */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                placeholder="Ingrese su nombre completo"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tipo de Documento <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <IdentificationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <select
                                                    name="tipoDocumento"
                                                    value={formData.tipoDocumento}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white pl-10"
                                                >
                                                    <option value="">Seleccionar tipo</option>
                                                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                                    <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                                    <option value="Cédula Digital">Cédula Digital</option>
                                                    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                                                    <option value="Pasaporte">Pasaporte</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Número de Documento <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <IdentificationIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="numeroDocumento"
                                                    value={formData.numeroDocumento}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                    placeholder="Número de documento"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Correo Electrónico <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                name="correo"
                                                value={formData.correo}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Número de Celular <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                placeholder="3001234567"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <UserGroupIcon className="w-4 h-4 text-green-600" />
                                            Perfil <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="perfil"
                                            value={formData.perfil}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
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
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <HeartIcon className="w-4 h-4 text-green-600" />
                                            EPS (Opcional)
                                        </label>
                                        <div className="relative">
                                            <HeartIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="eps"
                                                value={formData.eps}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                placeholder="Nombre de su EPS"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                            <TruckIcon className="w-4 h-4 text-green-600" />
                                            Placas del Vehículo (Opcional)
                                        </label>
                                        <div className="relative">
                                            <TruckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                name="placasVehiculo"
                                                value={formData.placasVehiculo}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pl-10"
                                                placeholder="Ej: ABC123"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <ExclamationTriangleIcon className="w-3 h-3" />
                                            Solo si planea llevar vehículo (estacionamiento sujeto a disponibilidad)
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="w-5 h-5" />
                                            Confirmar Inscripción
                                        </>
                                    )}
                                </button>

                                {error && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2">
                                        <ExclamationTriangleIcon className="w-4 h-4" />
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
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">¡Inscripción Exitosa!</h3>
                        <p className="text-gray-600 mt-2">Tu registro para la visita a Zona América ha sido confirmado.</p>
                        <div className="mt-5 flex items-center justify-center">
                            {qrSrc ? (
                                <div className="relative">
                                    <img
                                        src={qrSrc}
                                        alt="Código QR de confirmación"
                                        className="h-56 w-56 object-contain rounded-lg border border-gray-200 shadow-sm"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                                        <QrCodeIcon className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-4 h-4" />
                                    QR no proporcionado por el servidor.
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-4">
                            {qrSrc && (
                                <a
                                    href={qrSrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                                >
                                    <QrCodeIcon className="w-4 h-4" />
                                    Abrir QR
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="px-6 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-2"
                            >
                                <XCircleIcon className="w-4 h-4" />
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
                                    <XCircleIcon className="w-8 h-8 text-red-600" />
                                </div>
                            )}
                            {modalType === "warning" && (
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600" />
                                </div>
                            )}
                            {modalType === "success" && (
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
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
                                <CheckCircleIcon className="w-4 h-4" />
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormularioZonaAmerica;