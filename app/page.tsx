import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { GallerySection } from '@/components/sections/gallery-section'
import { TeamSection } from '@/components/sections/team-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { BookingSection } from '@/components/sections/booking-section'
import { PromotionsSection } from '@/components/sections/promotions-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Benvenuta nel tuo momento */}
      <HeroSection />
      
      {/* Services Section - Taglio & Style, Colori & Trattamenti, Spa Capillare */}
      <ServicesSection />
      
      {/* Gallery Section - Before/After con Parallax */}
      <GallerySection />
      
      {/* Team Section - Sara Lepri, Marco Bianchi */}
      <TeamSection />
      
      {/* Testimonials Section - Recensioni clienti */}
      <TestimonialsSection />
      
      {/* Booking Section - Prenotazione & Voice UI */}
      <BookingSection />
      
      {/* Promotions Section - Gift Card & Promo */}
      <PromotionsSection />
      
      {/* Contact Section - Contatti & Mappa */}
      <ContactSection />
    </>
  )
}