// components/PublicidadEvento.tsx
import React, { useState } from "react";
import "./PublicidadEvento.css";

import EmaviLogo from "@/assets/publicidad/emavi.png";
import FuerzaAereaLogo from "@/assets/publicidad/fuerzaaerea.png";
import ZonaAmericaLogo from "@/assets/publicidad/Zonamerica - copia.png";
import PriceSmartLogo from "@/assets/publicidad/pricesmart.png";
import NutresaLogo from "@/assets/publicidad/gruponutresa.png";

import FondoEducacion from "@/assets/publicidad/fondo-escuelamarcofidel.jpg";
import FondoDefensa from "@/assets/publicidad/fondo-educacion.jpg";
import FondoTecnologia from "@/assets/publicidad/fondo-defensa.jpg";
import FondoRetail from "@/assets/publicidad/fondo-retail.jpg";
import FondoAlimentos from "@/assets/publicidad/fondo-alimentos.jpg";

import EmaviNombre from "@/assets/publicidad/emavitext.png";
import FuerzaAereaNombre from "@/assets/publicidad/fuerzaaereatext.png";
import ZonaAmericaNombre from "@/assets/publicidad/Zonamericatext.png";
import PriceSmartNombre from "@/assets/publicidad/pricesmarttext.png";
import NutresaNombre from "@/assets/publicidad/gruponutresatext.png";

interface AliadoPatrocinador {
  id: number;
  nombre: string;
  tipo: "aliado" | "patrocinador";
  imagen: string;
  imagenNombre: string;
  fondo?: string;
  descripcion: string;
  website?: string;
}

const PublicidadEvento: React.FC = () => {
  const [filtroActivo] = useState<string>("todos");

  const aliadosPatrocinadores: AliadoPatrocinador[] = [
    {
      id: 1,
      nombre: "ESCUELA MILITAR DE AVIACION MARCO FIDEL SUAREZ",
      tipo: "aliado",
      imagen: EmaviLogo,
      imagenNombre: EmaviNombre,
      fondo: FondoEducacion,
      descripcion: "En la Escuela Militar de Aviación 'Marco Fidel Suárez' forjamos líderes íntegros, con excelencia militar, profesional y aeronáutica. ¡EMAVI La ciencia, mi ruta; mi meta, el espacio!",
      website: "https://www.emavi.edu.co",
    },
    {
      id: 2,
      nombre: "FUERZA AEROESPACIAL COLOMBIA",
      tipo: "aliado",
      imagen: FuerzaAereaLogo,
      imagenNombre: FuerzaAereaNombre,
      fondo: FondoDefensa,
      descripcion: "Institución de defensa nacional y desarrollo aeroespacial comprometida con la protección del espacio aéreo colombiano y el desarrollo tecnológico del país. ¡FAC, Asi se va a las Estrellas!",
      website: "https://www.fac.mil.co",
    },
    {
      id: 3,
      nombre: "ZONA AMERICA",
      tipo: "patrocinador",
      imagen: ZonaAmericaLogo,
      imagenNombre: ZonaAmericaNombre,
      fondo: FondoTecnologia,
      descripcion: "Parque empresarial con infraestructura de clase mundial, espacios modernos y servicios integrales para empresas innovadoras y en crecimiento. ¡Zona América, tu mejor opción!",
      website: "https://web.zonamerica.com/colombia/",
    },
    {
      id: 4,
      nombre: "PRICESMART",
      tipo: "patrocinador",
      imagen: PriceSmartLogo,
      imagenNombre: PriceSmartNombre,
      fondo: FondoRetail,
      descripcion: "Club de compras líder en América Latina y el Caribe, ofreciendo productos de calidad y experiencias únicas de compra para sus miembros. ¡Haz tus compras desde donde quiera que estés! ¡Pricemart, Servimos Confianza!",
      website: "https://www.pricesmart.com",
    },
    {
      id: 5,
      nombre: "GRUPO NUTRESA",
      tipo: "patrocinador",
      imagen: NutresaLogo,
      imagenNombre: NutresaNombre,
      fondo: FondoAlimentos,
      descripcion: "Gestionamos nuestras actividades comprometidos con el desarrollo sostenible; con el mejor talento humano, la innovación sobresaliente y un comportamiento corporativo ejemplar. En Nutresa trabajamos día a día por nuestro propósito superior construir un mundo mejor donde el desarrollo sea para todos. ¡Nutresa, Tu Salud, Nuestra Prioridad!",
      website: "https://www.gruponutresa.com",
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
        <div id="aliados" className="text-center mb-12">
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
            {/* Badge mejorado */}
            <div className="elemento-badge">
              {elemento.tipo === 'aliado' ? (
                <>
                  <span className="badge-icon">🤝</span>
                  Aliado
                </>
              ) : (
                <>
                  <span className="badge-icon">💎</span>
                  Patrocinador
                </>
              )}
            </div>

            {/* Contenedor de imagen con efectos mejorados */}
            <div
              className="elemento-imagen-container"
              style={elemento.fondo ? {
                backgroundImage: `url(${elemento.fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Efecto de partículas animadas */}
              <div className="particles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="particle" style={{
                    animationDelay: `${i * 0.5}s`,
                    left: `${20 + i * 15}%`
                  }} />
                ))}
              </div>

              {/* Logo principal */}
              <img
                src={elemento.imagen}
                alt={`Logo ${elemento.nombre}`}
                className="elemento-imagen"
              />

              {/* Overlay mejorado */}
              <div className="elemento-overlay">
                <div className="overlay-content">
                  <div className="overlay-icon">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <span className="overlay-text">Visitar Sitio</span>
                </div>
              </div>
            </div>

            {/* Información mejorada */}
            <div className="elemento-info">
              <div className="elemento-header">
                {/* Imagen del nombre/logotipo en lugar de texto */}
                <div className="nombre-imagen-container">
                  <img
                    src={elemento.imagenNombre}
                    alt={elemento.nombre}
                    className="nombre-imagen"
                  />
                </div>
              </div>

              <p className="elemento-descripcion">{elemento.descripcion}</p>

              <div className="elemento-acciones">
                {elemento.website && (
                  <button
                    onClick={() => abrirWebsite(elemento.website!)}
                    className="website-btn-elegant"
                  >
                    <span>Conocer Más</span>
                    <div className="arrow-container">
                      <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
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