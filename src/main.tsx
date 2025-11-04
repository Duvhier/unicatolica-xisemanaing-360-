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
import FormularioFullStack from './components/FormularioFullStack.tsx'
import FormularioIndustriaAccion from './components/FormularioIndustriaenAccion.tsx'
import FormularioEmavi from './components/FormularioEmavi.tsx'
import FormularioCarnicos from './components/FormularioCarnicos.tsx'
import FormularioOlimpiadasLogica from './components/FormularioOlimpiadasLogica.tsx'
import FormularioHackathonMonitoria from './components/FormularioHackathonMonitoria.tsx'
import FormularioTallerVuelo from './components/FormularioTallerVuelo.tsx'
import FormularioIAPractica from './components/FormularioIAPractica.tsx'
import FormularioTallerWordpress from './components/FormularioTallerWordpress.tsx'

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
        <Route path='/formulario-fullstack' element={<FormularioFullStack />} />
        <Route path='/formulario-industriaenaccion' element={<FormularioIndustriaAccion />} />
        <Route path='/formulario-visitaemavi' element={<FormularioEmavi />} />
        <Route path='/formulario-visitacarnicos' element={<FormularioCarnicos />} />
        <Route path="/formulario-olimpiadasmatematicas" element={<FormularioOlimpiadasLogica />} />
        <Route path="/formulario-hackathonmonitoria" element={<FormularioHackathonMonitoria />} />
        <Route path="/formulario-tallervuelo" element={<FormularioTallerVuelo />} />
        <Route path="/formulario-ia-practica" element={<FormularioIAPractica />} />
        <Route path="/formulario-tallerwordpress" element={<FormularioTallerWordpress />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
