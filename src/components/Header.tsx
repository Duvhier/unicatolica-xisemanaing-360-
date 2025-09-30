import logo from "@/assets/unicatolica-logo.svg";

export default function Header() {
  return (
    <header className="bg-white text-gray-600 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="UNICATÓLICA"
              className="h-[64px] w-auto max-w-[220px] md:max-w-[260px]"
            />

            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-600">
                XI SEMANA DE LA INGENIERÍA
              </h1>
              <p className="text-sm text-gray-600">
                360° - Innovación, Liderazgo y Futuro
              </p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-gray-600">
            <a
              href="#inicio"
              className="hover:text-unigold transition-colors duration-200 font-medium"
            >
              INICIO
            </a>
            <a
              href="#info"
              className="hover:text-unigold transition-colors duration-200 font-medium"
            >
              INFORMACIÓN
            </a>
            {/** AGENDA ocultada temporalmente
            <a
              href="#agenda"
              className="hover:text-unigold transition-colors duration-200 font-medium"
            >
              AGENDA
            </a>
            */}
            <a
              href="#inscripcion"
              className="hover:text-unigold transition-colors duration-200 font-medium"
            >
              INSCRIPCIÓN
            </a>
            <a
              href="#contacto"
              className="hover:text-unigold transition-colors duration-200 font-medium"
            >
              CONTACTO
            </a>
          </nav>

          <div className="md:hidden">
            <button className="text-unigray hover:text-unigold">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
