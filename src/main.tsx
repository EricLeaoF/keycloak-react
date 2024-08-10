import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { KeycloakProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <KeycloakProvider>
        <StrictMode>
          <App />
        </StrictMode>,
    </KeycloakProvider>
)
