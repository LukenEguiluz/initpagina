import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code as CodeIcon,
  Computer as ComputerIcon,
  RocketLaunch as RocketLaunchIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

const Home = () => {
  const services = [
    {
      icon: CodeIcon,
      title: "Desarrollo de Software",
      description:
        "Creamos soluciones de software personalizadas y escalables que transforman tu visión en realidad digital.",
      features: [
        "Aplicaciones Web Premium",
        "Sistemas Empresariales",
        "APIs de Alto Rendimiento",
      ],
      color: "from-blue-500 to-blue-600",
      delay: 0.2,
    },
    {
      icon: ComputerIcon,
      title: "Consultoría en Digitalización",
      description:
        "Estrategias de transformación digital que impulsan el crecimiento y la competitividad de tu empresa.",
      features: [
        "Análisis Estratégico",
        "Optimización de Procesos",
        "Roadmap Digital",
      ],
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: RocketLaunchIcon,
      title: "Soluciones Digitales",
      description:
        "Implementamos tecnologías de vanguardia para optimizar y automatizar tus operaciones empresariales.",
      features: [
        "Inteligencia Artificial",
        "Cloud Computing",
        "Automatización",
      ],
      color: "from-emerald-500 to-emerald-600",
      delay: 0.6,
    },
  ];

  const stats = [
    { number: "100+", label: "Proyectos Completados", icon: CheckCircleIcon },
    { number: "50+", label: "Clientes Satisfechos", icon: StarIcon },
    { number: "5", label: "Años de Experiencia", icon: TrendingUpIcon },
    { number: "24/7", label: "Soporte Técnico", icon: ShieldIcon },
  ];

  const features = [
    "Desarrollo Full-Stack Avanzado",
    "Arquitectura de Microservicios",
    "Aplicaciones Móviles Nativas",
    "Inteligencia Artificial & ML",
    "Cloud Computing & DevOps",
    "Ciberseguridad Empresarial",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl"
            >
              <span className="text-4xl font-bold text-white">I</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Bienvenido a <span className="gradient-text">INIT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Somos una empresa líder en desarrollo de software y consultoría en
              digitalización. Transformamos ideas en soluciones tecnológicas que
              impulsan el éxito empresarial.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/team"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
              >
                Conoce Nuestro Equipo
                <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary text-lg px-8 py-4">
                Nuestros Servicios
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales diseñadas para impulsar la
              transformación digital y el crecimiento sostenible de tu empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: service.delay }}
                viewport={{ once: true }}
                className="card-luxury p-8 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <service.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 text-left">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-slate-700"
                    >
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                Sobre INIT
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Somos una empresa joven y dinámica fundada por un equipo de
                profesionales apasionados por la tecnología y la innovación.
                Nuestro compromiso es transformar empresas a través de
                soluciones digitales de vanguardia.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nuestro equipo está compuesto por 3 dueños, 1 dueña y 1 becario,
                todos comprometidos con ofrecer soluciones de la más alta
                calidad y con un enfoque personalizado para cada cliente.
              </p>
              <Link
                to="/team"
                className="btn-primary inline-flex items-center group"
              >
                Conoce Nuestro Equipo
                <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Nuestra Misión</h3>
                <p className="text-lg mb-8 leading-relaxed">
                  Transformar empresas a través de la innovación tecnológica,
                  proporcionando soluciones digitales que impulsen el
                  crecimiento y la competitividad en el mercado actual.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      5
                    </div>
                    <div className="text-sm text-slate-300">
                      Miembros del Equipo
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-slate-300">Compromiso</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-float"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              ¿Por qué Elegirnos?
            </h2>
            <p className="text-xl text-slate-600">
              Ventajas que nos distinguen y garantizan resultados excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-medium text-slate-800">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Transformar tu Empresa?
            </h2>
            <p className="text-xl mb-10 text-slate-200 leading-relaxed">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar
              tus objetivos digitales con soluciones de clase mundial.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
              >
                Contáctanos
                <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary text-lg px-8 py-4">
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
