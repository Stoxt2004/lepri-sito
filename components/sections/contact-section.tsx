'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const contactInfo = {
  address: {
    street: 'Via della Bellezza, 123',
    city: '20121 Milano (MI)',
    full: 'Via della Bellezza, 123, 20121 Milano (MI)'
  },
  phone: '+39 02 1234 5678',
  email: 'info@leprihairspa.com',
  whatsapp: '+39 312 345 6789',
  social: {
    instagram: '@leprihairspa',
    facebook: 'Lepri Hair Spa Milano'
  }
}

const openingHours = [
  { day: 'Lunedì', hours: 'Chiuso', closed: true },
  { day: 'Martedì', hours: '09:00 - 19:00', closed: false },
  { day: 'Mercoledì', hours: '09:00 - 19:00', closed: false },
  { day: 'Giovedì', hours: '09:00 - 20:00', closed: false },
  { day: 'Venerdì', hours: '09:00 - 20:00', closed: false },
  { day: 'Sabato', hours: '08:30 - 18:00', closed: false },
  { day: 'Domenica', hours: '10:00 - 17:00', closed: false }
]

const transportInfo = [
  {
    type: 'Metro',
    line: 'M1 (Rossa)',
    station: 'Duomo',
    distance: '5 min a piedi',
    icon: '🚇'
  },
  {
    type: 'Tram',
    line: 'Linea 1, 2',
    station: 'Scala',
    distance: '3 min a piedi',
    icon: '🚋'
  },
  {
    type: 'Bus',
    line: '61, 94',
    station: 'Via Manzoni',
    distance: '2 min a piedi',
    icon: '🚌'
  },
  {
    type: 'Parcheggio',
    line: 'Garage Manzoni',
    station: 'Via Manzoni, 10',
    distance: '1 min a piedi',
    icon: '🅿️'
  }
]

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Il nome è obbligatorio'
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida'
    }
    if (!formData.subject.trim()) newErrors.subject = 'L\'oggetto è obbligatorio'
    if (!formData.message.trim()) newErrors.message = 'Il messaggio è obbligatorio'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData(initialFormData)
      setIsSubmitted(false)
    }, 3000)
  }

  const getCurrentDay = () => {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    return days[new Date().getDay()]
  }

  const currentDay = getCurrentDay()
  const todayHours = openingHours.find(h => h.day === currentDay)

  return (
    <section id="contatti" className="py-20 lg:py-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6">
            Contattaci
          </h2>
          <p className="body-text max-w-3xl mx-auto">
            Siamo qui per rispondere a tutte le tue domande e aiutarti a scegliere 
            il trattamento perfetto per te. Vieni a trovarci o contattaci!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Salon Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Lepri Hair Spa - Interno del salone"
                width={600}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">Lepri Hair Spa</h3>
                <p className="text-sm opacity-90">Il tuo rifugio di bellezza nel cuore di Milano</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="card-neu p-6 space-y-6">
              <h3 className="heading-tertiary mb-6">Informazioni di Contatto</h3>
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Indirizzo
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-0 h-auto text-primary-600 hover:text-primary-700"
                    onClick={() => {
                      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address.full)}`
                      window.open(mapsUrl, '_blank')
                    }}
                  >
                    Apri in Google Maps →
                  </Button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Telefono
                  </h4>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    Chiamaci per prenotazioni e informazioni
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    Scrivici per domande e richieste speciali
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    WhatsApp
                  </h4>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
                  >
                    {contactInfo.whatsapp}
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    Messaggiaci per risposte immediate
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="card-neu p-6">
              <h3 className="heading-tertiary mb-6 flex items-center">
                <ClockIcon className="h-6 w-6 mr-2 text-primary-500" />
                Orari di Apertura
              </h3>
              
              {/* Current Status */}
              <div className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4',
                todayHours?.closed
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              )}>
                <div className={cn(
                  'w-2 h-2 rounded-full mr-2',
                  todayHours?.closed ? 'bg-red-500' : 'bg-green-500'
                )} />
                {todayHours?.closed ? 'Chiuso oggi' : `Aperto oggi: ${todayHours?.hours}`}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex justify-between items-center py-2 px-3 rounded-lg',
                      schedule.day === currentDay
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    )}
                  >
                    <span className={cn(
                      'font-medium',
                      schedule.day === currentDay
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-neutral-700 dark:text-neutral-300'
                    )}>
                      {schedule.day}
                    </span>
                    <span className={cn(
                      schedule.closed
                        ? 'text-red-600 dark:text-red-400'
                        : schedule.day === currentDay
                        ? 'text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400'
                    )}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Info */}
            <div className="card-neu p-6">
              <h3 className="heading-tertiary mb-6">
                Come Raggiungerci
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transportInfo.map((transport, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                    <span className="text-2xl">{transport.icon}</span>
                    <div>
                      <div className="font-medium text-sm text-neutral-800 dark:text-neutral-200">
                        {transport.type} {transport.line}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {transport.station}
                      </div>
                      <div className="text-xs text-primary-600 dark:text-primary-400">
                        {transport.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-8"
          >
            <div className="card-neu p-8">
              <h3 className="heading-tertiary mb-6">
                Inviaci un Messaggio
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">
                    Messaggio Inviato!
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Grazie per averci contattato. Ti risponderemo entro 24 ore.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={cn(
                          'w-full p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                          errors.name
                            ? 'border-red-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500'
                        )}
                        placeholder="Il tuo nome"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full p-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        placeholder="Il tuo telefono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={cn(
                        'w-full p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                        errors.email
                          ? 'border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500'
                      )}
                      placeholder="la-tua-email@esempio.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Oggetto *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => updateFormData('subject', e.target.value)}
                      className={cn(
                        'w-full p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                        errors.subject
                          ? 'border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500'
                      )}
                    >
                      <option value="">Seleziona un oggetto</option>
                      <option value="prenotazione">Prenotazione Appuntamento</option>
                      <option value="informazioni">Richiesta Informazioni</option>
                      <option value="servizi">Domande sui Servizi</option>
                      <option value="prezzi">Informazioni sui Prezzi</option>
                      <option value="altro">Altro</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      rows={5}
                      className={cn(
                        'w-full p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                        errors.message
                          ? 'border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500'
                      )}
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Invio in corso...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        Invia Messaggio
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="neu"
                className="h-16 flex-col space-y-1"
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`, '_blank')}
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600" />
                <span className="text-sm">WhatsApp</span>
              </Button>
              
              <Button
                variant="neu"
                className="h-16 flex-col space-y-1"
                onClick={() => window.location.href = `tel:${contactInfo.phone}`}
              >
                <PhoneIcon className="h-6 w-6 text-blue-600" />
                <span className="text-sm">Chiama Ora</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}