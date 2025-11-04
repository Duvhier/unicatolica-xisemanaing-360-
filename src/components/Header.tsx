import logo from "@/assets/unicatolica-logo.svg";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "INICIO", href: "#inicio" },
    { name: "AGENDATE", href: "#agenda" },
    { name: "INFORMACIÓN", href: "#info" },
    { name: "ALIADOS", href: "#aliados" },
    { name: "CONTACTO", href: "#contacto" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white text-gray-600 shadow-lg border-b border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="UNICATÓLICA"
              className="h-[80px] w-auto max-w-[220px] md:max-w-[260px]"
            />

            <div className="hidden md:block border-l-2 border-unigold pl-3">
              <h1 className="text-base font-bold text-gray-800 uppercase tracking-wide">
                XI Semana de la Ingeniería
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                360° • Innovación, Liderazgo y Futuro
              </p>
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex space-x-6 text-gray-700 items-center">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-semibold hover:text-uniblue transition-colors duration-300 group px-2 py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-uniblue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Botón hamburguesa móvil */}
          <div className="md:hidden">
            <button 
              className="text-unigray hover:text-uniblue transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`
        md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50
        transition-all duration-300 ease-in-out overflow-hidden
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <nav className="py-4 px-6">
          <div className="space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="block w-full text-left font-semibold text-gray-700 hover:text-uniblue hover:bg-blue-50 transition-all duration-200 rounded-lg px-4 py-3 border border-transparent hover:border-blue-100"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Información adicional en móvil */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              XI Semana de la Ingeniería
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              360° • Innovación, Liderazgo y Futuro
            </p>
          </div>
        </nav>
      </div>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}