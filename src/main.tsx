import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/interactive.css'
import App from './App.tsx'

createRoot(document.body!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)