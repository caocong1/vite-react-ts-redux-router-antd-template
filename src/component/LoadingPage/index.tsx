import { Spin } from 'antd'
import React from 'react'

interface LoadingPageProps {
  fullscreen?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ fullscreen }) => {
  const hw = fullscreen ? { height: '100vh', width: '100vw' } : {}
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: '100px',
        overflow: 'hidden',
        ...hw,
      }}
    >
      <Spin />
    </div>
  )
}

export default LoadingPage
