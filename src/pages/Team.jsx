import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import { teamMembers } from "../data/teamData";
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const Team = () => {
  const owners = teamMembers.filter((member) => member.role === "owner");
  const seniors = teamMembers.filter((member) => member.role === "senior");
  const interns = teamMembers.filter((member) => member.role === "intern");

  const MemberCard = ({ member, index, gradient = "from-blue-500 to-purple-600", colorClass = "text-blue-600" }) => (
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
            alt={`Foto de ${member.name}, ${member.position} en INIT, empresa de desarrollo de software`}
            className="w-full h-full object-cover object-top rounded-2xl shadow-lg"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`w-48 h-48 bg-gradient-to-br ${gradient} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
          <PersonIcon className="h-20 w-20 text-white" />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
      <p className={`font-semibold mb-4 ${colorClass}`}>{member.position}</p>
      <p className="text-slate-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
      {member.achievement && (
        <p className="text-slate-600 text-sm mb-4 leading-relaxed italic border-l-2 border-blue-200 pl-3">
          {member.achievement}
        </p>
      )}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-2">
          {member.technologies ? "Tecnologías / Áreas:" : "Especialidades:"}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          {member.technologies || member.expertise}
        </p>
      </div>
      <div className="flex justify-center space-x-3">
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
            <EmailIcon className="h-5 w-5" />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name}`} className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
            <LinkedInIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PageHead
        title="Nuestro Equipo de Desarrollo y Consultoría"
        description="Conoce a los profesionales de INIT: 4 cofundadores, consultora senior y becario. Desarrollo de software y consultoría en digitalización en Estado de México."
        path="/team"
      />
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg mb-6">
              <img src="/Init-Logo.svg" alt="INIT" className="h-14 w-14 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Nuestro Equipo</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Conoce a los profesionales apasionados que hacen posible la transformación digital de tu empresa. Somos un equipo de 6 personas: 4 cofundadores, una consultora senior y un becario, comprometidos con la excelencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cofundadores Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cofundadores</h2>
            <p className="text-xl text-slate-600">Los líderes que guían nuestra visión y estrategia</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {owners.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} gradient="from-blue-500 to-purple-600" colorClass="text-blue-600" />
            ))}
          </div>
        </div>
      </section>

      {/* Senior Section */}
      {seniors.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Consultoría</h2>
              <p className="text-xl text-slate-600">Procesos de calidad, necesidades y seguimiento</p>
            </motion.div>

            <div className="flex justify-center">
              <div className="max-w-md w-full">
                {seniors.map((member, index) => (
                  <MemberCard key={member.id} member={member} index={index} gradient="from-amber-500 to-orange-600" colorClass="text-amber-600" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Becario Section */}
      {interns.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestro Talento Joven</h2>
              <p className="text-xl text-slate-600">Los futuros líderes de la tecnología</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
              {interns.map((member, index) => (
                <motion.div key={member.id} className="w-full max-w-sm">
                  <motion.div
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
                          alt={`Foto de ${member.name}, ${member.position} en INIT, empresa de desarrollo de software`}
                          className="w-full h-full object-cover object-top rounded-2xl shadow-lg"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                        <PersonIcon className="h-16 w-16 text-white" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{member.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-4">{member.position}</p>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Tecnologías:</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{member.expertise}</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
                          <EmailIcon className="h-5 w-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name}`} className="text-slate-400 hover:text-emerald-600 transition-colors p-2 rounded-lg hover:bg-slate-100">
                          <LinkedInIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why work with us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Por qué trabajar con nosotros?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tiempo de respuesta ágil, equipo estable y metodología clara
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Tiempo de respuesta</h3>
                <p className="text-slate-600 text-sm">Respuesta rápida y comunicación directa con el equipo que desarrolla tu proyecto.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Tamaño del equipo</h3>
                <p className="text-slate-600 text-sm">Equipo de 6 personas: trato cercano y sin capas innecesarias.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircleIcon className="h-8 w-8 text-emerald-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Metodología</h3>
                <p className="text-slate-600 text-sm">Análisis, alcance definido y entregas iterativas para que veas avances desde el inicio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Innovación</h3>
                <p className="text-slate-200 leading-relaxed">Siempre buscamos las mejores soluciones tecnológicas para nuestros clientes.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Excelencia</h3>
                <p className="text-slate-200 leading-relaxed">Nos comprometemos a entregar productos y servicios de la más alta calidad.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Colaboración</h3>
                <p className="text-slate-200 leading-relaxed">Trabajamos en equipo para lograr resultados excepcionales.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
