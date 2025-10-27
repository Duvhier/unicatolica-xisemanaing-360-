// components/PublicidadEvento.tsx
import React, { useState } from "react";
import "./PublicidadEvento.css";

// Importa las imágenes de logos
import EmaviLogo from "@/assets/publicidad/emavi.png";
import FuerzaAereaLogo from "@/assets/publicidad/fuerzaaerea.png";
import ZonaAmericaLogo from "@/assets/publicidad/Zonamerica - copia.png";
import PriceSmartLogo from "@/assets/publicidad/pricesmart.png";
import NutresaLogo from "@/assets/publicidad/gruponutresa.png";

// Importa imágenes de fondo (puedes usar estas o reemplazarlas)
import FondoEducacion from "@/assets/publicidad/fondo-escuelamarcofidel.jpg";
import FondoDefensa from "@/assets/publicidad/fondo-educacion.jpg";
import FondoTecnologia from "@/assets/publicidad/fondo-defensa.jpg";
import FondoRetail from "@/assets/publicidad/fondo-retail.jpg";
import FondoAlimentos from "@/assets/publicidad/fondo-alimentos.jpg";

interface AliadoPatrocinador {
  id: number;
  nombre: string;
  tipo: "aliado" | "patrocinador";
  imagen: string;
  fondo?: string;
  descripcion: string;
  website?: string;
  categoria?: string;
}

const PublicidadEvento: React.FC = () => {
  const [filtroActivo] = useState<string>("todos");

  const aliadosPatrocinadores: AliadoPatrocinador[] = [
    {
      id: 1,
      nombre: "Escuela Militar de Aviación Marco Fidel Suarez",
      tipo: "aliado",
      imagen: EmaviLogo,
      fondo: FondoEducacion,
      descripcion: "Aliado estratégico en formación aeronáutica y tecnológica",
      website: "https://www.emavi.edu.co",
      categoria: "educacion"
    },
    {
      id: 2,
      nombre: "Fuerza Aeroespacial Colombia",
      tipo: "aliado",
      imagen: FuerzaAereaLogo,
      fondo: FondoDefensa,
      descripcion: "Institución de defensa nacional y desarrollo aeroespacial",
      website: "https://www.fac.mil.co",
      categoria: "defensa"
    },
    {
      id: 3,
      nombre: "Zona América",
      tipo: "patrocinador",
      imagen: ZonaAmericaLogo,
      fondo: FondoTecnologia,
      descripcion: "Parque empresarial con infraestructura de clase mundial",
      website: "https://web.zonamerica.com/colombia/",
      categoria: "tecnologia"
    },
    {
      id: 4,
      nombre: "PriceSmart",
      tipo: "patrocinador",
      imagen: PriceSmartLogo,
      fondo: FondoRetail,
      descripcion: "Club de compras líder en América Latina y el Caribe",
      website: "https://www.pricesmart.com",
      categoria: "retail"
    },
    {
      id: 5,
      nombre: "Grupo Nutresa",
      tipo: "patrocinador",
      imagen: NutresaLogo,
      fondo: FondoAlimentos,
      descripcion: "Multinacional del sector de alimentos procesados",
      website: "https://www.gruponutresa.com",
      categoria: "alimentos"
    }
  ];

  const elementosFiltrados = filtroActivo === "todos" 
    ? aliadosPatrocinadores 
    : aliadosPatrocinadores.filter(item => item.tipo === filtroActivo);

  const abrirWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="publicidad-evento">
      {/* Header */}
      <div className="publicidad-header">
        <div className="text-center mb-8">
          <div className="inline-flex border-l-4 border-uniblue pl-4 py-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              ALIADOS Y PATROCINADORES
            </h2>
          </div>
        </div>
      </div>

      {/* Grid de Elementos */}
      <div className="elementos-grid">
        {elementosFiltrados.map((elemento) => (
          <div key={elemento.id} className={`elemento-card ${elemento.tipo}`}>
            <div className="elemento-badge">
              {elemento.tipo === 'aliado' ? '🤝 Aliado' : '💎 Patrocinador'}
            </div>
            
            <div 
              className="elemento-imagen-container"
              style={elemento.fondo ? {
                backgroundImage: `url(${elemento.fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              <img
                src={elemento.imagen}
                alt={elemento.nombre}
                className="elemento-imagen"
              />
              <div className="elemento-overlay">
                <div className="overlay-content">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="elemento-info">
              <h4 className="elemento-nombre">{elemento.nombre}</h4>
              <p className="elemento-descripcion">{elemento.descripcion}</p>
              
              <div className="elemento-acciones">
                {elemento.website && (
                  <button
                    onClick={() => abrirWebsite(elemento.website!)}
                    className="website-btn"
                  >
                    Visitar Sitio Web
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicidadEvento;