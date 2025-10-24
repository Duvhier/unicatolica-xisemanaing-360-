import { MapPin, Phone } from "lucide-react";
import logo from "@/assets/unicatolica-logo-blanco.png";

export default function Footer() {
  return (
    <footer id="contacto" className="relative bg-uniblue text-gray-100">
      {/* Textura diagonal sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 10px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo y descripción */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="UNICATÓLICA"
              className="h-[80px] w-auto max-w-[240px] mb-4"
            />
            <p className="text-sm text-gray-200 leading-relaxed">
              Fundación Universitaria Católica Lumen Gentium – UNICATÓLICA
              <br />
              Facultad de Ingeniería
            </p>
          </div>

          {/* Sede Pance */}
          <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-400">
            <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              SEDE PANCE
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Cra. 122 No. 12 – 459</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>Ext. 2102 – 2104 – 2106 – 0100</span>
              </li>
            </ul>
          </div>

          {/* Sede Meléndez */}
          <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-400">
            <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              SEDE MELÉNDEZ
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Cra. 94 No. 4C – 04</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>Ext. 3112 – 3116 – 3118 – 4100</span>
              </li>
            </ul>
          </div>

          {/* Plaza de Caicedo */}
          <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-400">
            <h4 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-400" />
              PLAZA DE CAICEDO
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></span>
                <span>Cra. 3 No. 5 – 50</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-400" />
                <span>Ext. 3832</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="mt-12 pt-8 border-t border-gray-600/40">
  <div className="flex flex-col items-center gap-4 text-center">
    <p className="text-gray-300 text-sm font-medium">
      © 2025 UNICATÓLICA LUMEN GENTIUM — XI Semana de la Ingeniería
    </p>
    <div className="text-gray-400 text-xs leading-relaxed max-w-2xl">
      <p>
        Institución de Educación Superior sujeta a inspección y vigilancia
        por el Ministerio de Educación Nacional – Resolución No. 944 de
        1996 MEN – SNIES 2731
      </p>
    </div>
  </div>
</div>
      </div>
    </footer>
  );
}
