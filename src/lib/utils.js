import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(new Date(date))
}

export function formatRelativeTime(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }
  
  return formatDate(date)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return Promise.resolve()
    } catch (err) {
      document.body.removeChild(textArea)
      return Promise.reject(err)
    }
  }
}

export function downloadFile(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function getColorFromString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const hue = hash % 360
  return `hsl(${hue}, 70%, 50%)`
}

export function parseSearchParams(search) {
  const params = new URLSearchParams(search)
  const result = {}
  
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  
  return result
}

export function buildSearchParams(params) {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value)
    }
  })
  
  return searchParams.toString()
}

export function isMobile() {
  return window.innerWidth < 768
}

export function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export function isDesktop() {
  return window.innerWidth >= 1024
}

export function getDeviceType() {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

// AI and ML utilities
export function calculateSimilarity(a, b) {
  const setA = new Set(a.toLowerCase().split(' '))
  const setB = new Set(b.toLowerCase().split(' '))
  const intersection = new Set([...setA].filter(x => setB.has(x)))
  const union = new Set([...setA, ...setB])
  return intersection.size / union.size
}

export function normalizeScore(score, min = 0, max = 100) {
  return Math.max(min, Math.min(max, score))
}

export function weightedAverage(values, weights) {
  const sum = values.reduce((acc, val, i) => acc + val * weights[i], 0)
  const weightSum = weights.reduce((acc, weight) => acc + weight, 0)
  return sum / weightSum
}