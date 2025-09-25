import { Button } from "@/components/ui/button";
import qrFormulario from "@/assets/qr_formulario.png";

export default function Inscripcion() {
  return (
    <section id="inscripcion" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
            Inscríbete al Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escanea el código QR para preinscribirte. Pronto activaremos el formulario completo.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow-xl flex flex-col items-center gap-8">
          <div className="bg-white p-4 rounded-2xl shadow-inner ring-2 ring-uniblue/70 hover:ring-uniblue transition-colors flex flex-col items-center justify-center">
            <img
              src={qrFormulario}
              alt="QR de inscripción"
              className="h-40 w-40 md:h-64 md:w-64 object-contain"
            />
            <p className="mt-3 text-center text-xs md:text-sm text-gray-600">Escanea este código con la cámara de tu celular</p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-gray-600">Apunta la cámara de tu celular al código para continuar.</p>
            <p className="text-gray-500 text-sm">También podrás inscribirte con el formulario cuando esté disponible.</p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              disabled
              className="bg-unigold text-black px-8 py-3 rounded-full text-base font-semibold opacity-70 cursor-not-allowed"
            >
              Abrir formulario (próximamente)
            </Button>
            <a href={qrFormulario} download className="text-uniblue hover:underline">
              Descargar QR
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
