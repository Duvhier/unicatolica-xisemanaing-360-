import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Formulario from './pages/Formulario.tsx'
import VistaOrganizador from './components/VistaOrganizador.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/organizador" element={<VistaOrganizador />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
