import React, { useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { HELIUS_RPC_URL, SOLANA_RPC_PROXY } from './config.js'
import { AppProvider, useApp } from './context/AppContext.jsx'
import Dashboard from './components/Dashboard.jsx'
import LandingPage from './components/LandingPage.jsx'
import ToastContainer from './components/Toast.jsx'

function useSolflareRecommended() {
  useEffect(() => {
    const STYLE_ID = 'solflare-recommended-styles'
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = `
        .wallet-adapter-modal-list li.solflare-recommended {
          order: -1;
          border: 1px solid rgba(255, 240, 64, 0.4) !important;
          border-radius: 12px !important;
          background: rgba(255, 240, 64, 0.06) !important;
        }
        .solflare-recommended-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #FFF040, #e8d800);
          color: #000;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          margin-left: auto;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
      `
      document.head.appendChild(style)
    }
    function promoteSolflare(modalList) {
      const items = modalList.querySelectorAll('li')
      let solflareItem = null
      items.forEach((li) => {
        const btn = li.querySelector('button')
        if (btn && btn.textContent?.toLowerCase().includes('solflare')) solflareItem = li
      })
      if (solflareItem && !solflareItem.classList.contains('solflare-recommended')) {
        modalList.prepend(solflareItem)
        solflareItem.classList.add('solflare-recommended')
        const btn = solflareItem.querySelector('button')
        if (btn && !btn.querySelector('.solflare-recommended-badge')) {
          const badge = document.createElement('span')
          badge.className = 'solflare-recommended-badge'
          badge.textContent = 'Recommended'
          btn.appendChild(badge)
        }
      }
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            const el = node
            const modalList = el.classList?.contains('wallet-adapter-modal-list')
              ? el : el.querySelector?.('.wallet-adapter-modal-list')
            if (modalList) promoteSolflare(modalList)
          }
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])
}

function WalletContextProvider({ children }) {
  useSolflareRecommended()
  return <>{children}</>
}

// Routes component that can access both wallet and app context
function AppRoutes() {
  const { connected } = useWallet()
  const { watchAddress } = useApp()
  const navigate = useNavigate()
  const hasAccess = connected || !!watchAddress

  useEffect(() => {
    if (hasAccess) {
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [hasAccess]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route path="/" element={hasAccess ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/dashboard" element={hasAccess ? <Dashboard /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <AppRoutes />
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  )
}

export default function App() {
  const endpoint = HELIUS_RPC_URL || SOLANA_RPC_PROXY
  const wallets = useMemo(() => [], [])
  const connectionConfig = useMemo(() => ({
    commitment: 'confirmed',
    wsEndpoint: '',
  }), [])

  return (
    <ConnectionProvider endpoint={endpoint} config={connectionConfig}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProvider>
            <AppRouter />
          </WalletContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
