import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const sizeVariants = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

const LoadingSpinner = ({ 
  size = 'md', 
  className,
  text,
  fullScreen = false 
}) => {
  const spinner = (
    <motion.div
      className={cn(
        'animate-spin rounded-full border-2 border-muted border-t-primary',
        sizeVariants[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 glass backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          {text && (
            <p className="mt-4 text-sm text-muted-foreground">
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (text) {
    return (
      <div className="flex items-center space-x-3">
        {spinner}
        <span className="text-sm text-muted-foreground">
          {text}
        </span>
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner