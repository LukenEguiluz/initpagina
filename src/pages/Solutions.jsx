import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { solutions } from "../data/solutionsData";
import { CheckCircle as CheckCircleIcon, Store as StoreIcon } from "@mui/icons-material";

const Solutions = () => {
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
              Soluciones listas
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Contrata nuestros productos ya terminados: soluciones probadas que puedes usar desde el primer día sin desarrollo a medida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="card-luxury overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {solution.initial}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        {solution.name}
                      </h2>
                      <p className="text-slate-600 font-medium mt-1">
                        {solution.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                    Incluye
                  </h3>
                  <ul className="space-y-2 mb-8">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-slate-700">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Contratar {solution.name}
                    <span className="ml-1">→</span>
                  </Link>
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
            <StoreIcon className="h-14 w-14 mx-auto mb-6 text-white/90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas algo a medida?
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Si tu proyecto requiere desarrollo personalizado, nuestros servicios de software y consultoría están para ti.
            </p>
            <Link
              to="/services"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
            >
              Ver servicios
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
