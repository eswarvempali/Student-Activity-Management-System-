import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <StudentProvider>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </StudentProvider>
  );
};

export default App;