import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import Boards from './pages/HomePages';
import "./App.scss";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth);
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route 
          path="/boards" 
          element={
            <PrivateRoute>
              <Boards />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;