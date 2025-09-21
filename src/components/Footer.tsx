export default function Footer() {
    return (
      <footer id="contacto" className="bg-uniblue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-unigold">XI Semana de la Ingeniería</h3>
              <p className="text-gray-200 mb-4">
                "360° - Innovación, Liderazgo y Futuro"
              </p>
              <p className="text-gray-300 text-sm">
                Un espacio académico y empresarial que reúne a estudiantes, docentes y empresas 
                para compartir proyectos innovadores y proyectar el futuro de la ingeniería.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-unigold">Información de Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-unigold rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">📞</span>
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-300 text-sm">+57 601 3906223 Ext. 1184</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-unigold rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">✉️</span>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-300 text-sm">eventos@unicatolica.edu.co</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-unigold rounded-full flex items-center justify-center">
                    <span className="text-black text-sm">📍</span>
                  </div>
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-gray-300 text-sm">Carrera 13 #24-15, Bogotá D.C.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-unigold">Enlaces Rápidos</h4>
              <div className="space-y-3">
                <a href="#inicio" className="block text-gray-300 hover:text-unigold transition-colors duration-200">
                  Inicio
                </a>
                <a href="#info" className="block text-gray-300 hover:text-unigold transition-colors duration-200">
                  Ejes Temáticos
                </a>
                <a href="#agenda" className="block text-gray-300 hover:text-unigold transition-colors duration-200">
                  Agenda del Evento
                </a>
                <a href="#inscripcion" className="block text-gray-300 hover:text-unigold transition-colors duration-200">
                  Inscripción
                </a>
              </div>
              
              <div className="mt-8">
                <h5 className="font-semibold mb-4 text-unigold">Síguenos</h5>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-unigold hover:text-black transition-all duration-200">
                    <span className="text-sm">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-unigold hover:text-black transition-all duration-200">
                    <span className="text-sm">t</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-unigold hover:text-black transition-all duration-200">
                    <span className="text-sm">in</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-unigold hover:text-black transition-all duration-200">
                    <span className="text-sm">ig</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-300 text-sm">
                  © 2025 Universidad Católica de Colombia - XI Semana de la Ingeniería
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img src="/src/assets/unicatolica-logo.svg" alt="UNICATÓLICA" className="w-[90px] h-[40px] opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  