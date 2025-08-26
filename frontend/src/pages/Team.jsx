import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { teamAPI } from "../services/api";
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamAPI.getTeamMembers();
        setTeamMembers(data);
      } catch (err) {
        // Datos de ejemplo si la API no está disponible
        setTeamMembers([
          {
            id: 1,
            name: "Enrique Jiménez Guevara",
            position: "CEO & Fundador",
            role: "owner",
            bio: "Experto en estrategia empresarial y desarrollo de software con más de 10 años de experiencia en la industria tecnológica.",
            expertise:
              "Liderazgo estratégico, Desarrollo Full-Stack, Arquitectura de Software",
            email: "enrique@init.com.mx",
            linkedin: "https://linkedin.com/in/enrique-jimenez",
            order: 1,
          },
          {
            id: 2,
            name: "Iñaki Guerrero Negrete",
            position: "CTO & Fundador",
            role: "owner",
            bio: "Especialista en tecnologías emergentes y transformación digital con amplia experiencia en consultoría tecnológica.",
            expertise: "Inteligencia Artificial, Cloud Computing, DevOps",
            email: "inaki@init.com.mx",
            linkedin: "https://linkedin.com/in/inaki-guerrero",
            order: 2,
          },
          {
            id: 3,
            name: "Luken Eguiluz del Angel",
            position: "COO & Fundador",
            role: "owner",
            bio: "Project Manager certificado con experiencia en gestión de equipos y entrega de proyectos de alta complejidad.",
            expertise:
              "Gestión de Proyectos, Metodologías Ágiles, Análisis de Negocios",
            email: "luken@init.com.mx",
            linkedin: "https://linkedin.com/in/luken-eguiluz",
            order: 3,
          },
          {
            id: 4,
            name: "Carolina Martínez Valadezhoq",
            position: "CEPA",
            role: "owner",
            bio: "Diseñadora UX/UI con pasión por crear experiencias digitales excepcionales y centradas en el usuario.",
            expertise: "Diseño UX/UI, Investigación de Usuarios, Prototipado",
            email: "carolina@init.com.mx",
            linkedin: "https://linkedin.com/in/carolina-martinez",
            order: 4,
          },
          {
            id: 5,
            name: "Xoan Pablo",
            position: "Becario",
            role: "intern",
            bio: "Becario talentoso con gran potencial en desarrollo web y móvil, siempre dispuesto a aprender nuevas tecnologías.",
            expertise: "React, Node.js, Desarrollo Móvil",
            email: "xoan@init.com.mx",
            linkedin: "https://linkedin.com/in/xoan-pablo",
            order: 5,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const owners = teamMembers.filter((member) => member.role === "owner");
  const interns = teamMembers.filter((member) => member.role === "intern");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando equipo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuestro Equipo
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Conoce a los profesionales apasionados que hacen posible la
              transformación digital de tu empresa. Somos un equipo de 5
              personas comprometidas con la excelencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fundadores y Directores
            </h2>
            <p className="text-xl text-slate-600">
              Los líderes que guían nuestra visión y estrategia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {owners.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                {member.image_url ? (
                  <div className="w-48 h-48 mx-auto mb-6">
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-2xl shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <PersonIcon className="h-20 w-20 text-white" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  {member.position}
                </p>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">
                    Especialidades:
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.expertise}
                  </p>
                </div>
                <div className="flex justify-center space-x-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                    >
                      <EmailIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                    >
                      <LinkedInIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interns Section */}
      {interns.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Nuestro Talento Joven
              </h2>
              <p className="text-xl text-slate-600">
                Los futuros líderes de la tecnología
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interns.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-luxury p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  {member.image_url ? (
                    <div className="w-40 h-40 mx-auto mb-6">
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover object-top rounded-2xl shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <PersonIcon className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-4">
                    {member.position}
                  </p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">
                      Tecnologías:
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.expertise}
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-slate-400 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                      >
                        <EmailIcon className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                      >
                        <LinkedInIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Innovación</h3>
                <p className="text-slate-200 leading-relaxed">
                  Siempre buscamos las mejores soluciones tecnológicas para
                  nuestros clientes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Excelencia</h3>
                <p className="text-slate-200 leading-relaxed">
                  Nos comprometemos a entregar productos y servicios de la más
                  alta calidad.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Colaboración</h3>
                <p className="text-slate-200 leading-relaxed">
                  Trabajamos en equipo para lograr resultados excepcionales.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
