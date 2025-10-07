"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    location: "Los Angeles, CA",
    role: "Madre de familia",
    content: "Antes perdía $210 al año solo en comisiones. Ahora con Remesa 2.0 ahorro $180 y mi familia está protegida contra fraudes. La IA detectó un intento de estafa la semana pasada.",
    rating: 5,
    savings: "$180 ahorrados",
  },
  {
    name: "Carlos Rodríguez",
    location: "Phoenix, AZ",
    role: "Constructor",
    content: "El Guardian AI es increíble. Me avisó cuando mi hijo intentó retirar dinero a las 2am, algo que nunca hace. Resultó ser un intento de extorsión que bloqueamos.",
    rating: 5,
    savings: "Fraude bloqueado",
  },
  {
    name: "Ana Martínez",
    location: "Houston, TX",
    role: "Enfermera",
    content: "La bóveda familiar me da tranquilidad. Mi mamá puede bloquear retiros si sospecha algo raro. Es como tener un guardia 24/7 protegiendo nuestro dinero.",
    rating: 5,
    savings: "Familia protegida",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Historias reales de{" "}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              familias protegidas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 10,000 familias ya confían en Remesa 2.0 para proteger su dinero
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-12 h-12 text-primary-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Savings Badge */}
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{testimonial.savings}</span>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">Familias protegidas</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">$2.1M</div>
              <div className="text-primary-100">Ahorrado en comisiones</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-primary-100">Fraudes bloqueados</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-primary-100">Rating promedio</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
