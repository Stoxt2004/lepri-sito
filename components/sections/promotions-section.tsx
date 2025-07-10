'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GiftIcon, SparklesIcon, ClockIcon, TagIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const promotions = [
  {
    id: 'welcome',
    title: 'Benvenuta in Famiglia',
    subtitle: 'Offerta Primo Appuntamento',
    description: 'Sconto del 20% su tutti i servizi per le nuove clienti. Un modo speciale per iniziare il tuo percorso di bellezza con noi.',
    discount: '20%',
    originalPrice: '€85',
    discountedPrice: '€68',
    validUntil: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badge: 'Nuove Clienti',
    color: 'from-pink-500 to-rose-500',
    features: ['Consulenza gratuita', 'Analisi del capello', 'Styling incluso']
  },
  {
    id: 'spa-package',
    title: 'Pacchetto Relax Completo',
    subtitle: 'Hair Spa + Trattamento',
    description: 'Combinazione perfetta di bellezza e benessere. Include hair spa, trattamento riparatore e styling finale.',
    discount: '30%',
    originalPrice: '€120',
    discountedPrice: '€84',
    validUntil: '2024-11-30',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badge: 'Più Richiesto',
    color: 'from-emerald-500 to-teal-500',
    features: ['Hair Spa 60min', 'Trattamento riparatore', 'Maschera nutriente', 'Styling professionale']
  },
  {
    id: 'friends',
    title: 'Porta un\'Amica',
    subtitle: 'Sconto per Entrambe',
    description: 'Condividi la bellezza! Quando porti un\'amica, entrambe ricevete uno sconto speciale sui vostri trattamenti.',
    discount: '15%',
    originalPrice: '€90',
    discountedPrice: '€76.50',
    validUntil: '2024-12-15',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badge: 'Limitata',
    color: 'from-purple-500 to-indigo-500',
    features: ['Sconto per entrambe', 'Aperitivo offerto', 'Foto ricordo']
  }
]

const seasonalOffer = {
  title: 'Black Friday Beauty',
  subtitle: 'Solo per 3 Giorni!',
  description: 'La promozione più attesa dell\'anno è qui. Sconti fino al 40% su tutti i servizi premium.',
  discount: '40%',
  endDate: '2024-11-29T23:59:59',
  image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function PromotionsSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [selectedPromo, setSelectedPromo] = useState(promotions[0])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(seasonalOffer.endDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="promozioni" className="py-20 lg:py-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6">
            Offerte Speciali
          </h2>
          <p className="body-text max-w-3xl mx-auto">
            Approfitta delle nostre promozioni esclusive per vivere un\'esperienza di bellezza 
            unica a prezzi vantaggiosi.
          </p>
        </motion.div>

        {/* Seasonal Offer - Black Friday */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          <Image
            src={seasonalOffer.image}
            alt={seasonalOffer.title}
            width={1200}
            height={400}
            className="w-full h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  {seasonalOffer.subtitle}
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold mb-4">
                  {seasonalOffer.title}
                </h3>
                <p className="text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                  {seasonalOffer.description}
                </p>
                
                {/* Countdown Timer */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                        <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                        <div className="text-xs uppercase tracking-wide">
                          {unit === 'days' ? 'Giorni' : 
                           unit === 'hours' ? 'Ore' :
                           unit === 'minutes' ? 'Min' : 'Sec'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    const element = document.querySelector('#prenota')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <GiftIcon className="h-5 w-5 mr-2" />
                  Approfitta Subito - {seasonalOffer.discount} OFF
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Regular Promotions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Promotions List */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                onClick={() => setSelectedPromo(promo)}
                className={cn(
                  'card-neu p-6 cursor-pointer transition-all duration-300 hover:shadow-xl',
                  selectedPromo.id === promo.id
                    ? 'ring-2 ring-primary-500 shadow-lg rounded-2xl'
                    : 'hover:shadow-lg rounded-lg'
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                    <div className={cn(
                      'absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold text-white',
                      'bg-gradient-to-r', promo.color
                    )}>
                      -{promo.discount}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                        {promo.badge}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200 mb-1">
                      {promo.title}
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                      {promo.subtitle}
                    </p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-green-600">
                        {promo.discountedPrice}
                      </span>
                      <span className="text-sm text-neutral-500 line-through">
                        {promo.originalPrice}
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {promo.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Selected Promotion Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="lg:sticky lg:top-8"
          >
            <div className="card-neu p-8 overflow-hidden relative">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <SparklesIcon className="w-full h-full" />
              </div>
              
              <motion.div
                key={selectedPromo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Promo Image */}
                <div className="relative mb-6">
                  <Image
                    src={selectedPromo.image}
                    alt={selectedPromo.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className={cn(
                    'absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold text-lg',
                    'bg-gradient-to-r', selectedPromo.color
                  )}>
                    -{selectedPromo.discount}
                  </div>
                </div>

                {/* Promo Details */}
                <div className="mb-6">
                  <h3 className="heading-tertiary mb-2">
                    {selectedPromo.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-4">
                    {selectedPromo.subtitle}
                  </p>
                  <p className="body-text mb-6">
                    {selectedPromo.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-3xl font-bold text-green-600">
                    {selectedPromo.discountedPrice}
                  </div>
                  <div className="text-xl text-neutral-500 line-through">
                    {selectedPromo.originalPrice}
                  </div>
                  <div className={cn(
                    'px-3 py-1 rounded-full text-white font-semibold',
                    'bg-gradient-to-r', selectedPromo.color
                  )}>
                    Risparmi {selectedPromo.discount}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                    Cosa Include:
                  </h4>
                  <ul className="space-y-2">
                    {selectedPromo.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Validity */}
                <div className="flex items-center text-sm text-neutral-500 mb-6">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Valida fino al {new Date(selectedPromo.validUntil).toLocaleDateString('it-IT')}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className={cn(
                      'w-full text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300',
                      'bg-gradient-to-r', selectedPromo.color
                    )}
                    onClick={() => {
                      const element = document.querySelector('#prenota')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <GiftIcon className="h-5 w-5 mr-2" />
                    Prenota Questa Offerta
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      const whatsappMessage = `Ciao! Sono interessata all'offerta "${selectedPromo.title}" con sconto del ${selectedPromo.discount}. Potreste darmi maggiori informazioni?`
                      window.open(`https://wa.me/393123456789?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
                    }}
                  >
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Chiedi Info su WhatsApp
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-neutral-900 dark:bg-neutral-950 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <TagIcon className="h-12 w-12 text-primary-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Non Perdere le Nostre Offerte!
              </h3>
              <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
                Iscriviti alla nostra newsletter per ricevere in anteprima tutte le promozioni 
                e gli sconti esclusivi riservati alle nostre clienti più affezionate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                <input
                  type="email"
                  placeholder="La tua email"
                  className="flex-1 h-12 px-6 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 transition-all"
                />
                <Button
                  className="h-12 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-8 rounded-lg font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Iscriviti Gratis
                </Button>
              </div>
              <p className="text-sm text-neutral-400">
                Niente spam, solo bellezza. Cancellazione facile in qualsiasi momento.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}