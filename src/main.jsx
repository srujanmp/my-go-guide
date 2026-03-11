import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Runtime error in Go Guide:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0d1117', color: '#e6edf3', display: 'grid', placeItems: 'center', padding: '24px', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
          <div style={{ maxWidth: '720px', border: '1px solid #30363d', background: '#161b22', borderRadius: '8px', padding: '20px' }}>
            <h1 style={{ marginTop: 0, fontSize: '18px', color: '#ff7b72' }}>Something went wrong while rendering this page.</h1>
            <p style={{ color: '#c9d1d9', lineHeight: 1.6 }}>
              Please refresh the page to fetch the latest bundle. If this keeps happening, clear cached site data and try again.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
