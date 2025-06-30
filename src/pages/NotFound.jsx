import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Leaf } from 'lucide-react'
import Button from '../components/UI/Button'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-4"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto"
          >
            <Leaf className="h-12 w-12 text-primary" />
          </motion.div>
        </div>
        
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">{t('errors.pageNotFound')}</h2>
        
        <p className="text-muted-foreground mb-8">
          {t('errors.pageNotFoundMessage')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button
              icon={<Home className="h-4 w-4 mr-2" />}
              className="w-full sm:w-auto"
            >
              {t('errors.returnHome')}
            </Button>
          </Link>
          
          <Link to="/plants">
            <Button
              variant="outline"
              icon={<Search className="h-4 w-4 mr-2" />}
              className="w-full sm:w-auto"
            >
              {t('errors.explorePlants')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound