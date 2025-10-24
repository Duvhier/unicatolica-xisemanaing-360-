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

          <nav className="hidden md:flex space-x-6 text-gray-700">
            {[
              { name: "INICIO", href: "#inicio" },
              { name: "AGENDATE", href: "#agenda" },
              { name: "INFORMACIÓN", href: "#info" },
              { name: "CONTACTO", href: "#contacto" }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative font-semibold hover:text-uniblue transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-uniblue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
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