import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccessPage from './pages/Access';
import DemoKc from './pages/DemoKc';
import Layout from './layouts/mainLayout';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/access" element={<AccessPage />} />
            <Route path="/demokc" element={<DemoKc />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
