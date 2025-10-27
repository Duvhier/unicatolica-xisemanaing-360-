// components/PublicidadEvento.tsx
import React from "react";
import "./PublicidadEvento.css";

// Importa las imágenes de aliados y patrocinadores
import EmaviLogo from "@/assets/publicidad/escuelamarcofidel.jpg";
import FuerzaAereaLogo from "@/assets/publicidad/fuerzaaerea.png";
import ZonaAmericaLogo from "@/assets/publicidad/Zonamerica - copia.png";
import PriceSmartLogo from "@/assets/publicidad/pricesmart.jpg";
import NutresaLogo from "@/assets/publicidad/nutresa.jpg";

interface AliadoPatrocinador {
  id: number;
  nombre: string;
  tipo: "aliado" | "patrocinador";
  imagen: string;
  descripcion: string;
  website?: string;
}

const PublicidadEvento: React.FC = () => {
  // Datos de aliados y patrocinadores
  const aliadosPatrocinadores: AliadoPatrocinador[] = [
    {
      id: 1,
      nombre: "Escuela Militar de Aviación Marco Fidel Suarez",
      tipo: "aliado",
      imagen: EmaviLogo,
      descripcion: "Aliado estratégico en formación aeronáutica y tecnológica",
      website: "https://www.emavi.edu.co"
    },
    {
      id: 2,
      nombre: "Fuerza Aeroespacial Colombia",
      tipo: "aliado",
      imagen: FuerzaAereaLogo,
      descripcion: "Institución de defensa nacional y desarrollo aeroespacial",
      website: "https://www.fac.mil.co"
    },
    {
      id: 3,
      nombre: "Zona América",
      tipo: "patrocinador",
      imagen: ZonaAmericaLogo,
      descripcion: "Parque empresarial con infraestructura de clase mundial",
      website: "https://zonamerica.com.co"
    },
    {
      id: 4,
      nombre: "PriceSmart",
      tipo: "patrocinador",
      imagen: PriceSmartLogo,
      descripcion: "Club de compras líder en América Latina y el Caribe",
      website: "https://www.pricesmart.com"
    },
    {
      id: 5,
      nombre: "Grupo Nutresa",
      tipo: "patrocinador",
      imagen: NutresaLogo,
      descripcion: "Multinacional del sector de alimentos procesados",
      website: "https://www.gruponutresa.com"
    }
  ];

  const aliados = aliadosPatrocinadores.filter(item => item.tipo === "aliado");
  const patrocinadores = aliadosPatrocinadores.filter(item => item.tipo === "patrocinador");

  const abrirWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="publicidad-evento">
      {/* Header con estilo universitario */}
      <div className="publicidad-header">
        <div className="text-center mb-12">
          <div className="inline-flex border-l-4 border-uniblue pl-4 py-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              ALIADOS Y PATROCINADORES
            </h2>
          </div>
        </div>
      </div>

      {/* Sección de Aliados Estratégicos */}
      <section className="seccion-aliados mb-12">
        <div className="seccion-header">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Aliados Estratégicos</h3>
            </div>
          </div>
        </div>

        <div className="grid-aliados">
          {aliados.map((aliado) => (
            <div key={aliado.id} className="aliado-card">
              <div className="aliado-badge">
                <span className="badge-text">Aliado Estratégico</span>
              </div>
              
              <div className="aliado-imagen-container">
                <img
                  src={aliado.imagen}
                  alt={aliado.nombre}
                  className="aliado-imagen"
                />
              </div>

              <div className="aliado-info">
                <h4 className="aliado-nombre">{aliado.nombre}</h4>
                <p className="aliado-descripcion">{aliado.descripcion}</p>
                
                {aliado.website && (
                  <button
                    onClick={() => abrirWebsite(aliado.website!)}
                    className="aliado-btn"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visitar Sitio
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Patrocinadores */}
      <section className="seccion-patrocinadores">
        <div className="seccion-header">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-green-500 rounded-full"></div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Patrocinadores</h3>
            </div>
          </div>
        </div>

        <div className="grid-patrocinadores">
          {patrocinadores.map((patrocinador) => (
            <div key={patrocinador.id} className="patrocinador-card">
              <div className="patrocinador-badge">
                <span className="badge-text">Patrocinador</span>
              </div>
              
              <div className="patrocinador-imagen-container">
                <img
                  src={patrocinador.imagen}
                  alt={patrocinador.nombre}
                  className="patrocinador-imagen"
                />
              </div>

              <div className="patrocinador-info">
                <h4 className="patrocinador-nombre">{patrocinador.nombre}</h4>
                <p className="patrocinador-descripcion">{patrocinador.descripcion}</p>
                
                {patrocinador.website && (
                  <button
                    onClick={() => abrirWebsite(patrocinador.website!)}
                    className="patrocinador-btn"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visitar Sitio
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mensaje de agradecimiento */}
      <div className="agradecimiento-section">
        <div className="agradecimiento-content">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-6 bg-unigold rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800 text-center">
              Agradecimiento Especial
            </h3>
            <div className="w-1 h-6 bg-unigold rounded-full"></div>
          </div>
          <p className="text-gray-600 text-center text-lg leading-relaxed">
            Agradecemos a todas las instituciones y empresas que hacen posible la realización de la 
            <span className="text-uniblue font-semibold"> XI Semana de la Ingeniería</span>. 
            Su apoyo es fundamental para el desarrollo académico y profesional de nuestros estudiantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicidadEvento;