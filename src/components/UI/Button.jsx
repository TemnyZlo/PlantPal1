import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl',
  success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl',
}

const sizeVariants = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 py-2 text-sm',
  lg: 'h-12 px-8 text-base',
  xl: 'h-14 px-10 text-lg',
}

const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  children,
  disabled,
  loading,
  icon,
  iconPosition = 'left',
  fullWidth,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    sizeVariants[size],
    fullWidth && 'w-full',
    'theme-transition',
    className
  )

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  )

  if (props.href) {
    return (
      <motion.a
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button