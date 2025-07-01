import React from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Company-logo" alt="Alltec Logo" />
        <h1 className="App-title">Alltec Hub</h1>
        <div className="App-apps">
          {/* Placeholder for suite of applications */}
          <div className="App-card">
            <h2>Application 1</h2>
            <p>Description of the first app.</p>
          </div>
          <div className="App-card">
            <h2>Application 2</h2>
            <p>Description of the second app.</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
