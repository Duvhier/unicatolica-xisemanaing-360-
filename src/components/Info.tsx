import Objetivos from '../assets/Objetivos.svg';

export default function Info() {
    return (
      <section id="info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-uniblue mb-6">
              INFORMACIÓN
            </h2>
          </div>
          
          <div className="space-y-10 text-gray-700">
            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">1. Introducción</h3>
              <p className="leading-relaxed">
                La Facultad de Ingeniería de la Fundación Universitaria Católica Lumen Gentium – UNICATÓLICA organiza la XI Semana de la Ingeniería – “360°: Innovación, Liderazgo y Futuro”, un evento académico, investigativo, cultural y empresarial que busca fortalecer la formación integral de los estudiantes, visibilizar los procesos académicos e investigativos de la institución y consolidar el relacionamiento con empresas y comunidades de emprendimiento de la región.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">2. Población objetivo</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Estudiantes de pregrado y posgrado de la Facultad de Ingeniería y de otros programas afines.</li>
                <li>Docentes, egresados y directivos académicos.</li>
                <li>Comunidades de emprendimiento y empresarios aliados.</li>
                <li>Instituciones educativas de la región (colegios invitados a la Hackatón).</li>
                <li>Público externo interesado en innovación, ingeniería y desarrollo tecnológico.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">3. Sedes</h3>
              <p className="leading-relaxed">
                Sede Pance y Meléndez : espacios académicos, culturales y deportivos, incluyendo el Auditorio Lumen, laboratorios, aulas especializadas, zonas deportivas y áreas de exposición para la feria empresarial y de emprendimiento.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-uniblue mb-3">4. Temáticas a trabajar</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Inteligencia Artificial y transformación digital: aplicaciones, tendencias y retos en la ingeniería.</li>
                <li>Habilidades y competencias profesionales: liderazgo, trabajo en equipo, comunicación efectiva y desarrollo personal.</li>
                <li>Ingeniería aplicada: proyectos de investigación, innovación y desarrollo tecnológico.</li>
                <li>Ámbito académico e investigativo: exposición de trabajos de grado, semilleros de investigación y producción académica de la Facultad.</li>
                <li>Emprendimiento y relacionamiento empresarial: feria de emprendimiento y empresarial, participación de aliados estratégicos y visibilidad de proyectos innovadores.</li>
              </ul>
            </section>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-uniblue to-uniblueLight rounded-2xl p-8 sm:p-10 md:p-12 text-white">
            <div className="flex justify-center">
              <img 
                src={Objetivos} 
                alt="OBJETIVOS" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  