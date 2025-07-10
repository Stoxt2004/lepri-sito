'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarDaysIcon, ClockIcon, UserIcon, PhoneIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const services = [
  { id: 'taglio', name: 'Taglio & Style', duration: '60 min', price: '€45' },
  { id: 'colore', name: 'Colore & Trattamenti', duration: '120 min', price: '€85' },
  { id: 'balayage', name: 'Balayage/Meches', duration: '180 min', price: '€120' },
  { id: 'spa', name: 'Hair Spa Completo', duration: '90 min', price: '€65' },
  { id: 'piega', name: 'Piega & Styling', duration: '45 min', price: '€35' },
  { id: 'trattamento', name: 'Trattamento Riparatore', duration: '75 min', price: '€55' }
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30'
]

const stylists = [
  { id: 'sara', name: 'Sara Lepri', specialty: 'Colorista & Founder' },
  { id: 'marco', name: 'Marco Bianchi', specialty: 'Hair Stylist Senior' },
  { id: 'any', name: 'Primo Disponibile', specialty: 'Qualsiasi specialista' }
]

interface FormData {
  service: string
  stylist: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes: string
}

const initialFormData: FormData = {
  service: '',
  stylist: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  notes: ''
}

export function BookingSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Generate available dates (next 30 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('it-IT', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })
        })
      }
    }
    
    return dates
  }

  const availableDates = getAvailableDates()

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}
    
    switch (step) {
      case 1:
        if (!formData.service) newErrors.service = 'Seleziona un servizio'
        if (!formData.stylist) newErrors.stylist = 'Seleziona uno specialista'
        break
      case 2:
        if (!formData.date) newErrors.date = 'Seleziona una data'
        if (!formData.time) newErrors.time = 'Seleziona un orario'
        break
      case 3:
        if (!formData.name.trim()) newErrors.name = 'Inserisci il tuo nome'
        if (!formData.phone.trim()) newErrors.phone = 'Inserisci il numero di telefono'
        if (!formData.email.trim()) {
          newErrors.email = 'Inserisci la tua email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Inserisci un\'email valida'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setCurrentStep(4)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setCurrentStep(1)
    setIsSubmitted(false)
    setErrors({})
  }

  const selectedService = services.find(s => s.id === formData.service)
  const selectedStylist = stylists.find(s => s.id === formData.stylist)
  const selectedDate = availableDates.find(d => d.value === formData.date)

  return (
    <section id="prenota" className="py-20 lg:py-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-primary mb-6">
            Prenota il Tuo Appuntamento
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Scegli il servizio perfetto per te e prenota in pochi semplici passaggi. 
            Il nostro team ti contatterà per confermare l'appuntamento.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-neu p-8 lg:p-12"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300',
                    step <= currentStep
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
                  )}
                >
                  {step < currentStep || isSubmitted ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Service & Stylist Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="heading-tertiary mb-6">Scegli il Tuo Servizio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => updateFormData('service', service.id)}
                        className={cn(
                          'p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg',
                          formData.service === service.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                        )}
                      >
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {service.name}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {service.duration} • {service.price}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-2">{errors.service}</p>
                  )}
                </div>

                <div>
                  <h3 className="heading-tertiary mb-6">Scegli il Tuo Specialista</h3>
                  <div className="space-y-3">
                    {stylists.map((stylist) => (
                      <button
                        key={stylist.id}
                        onClick={() => updateFormData('stylist', stylist.id)}
                        className={cn(
                          'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg',
                          formData.stylist === stylist.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                        )}
                      >
                        <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {stylist.name}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {stylist.specialty}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.stylist && (
                    <p className="text-red-500 text-sm mt-2">{errors.stylist}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="heading-tertiary mb-6 flex items-center">
                    <CalendarDaysIcon className="h-6 w-6 mr-2 text-primary-500" />
                    Seleziona la Data
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableDates.slice(0, 12).map((date) => (
                      <button
                        key={date.value}
                        onClick={() => updateFormData('date', date.value)}
                        className={cn(
                          'p-3 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md',
                          formData.date === date.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                        )}
                      >
                        <div className="text-sm font-medium">{date.label}</div>
                      </button>
                    ))}
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-2">{errors.date}</p>
                  )}
                </div>

                <div>
                  <h3 className="heading-tertiary mb-6 flex items-center">
                    <ClockIcon className="h-6 w-6 mr-2 text-primary-500" />
                    Seleziona l'Orario
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => updateFormData('time', time)}
                        className={cn(
                          'p-3 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md',
                          formData.time === time
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300'
                        )}
                      >
                        <div className="text-sm font-medium">{time}</div>
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-2">{errors.time}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="heading-tertiary mb-6 flex items-center">
                  <UserIcon className="h-6 w-6 mr-2 text-primary-500" />
                  I Tuoi Dati
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Nome Completo *
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
                      placeholder="Il tuo nome e cognome"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={cn(
                        'w-full p-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
                        errors.phone
                          ? 'border-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500'
                      )}
                      placeholder="+39 123 456 7890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
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
                    Note Aggiuntive (Opzionale)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateFormData('notes', e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                    placeholder="Hai richieste particolari o allergie da segnalare?"
                  />
                </div>

                {/* Summary */}
                <div className="card-neu p-6 mt-8">
                  <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                    Riepilogo Appuntamento
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Servizio:</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Specialista:</span>
                      <span className="font-medium">{selectedStylist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Data:</span>
                      <span className="font-medium">{selectedDate?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Orario:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Durata:</span>
                      <span className="font-medium">{selectedService?.duration}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-neutral-600 dark:text-neutral-400">Prezzo:</span>
                      <span className="font-bold text-primary-600">{selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="heading-tertiary mb-4 text-green-600">
                  Prenotazione Inviata!
                </h3>
                <p className="body-text mb-6">
                  Grazie {formData.name}! La tua richiesta di prenotazione è stata inviata con successo. 
                  Ti contatteremo entro 2 ore per confermare l'appuntamento.
                </p>
                <div className="card-neu p-6 mb-6 text-left max-w-md mx-auto">
                  <h4 className="font-semibold mb-4">Dettagli Prenotazione:</h4>
                  <div className="space-y-2 text-sm">
                    <div>📅 {selectedDate?.label} alle {formData.time}</div>
                    <div>💇‍♀️ {selectedService?.name}</div>
                    <div>👩‍🦰 {selectedStylist?.name}</div>
                    <div>📞 {formData.phone}</div>
                    <div>📧 {formData.email}</div>
                  </div>
                </div>
                <Button
                  onClick={resetForm}
                  variant="neu-primary"
                  size="lg"
                >
                  Prenota un Altro Appuntamento
                </Button>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="min-w-[120px]"
              >
                Indietro
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  variant="neu-primary"
                  className="min-w-[120px]"
                >
                  Avanti
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="neu-primary"
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Invio...
                    </div>
                  ) : (
                    'Conferma Prenotazione'
                  )}
                </Button>
              )}
            </div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="body-text mb-4">
            Preferisci prenotare per telefono?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+390212345678"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <PhoneIcon className="h-5 w-5 mr-2" />
              +39 02 1234 5678
            </a>
            <a
              href="mailto:info@leprihairspa.com"
              className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              info@leprihairspa.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}