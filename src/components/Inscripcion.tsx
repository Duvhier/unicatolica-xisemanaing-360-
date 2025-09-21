import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Inscripcion() {
  const [formType, setFormType] = useState("estudiante");
  const [formData, setFormData] = useState({
    nombre: "",
    programa: "",
    semestre: "",
    email: "",
    telefono: "",
    empresa: "",
    representante: "",
    proyecto: "",
    interes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert("¡Inscripción enviada exitosamente!");
  };

  return (
    <section id="inscripcion" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
            Inscríbete al Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Únete a la XI Semana de la Ingeniería y forma parte del futuro de la innovación tecnológica.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <Button
              onClick={() => setFormType("estudiante")}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                formType === "estudiante" 
                  ? "bg-uniblue text-white shadow-lg" 
                  : "bg-white text-uniblue border-2 border-uniblue hover:bg-uniblue hover:text-white"
              }`}
            >
              👨‍🎓 Estudiantes
            </Button>
            <Button
              onClick={() => setFormType("empresa")}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                formType === "empresa" 
                  ? "bg-uniblue text-white shadow-lg" 
                  : "bg-white text-uniblue border-2 border-uniblue hover:bg-uniblue hover:text-white"
              }`}
            >
              🏢 Empresas
            </Button>
            <Button
              onClick={() => setFormType("ponente")}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                formType === "ponente" 
                  ? "bg-uniblue text-white shadow-lg" 
                  : "bg-white text-uniblue border-2 border-uniblue hover:bg-uniblue hover:text-white"
              }`}
            >
              🎤 Ponentes
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {formType === "estudiante" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programa Académico *
                  </label>
                  <select
                    name="programa"
                    value={formData.programa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Selecciona tu programa</option>
                    <option value="ingenieria-sistemas">Ingeniería de Sistemas</option>
                    <option value="ingenieria-industrial">Ingeniería Industrial</option>
                    <option value="ingenieria-civil">Ingeniería Civil</option>
                    <option value="ingenieria-electronica">Ingeniería Electrónica</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semestre *
                  </label>
                  <input
                    type="number"
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="Ej: 8"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>
              </div>
            )}

            {formType === "empresa" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Empresa *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="Nombre de tu empresa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Representante *
                  </label>
                  <input
                    type="text"
                    name="representante"
                    value={formData.representante}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="Nombre del representante"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proyecto Innovador
                  </label>
                  <textarea
                    name="proyecto"
                    value={formData.proyecto}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="Describe brevemente tu proyecto innovador..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="contacto@empresa.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uniblue focus:border-transparent transition-all duration-200"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>
              </div>
            )}

            <div className="bg-unigold bg-opacity-10 border border-unigold rounded-lg p-4">
              <h4 className="font-semibold text-uniblue mb-2">¿Qué incluye tu inscripción?</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Acceso a todas las conferencias y paneles</li>
                <li>• Participación en talleres y workshops</li>
                <li>• Material académico digital</li>
                <li>• Coffee breaks y networking</li>
                <li>• Certificado de participación</li>
              </ul>
            </div>

            <div className="text-center">
              <Button 
                type="submit"
                className="bg-unigold text-black px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Inscribirse Ahora
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                * Campos obligatorios
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
