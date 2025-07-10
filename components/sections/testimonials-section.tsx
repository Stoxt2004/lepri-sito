'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'
import { HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Martina F.',
    location: 'Milano',
    rating: 5,
    text: 'Mai sentita così coccolata — un\'esperienza al top, super consigliato! Sara ha trasformato completamente il mio look e mi ha fatto sentire una regina.',
    service: 'Taglio & Colore',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    date: '2 settimane fa',
    verified: true
  },
  {
    id: 2,
    name: 'Elena R.',
    location: 'Milano',
    rating: 5,
    text: 'Servizio impeccabile e ambiente rilassante: tornerò sicuramente. Marco è un vero artista del colore, ha creato esattamente quello che avevo in mente.',
    service: 'Balayage',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    date: '1 mese fa',
    verified: true
  },
  {
    id: 3,
    name: 'Giulia M.',
    location: 'Monza',
    rating: 5,
    text: 'Professionalità e cura del dettaglio eccezionali. Il trattamento spa è stato un momento di puro relax. Consigliatissimo a tutte!',
    service: 'Spa Capillare',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    date: '3 settimane fa',
    verified: true
  },
  {
    id: 4,
    name: 'Francesca L.',
    location: 'Milano',
    rating: 5,
    text: 'Finalmente ho trovato il mio parrucchiere di fiducia! Atmosfera accogliente, personale preparato e risultati sempre perfetti.',
    service: 'Taglio & Style',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    date: '1 settimana fa',
    verified: true
  },
  {
    id: 5,
    name: 'Chiara B.',
    location: 'Bergamo',
    rating: 5,
    text: 'Un\'esperienza che va oltre le aspettative. Ogni volta esco dal salone sentendomi rinnovata e piena di energia. Grazie team Lepri!',
    service: 'Trattamento Completo',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    date: '2 giorni fa',
    verified: true
  }
]

const stats = [
  {
    number: '500+',
    label: 'Clienti Soddisfatte',
    icon: HeartIcon,
    color: 'text-red-500'
  },
  {
    number: '5.0',
    label: 'Rating Medio',
    icon: StarIcon,
    color: 'text-yellow-500'
  },
  {
    number: '15+',
    label: 'Anni di Esperienza',
    icon: UserGroupIcon,
    color: 'text-primary-500'
  }
]

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    likes: 234,
    caption: 'Trasformazione del giorno ✨'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    likes: 189,
    caption: 'Momento relax al nostro spa 🌿'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    likes: 156,
    caption: 'Nuovo taglio, nuova energia 💫'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    likes: 298,
    caption: 'Balayage perfetto per l\'autunno 🍂'
  }
]

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!autoPlay) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoPlay])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const currentReview = testimonials[currentTestimonial]

  return (
    <section id="testimonianze" className="py-20 lg:py-32 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6 text-white">
            Cosa Dicono di Noi
          </h2>
          <p className="body-text max-w-3xl mx-auto text-neutral-300">
            La soddisfazione delle nostre clienti è la nostra priorità. 
            Leggi le esperienze di chi ha già scelto Lepri Hair Spa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Testimonials Carousel */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="card-warm p-8 lg:p-10 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <ChatBubbleLeftEllipsisIcon className="h-16 w-16 text-primary-500" />
              </div>
              
              {/* Current Testimonial */}
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                  ))}
                  <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {currentReview.rating}.0
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                  "{currentReview.text}"
                </blockquote>

                {/* Reviewer Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={currentReview.image}
                      alt={currentReview.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    {currentReview.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {currentReview.name}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {currentReview.location} • {currentReview.service}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                      {currentReview.date}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="focus-ring"
                  aria-label="Recensione precedente"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </Button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTestimonial(index)
                        setAutoPlay(false)
                      }}
                      className={`h-2 w-8 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-primary-500'
                          : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300'
                      }`}
                      aria-label={`Vai alla recensione ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="focus-ring"
                  aria-label="Recensione successiva"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                  className="card-warm p-6 text-center"
                >
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Instagram Feed */}
            <div className="card-warm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Seguici su Instagram
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-600 hover:text-primary-700"
                  onClick={() => window.open('https://instagram.com/leprihairspa', '_blank')}
                >
                  @leprihairspa
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {instagramPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => window.open('https://instagram.com/leprihairspa', '_blank')}
                  >
                    <Image
                      src={post.image}
                      alt={post.caption}
                      width={150}
                      height={150}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                      <HeartIcon className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button
                variant="neu-primary"
                className="w-full mt-4"
                onClick={() => window.open('https://instagram.com/leprihairspa', '_blank')}
              >
                Vedi Altri Post
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Vuoi essere la prossima recensione a 5 stelle?
              </h3>
              <p className="text-neutral-200 mb-6">
                Unisciti alle centinaia di clienti soddisfatte che hanno scelto Lepri Hair Spa 
                per la loro bellezza e benessere.
              </p>
            <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#prenota')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <StarIcon className="h-5 w-5 mr-2" />
                Prenota la Tua Esperienza
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}