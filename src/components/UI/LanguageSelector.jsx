import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

const LanguageSelector = ({ className }) => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label={t('language.selectLanguage')}
      >
        <Globe className="h-4 w-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage.name}
        </span>
        <ChevronDown className={cn(
          'h-4 w-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 card p-2 z-20 overflow-hidden"
            >
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      i18n.language === language.code && 'bg-primary/10 text-primary'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{language.flag}</span>
                      <span className="font-medium">{language.name}</span>
                    </div>
                    {i18n.language === language.code && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector