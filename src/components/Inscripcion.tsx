// QR dinámico vía servicio externo para apuntar a la URL exacta

export default function Inscripcion() {
  // 🔹 Apunta al mismo dominio donde se despliega el sitio
  const FORM_URL = "/formulario";

  const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(
    window.location.origin + FORM_URL
  )}`;

  return (
    <section id="inscripcion" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
            Inscríbete al Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escanea el código QR o haz clic en él para acceder al formulario de inscripción.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow-xl flex flex-col items-center gap-8">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-2xl shadow-inner ring-2 ring-uniblue/70 hover:ring-uniblue transition-colors flex flex-col items-center justify-center cursor-pointer hover:shadow-lg"
          >
            <img
              src={QR_URL}
              alt="QR de inscripción - Haz clic para abrir el formulario"
              className="h-40 w-40 md:h-64 md:w-64 object-contain"
            />
            <p className="mt-3 text-center text-xs md:text-sm text-gray-600">
              Haz clic aquí o escanea con tu celular
            </p>
          </a>

          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Accede al formulario de inscripción haciendo clic en el QR o escaneándolo con tu celular.
            </p>
            <p className="text-gray-500 text-sm">
              El formulario se abrirá en una nueva pestaña para tu comodidad.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-uniblue text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-uniblue/90 transition-colors"
            >
              Abrir formulario
            </a>
            <a href={QR_URL} download className="text-uniblue hover:underline">
              Descargar QR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
