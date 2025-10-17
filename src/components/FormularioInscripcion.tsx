import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './FormularioInscripcion.css';
import HackathonImg from '@/assets/hackathonevento.jpg';
import TechTouchImg from '@/assets/technologicaltouchevento.jpg';
import SemanaImg from '@/assets/visitasevento.jpg';
import AsistenciaImg from '@/assets/asistenciaevento.jpg';

interface FormData {
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  programa: string;
  semestre: string;
  evento: string;
  nombre_equipo: string;
  nombre_proyecto: string;
  descripcion_proyecto: string;
  categoria_participacion: string;
  institucion_equipo: string;
  email_equipo: string;
  telefono_equipo: string;
}


const FormularioInscripcion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cedula: '',
    correo: '',
    telefono: '',
    programa: '',
    semestre: '',
    evento: '',
    nombre_equipo: '',
    nombre_proyecto: '',
    descripcion_proyecto: '',
    categoria_participacion: '',
    institucion_equipo: '',
    email_equipo: '',
    telefono_equipo: ''
  });

  const [showTeamFields, setShowTeamFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formData.evento && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [formData.evento]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      evento: value
    }));

    // Mostrar campos del equipo solo para hackathon y technological
    const shouldShowTeamFields = value === 'hackathon' || value === 'technological';
    setShowTeamFields(shouldShowTeamFields);

    // Limpiar campos del equipo si se cambia a otra opción
    if (!shouldShowTeamFields) {
      setFormData(prev => ({
        ...prev,
        nombre_equipo: '',
        nombre_proyecto: '',
        descripcion_proyecto: '',
        categoria_participacion: '',
        institucion_equipo: '',
        email_equipo: '',
        telefono_equipo: ''
      }));
    }
  };

  const handleSelectEvent = (value: string) => {
    const fakeEvent = { target: { value } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleEventChange(fakeEvent);
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // construir payload para el backend
      const actividades = formData.evento ? [formData.evento] : [];
      const hasGrupo = showTeamFields;

      const payload: any = {
        nombre: formData.nombre.trim(),
        cedula: formData.cedula.trim(),
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim(),
        programa: formData.programa,
        semestre: formData.semestre,
        actividades
      };

      if (hasGrupo) {
        payload.grupo = {
          nombre: formData.nombre_equipo.trim(),
          integrantes: [formData.nombre.trim()], // puedes agregar más integrantes si luego los capturas
          proyecto: {
            nombre: formData.nombre_proyecto.trim(),
            descripcion: formData.descripcion_proyecto.trim(),
            categoria: formData.categoria_participacion
          },
          institucion: formData.institucion_equipo.trim(),
          correo: formData.email_equipo.trim(),
          telefono: formData.telefono_equipo?.trim() || undefined
        };
      }

      console.log('🚀 Enviando payload:', payload);


      const res = await fetch(`${API_URL}/inscripciones/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || 'Error registrando la inscripción';
        const errors = Array.isArray(err?.errors) ? `\n- ${err.errors.join('\n- ')}` : '';
        throw new Error(`${msg}${errors}`);
      }

      const data = await res.json();
      // data: { message, id, qr, qrData, estudiante }
      const qrFromApi: string | undefined = data?.qr || data?.qrData;
      setQrSrc(qrFromApi || null);
      setSuccessOpen(true);

      // limpiar formulario
      setFormData({
        nombre: '',
        cedula: '',
        correo: '',
        telefono: '',
        programa: '',
        semestre: '',
        evento: '',
        nombre_equipo: '',
        nombre_proyecto: '',
        descripcion_proyecto: '',
        categoria_participacion: '',
        institucion_equipo: '',
        email_equipo: '',
        telefono_equipo: ''
      });
      setShowTeamFields(false);
    } catch (error: any) {
      alert(`❌ ${error.message || 'Error inesperado'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="formulario-container">
      {/* Encabezado */}
      <div className="header" style={{ position: 'relative' }}>
        <img src="/unicatolica-logo.svg" alt="UNICATÓLICA" />
        <Link to="/" className="submit-btn-atras" style={{ position: 'absolute', top: '12px', right: '12px', textDecoration: 'none', padding: '0.5rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }} aria-label="Regresar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="btn-text">Regresar</span>
        </Link>
        <h1>XI Semana de la Ingeniería <br />"360°: Innovación, Liderazgo y Futuro"</h1>
        <p>
          <span className="highlight">Del 11 al 14 de noviembre de 2025</span> <br />
          Sedes Pance y Meléndez
        </p>
        <p>Un espacio académico, investigativo, cultural y de relacionamiento con nuestros aliados estratégicos.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Selección de Actividades */}
        <h2>Eventos</h2>
        <div className="events-grid">
          <label className={`event-card ${formData.evento === 'hackathon' ? 'selected' : ''}`}>
            <input
              className="event-radio"
              type="radio"
              name="evento"
              value="hackathon"
              checked={formData.evento === 'hackathon'}
              onChange={handleEventChange}
              required
            />
            <img className="event-image" src={HackathonImg} alt="Hackathon" />
            <div className="event-content">
              <div className="event-meta">Mié, Nov 12 | Sede Pance</div>
              <div className="event-title">Hackathon</div>
              <div className="event-description">Competencia de programación y desarrollo (máx. 12 grupos de 3–5 estudiantes)</div>
              <button type="button" className="event-cta" onClick={() => handleSelectEvent('hackathon')}>Inscribirse</button>
            </div>
          </label>

          <label className={`event-card ${formData.evento === 'technological' ? 'selected' : ''}`}>
            <input
              className="event-radio"
              type="radio"
              name="evento"
              value="technological"
              checked={formData.evento === 'technological'}
              onChange={handleEventChange}
            />
            <img className="event-image" src={TechTouchImg} alt="Technological Touch" />
            <div className="event-content">
              <div className="event-meta">Jue, Nov 13 | Sede Meléndez</div>
              <div className="event-title">Technological Touch</div>
              <div className="event-description">Presentación de proyectos innovadores y demostraciones tecnológicas</div>
              <button type="button" className="event-cta" onClick={() => handleSelectEvent('technological')}>Inscribirse</button>
            </div>
          </label>

          <label className={`event-card ${formData.evento === 'visitas' ? 'selected' : ''}`}>
            <input
              className="event-radio"
              type="radio"
              name="evento"
              value="visitas"
              checked={formData.evento === 'visitas'}
              onChange={handleEventChange}
            />
            <img className="event-image" src={SemanaImg} alt="Visitas Empresariales" />
            <div className="event-content">
              <div className="event-meta">Mié 12 y Jue 13 | Zona América</div>
              <div className="event-title">Visitas Empresariales</div>
              <div className="event-description">Recorridos guiados por empresas líderes en tecnología e innovación</div>
              <button type="button" className="event-cta" onClick={() => handleSelectEvent('visitas')}>Inscribirse</button>
            </div>
          </label>

          <label className={`event-card ${formData.evento === 'asistencia' ? 'selected' : ''}`}>
            <input
              className="event-radio"
              type="radio"
              name="evento"
              value="asistencia"
              checked={formData.evento === 'asistencia'}
              onChange={handleEventChange}
            />
            <img className="event-image" src={AsistenciaImg} alt="Asistencia a Eventos" />
            <div className="event-content">
              <div className="event-meta">Del Mar al Vie, Nov 11 al 14</div>
              <div className="event-title">Asistencia a Eventos</div>
              <div className="event-description">Participación como público en foros, conferencias y actividades académicas</div>
              <button type="button" className="event-cta" onClick={() => handleSelectEvent('asistencia')}>Confirmar asistencia</button>
            </div>
          </label>
        </div>

        {!formData.evento && (
          <p className="text-center" style={{ marginTop: '1rem', color: '#6b7280' }}>
            Selecciona un evento para continuar con la inscripción.
          </p>
        )}

        {formData.evento && (
          <div ref={formSectionRef}>
        <h2>Datos del Estudiante</h2>
        <div className="form-group">
          <label>Nombre completo <span className="required">*</span></label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Número de documento <span className="required">*</span></label>
          <input
            type="text"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo institucional <span className="required">*</span></label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono <span className="required">*</span></label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Programa Académico <span className="required">*</span></label>
          <select
            name="programa"
            value={formData.programa}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Programa</option>
            <option value="ingenieria-industrial">Ingeniería Industrial</option>
            <option value="ingenieria-sistemas">Ingeniería de Sistemas</option>
            <option value="tecnologia-desarrollo-software">Tecnología en Desarrollo de Software</option>
            <option value="tecnologia-gestion-logistica">Tecnología en Gestión Logística Empresarial</option>
          </select>
        </div>

        <div className="form-group">
          <label>Semestre<span className="required">*</span></label>
          <select
            name="semestre"
            value={formData.semestre}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Semestre</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
          </select>
        </div>

        

        {/* Campos del equipo */}
        {showTeamFields && (
          <div>
            <h2>Datos del Equipo</h2>

            <div className="form-group">
              <label>Nombre del equipo <span className="required">*</span></label>
              <input
                type="text"
                name="nombre_equipo"
                value={formData.nombre_equipo}
                onChange={handleInputChange}
                placeholder="Un nombre único que lo identifique en la competencia"
                required
              />
            </div>

            <div className="form-group">
              <label>Proyecto <span className="required">*</span></label>
              <input
                type="text"
                name="nombre_proyecto"
                value={formData.nombre_proyecto}
                onChange={handleInputChange}
                placeholder="Nombre del proyecto de ingeniería"
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción del proyecto <span className="required">*</span></label>
              <textarea
                name="descripcion_proyecto"
                value={formData.descripcion_proyecto}
                onChange={handleInputChange}
                rows={4}
                placeholder="Breve descripción del concepto y los objetivos principales del proyecto"
                required
              />
            </div>

            <div className="form-group">
              <label>Categoría de participación <span className="required">*</span></label>
              <select
                name="categoria_participacion"
                value={formData.categoria_participacion}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="robotica">Robótica</option>
                <option value="construccion">Construcción</option>
                <option value="programacion">Programación</option>
                <option value="diseno-sostenible">Diseño Sostenible</option>
                <option value="inteligencia-artificial">Inteligencia Artificial</option>
                <option value="iot">Internet de las Cosas (IoT)</option>
                <option value="realidad-virtual">Realidad Virtual/Aumentada</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div className="form-group">
              <label>Institución o empresa <span className="required">*</span></label>
              <input
                type="text"
                name="institucion_equipo"
                value={formData.institucion_equipo}
                onChange={handleInputChange}
                placeholder="Universidad, colegio o empresa que representa el equipo"
                required
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico del equipo <span className="required">*</span></label>
              <input
                type="email"
                name="email_equipo"
                value={formData.email_equipo}
                onChange={handleInputChange}
                placeholder="Correo para comunicaciones oficiales del equipo"
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono del equipo (opcional)</label>
              <input
                type="tel"
                name="telefono_equipo"
                value={formData.telefono_equipo}
                onChange={handleInputChange}
                placeholder="Número de contacto del equipo"
              />
            </div>
          </div>
        )}

        {/* Confirmación */}
        <div className="form-group">
          <label className="checkbox-modern">
            <input type="checkbox" required />
            <div className="checkbox-label">
              Acepto el tratamiento de mis datos personales. <span className="required">*</span>
              <span className="text-sm">Acepto que mis datos personales sean utilizados para fines académicos, investigativos y de relacionamiento con empresas y comunidades de emprendimiento de la región.</span>
            </div>
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar mi participación'}
        </button>
          </div>
        )}
      </form>

    </div>

      {successOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSuccessOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 text-center">
            <h3 className="text-2xl font-bold text-uniblue">Inscripción registrada</h3>
            <p className="text-gray-600 mt-2">Guarda o escanea tu código para confirmar.</p>
            <div className="mt-4 flex items-center justify-center">
              {qrSrc ? (
                <img src={qrSrc as string} alt="Código QR de confirmación" className="h-56 w-56 object-contain" />
              ) : (
                <div className="text-gray-500 text-sm">QR no proporcionado por el servidor.</div>
              )}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              {qrSrc && (
                <a href={qrSrc as string} target="_blank" rel="noopener noreferrer" className="bg-uniblue text-white px-5 py-2 rounded-full font-semibold hover:bg-uniblue/90">Abrir QR</a>
              )}
              <button type="button" onClick={() => setSuccessOpen(false)} className="px-5 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50">Cerrar</button>
            </div>
          </div>
        </div>
      )}
  </>
  );
};

export default FormularioInscripcion;
