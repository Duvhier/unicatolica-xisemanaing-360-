import ConferenciaImg from "../assets/CONFERENCIA COACHING-8.png";

export default function BannerInscripcion() {
  const FORM_URL = "/liderazgo";
  const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    window.location.origin + FORM_URL
  )}`;

  return (
    <div className="w-full text-center my-12">
      <h2 className="px-8 py-4 rounded-full bg-uniblue text-white text-3xl md:text-4xl font-extrabold shadow-lg tracking-wide">
        AGENDA
      </h2>

      <section className="relative bg-gradient-to-r from-blue-100 via-white to-blue-50 py-12 px-6 md:px-16 rounded-3xl shadow-2xl overflow-hidden my-10">
        {/* Fondo decorativo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-300/10 to-blue-400/20 blur-3xl opacity-50 animate-pulse -z-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Imagen del evento */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src={ConferenciaImg}
              alt="Ponencia Desarrollo Personal y Liderazgo"
              className="rounded-2xl shadow-xl w-72 md:w-[360px] hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-uniblue">
              Desarrollo Personal y Liderazgo
            </h2>
            <p className="text-lg text-gray-700">
              <strong>Ponente:</strong> Ximena Otero Pilonieta – Coach
            </p>
            <p className="text-gray-600">
              <strong>Lunes 10 de Noviembre</strong> <br />
              3:00 pm – 5:00 pm <br />
              Auditorio 1 – Sede Pance
            </p>
            <p className="text-sm text-gray-500 italic">
              Exclusiva para docentes y administrativos de UNICATÓLICA
            </p>

            {/* Botones */}
            <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-uniblue text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-uniblue/90 transition-all"
              >
                Inscribirme Ahora
              </a>

              <a
                href={QR_URL}
                download
                className="text-uniblue font-medium hover:underline"
              >
                Descargar QR
              </a>
            </div>
          </div>

          {/* QR al extremo derecho */}
          <div className="flex-1 flex justify-center md:justify-end">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-2xl shadow-inner ring-4 ring-uniblue/40 hover:ring-uniblue transition-all"
            >
              <img
                src={QR_URL}
                alt="Código QR inscripción"
                className="w-40 h-40 md:w-56 md:h-56 object-contain"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
