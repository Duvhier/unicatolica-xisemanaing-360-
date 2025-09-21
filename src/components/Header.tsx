export default function Header() {
  return (
    <header className="bg-white text-gray-600 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img
              src="/src/assets/unicatolica-logo.svg"
              alt="UNICATÓLICA"
              className="h-[80px] w-auto max-w-[220px] md:max-w-[280px]"
            />

            <div className="hidden md:block">
              <h1 className="text-xl font-bold" text-gray-600>XI SEMANA DE LA INGENIERÍA</h1>
              <p className="text-sm text-gray-600">360° - Innovación, Liderazgo y Futuro</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8" text-gray-600>
            <a href="#inicio" className="hover:text-unigold transition-colors duration-200 font-medium" text-gray-600>INICIO</a>
            <a href="#info" className="hover:text-unigold transition-colors duration-200 font-medium" text-gray-600>INFORMACIÓN</a>
            <a href="#agenda" className="hover:text-unigold transition-colors duration-200 font-medium" text-gray-600>AGENDA</a>
            <a href="#inscripcion" className="hover:text-unigold transition-colors duration-200 font-medium" text-gray-600>INSCRIPCIÓN</a>
            <a href="#contacto" className="hover:text-unigold transition-colors duration-200 font-medium" text-gray-600>CONTACTO</a>
          </nav>
          <div className="md:hidden">
            <button className="text-unigray hover:text-unigold" text-gray-600>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
