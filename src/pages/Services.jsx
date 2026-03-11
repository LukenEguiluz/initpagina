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
} from "@mui/icons-material";

const Services = () => {
  const services = [
    {
      icon: CodeIcon,
      image: "/servicios/desarrollo-software-a-medida.png",
      title: "Desarrollo de Software a Medida",
      intro:
        "Para empresas que han crecido más allá de Excel, procesos manuales o sistemas limitados.",
      description:
        "Diseñamos y desarrollamos aplicaciones web y móviles adaptadas completamente a tu operación, permitiendo automatizar procesos, centralizar información y escalar sin fricción.",
      featuresLabel: "Lo que desarrollamos:",
      features: [
        "Aplicaciones web empresariales",
        "Portales corporativos y plataformas internas",
        "Sistemas de gestión (inventarios, expedientes, ventas, operaciones)",
        "Integración con APIs y servicios externos",
        "Aplicaciones móviles empresariales",
        "Plataformas SaaS escalables",
      ],
      result: "Procesos automatizados, menos errores operativos y mayor control del negocio.",
      color: "from-init-green to-init-green-bright",
      delay: 0.2,
    },
    {
      icon: ComputerIcon,
      image: "/servicios/consultoria-transformacion-digital.png",
      title: "Consultoría en Transformación Digital",
      intro:
        "Muchas empresas saben que necesitan digitalizarse, pero no tienen claridad sobre por dónde empezar.",
      description:
        "En INIT analizamos tu operación y diseñamos un plan tecnológico claro y ejecutable.",
      featuresLabel: "Incluye:",
      features: [
        "Diagnóstico de procesos actuales",
        "Identificación de cuellos de botella",
        "Diseño de arquitectura tecnológica",
        "Roadmap de transformación digital",
        "Prioridad de proyectos con impacto real",
      ],
      result: "Una estrategia tecnológica alineada con el crecimiento del negocio.",
      color: "from-init-dark to-init-green",
      delay: 0.4,
    },
    {
      icon: RocketLaunchIcon,
      image: "/servicios/soluciones-tecnologicas-integracion.png",
      title: "Soluciones Tecnológicas e Integración de Sistemas",
      intro:
        "Para empresas que necesitan automatizar operaciones, conectar sistemas o trabajar con datos en tiempo real.",
      description:
        "Implementamos plataformas tecnológicas robustas que integran información y procesos en un solo ecosistema digital.",
      featuresLabel: "Soluciones que implementamos:",
      features: [
        "Automatización de procesos operativos",
        "Integración entre sistemas y bases de datos",
        "Infraestructura cloud escalable",
        "Dashboards y Business Intelligence",
        "Plataformas de análisis de datos",
        "Sistemas con inteligencia artificial",
      ],
      result: "Mayor eficiencia operativa y decisiones basadas en información confiable.",
      color: "from-init-green to-init-green-bright",
      delay: 0.6,
    },
  ];

  const technologyCategories = [
    { name: "Frontend", items: ["React", "Vue.js"] },
    { name: "Backend", items: ["Node.js", "Python", "Django"] },
    { name: "Bases de datos", items: ["PostgreSQL", "MongoDB"] },
    { name: "Infraestructura", items: ["AWS", "Docker", "Kubernetes"] },
    { name: "IA y análisis de datos", items: ["TensorFlow", "Power BI", "Tableau"] },
  ];

  const process = [
    {
      step: 1,
      title: "Análisis y Planificación",
      description: "Analizamos tu negocio y definimos la arquitectura de la solución.",
      timeframe: "1–2 semanas",
    },
    {
      step: 2,
      title: "Diseño y Prototipado",
      description: "Creamos prototipos funcionales para validar la solución antes del desarrollo.",
      timeframe: "1–3 semanas",
    },
    {
      step: 3,
      title: "Desarrollo e Implementación",
      description: "Construimos el sistema utilizando tecnologías escalables y buenas prácticas.",
      timeframe: "4–12 semanas (según alcance)",
    },
    {
      step: 4,
      title: "Pruebas y Despliegue",
      description: "Realizamos pruebas técnicas y funcionales antes de lanzar la solución.",
      timeframe: "1–2 semanas",
    },
    {
      step: 5,
      title: "Soporte y Mejora Continua",
      description: "Monitoreamos, optimizamos y evolucionamos el sistema con el tiempo.",
      timeframe: "Continuo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-init-light to-white">
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              En <strong>INIT</strong> diseñamos y desarrollamos soluciones tecnológicas que ayudan a empresas a{" "}
              <strong>automatizar procesos, escalar operaciones y tomar decisiones basadas en datos</strong>.
              Trabajamos desde la estrategia hasta la implementación completa de software y plataformas digitales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section — imagen + contenido por servicio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const isImageRight = index % 2 === 1;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isImageRight ? "lg:grid-flow-dense" : ""}`}
                >
                  <div className={isImageRight ? "lg:col-start-2" : ""}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 aspect-[4/3] bg-init-dark">
                      <img
                        src={service.image}
                        alt={`Entorno de trabajo y tecnología para ${service.title}, INIT`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-init-black/40 via-transparent to-transparent pointer-events-none" aria-hidden />
                    </div>
                  </div>
                  <div className={isImageRight ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl mb-5 shadow-lg`}
                    >
                      <ServiceIcon className="h-7 w-7 text-white" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                      {service.intro}
                    </p>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    {service.featuresLabel && (
                      <p className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">
                        {service.featuresLabel}
                      </p>
                    )}
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-init-green rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircleIcon className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {service.result && (
                      <p className="text-init-green font-semibold border-l-2 border-init-green pl-4 py-1">
                        <span className="text-slate-800">Resultado: </span>
                        {service.result}
                      </p>
                    )}
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
              Trabajamos con tecnologías modernas y robustas utilizadas por empresas globales.
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
              Aplicamos una metodología estructurada que reduce riesgos y garantiza resultados.
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
                  <div className="w-16 h-16 bg-gradient-to-br from-init-green to-init-green-bright rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-init-green/30 to-init-green-bright/30 transform translate-x-4"></div>
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

      {/* Industries */}
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
              Industrias en las que somos expertos
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Trabajamos con empresas de distintos sectores que buscan automatizar, escalar y tomar mejores decisiones.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {["Salud", "Logística", "Manufactura", "Retail", "Gobierno"].map((industry) => (
              <span
                key={industry}
                className="px-6 py-3 bg-init-light text-init-dark font-semibold rounded-xl border border-init-gray/30"
              >
                {industry}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why work with INIT */}
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
              ¿Por qué trabajar con INIT?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: SpeedIcon,
                title: "Velocidad de ejecución",
                description:
                  "Desarrollamos soluciones tecnológicas en tiempos significativamente menores que agencias tradicionales.",
              },
              {
                icon: SecurityIcon,
                title: "Seguridad y arquitectura sólida",
                description:
                  "Implementamos estándares de seguridad y escalabilidad desde el inicio.",
              },
              {
                icon: SupportIcon,
                title: "Soporte permanente",
                description:
                  "Acompañamos a nuestros clientes durante toda la vida del sistema.",
              },
              {
                icon: TrendingUpIcon,
                title: "Impacto real en el negocio",
                description:
                  "Nuestro enfoque no es solo tecnológico: desarrollamos soluciones que generan eficiencia, ahorro y crecimiento.",
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
