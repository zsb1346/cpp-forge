import React, { Component, ErrorInfo, ReactNode } from 'react'
import { XCircle } from '@phosphor-icons/react'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught:', error.message, errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ide-bg flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-ide-red/10 flex items-center justify-center">
              <XCircle size={32} weight="fill" className="text-[#f44747]" />
            </div>
            <h2 className="text-ide-text text-lg font-semibold mb-2">渲染出错</h2>
            <p className="text-ide-text-secondary text-sm mb-4">
              {this.state.error?.message || '发生了意外错误'}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="btn-primary text-sm"
            >
              重新加载
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
