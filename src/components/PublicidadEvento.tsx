// components/PublicidadEvento.tsx
import React, { useState } from "react";
import "./PublicidadEvento.css";

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
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608302/emavi_akptyd.png",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/emavitext_aantxu.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/fondo-escuelamarcofidel_z8cuxb.jpg",
      descripcion: "En la Escuela Militar de Aviación 'Marco Fidel Suárez' forjamos líderes íntegros, con excelencia militar, profesional y aeronáutica. ¡EMAVI La Ciencia, Mi Ruta; Mi Meta, El Espacio!",
      website: "https://www.emavi.edu.co",
    },
    {
      id: 2,
      nombre: "FUERZA AEROESPACIAL COLOMBIA",
      tipo: "aliado",
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762811543/fuerzaaerea__xridua.webp",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608304/fuerzaaereatext_pubhym.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/fondo-educacion_eljnlp.jpg",
      descripcion: "Institución de defensa nacional y desarrollo aeroespacial comprometida con la protección del espacio aéreo colombiano y el desarrollo tecnológico del país. ¡FAC, Asi se va a las Estrellas!",
      website: "https://www.fac.mil.co",
    },
    {
      id: 3,
      nombre: "ZONA AMERICA",
      tipo: "patrocinador",
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762613895/zonamericalogo_wn3ahe.png",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608308/Zonamericatext_veedgm.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/fondo-defensa_pfe2cq.jpg",
      descripcion: "Parque empresarial con infraestructura de clase mundial, espacios modernos y servicios integrales para empresas innovadoras y en crecimiento. ¡Zona América, tu mejor opción!",
      website: "https://web.zonamerica.com/colombia/",
    },
    {
      id: 4,
      nombre: "PRICESMART",
      tipo: "patrocinador",
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608310/pricesmart_vuatgm.png",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608308/pricesmarttext_vott9h.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608304/fondo-retail_lbf07s.avif",
      descripcion: "Club de compras líder en América Latina y el Caribe, ofreciendo productos de calidad y experiencias únicas de compra para sus miembros. ¡Haz tus compras desde donde quiera que estés! ¡Pricemart, Servimos Confianza!",
      website: "https://www.pricesmart.com",
    },
    {
      id: 5,
      nombre: "GRUPO NUTRESA",
      tipo: "patrocinador",
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608304/gruponutresa_b2tu4u.png",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608304/gruponutresatext_mtbmvp.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608302/fondo-alimentos_m5eido.jpg",
      descripcion: "Gestionamos nuestras actividades comprometidos con el desarrollo sostenible; con el mejor talento humano, la innovación sobresaliente y un comportamiento corporativo ejemplar. En Nutresa trabajamos día a día por nuestro propósito superior construir un mundo mejor donde el desarrollo sea para todos. ¡Nutresa, Tu Salud, Nuestra Prioridad!",
      website: "https://www.gruponutresa.com",
    },
    {
      id: 6,
      nombre: "CDI ALIMENTOS CÁRNICOS",
      tipo: "aliado",
      imagen: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608303/alimentoscarnicos_w1biva.png",
      imagenNombre: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608302/alimentoscarnicosnombre_yrgjgy.png",
      fondo: "https://res.cloudinary.com/dufzjm2mn/image/upload/v1762608302/fondo-carnicos_h0cczi.jpg",
      descripcion: "Líder en la producción y distribución de alimentos cárnicos de alta calidad, comprometidos con la excelencia, innovación y sostenibilidad en cada uno de nuestros procesos. ¡CDI Alimentos Cárnicos, Calidad que se siente!",
      website: "https://alimentoscarnicos.com.co/", // Ajusta la URL si es necesario
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