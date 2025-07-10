'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Servizi', href: '#servizi' },
  { name: 'Galleria', href: '#galleria' },
  { name: 'Team', href: '#team' },
  { name: 'Contatti', href: '#contatti' },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <nav className={`mx-auto max-w-6xl transition-all duration-300 rounded-2xl ${
        scrolled
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-2xl border border-white/20 dark:border-neutral-700/50'
          : 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg border border-white/30 dark:border-neutral-700/30'
      }`}>
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="flex items-center space-x-2 focus-ring rounded-lg"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-display text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Lepri Hair Spa
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-ring"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="focus-ring"
              aria-label="Cambia tema"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>

            {/* Call button */}
            <Button
              variant="gold-outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              onClick={() => window.open('tel:+390212345678', '_self')}
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Chiama</span>
            </Button>

            {/* Book now button */}
            <Button
              variant="gold"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => scrollToSection('#prenota')}
            >
              Prenota Ora
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden focus-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg rounded-b-2xl border-t border-white/20 dark:border-neutral-700/50 shadow-lg mx-4"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-ring"
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="pt-4 pb-2 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex flex-col space-y-2 px-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-center"
                    onClick={() => {
                      window.open('tel:+390212345678', '_self')
                      setMobileMenuOpen(false)
                    }}
                  >
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Chiama Ora
                  </Button>
                  <Button
                    variant="gold"
                    className="justify-center"
                    onClick={() => {
                      scrollToSection('#prenota')
                      setMobileMenuOpen(false)
                    }}
                  >
                    Prenota Ora
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}