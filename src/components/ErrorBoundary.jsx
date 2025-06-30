import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ErrorBoundaryContent = ({ onRetry, error, errorInfo }) => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('errors.somethingWentWrong')}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('errors.errorDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRetry}
              className="btn btn-primary btn-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t('errors.tryAgain')}
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="btn btn-secondary btn-md flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              {t('errors.goHome')}
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-2">
                Error Details (Development)
              </summary>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto max-h-40">
                <div className="mb-2">
                  <strong>Error:</strong> {error && error.toString()}
                </div>
                <div>
                  <strong>Stack Trace:</strong>
                  <pre className="whitespace-pre-wrap mt-1">{errorInfo?.componentStack}</pre>
                </div>
              </div>
            </details>
          )}
        </div>
      </motion.div>
    </div>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContent 
          onRetry={() => window.location.reload()}
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary