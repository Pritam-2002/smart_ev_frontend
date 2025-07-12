import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LandingPage from './components/shared/landingpage/LandingPage'
// import AuthPage from './components/main/authPage/AuthPage';
import Signup from './components/shared/auth/signup/Signup';
import RouteHighlighter from './components/main/directionpage/DirectionPage';
import Login from './components/shared/auth/login/Login';
import Dashboard from './components/shared/auth/dashboard/Dashboard';
import Aidashboard from './components/shared/auth/emergencyai/Aidashboard';
import Aiinfo from './components/shared/auth/emergencyai/Aiinfo';
import Direction from './components/main/directionpage/DirectionPage';
import { useContext } from 'react';
import { userdatacontext } from './context/Userprottected';


function App() {
  // conconstst [setuser]=useAuth()
  const { userdata } = useContext(userdatacontext)
  return (
    <>
      {!userdata ? <Signup /> : <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aidashboard" element={<Aidashboard />} />
          <Route path="/aiinfo" element={<Aiinfo />} />
          <Route path="/direction" element={<Direction />} />
        </Routes>
      </>
      }
    </>
  )
}

export default App