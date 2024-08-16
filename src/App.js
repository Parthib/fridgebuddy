import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Document from './components/pages/Document';
import PrivacyPolicy from './markdown/privacy-policy.md';
import TermsOfService from './markdown/terms-of-service.md';
import ReactGA from 'react-ga4';
import AccountDeletionForm from './components/pages/RequestAccountDeletion';
import DeleteAccountPage from './components/pages/DeleteAccount';

const analyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(analyticsId);

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
}

function App() {
  usePageViews();
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/privacy-policy' element={<Document key="privacy-policy" markdown={PrivacyPolicy}/>} />
        <Route path='/terms-of-service' element={<Document key="terms-of-service" markdown={TermsOfService}/>} />
        <Route path='request-account-deletion' element={<AccountDeletionForm />} />
        <Route path='delete-account' element={<DeleteAccountPage />} />
      </Routes>
    </>
  );
}


export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}