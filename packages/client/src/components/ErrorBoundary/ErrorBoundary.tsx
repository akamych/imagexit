import React, { useState, useEffect, ReactNode } from 'react';
import { Typography } from 'antd';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const FallbackUI: React.FC = () => {
    const { Title } = Typography;
    return (

    <div>
      <Title>Something went wrong.</Title>
      <Title>¯\_(ツ)_/¯</Title>
    </div>
    )
}
  
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallback = FallbackUI }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleOnError = (errorEvent: ErrorEvent): void => {
      console.error(errorEvent.error);
      setHasError(true);
    };

    window.addEventListener('error', handleOnError);

    return () => {
      window.removeEventListener('error', handleOnError);
    };
  }, []);

  if (hasError) {
    return fallback;
  }

  return <></>;
};
