'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { StarIcon, ScissorsIcon, PaintBrushIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const teamMembers = [
  {
    id: 'sara-lepri',
    name: 'Sara Lepri',
    role: 'Founder & Hair Artist',
    motto: '"Trasformo il tuo stile, ma anche il tuo sorriso."',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Tagli Creativi', 'Consulenza Stile', 'Colorazioni Artistiche'],
    experience: '15+ anni',
    icon: ScissorsIcon,
    gradient: 'from-primary-500 to-primary-600',
    bio: 'Sara è la visionaria dietro Lepri Hair Spa. Con oltre 15 anni di esperienza nel settore, ha trasformato migliaia di look creando sempre qualcosa di unico per ogni cliente.',
    achievements: [
      'Certificata presso Vidal Sassoon Academy',
      'Specializzazione in colorimetria avanzata',
      'Formatrice per giovani parrucchieri',
      'Premio "Miglior Salone" 2023'
    ],
    social: {
      instagram: '@sara.lepri.hair',
      followers: '12.5K'
    }
  },
  {
    id: 'marco-bianchi',
    name: 'Marco Bianchi',
    role: 'Specialista Colore',
    motto: '"Gioco con le nuance, creo armonie cromatiche."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    specialties: ['Balayage', 'Meches', 'Correzioni Colore'],
    experience: '10+ anni',
    icon: PaintBrushIcon,
    gradient: 'from-secondary-500 to-secondary-600',
    bio: 'Marco è il nostro maestro del colore. La sua precisione tecnica e il suo occhio artistico lo rendono il punto di riferimento per tutte le colorazioni più complesse.',
    achievements: [
      'Master in Colorimetria Wella',
      'Specialista in correzioni colore',
      'Formazione continua L\'Oréal Professionnel',
      'Artista per eventi fashion'
    ],
    social: {
      instagram: '@marco.color.artist',
      followers: '8.2K'
    }
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateY: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

// Modal component for team member details
interface TeamModalProps {
  isOpen: boolean
  member: typeof teamMembers[0] | null
  onClose: () => void
}

function TeamModal({ isOpen, member, onClose }: TeamModalProps) {
  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Member Image */}
              <div className="relative lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-6 right-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${member.gradient} shadow-xl`}>
                    <member.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                {/* Experience Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {member.experience}
                  </span>
                </div>
                
                {/* Social Info */}
                <div className="absolute bottom-6 right-6">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {member.social.followers}
                    </span>
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="lg:w-1/2 p-8">
                {/* Name and Role */}
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                    {member.name}
                  </h3>
                  <p className={`text-lg font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>
                </div>

                {/* Motto */}
                <blockquote className="mb-6 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-xl border-l-4 border-primary-500">
                  <p className="text-neutral-700 dark:text-neutral-300 italic font-medium">
                    {member.motto}
                  </p>
                </blockquote>

                {/* Bio */}
                <p className="body-text mb-6">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wide">
                    Specialità
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <span
                        key={specialtyIndex}
                        className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${member.gradient} text-white`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wide">
                    Riconoscimenti
                  </h4>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <StarIcon className="h-4 w-4 text-primary-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Link */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wide">
                    Social
                  </h4>
                  <a
                    href={`https://instagram.com/${member.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-sm font-medium">{member.social.instagram}</span>
                  </a>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <StarIcon className="h-5 w-5 mr-2" />
                  Prenota con {member.name.split(' ')[0]}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null)

  const openModal = (member: typeof teamMembers[0]) => {
    setSelectedMember(member)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedMember(null)
  }

  return (
    <section id="team" className="py-20 lg:py-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6">
            Il Nostro Team
          </h2>
          <p className="body-text max-w-3xl mx-auto">
            Incontra i professionisti che renderanno unica la tua esperienza. 
            Ogni membro del nostro team porta passione, creatività e anni di esperienza 
            per offrirti sempre il meglio.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
              onClick={() => openModal(member)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Member Image */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${member.gradient} shadow-xl`}>
                      <member.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Experience Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      {member.experience}
                    </span>
                  </div>

                  {/* Member info overlay - similar to gallery */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-sm text-white/80 mb-2">{member.role}</p>
                    <p className="text-xs text-white/70 italic">{member.motto.replace(/"/g, '')}</p>
                    
                    {/* Click hint */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Clicca per vedere di più
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8">
            <h3 className="heading-tertiary mb-4">
              Scegli il Tuo Specialista
            </h3>
            <p className="body-text mb-6">
              Ogni membro del nostro team ha competenze uniche. 
              Prenota una consulenza per scoprire chi può realizzare al meglio la tua visione.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#prenota')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <ScissorsIcon className="h-5 w-5 mr-2" />
                Prenota con Sara
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#prenota')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <PaintBrushIcon className="h-5 w-5 mr-2" />
                Prenota con Marco
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <TeamModal
        isOpen={modalOpen}
        member={selectedMember}
        onClose={closeModal}
      />
    </section>
  )
}