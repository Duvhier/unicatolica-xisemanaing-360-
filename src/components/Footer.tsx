import logo from "@/assets/unicatolica-logo.svg";

export default function Footer() {
    return (
      <footer id="contacto" className="relative bg-uniblue text-white">
        {/* Textura diagonal sutil */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, transparent 2px, transparent 10px)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Ancla de agenda oculta temporalmente para evitar enlaces rotos */}
          <div id="agenda" className="hidden" aria-hidden="true"></div>
          <div className="grid md:grid-cols-4 gap-10">
            {/* Logo */}
            <div className="flex items-start">
              <img
                src={logo}
                alt="UNICATÓLICA"
                className="h-[80px] w-auto max-w-[220px] md:max-w-[280px]"
              />
            </div>

            {/* Pance */}
            <div>
              <h4 className="text-xl font-bold mb-4">PÁNCE</h4>
              <ul className="space-y-2 text-gray-100">
                <li>Cra. 122 No. 12 – 459</li>
                <li>Ext. 2102 – 2104 – 2106 – 0100</li>
              </ul>
            </div>

            {/* Meléndez */}
            <div>
              <h4 className="text-xl font-bold mb-4">MELÉNDEZ</h4>
              <ul className="space-y-2 text-gray-100">
                <li>Cra. 94 No. 4C – 04</li>
                <li>Ext. 3112 – 3116 – 3118 – 4100</li>
              </ul>
            </div>

            {/* Plaza de Cayzedo */}
            <div>
              <h4 className="text-xl font-bold mb-4">PLAZA DE CAICEDO</h4>
              <ul className="space-y-2 text-gray-100 list-disc pl-5">
                <li>Cra 3 No. 5-50</li>
                <li>Ext. 3832</li>
              </ul>
            </div>
          </div>

          {/* Franja inferior */}
          <div className="mt-12 pt-6 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-100 text-sm text-center md:text-left">
                © 2025 UNICATÓLICA LUMEN GENTIUM - XI Semana de la Ingeniería
              </p>
              <p className="text-gray-300 text-xs text-center md:text-right">
              Institución de Educación Superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional – Resolución No. 944 de 1996 MEN – SNIES 2731
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  