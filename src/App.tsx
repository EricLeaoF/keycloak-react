// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccessPage from './pages/Access';
import DemoKc from './pages/DemoKc';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/demokc" element={<DemoKc />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
