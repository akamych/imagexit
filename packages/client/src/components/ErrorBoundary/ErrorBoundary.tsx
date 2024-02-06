import React, { useState, useEffect, ReactNode } from 'react'
import { Typography } from 'antd'
import './errorBoundary.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

export const FallbackUI: React.FC = () => {
  const { Title } = Typography
  return (
    <div className="error-boundary">
      <Title>Что-то пошло не так</Title>
      <Title>¯\_(ツ)_/¯</Title>
    </div>
  )
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleOnError = (errorEvent: ErrorEvent): void => {
      console.error(errorEvent.error)
      setHasError(true)
    }

    window.addEventListener('error', handleOnError)

    return () => {
      window.removeEventListener('error', handleOnError)
    }
  }, [])

  if (hasError) {
    return <FallbackUI />
  }

  return <>{children}</>
}
