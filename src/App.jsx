import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LandingPage from './components/shared/landingpage/LandingPage'
// import AuthPage from './components/main/authPage/AuthPage';
import Signup from './components/shared/auth/signup/Signup';
import Login from './components/shared/auth/login/Login';
import Dashboard from './components/shared/auth/dashboard/Dashboard';

function App() {
  // const [setuser]=useAuth()

  return (
   
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  )
}

export default App