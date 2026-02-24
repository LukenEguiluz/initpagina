import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import {
  Code as CodeIcon,
  Computer as ComputerIcon,
  RocketLaunch as RocketLaunchIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Support as SupportIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";

const Home = () => {
  const services = [
    {
      icon: CodeIcon,
      title: "Desarrollo de Software",
      description:
        "Desarrollamos software a medida: aplicaciones web, sistemas de gestión y APIs escalables. Desde portales corporativos hasta ERPs adaptados a tu operación, con tecnologías modernas y mantenibles.",
      features: [
        "Aplicaciones web y portales a medida",
        "Sistemas empresariales (inventario, ventas, expedientes)",
        "APIs de alto rendimiento e integraciones",
      ],
      color: "from-blue-500 to-blue-600",
      delay: 0.2,
    },
    {
      icon: ComputerIcon,
      title: "Consultoría en Digitalización",
      description:
        "Te acompañamos en la transformación digital: análisis de procesos, definición de roadmap y priorización de proyectos. Objetivo: más eficiencia, menos errores manuales y decisiones basadas en datos.",
      features: [
        "Análisis de procesos y detección de cuellos de botella",
        "Roadmap digital y priorización",
        "Optimización de flujos de trabajo",
      ],
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: RocketLaunchIcon,
      title: "Soluciones Digitales",
      description:
        "Implementamos soluciones que automatizan y optimizan tu operación: integración de sistemas, cloud y herramientas que tu equipo puede usar desde el día uno.",
      features: [
        "Integración de sistemas y datos",
        "Cloud y despliegue seguro",
        "Automatización de tareas repetitivas",
      ],
      color: "from-emerald-500 to-emerald-600",
      delay: 0.6,
    },
  ];

  const successCases = [
    {
      client: "TRANSCOM",
      sector: "Logística / Transporte",
      problem: "Necesitaban control de operaciones y trazabilidad.",
      solution: "Sistemas de gestión, aplicaciones web y APIs.",
      result: "Operaciones más ordenadas y seguimiento en tiempo real.",
    },
    {
      client: "Geller Abogados",
      sector: "Despacho jurídico",
      problem: "Gestión documental y expedientes de forma manual.",
      solution: "Sistemas de gestión documental y automatización de procesos.",
      result: "Mejor organización y menos tiempo en tareas repetitivas.",
    },
    {
      client: "JOFRA",
      sector: "Empresa",
      problem: "Optimizar operaciones y digitalizar procesos.",
      solution: "Software empresarial, automatización e integraciones.",
      result: "Operaciones más eficientes y soporte continuo.",
    },
  ];

  const companyStartYear = 2024;
  const yearsExperience = new Date().getFullYear() - companyStartYear;

  const stats = [
    {
      number: String(yearsExperience),
      label: "Años de Experiencia",
      sublabel: "entregando software a medida",
      icon: TrendingUpIcon,
    },
    {
      number: "24/7",
      label: "Soporte Técnico",
      sublabel: "post-lanzamiento incluido",
      icon: ShieldIcon,
    },
  ];

  const whyUsBenefits = [
    {
      text: "Plazos y alcance definidos desde el inicio",
      icon: ScheduleIcon,
    },
    {
      text: "Código y arquitectura mantenibles a largo plazo",
      icon: CodeIcon,
    },
    {
      text: "Soporte técnico y comunicación en español",
      icon: SupportIcon,
    },
    {
      text: "Enfoque en seguridad y buenas prácticas",
      icon: SecurityIcon,
    },
    {
      text: "Escalabilidad cuando tu negocio crezca",
      icon: TrendingUpIcon,
    },
    {
      text: "Equipo estable y trato cercano",
      icon: GroupsIcon,
    },
  ];


  return (
    <div className="min-h-screen">
      <PageHead
        title="Desarrollo de Software a Medida en México"
        description="En INIT transformamos los procesos de tu empresa con aplicaciones web, sistemas empresariales y consultoría en digitalización. Estado de México. Logística, servicios y sector institucional."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "INIT",
            url: typeof window !== "undefined" ? window.location.origin : "",
            telephone: "+52 55 4761 7977",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ciudad López Mateos",
              addressRegion: "Estado de México",
              addressCountry: "MX",
            },
          })}
        </script>
      </Helmet>
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
              className="inline-flex items-center justify-center mb-8 rounded-3xl bg-white p-3 shadow-2xl"
            >
              <img src="/Init-Logo.svg" alt="INIT – Logo de la empresa" className="w-24 h-24 md:w-28 md:h-28 object-contain" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Desarrollo de Software a Medida para Empresas en{" "}
              <span className="gradient-text">México</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              En INIT transformamos los procesos de tu empresa con aplicaciones
              web, sistemas empresariales y consultoría en digitalización.
              Basados en Estado de México, trabajamos con empresas de logística,
              servicios y sector institucional.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
              >
                Solicitar una propuesta
                <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary text-lg px-8 py-4">
                Ver nuestros servicios
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
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
                {stat.sublabel && (
                  <div className="text-sm text-slate-500 mt-1">{stat.sublabel}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do / For whom */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Qué hacemos por las empresas
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Trabajamos con pymes, instituciones y empresas que necesitan
              soluciones digitales a medida: desde aplicaciones web y sistemas
              de gestión hasta consultoría en digitalización y APIs de alto
              rendimiento.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                Desarrollo de aplicaciones web y portales a medida
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                Sistemas empresariales (gestión, inventario, ventas, expedientes)
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                APIs e integraciones para conectar tus sistemas
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                Consultoría en digitalización y optimización de procesos
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                Proyectos en México y Estado de México
              </li>
            </ul>
            <Link
              to="/services"
              className="btn-primary inline-flex items-center group mt-8"
            >
              Ver todos nuestros servicios
              <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuestros servicios
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Soluciones integrales de desarrollo de software a medida y
              consultoría en digitalización para impulsar tu empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
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
                    <ServiceIcon className="h-10 w-10 text-white" />
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
              );
            })}
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
                Somos una empresa de desarrollo de software y consultoría en
                digitalización. Nuestro compromiso es transformar la forma en
                que las empresas trabajan, con soluciones digitales prácticas y
                un trato cercano.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nuestro equipo está compuesto por 4 cofundadores, una consultora
                senior y un becario, todos comprometidos con ofrecer soluciones
                de calidad y un enfoque personalizado para cada cliente.
              </p>
              <Link
                to="/team"
                className="btn-primary inline-flex items-center group"
              >
                Conocer a nuestro equipo
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
                      6
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

      {/* Success cases */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Casos de éxito
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Algunos resultados de nuestro trabajo con empresas e instituciones
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {successCases.map((item, index) => (
              <motion.div
                key={item.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
              >
                <div className="text-sm font-medium text-slate-500 mb-2">
                  {item.sector}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.client}
                </h3>
                <p className="text-slate-600 text-sm mb-2">
                  <span className="font-medium text-slate-700">Problema:</span>{" "}
                  {item.problem}
                </p>
                <p className="text-slate-600 text-sm mb-2">
                  <span className="font-medium text-slate-700">Solución:</span>{" "}
                  {item.solution}
                </p>
                <p className="text-slate-700 text-sm font-medium">
                  <span className="text-emerald-600">Resultado:</span>{" "}
                  {item.result}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/portfolio"
              className="btn-primary inline-flex items-center group"
            >
              Ver todos los proyectos y clientes
              <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Proyectos y clientes
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Hemos trabajado con CONFE, JOFRA, TRANSCOM y Geller Abogados, entre
              otros. Conoce el detalle de cada proyecto y lo que hemos entregado.
            </p>
            <Link
              to="/portfolio"
              className="btn-primary inline-flex items-center group"
            >
              Ver todos los proyectos y clientes
              <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why choose us */}
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
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Beneficios que importan a tu empresa: plazos claros, código
              mantenible y soporte en español
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsBenefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BenefitIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-slate-800">
                    {benefit.text}
                  </span>
                </motion.div>
              );
            })}
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
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="text-xl mb-10 text-slate-200 leading-relaxed">
              Cuéntanos tu proyecto o agenda una llamada. Te proponemos una
              solución a medida sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
              >
                Agenda una llamada
                <ArrowForwardIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-lg px-8 py-4"
              >
                Cuéntanos tu proyecto
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
