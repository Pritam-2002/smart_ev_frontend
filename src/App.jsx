import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LandingPage from './components/shared/landingpage/LandingPage'
import AuthPage from './components/main/evuserAuthPage/AuthPage';
import EvStationAuthPage from './components/main/evStationAuthPage/EvStationAuthPage';


function App() {
 
  


   return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/evuserauth" element={<AuthPage />} />
        <Route path="/evstationauth" element={<EvStationAuthPage />} />
      </Routes>
    </Router>

  
   )
}

export default App
