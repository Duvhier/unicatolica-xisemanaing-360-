import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VistaOrganizador.css';

interface LoginData {
  usuario: string;
  contraseña: string;
}

interface Inscripcion {
  _id: string;
  nombre: string;
  cedula: string;
  correo: string;
  telefono: string;
  programa: string;
  semestre: string;
  actividades: string[];
  asistencia?: boolean;
  created_at: string;
  grupo?: {
    nombre: string;
    proyecto: {
      nombre: string;
    };
  };
}

interface Organizador {
  nombre: string;
  usuario: string;
}

const VistaOrganizador: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [organizador, setOrganizador] = useState<Organizador | null>(null);
  const [loginData, setLoginData] = useState<LoginData>({ usuario: '', contraseña: '' });
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [filteredInscripciones, setFilteredInscripciones] = useState<Inscripcion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('organizador_token');
    const organizadorData = localStorage.getItem('organizador_data');
    
    if (token && organizadorData) {
      try {
        const parsed = JSON.parse(organizadorData);
        setOrganizador(parsed);
        setIsAuthenticated(true);
        cargarInscripciones();
      } catch (error) {
        localStorage.removeItem('organizador_token');
        localStorage.removeItem('organizador_data');
      }
    }
  }, []);

  // Filtrar inscripciones cuando cambie el término de búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInscripciones(inscripciones);
    } else {
      const filtered = inscripciones.filter(inscripcion =>
        inscripcion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscripcion.cedula.includes(searchTerm)
      );
      setFilteredInscripciones(filtered);
    }
  }, [searchTerm, inscripciones]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/organizador/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const data = await response.json();
      
      // Guardar token y datos del organizador
      localStorage.setItem('organizador_token', data.token);
      localStorage.setItem('organizador_data', JSON.stringify(data.organizador));
      
      setOrganizador(data.organizador);
      setIsAuthenticated(true);
      await cargarInscripciones();
      
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const cargarInscripciones = async () => {
    const token = localStorage.getItem('organizador_token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/organizador/inscripciones`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado
          logout();
          return;
        }
        throw new Error('Error al cargar inscripciones');
      }

      const data = await response.json();
      setInscripciones(data.inscripciones || []);
    } catch (error: any) {
      setError(error.message || 'Error al cargar datos');
    }
  };

  const marcarAsistencia = async (id: string, asistencia: boolean) => {
    const token = localStorage.getItem('organizador_token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/organizador/asistencia/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ asistencia })
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Error al marcar asistencia');
      }

      // Actualizar estado local
      setInscripciones(prev => 
        prev.map(inscripcion => 
          inscripcion._id === id 
            ? { ...inscripcion, asistencia }
            : inscripcion
        )
      );

      setSuccessMessage(`Asistencia ${asistencia ? 'marcada' : 'desmarcada'} correctamente`);
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error: any) {
      setError(error.message || 'Error al actualizar asistencia');
    }
  };

  const logout = () => {
    localStorage.removeItem('organizador_token');
    localStorage.removeItem('organizador_data');
    setIsAuthenticated(false);
    setOrganizador(null);
    setInscripciones([]);
    setFilteredInscripciones([]);
    setSearchTerm('');
    setError('');
    setSuccessMessage('');
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const obtenerActividadTexto = (actividades: string[]) => {
    const mapActividades: { [key: string]: string } = {
      'hackathon': 'Hackathon',
      'technological': 'Technological Touch',
      'visitas': 'Visitas Empresariales',
      'asistencia': 'Asistencia a Eventos'
    };
    
    return actividades.map(act => mapActividades[act] || act).join(', ');
  };

  if (!isAuthenticated) {
    return (
      <div className="vista-organizador-container">
        <div className="login-container">
          <div className="login-header">
            <img src="/unicatolica-logo.svg" alt="UNICATÓLICA" className="login-logo" />
            <h1>Vista de Organizador</h1>
            <p>XI Semana de la Ingeniería</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <h2>Iniciar Sesión</h2>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                value={loginData.usuario}
                onChange={(e) => setLoginData(prev => ({ ...prev, usuario: e.target.value }))}
                required
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={loginData.contraseña}
                onChange={(e) => setLoginData(prev => ({ ...prev, contraseña: e.target.value }))}
                required
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/" className="back-link">
              ← Volver al sitio principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vista-organizador-container">
      <div className="organizador-header">
        <div className="header-content">
          <img src="/unicatolica-logo.svg" alt="UNICATÓLICA" className="header-logo" />
          <div className="header-info">
            <h1>Control de Asistencia - XI Semana de la Ingeniería</h1>
            <p>Organizador: {organizador?.nombre}</p>
          </div>
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="organizador-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="controls-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Total inscritos:</span>
              <span className="stat-value">{inscripciones.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Asistieron:</span>
              <span className="stat-value asistieron">
                {inscripciones.filter(i => i.asistencia).length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Pendientes:</span>
              <span className="stat-value pendientes">
                {inscripciones.filter(i => !i.asistencia).length}
              </span>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="inscripciones-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Programa</th>
                <th>Semestre</th>
                <th>Actividad</th>
                <th>Fecha Registro</th>
                <th>Asistencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInscripciones.map((inscripcion) => (
                <tr key={inscripcion._id}>
                  <td>{inscripcion.nombre}</td>
                  <td>{inscripcion.cedula}</td>
                  <td>{inscripcion.correo}</td>
                  <td>{inscripcion.telefono}</td>
                  <td>{inscripcion.programa}</td>
                  <td>{inscripcion.semestre}</td>
                  <td>{obtenerActividadTexto(inscripcion.actividades)}</td>
                  <td>{formatearFecha(inscripcion.created_at)}</td>
                  <td>
                    <span className={`asistencia-status ${inscripcion.asistencia ? 'asistio' : 'pendiente'}`}>
                      {inscripcion.asistencia ? 'Asistió' : 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => marcarAsistencia(inscripcion._id, !inscripcion.asistencia)}
                      className={`asistencia-btn ${inscripcion.asistencia ? 'marcar-pendiente' : 'marcar-asistio'}`}
                    >
                      {inscripcion.asistencia ? 'Desmarcar' : 'Marcar Asistencia'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInscripciones.length === 0 && (
            <div className="no-data">
              {searchTerm ? 'No se encontraron resultados para la búsqueda' : 'No hay inscripciones registradas'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaOrganizador;
