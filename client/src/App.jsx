import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Landing_page from './pages/Landing_page'
import ProtectedRoute from './components/ProtectedRoute'
import Login_page from './pages/Login_page'

// Set axios base URL for all requests
axios.defaults.baseURL = 'http://localhost:3000';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login_page />} />
        <Route 
          path="/leads" 
          element={
            <ProtectedRoute>
              <Landing_page />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Login_page />} />
      </Routes>
    </Router>
  )
}

export default App