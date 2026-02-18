import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot: los bots lo rellenan, los usuarios no lo ven
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-bot: si el honeypot tiene valor, es un bot → no enviar
    if (formData.website.trim() !== "") {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: EmailIcon,
      title: "Email",
      value: "support@init.com.mx",
      link: "mailto:support@init.com.mx",
    },
    {
      icon: PhoneIcon,
      title: "Teléfono",
      value: "55 4761 7977",
      link: "tel:+525547617977",
    },
    {
      icon: LocationIcon,
      title: "Oficina",
      value: "Ciudad de México, México",
      link: "#",
    },
    {
      icon: ScheduleIcon,
      title: "Horario",
      value: "7:00 - 22:00",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo toma desarrollar una aplicación web?",
      answer:
        "El tiempo de desarrollo varía según la complejidad del proyecto. Una aplicación web básica puede tomar 4-8 semanas, mientras que proyectos más complejos pueden requerir 3-6 meses.",
    },
    {
      question: "¿Ofrecen mantenimiento después del lanzamiento?",
      answer:
        "Sí, ofrecemos servicios de mantenimiento y soporte continuo para asegurar que tu aplicación funcione de manera óptima y se mantenga actualizada.",
    },
    {
      question: "¿Trabajan con empresas de cualquier tamaño?",
      answer:
        "Absolutamente. Trabajamos con startups, pequeñas empresas y grandes corporaciones. Adaptamos nuestras soluciones a las necesidades específicas de cada cliente.",
    },
    {
      question: "¿Qué tecnologías utilizan para el desarrollo?",
      answer:
        "Utilizamos las tecnologías más modernas y confiables, incluyendo React, Node.js, Python, Django, y servicios cloud como AWS y Azure.",
    },
  ];

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
            <div className="inline-flex items-center justify-center rounded-2xl bg-white p-2 shadow-lg mb-6">
              <img src="/logoinit.jpg" alt="INIT" className="h-14 w-14 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo
              realidad. Contáctanos y conversemos sobre cómo podemos transformar
              tu visión en una solución digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {info.title}
                      </h3>
                      <a
                        href={info.link}
                        className="text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  ¿Por qué elegirnos?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Experiencia comprobada en proyectos complejos",
                    "Equipo de expertos certificados",
                    "Soporte técnico 24/7",
                    "Metodologías ágiles probadas",
                    "Resultados medibles y garantizados",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-luxury p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Envíanos un Mensaje
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    ¡Mensaje enviado exitosamente! Nos pondremos en contacto
                    contigo pronto.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Cuéntanos más sobre tu proyecto..."
                    />
                  </div>

                  {/* Honeypot: oculto para usuarios; los bots lo rellenan y bloqueamos el envío */}
                  <div
                    className="absolute -left-[9999px] h-0 overflow-hidden opacity-0 pointer-events-none"
                    aria-hidden="true"
                  >
                    <label htmlFor="website">No completar</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <SendIcon className="h-5 w-5 mr-2" />
                        Enviar Mensaje
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-slate-600">
              Resolvemos las dudas más comunes sobre nuestros servicios
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Empezar tu Proyecto?
            </h2>
            <p className="text-xl mb-10 text-slate-200 leading-relaxed">
              No esperes más. Contáctanos hoy mismo y descubre cómo podemos
              transformar tu visión en una realidad digital con soluciones de
              clase mundial.
            </p>
            <a
              href="mailto:support@init.com.mx"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center group"
            >
              <EmailIcon className="h-5 w-5 mr-2" />
              Enviar Email
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
