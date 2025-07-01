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
  // Add more projects here
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Company-logo" alt="Alltec Logo" />
        <h1 className="App-title">Alltec Hub</h1>
        <div className="App-apps">
          {projects.map((project) => (
            <a
              className="App-card glass"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={project.name}
            >
              <span style={{ fontSize: '2rem' }}>{project.emoji}</span>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </a>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
