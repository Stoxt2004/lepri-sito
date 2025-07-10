'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { XMarkIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

// Expanded gallery items with categories and varied dimensions
const galleryItems = [
  {
    id: 1,
    category: 'taglio',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Taglio Moderno',
    description: 'Un nuovo look che valorizza i lineamenti',
    aspectRatio: 'portrait', // 3:4
    client: 'Sara'
  },
  {
    id: 2,
    category: 'colore',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Trasformazione Colore',
    description: 'Da un castano spento a riflessi dorati luminosi',
    aspectRatio: 'landscape', // 4:3
    client: 'Maria'
  },
  {
    id: 3,
    category: 'spa',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Trattamento Spa',
    description: 'Relax e rigenerazione per i tuoi capelli',
    aspectRatio: 'square', // 1:1
    client: 'Elena'
  },
  {
    id: 4,
    category: 'colore',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Balayage Naturale',
    description: 'Effetto sunkissed per un look naturale',
    aspectRatio: 'portrait',
    client: 'Giulia'
  },
  {
    id: 5,
    category: 'taglio',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Taglio Pixie',
    description: 'Corto e di carattere',
    aspectRatio: 'landscape',
    client: 'Anna'
  },
  {
    id: 6,
    category: 'spa',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Trattamento Ricostruttivo',
    description: 'Rigenerazione profonda per capelli danneggiati',
    aspectRatio: 'portrait',
    client: 'Francesca'
  },
  {
    id: 7,
    category: 'colore',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Meches Dorate',
    description: 'Riflessi luminosi per un look solare',
    aspectRatio: 'square',
    client: 'Valentina'
  },
  {
    id: 8,
    category: 'taglio',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Bob Asimmetrico',
    description: 'Geometrie moderne per un look contemporaneo',
    aspectRatio: 'landscape',
    client: 'Chiara'
  }
]

const categories = [
  { id: 'tutti', label: 'Tutti', count: galleryItems.length },
  { id: 'taglio', label: 'Taglio', count: galleryItems.filter(item => item.category === 'taglio').length },
  { id: 'colore', label: 'Colore', count: galleryItems.filter(item => item.category === 'colore').length },
  { id: 'spa', label: 'Trattamenti Spa', count: galleryItems.filter(item => item.category === 'spa').length }
]

// Lazy loading hook
function useLazyLoading() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observeImage = useCallback((element: HTMLElement | null, imageId: number) => {
    if (!element) return

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = parseInt(entry.target.getAttribute('data-image-id') || '0')
              setLoadedImages(prev => new Set([...Array.from(prev), id]))
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '50px' }
      )
    }

    element.setAttribute('data-image-id', imageId.toString())
    observerRef.current.observe(element)
  }, [])

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return { loadedImages, observeImage }
}

// Lightbox component
interface LightboxProps {
  isOpen: boolean
  currentIndex: number
  images: typeof galleryItems
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function Lightbox({ isOpen, currentIndex, images, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex]
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      onNext()
    }
    if (isRightSwipe && images.length > 1) {
      onPrev()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || !currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-3 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
        >
          <XMarkIcon className="h-6 w-6 sm:h-6 sm:w-6 text-white" />
        </button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-4 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-4 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </>
        )}

        {/* Image container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-4xl max-h-[85vh] sm:max-h-[80vh] w-full h-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          <div className="relative flex-1 rounded-lg overflow-hidden">
            <Image
              src={currentImage.image}
              alt={currentImage.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Image info */}
          <div className="mt-4 sm:mt-6 text-center text-white px-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{currentImage.title}</h3>
            <p className="text-sm sm:text-lg text-white/80 mb-1">{currentImage.description}</p>
            <p className="text-xs sm:text-sm text-white/60">Cliente: {currentImage.client}</p>
            
            {/* Image counter and swipe indicator */}
            <div className="mt-3 sm:mt-4 flex flex-col items-center gap-2">
              <div className="text-xs sm:text-sm text-white/60">
                {currentIndex + 1} di {images.length}
              </div>
              {images.length > 1 && (
                <div className="sm:hidden text-xs text-white/40 flex items-center gap-1">
                  <span>←</span>
                  <span>Scorri per navigare</span>
                  <span>→</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Gallery item component
interface GalleryItemProps {
  item: typeof galleryItems[0]
  index: number
  isLoaded: boolean
  onImageLoad: (element: HTMLElement | null, imageId: number) => void
  onClick: () => void
}

function GalleryItem({ item, index, isLoaded, onImageLoad, onClick }: GalleryItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onImageLoad(itemRef.current, item.id)
  }, [])

  const getAspectRatioClass = () => {
    switch (item.aspectRatio) {
      case 'portrait': return 'aspect-[3/4]'
      case 'landscape': return 'aspect-[4/3]'
      case 'square': return 'aspect-square'
      default: return 'aspect-[3/4]'
    }
  }

  return (
    <motion.div
      ref={itemRef}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group cursor-pointer ${getAspectRatioClass()} mb-4 sm:mb-6 break-inside-avoid`}
      onClick={onClick}
    >
      <div className="relative h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary-300/30 hover:border-primary-400 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 active:scale-95 touch-manipulation">
        {isLoaded ? (
          <>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-800/80 via-neutral-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="p-4 rounded-full bg-primary-500/90 backdrop-blur-sm border border-primary-300/50"
              >
                <MagnifyingGlassIcon className="h-8 w-8 text-white" />
              </motion.div>
            </div>

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-base sm:text-lg mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/80">{item.client}</p>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('tutti')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const { loadedImages, observeImage } = useLazyLoading()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredItems = activeCategory === 'tutti' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section id="galleria" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-primary mb-6 text-white">
            La Nostra Galleria
          </h2>
          <p className="body-text max-w-3xl mx-auto text-neutral-300">
            Scopri le trasformazioni che realizziamo ogni giorno. 
            Ogni cliente ha una storia unica e noi siamo qui per scriverla insieme.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'gold' : 'outline'}
              size="sm"
              className={`transition-all duration-300 text-xs sm:text-sm touch-manipulation ${
                activeCategory === category.id 
                  ? 'shadow-lg shadow-primary-500/25' 
                  : 'hover:border-primary-400 hover:text-primary-600'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="truncate">{category.label}</span>
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full bg-current/20 flex-shrink-0">
                {category.count}
              </span>
            </Button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          ref={ref}
          className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={`${activeCategory}-${item.id}`}
                item={item}
                index={index}
                isLoaded={loadedImages.has(item.id)}
                onImageLoad={observeImage}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md" />
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="heading-tertiary mb-4 text-white">
                Vuoi essere la prossima trasformazione?
              </h3>
              <p className="body-text mb-6 text-neutral-200">
                Prenota il tuo appuntamento e lasciati ispirare dalle infinite possibilità.
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

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        images={filteredItems}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  )
}