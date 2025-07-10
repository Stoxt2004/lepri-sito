'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScissorsIcon, PaintBrushIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const services = [
  {
    id: 'taglio-style',
    title: 'Taglio & Style',
    description: 'Dai forma al tuo look con tagli di precisione e styling su misura. Ogni taglio è studiato per valorizzare i tuoi lineamenti e il tuo stile personale.',
    icon: ScissorsIcon,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    features: [
      'Consulenza personalizzata',
      'Tagli di tendenza',
      'Styling professionale',
      'Prodotti premium'
    ],
    price: 'Da €45'
  },
  {
    id: 'colori-trattamenti',
    title: 'Colori & Trattamenti',
    description: 'Dalle meches a nuance complete, valorizziamo ogni capello con colori brillanti e trattamenti rigeneranti per una chioma sempre perfetta.',
    icon: PaintBrushIcon,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    features: [
      'Colorazioni naturali',
      'Meches e balayage',
      'Trattamenti ricostruttivi',
      'Tecniche innovative'
    ],
    price: 'Da €65'
  },
  {
    id: 'spa-capillare',
    title: 'Spa Capillare & Benessere',
    description: 'Rigenerazione intensa, relax e nutrimento profondo. Un\'esperienza sensoriale completa per il benessere dei tuoi capelli e della tua mente.',
    icon: SparklesIcon,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    features: [
      'Massaggio rilassante',
      'Trattamenti nutrienti',
      'Aromaterapia',
      'Ambiente zen'
    ],
    price: 'Da €80'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servizi" className="py-20 lg:py-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6">
            I Nostri Servizi
          </h2>
          <p className="body-text max-w-3xl mx-auto">
            Ogni servizio è pensato per offrirti un'esperienza unica, 
            combinando tecniche all'avanguardia con un approccio personalizzato 
            per esaltare la tua bellezza naturale.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {services.map((service, index) => {
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="card-warm h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl">
                  {/* Service Image */}
                  <div className="relative h-52 overflow-hidden rounded-t-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 rounded-t-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-4 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-2xl backdrop-blur-sm border border-white/20"
                      >
                        <service.icon className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Price Tag */}
                    <div className="absolute bottom-6 left-6">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 backdrop-blur-md rounded-2xl text-sm font-bold text-white shadow-xl border border-white/30"
                      >
                        {service.price}
                      </motion.span>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mr-3" />
                      <h3 className="heading-tertiary text-xl font-bold">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="body-text mb-8 flex-1 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Enhanced Features */}
                    <div className="mb-8">
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.8 + (index * 0.2) + (featureIndex * 0.1)
                            }}
                            className="flex items-center space-x-2 p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700"
                          >
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-sm" />
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced CTA Button */}
                    <Button
                      variant="gold"
                      className="w-full group/btn hover:shadow-xl transform hover:scale-105 text-white font-semibold py-3 rounded-xl"
                      onClick={() => {
                        const element = document.querySelector('#prenota')
                        if (element) element.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      <span>Scopri di più</span>
                      <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="heading-tertiary mb-4">
                  Non sai quale servizio scegliere?
                </h3>
                <p className="body-text">
                  I nostri esperti sono qui per consigliarti il trattamento perfetto 
                  per le tue esigenze. Prenota una consulenza gratuita!
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="gold"
                  size="lg"
                  className="text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => {
                    const element = document.querySelector('#contatti')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Consulenza Gratuita
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}