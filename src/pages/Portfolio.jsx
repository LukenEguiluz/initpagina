import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHead from "../components/PageHead";
import { portfolioClients } from "../data/portfolioData";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PageHead
        title="Proyectos y Clientes: Casos de Éxito"
        description="Clientes de INIT: CONFE, JOFRA, TRANSCOM, Geller Abogados. Desarrollo de software a medida, consultoría y soluciones digitales en México."
        path="/portfolio"
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
              Proyectos y Clientes
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Empresas e instituciones con las que hemos trabajado. Aquí desglosamos lo que hemos realizado en cada proyecto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client cards */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {portfolioClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-luxury overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                    <div className="flex-shrink-0 mb-6 md:mb-0">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-3xl font-bold text-white">
                          {client.initial}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                          {client.name}
                        </h2>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {client.sectorDetail || client.sector}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {client.summary}
                      </p>
                      {client.stack && (
                        <p className="text-sm text-slate-500 mb-2">
                          <span className="font-semibold text-slate-700">Stack:</span> {client.stack}
                        </p>
                      )}
                      {client.result && (
                        <p className="text-sm text-emerald-700 mb-4">
                          <span className="font-semibold">Resultado:</span> {client.result}
                        </p>
                      )}
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                        Lo que hemos realizado
                      </h3>
                      <ul className="space-y-2">
                        {client.deliverables.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-slate-700"
                          >
                            <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Quieres ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Cuéntanos tu proyecto y te proponemos una solución a medida.
            </p>
            <Link
              to="/contact"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Contáctanos
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
