import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Document from './components/pages/Document';
import PrivacyPolicy from './markdown/privacy-policy.md';
import TermsOfService from './markdown/terms-of-service.md';
import NFT from './markdown/nft.md';
import Analytics from 'react-router-ga';

import data from './private';


function App() {
  return (
    <>
      <Router>
        <Analytics id={data.analyticsId}>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/privacy-policy' component={() => <Document markdown={PrivacyPolicy}/>} />
            <Route path='/terms-of-service' component={() => <Document markdown={TermsOfService}/>} />
            <Route path='/nft' component={() => <Document markdown={NFT}/>} />
          </Switch>
        </Analytics>
      </Router>
    </>
  );
}

export default App;
