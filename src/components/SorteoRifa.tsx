import React, { useState, useEffect } from "react";

// 🔹 Interfaz para los ganadores
interface Ganador {
  numeroRifa: string;
  nombres: string;
  apellido: string;
  programaAcademico: string;
  idEstudiante: string;
  perfil: string;
  email: string;
  telefono: string;
}

const SorteoRifa: React.FC = () => {
  const [ganadores, setGanadores] = useState<Ganador[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorteando, setIsSorteando] = useState(false);
  const [cantidadGanadores, setCantidadGanadores] = useState(3);
  const [estadisticas, setEstadisticas] = useState({
    totalParticipantes: 0,
    totalGanadores: 0,
    fechaSorteo: "",
  });
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // 🔹 Obtener estadísticas iniciales
  useEffect(() => {
    obtenerEstadisticas();
  }, []);

  const obtenerEstadisticas = async () => {
    try {
      const res = await fetch(`${API_URL}/cierreinaugural/estado-numeros-rifa`);
      const data = await res.json();

      if (data.success) {
        setEstadisticas((prev) => ({
          ...prev,
          totalParticipantes: data.estadisticas.ocupados,
        }));
      }
    } catch (err) {
      console.error("Error obteniendo estadísticas:", err);
    }
  };

  // 🔹 Realizar sorteo
  const realizarSorteo = async () => {
    if (isLoading || isSorteando) return;

    setIsLoading(true);
    setIsSorteando(true);
    setError("");
    setGanadores([]);

    try {
      const res = await fetch(
        `${API_URL}/cierreinaugural/realizar-sorteo/${cantidadGanadores}`
      );
      const data = await res.json();

      if (data.success) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setGanadores(data.ganadores);
        setEstadisticas((prev) => ({
          ...prev,
          totalGanadores: data.ganadoresSeleccionados,
          fechaSorteo: data.fechaSorteo,
        }));

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setError(data.message || "Error al realizar el sorteo");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error en sorteo:", err);
    } finally {
      setIsLoading(false);
      setIsSorteando(false);
    }
  };

  // 🔹 Reiniciar sorteo
  const reiniciarSorteo = () => {
    setGanadores([]);
    setEstadisticas((prev) => ({
      ...prev,
      totalGanadores: 0,
      fechaSorteo: "",
    }));
  };

  // 🔹 Formatear fecha
  const formatearFecha = (fechaISO: string) => {
    return new Date(fechaISO).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 py-8 px-4">
      {/* Confeti animado con colores institucionales */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  "#FFD700",
                  "#FDB91C",
                  "#1E40AF",
                  "#3B82F6",
                  "#FFFFFF",
                  "#F59E0B",
                ][i % 6],
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header institucional */}
        <header className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400 p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <img
              src="/unicatolica-logo.svg"
              alt="UNICATÓLICA"
              className="h-12 md:h-16 w-auto"
            />
            <button className="inline-flex items-center gap-2 px-4 py-2 text-blue-900 hover:text-amber-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border-2 border-blue-900 hover:border-amber-500 font-semibold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Volver al Formulario</span>
            </button>
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-3">
              {/* Badge institucional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-amber-400">
                <span>✨</span>
                SISTEMA DE SORTEO OFICIAL
                <span>✨</span>
              </div>

              {/* Título principal */}
              <h1 className="text-5xl md:text-6xl font-black text-blue-900 leading-tight">
                SORTEO
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
                  XI SEMANA DE LA INGENIERÍA
                </span>
              </h1>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-xl text-blue-900 leading-relaxed font-medium">
                Sorteo de premiaciones en la
                <span className="font-bold text-amber-700">
                  {" "}
                  Clausura de la XI Semana de la Ingeniería
                </span>
              </p>

              {/* Línea divisora institucional */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded"></div>
                <span className="text-2xl">🏆</span>
                <div className="flex-1 h-1 bg-gradient-to-l from-transparent via-amber-400 to-transparent rounded"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Layout condicional */}
        {ganadores.length === 0 ? (
          /* Layout centrado cuando NO hay ganadores */
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Panel de Control */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400 p-8">
              {/* Header del Panel */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-blue-900">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-3xl font-black text-blue-900 mb-2">
                  Control del Sorteo
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
              </div>

              {/* Estadísticas institucionales */}
              <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-900 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-black text-blue-900 mb-1">
                    {estadisticas.totalParticipantes}
                  </div>
                  <div className="text-xs text-blue-800 font-bold uppercase tracking-wider">
                    Participantes
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 text-center border-2 border-amber-600 shadow-lg transform hover:scale-105 transition-transform">
                  <div className="text-4xl font-black text-amber-700 mb-1">
                    {estadisticas.totalGanadores}
                  </div>
                  <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                    Ganadores
                  </div>
                </div>
              </div>

              {/* Selector institucional */}
              <div className="mb-8 max-w-md mx-auto">
                <label className="block text-sm font-bold text-blue-900 mb-3 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Cantidad de Ganadores
                </label>
                <select
                  value={cantidadGanadores}
                  onChange={(e) => setCantidadGanadores(Number(e.target.value))}
                  disabled={isLoading || isSorteando}
                  className="w-full px-5 py-4 border-2 border-blue-900 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 bg-white transition-all duration-200 font-semibold text-blue-900 text-lg"
                >
                  {[1, 2, 3, 5, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Ganador{num > 1 ? "es" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón principal institucional */}
              <div className="max-w-md mx-auto">
                <button
                  onClick={realizarSorteo}
                  disabled={
                    isLoading ||
                    isSorteando ||
                    estadisticas.totalParticipantes === 0
                  }
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white py-5 rounded-xl font-black text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 relative overflow-hidden group border-2 border-blue-900"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  {isSorteando ? (
                    <>
                      <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="relative z-10">SORTEANDO...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl relative z-10">🎲</span>
                      <span className="relative z-10">REALIZAR SORTEO</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mensajes de error */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl max-w-md mx-auto">
                  <div className="flex items-center gap-2 text-red-700">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm font-bold">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Estado Inicial institucional */}
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400 p-10 text-center">
              <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-full flex items-center justify-center shadow-xl border-4 border-blue-900">
                <span className="text-8xl">🎲</span>
              </div>

              <h2 className="text-4xl font-black text-blue-900 mb-4">
                Listo para el Sorteo
              </h2>
              <div className="h-1 w-32 mx-auto mb-6 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>

              <p className="text-gray-700 mb-10 max-w-md mx-auto text-lg leading-relaxed font-medium">
                Presiona el botón{" "}
                <span className="font-black text-amber-700">
                  "REALIZAR SORTEO"
                </span>{" "}
                para seleccionar aleatoriamente a los ganadores entre todos los
                participantes registrados.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-900 shadow-lg">
                  <div className="text-4xl font-black text-blue-900">
                    {estadisticas.totalParticipantes}
                  </div>
                  <div className="text-sm text-blue-800 font-bold uppercase tracking-wide mt-2">
                    Participantes
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 text-center border-2 border-amber-600 shadow-lg">
                  <div className="text-4xl font-black text-amber-700">
                    {cantidadGanadores}
                  </div>
                  <div className="text-sm text-amber-800 font-bold uppercase tracking-wide mt-2">
                    Ganadores
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center border-2 border-green-700 shadow-lg">
                  <div className="text-4xl font-black text-green-700">
                    {estadisticas.totalParticipantes > 0
                      ? (
                          (cantidadGanadores /
                            estadisticas.totalParticipantes) *
                          100
                        ).toFixed(1)
                      : "0"}
                    %
                  </div>
                  <div className="text-sm text-green-800 font-bold uppercase tracking-wide mt-2">
                    Probabilidad
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Layout en grid cuando SÍ hay ganadores */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Panel de Control lateral */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400 p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-blue-900">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-black text-blue-900">
                    Control del Sorteo
                  </h2>
                  <div className="h-1 w-20 mx-auto mt-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                </div>

                {/* Estadísticas compactas */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border-2 border-blue-900 shadow-md">
                    <div className="text-2xl font-black text-blue-900">
                      {estadisticas.totalParticipantes}
                    </div>
                    <div className="text-xs text-blue-800 font-bold uppercase tracking-wide">
                      Participantes
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border-2 border-amber-600 shadow-md">
                    <div className="text-2xl font-black text-amber-700">
                      {estadisticas.totalGanadores}
                    </div>
                    <div className="text-xs text-amber-800 font-bold uppercase tracking-wide">
                      Ganadores
                    </div>
                  </div>
                </div>

                {/* Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Cantidad de Ganadores
                  </label>
                  <select
                    value={cantidadGanadores}
                    onChange={(e) =>
                      setCantidadGanadores(Number(e.target.value))
                    }
                    disabled={isLoading || isSorteando}
                    className="w-full px-4 py-3 border-2 border-blue-900 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white transition-all duration-200 font-semibold text-blue-900"
                  >
                    {[1, 2, 3, 5, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} Ganador{num > 1 ? "es" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                  <button
                    onClick={realizarSorteo}
                    disabled={
                      isLoading ||
                      isSorteando ||
                      estadisticas.totalParticipantes === 0
                    }
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white py-4 rounded-xl font-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg relative overflow-hidden group border-2 border-blue-900"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                    {isSorteando ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="relative z-10">Sorteando...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xl relative z-10">🎲</span>
                        <span className="relative z-10">REALIZAR SORTEO</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={reiniciarSorteo}
                    disabled={
                      isLoading || isSorteando || ganadores.length === 0
                    }
                    className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group border-2 border-amber-400"
                  >
                    <svg
                      className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reiniciar Sorteo
                  </button>
                </div>

                {/* Información adicional */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm font-bold">{error}</p>
                    </div>
                  </div>
                )}

                {estadisticas.fechaSorteo && (
                  <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-900 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-900">
                      <svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-bold">Último sorteo</p>
                        <p className="text-xs">
                          {formatearFecha(estadisticas.fechaSorteo)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resultados institucionales */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-400 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-blue-900 flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-900">
                        <span className="text-2xl">🏆</span>
                      </div>
                      Ganadores del Sorteo
                    </h2>
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-blue-900 px-4 py-2 rounded-full text-sm font-black border-2 border-blue-900">
                      {ganadores.length} Ganador
                      {ganadores.length > 1 ? "es" : ""}
                    </div>
                  </div>

                  {/* Lista de ganadores con diseño institucional */}
                  <div className="grid gap-6">
                    {ganadores.map((ganador, index) => (
                      <div
                        key={ganador.numeroRifa}
                        className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-900 rounded-2xl p-6 relative overflow-hidden hover:border-amber-500 transition-all duration-300 group shadow-lg hover:shadow-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        {/* Medalla institucional */}
                        <div
                          className={`absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl border-2 ${
                            index === 0
                              ? "bg-gradient-to-br from-amber-400 to-amber-600 border-blue-900"
                              : index === 1
                                ? "bg-gradient-to-br from-gray-300 to-gray-500 border-blue-900"
                                : "bg-gradient-to-br from-orange-400 to-orange-600 border-blue-900"
                          }`}
                        >
                          {index + 1}°
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4 pr-20">
                            <div className="flex-1">
                              <h3 className="text-2xl font-black text-blue-900 group-hover:text-amber-700 transition-colors">
                                {ganador.nombres} {ganador.apellido}
                              </h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold border border-blue-900">
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  {ganador.perfil}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-black text-amber-600 font-mono bg-amber-50 px-4 py-2 rounded-lg border-2 border-amber-600 shadow-md">
                                #{ganador.numeroRifa}
                              </div>
                              <div className="text-xs text-blue-900 font-bold mt-1">
                                Número Ganador
                              </div>
                            </div>
                          </div>

                          {/* Información detallada institucional */}
                          <div className="grid md:grid-cols-2 gap-4 text-sm bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-amber-600 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                  />
                                </svg>
                                <span className="text-blue-900">
                                  <strong className="font-black">
                                    Programa:
                                  </strong>{" "}
                                  {ganador.programaAcademico}
                                </span>
                              </div>
                              {ganador.idEstudiante && (
                                <div className="flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 text-amber-600 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                    />
                                  </svg>
                                  <span className="text-blue-900">
                                    <strong className="font-black">
                                      ID Estudiante:
                                    </strong>{" "}
                                    {ganador.idEstudiante}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-amber-600 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                <span className="text-blue-900 break-all">
                                  <strong className="font-black">
                                    Email:
                                  </strong>{" "}
                                  {ganador.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-amber-600 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                                <span className="text-blue-900">
                                  <strong className="font-black">
                                    Teléfono:
                                  </strong>{" "}
                                  {ganador.telefono}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de impresión institucional */}
                <div className="text-center">
                  <button
                    onClick={() => window.print()}
                    className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white px-8 py-4 rounded-xl font-black transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 mx-auto border-2 border-amber-400"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    IMPRIMIR RESULTADOS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estilos institucionales */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              background: white !important;
            }
            .bg-gradient-to-br,
            .bg-gradient-to-r {
              background: white !important;
            }
          }
          
          @keyframes confetti {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(500px) rotate(360deg);
              opacity: 0;
            }
          }
          
          .animate-confetti {
            animation: confetti 3s ease-in-out forwards;
          }
          
          /* Animación de brillo institucional */
          @keyframes institutional-shine {
            0% {
              transform: translateX(-100%) skewX(-12deg);
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
              opacity: 0.3;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SorteoRifa;