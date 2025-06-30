import React, { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils'

const SearchBar = React.forwardRef(({
  className,
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  ...props
}, ref) => {
  const [searchValue, setSearchValue] = useState(value || '')

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={ref}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-2 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          {...props}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Sparkles className="h-4 w-4 text-accent-500 animate-pulse" />
        </div>
      </div>
    </form>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar