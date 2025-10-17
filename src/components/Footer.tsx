import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/unicatolica-logo.svg";

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
          <div>
            <h4 className="text-xl font-bold mb-3 text-yellow-300 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-300" /> PANCE
            </h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>Cra. 122 No. 12 – 459</li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Ext. 2102 – 2104 – 2106 – 0100
              </li>
            </ul>
          </div>

          {/* Sede Meléndez */}
          <div>
            <h4 className="text-xl font-bold mb-3 text-yellow-300 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-300" /> MELÉNDEZ
            </h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>Cra. 94 No. 4C – 04</li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Ext. 3112 – 3116 – 3118 – 4100
              </li>
            </ul>
          </div>

          {/* Plaza de Caicedo */}
          <div>
            <h4 className="text-xl font-bold mb-3 text-yellow-300 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-300" /> PLAZA DE CAICEDO
            </h4>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>Cra. 3 No. 5 – 50</li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Ext. 3832
              </li>
            </ul>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-100 text-sm">
              © 2025 UNICATÓLICA LUMEN GENTIUM — XI Semana de la Ingeniería
            </p>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-md">
              Institución de Educación Superior sujeta a inspección y vigilancia
              por el Ministerio de Educación Nacional – Resolución No. 944 de
              1996 MEN – SNIES 2731
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
