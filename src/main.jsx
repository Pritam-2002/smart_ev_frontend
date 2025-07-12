import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AuthContext from './context/Isauthcontext.jsx'
import Userprotected from './context/Userprottected.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <BrowserRouter>
      <AuthContext>
        <Userprotected>
          <App />
        </Userprotected>
      </AuthContext>
      </BrowserRouter>
  </AuthProvider>
)
