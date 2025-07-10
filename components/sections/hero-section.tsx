'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Salone elegante Lepri Hair Spa'
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Trattamento capelli professionale'
  },
  {
    src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Ambiente rilassante spa'
  }
]

export function HeroSection() {

  const scrollToServices = () => {
    const element = document.querySelector('#servizi')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mobile: Full image background with dark overlay */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={heroImages[0].src}
          alt={heroImages[0].alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for mobile */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Desktop: Split background - Left: solid color, Right: image */}
      <div className="absolute inset-0 hidden md:block">
        {/* Left half - Darker solid color background */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-neutral-900 via-secondary-800 to-primary-800" />
        
        {/* Right half - Single static image background */}
        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <Image
            src={heroImages[0].src}
            alt={heroImages[0].alt}
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-neutral-900/50" />
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute top-20 left-10 text-primary-400"
      >
        <SparklesIcon className="h-8 w-8" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-32 left-20 text-primary-400"
      >
        <HeartIcon className="h-6 w-6" />
      </motion.div>

      {/* Content - Mobile: centered, Desktop: positioned on the left side */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center md:text-left max-w-lg w-full"
          >
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
            >
              <span className="block bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
                Benvenuta nel
              </span>
              <span className="block bg-gradient-to-r from-primary-300 to-white bg-clip-text text-transparent">
                tuo momento
              </span>
            </motion.h1>

            {/* Subtitle with key words */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-2"
            >
              <div className="flex flex-wrap gap-4 text-2xl md:text-3xl font-elegant font-semibold text-white/90">
                <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">Benessere</span>
                <span className="text-white/60">•</span>
                <span className="bg-gradient-to-r from-secondary-300 to-primary-300 bg-clip-text text-transparent">Stile</span>
                <span className="text-white/60">•</span>
                <span className="bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">Te stessa</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed"
            >
              Ritagliati un momento solo per te con l'esperienza Lepri Hair Spa. 
              Dove ogni dettaglio è pensato per il tuo benessere e la tua bellezza.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full"
            >
              <Button
                variant="gold"
                size="lg"
                className="text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 w-full sm:w-auto"
                onClick={() => {
                  const element = document.querySelector('#prenota')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Prenota Ora
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="glass text-white hover:bg-white/20 w-full sm:w-auto"
                onClick={scrollToServices}
              >
                Scopri i Servizi
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex flex-col gap-3 pt-6 text-white/80 text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 w-2 bg-primary-400 rounded-full" />
                  ))}
                </div>
                <span>5.0 stelle</span>
              </div>
              <div className="text-white/70">
                <div>500+ clienti soddisfatte</div>
                <div>15+ anni di esperienza</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>




    </section>
  )
}