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
        <p className="App-desc">Your company's suite of helpful tools and apps.</p>
        <div className="App-apps">
          {projects.map((project) => (
            <div className="App-card glass" key={project.name}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>{project.emoji}</span>
              <a
                className="App-card-title"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
              <p className="App-card-desc">{project.description}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
