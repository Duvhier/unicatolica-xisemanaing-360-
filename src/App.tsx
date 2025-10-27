import Header from "./components/Header";
import Hero from "./components/Hero";
import Info from "./components/Info";
import Agenda from "./components/Agenda";
import Inscripcion from "./components/Inscripcion";
import Footer from "./components/Footer";
import Publicidad from "./components/PublicidadEvento";


export default function App() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <Hero />
      <Inscripcion />
      <Publicidad />
      <Info />
      <Agenda />
      <Footer />
    </div>
  );
}
