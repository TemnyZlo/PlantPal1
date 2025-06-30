import React from 'react'
import { cn } from '../../lib/utils'

const sizeVariants = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

const Avatar = React.forwardRef(({
  className,
  src,
  alt,
  size = 'md',
  fallback,
  ...props
}, ref) => {
  const [imageError, setImageError] = React.useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const classes = cn(
    'relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20',
    sizeVariants[size],
    className
  )

  return (
    <div ref={ref} className={classes} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="aspect-square h-full w-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-medium text-sm">
          {fallback || getInitials(alt)}
        </div>
      )}
    </div>
  )
})

Avatar.displayName = 'Avatar'

export default Avatar