import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import './index.css';
import Formulario from './pages/Formulario.tsx'
import FormularioInscripcionLiderazgo from './components/FormularioInscripcionLiderazgo.tsx'
import FormularioTechnological from './components/FormularioTechnological.tsx'
import FormularioZonaAmerica from './components/FormularioZonaAmerica.tsx'
import FormularioAsistenciaInaugural from './components/FormularioAsistenciaInaugural.tsx'
import FormularioDobleLumen from './components/FormularioDoblaLumen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/liderazgo" element={<FormularioInscripcionLiderazgo />} />
        <Route path="/formulario-technological" element={<FormularioTechnological />} />
        <Route path="/formulario-zona-america" element={<FormularioZonaAmerica />} />
        <Route path="/formulario-inaugural" element={<FormularioAsistenciaInaugural />} />
        <Route path='/formulario-doblalumen' element={<FormularioDobleLumen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
