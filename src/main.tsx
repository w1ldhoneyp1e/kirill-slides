import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { getEditor } from './store/editor.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App editor={getEditor()}/>
  </StrictMode>,
)
