import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LandingPage from './components/shared/landingpage/LandingPage'
import AuthPage from './components/main/authPage/AuthPage';

function App() {
  // const [setuser]=useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

      </Routes>
    </Router>
  )
}

export default App