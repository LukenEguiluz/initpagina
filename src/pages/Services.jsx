import React from "react";
import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import {
  Code as CodeIcon,
  Computer as ComputerIcon,
  RocketLaunch as RocketLaunchIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const Services = () => {
  const services = [
    {
      icon: CodeIcon,
      title: "Desarrollo de Software",
      intro:
        "Ideal para empresas que necesitan un sistema a medida porque sus herramientas genéricas (Excel, formularios web) ya no pueden cubrir sus necesidades.",
      description:
        "Creamos aplicaciones web y móviles personalizadas que se adaptan a tu negocio: desde portales corporativos hasta sistemas de gestión y APIs escalables.",
      features: [
        "Aplicaciones web y portales a medida",
        "Sistemas empresariales (inventario, ventas, expedientes)",
        "APIs de alto rendimiento e integraciones",
        "Mantenimiento y soporte continuo",
      ],
      color: "from-blue-500 to-blue-600",
      delay: 0.2,
    },
    {
      icon: ComputerIcon,
      title: "Consultoría en Digitalización",
      intro:
        "Para directivos que saben que su empresa necesita digitalizarse pero no saben por dónde empezar.",
      description:
        "Te ayudamos con análisis de procesos, roadmap y priorización de proyectos para más eficiencia y decisiones basadas en datos.",
      features: [
        "Análisis de procesos actuales y cuellos de botella",
        "Estrategia de transformación digital y roadmap",
        "Optimización de flujos de trabajo",
        "Seguimiento y mejora continua",
      ],
      color: "from-purple-500 to-purple-600",
      delay: 0.4,
    },
    {
      icon: RocketLaunchIcon,
      title: "Soluciones Digitales",
      intro:
        "Para operaciones que requieren automatización, trazabilidad o análisis de datos en tiempo real.",
      description:
        "Implementamos integración de sistemas, cloud y herramientas que tu equipo puede usar desde el día uno.",
      features: [
        "Automatización de procesos",
        "Integración de sistemas y datos",
        "Cloud computing y DevOps",
        "Análisis de datos y Business Intelligence",
      ],
      color: "from-emerald-500 to-emerald-600",
      delay: 0.6,
    },
  ];

  const technologyCategories = [
    {
      name: "Frontend",
      items: ["React", "Vue.js"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Python", "Django"],
    },
    {
      name: "Base de datos",
      items: ["PostgreSQL", "MongoDB"],
    },
    {
      name: "Cloud e infraestructura",
      items: ["AWS", "Docker", "Kubernetes"],
    },
    {
      name: "IA y analytics",
      items: ["TensorFlow", "Power BI", "Tableau"],
    },
  ];

  const process = [
    {
      step: 1,
      title: "Análisis y Planificación",
      description:
        "Entendemos tus necesidades y diseñamos la solución más adecuada.",
      timeframe: "1-2 semanas",
    },
    {
      step: 2,
      title: "Diseño y Prototipado",
      description: "Creamos prototipos y diseños que validan la funcionalidad.",
      timeframe: "1-3 semanas",
    },
    {
      step: 3,
      title: "Desarrollo e Implementación",
      description:
        "Construimos la solución con las mejores prácticas y tecnologías.",
      timeframe: "4-12+ semanas según alcance",
    },
    {
      step: 4,
      title: "Pruebas y Despliegue",
      description:
        "Realizamos pruebas exhaustivas y desplegamos en producción.",
      timeframe: "1-2 semanas",
    },
    {
      step: 5,
      title: "Soporte y Mantenimiento",
      description: "Proporcionamos soporte continuo y mejoras iterativas.",
      timeframe: "Continuo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PageHead
        title="Servicios de Desarrollo de Software y Consultoría Digital"
        description="Desarrollo de software a medida, consultoría en digitalización y soluciones digitales. Para empresas en México. Análisis, desarrollo, despliegue y soporte."
        path="/services"
      />
      {/* Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg mb-6">
              <img src="/Init-Logo.svg" alt="INIT – Logo" className="h-14 w-14 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales diseñadas para impulsar la
              transformación digital y el crecimiento sostenible de tu empresa
              con tecnologías de vanguardia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section — un solo bloque por servicio (sin duplicar en DOM) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl mb-6 shadow-lg`}
                    >
                      <ServiceIcon className="h-10 w-10 text-white" />
                    </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {service.intro}
                  </p>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <CheckCircleIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div
                      className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${service.color} rounded-2xl shadow-lg`}
                      aria-hidden="true"
                    >
                      <ServiceIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
              Tecnologías que Utilizamos
            </h2>
            <p className="text-xl text-slate-600">
              Trabajamos con las tecnologías más modernas y confiables del
              mercado
            </p>
          </motion.div>

          <div className="flex flex-col items-center space-y-8">
            {technologyCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="card-luxury px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-slate-600">
              Metodología probada que garantiza resultados excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600">{step.description}</p>
                {step.timeframe && (
                  <p className="text-xs text-slate-500 mt-1">{step.timeframe}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué Elegirnos?
            </h2>
            <p className="text-xl text-slate-200">
              Ventajas que nos distinguen y garantizan resultados excepcionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: SpeedIcon,
                title: "Rapidez",
                description:
                  "Entregamos proyectos en tiempo récord sin comprometer la calidad.",
              },
              {
                icon: SecurityIcon,
                title: "Seguridad",
                description:
                  "Implementamos las mejores prácticas de seguridad en todos nuestros proyectos.",
              },
              {
                icon: SupportIcon,
                title: "Soporte 24/7",
                description:
                  "Estamos disponibles para resolver cualquier problema que pueda surgir.",
              },
              {
                icon: TrendingUpIcon,
                title: "Resultados",
                description:
                  "Nos enfocamos en generar valor real y medible para tu negocio.",
              },
            ].map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
                    <BenefitIcon sx={{ fontSize: 32 }} htmlColor="#ffffff" />
                  </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-slate-200 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
