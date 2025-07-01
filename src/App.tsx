import React from 'react';
import logo from './assets/logo.png';
import './App.css';

const projects = [
  {
    name: 'Polygon Geo Center Calculator',
    description: 'Upload a KML or KMZ file containing a polygon to calculate its geographic center (centroid). The app will display the coordinates and show a visual representation of the polygon with the center point marked.',
    url: 'https://jdubsx.github.io/polygon-geo-center-calc/',
    emoji: '🌍',
  },
  {
    name: 'Alltec Out of Office',
    description: 'A simple web app to manage and view out-of-office statuses for your team. Stay up to date on who is available and when.',
    url: 'https://alltec-ooo.deno.dev/',
    emoji: '🏝️',
  },
  // Add more projects here
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Company-logo" alt="Alltec Logo" />
        <p className="App-desc">Alltec suite of helpful tools and apps.</p>
        <div className="App-apps">
          {projects.map((project) => (
            <a
              className="App-card glass"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={project.name}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>{project.emoji}</span>
              <span className="App-card-title">{project.name}</span>
              <p className="App-card-desc">{project.description}</p>
            </a>
          ))}
        </div>
      </header>
      <footer className="App-footer">
        Built with <span style={{color: '#e25555', fontWeight: 700}}>&lt;3</span> by Jacob
      </footer>
    </div>
  );
}

export default App;
