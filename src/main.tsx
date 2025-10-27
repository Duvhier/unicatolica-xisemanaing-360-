import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import './index.css';
import Formulario from './pages/Formulario.tsx'
import VistaOrganizador from './components/VistaOrganizador.tsx'
import FormularioInscripcionLiderazgo from './components/FormularioInscripcionLiderazgo.tsx'
import FormularioTechnological from './components/FormularioTechnological.tsx'
import FormularioZonaAmerica from './components/FormularioZonaAmerica.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/organizador" element={<VistaOrganizador />} />
        <Route path="/liderazgo" element={<FormularioInscripcionLiderazgo />} />
        <Route path="/formulario-technological" element={<FormularioTechnological />} />
        <Route path="/formulario-zona-america" element={<FormularioZonaAmerica />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
