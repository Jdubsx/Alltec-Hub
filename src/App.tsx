import React, { useEffect, useState, useRef } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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

const pdfFiles = [
  { name: 'NFPA77.pdf', path: '/pdfs/nfpa77.pdf' },
  { name: 'LPI175.pdf', path: '/pdfs/lpi175.pdf' },
];

function PdfThumbnail({ file, title }: { file: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const render = async () => {
      const loadingTask = pdfjsLib.getDocument(file);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.25 });
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
      }
    };
    render();
  }, [file]);
  return <canvas ref={canvasRef} title={title} style={{ borderRadius: 8, boxShadow: '0 2px 8px #0002', background: '#fff' }} />;
}

function TechnicalReferencesPage() {
  return (
    <div className="App App-technical-references">
      <header className="App-header">
        <img src={logo} className="Company-logo" alt="Alltec Logo" />
        <p className="App-desc">Technical References</p>
        <div className="App-apps" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {pdfFiles.map(pdf => (
            <a
              key={pdf.name}
              href={pdf.path}
              target="_blank"
              rel="noopener noreferrer"
              className="App-card glass"
              style={{ maxWidth: 220, alignItems: 'center', textAlign: 'center', padding: 16 }}
            >
              <PdfThumbnail file={pdf.path} title={pdf.name} />
              <span className="App-card-title" style={{ marginTop: 12, fontSize: '1.1rem' }}>{pdf.name.replace('.pdf', '')}</span>
            </a>
          ))}
        </div>
        <Link to="/" className="App-card-title" style={{marginTop: 32}}>← Back to Hub</Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <header className="App-header">
              <img src={logo} className="Company-logo" alt="Alltec Logo" />
              <p className="App-desc">A suite of helpful tools and apps.</p>
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
                <Link to="/technical-references" className="App-card glass" style={{textDecoration: 'none'}}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>📚</span>
                  <span className="App-card-title">Technical References</span>
                  <p className="App-card-desc">Browse and view important technical PDF documents.</p>
                </Link>
              </div>
            </header>
            <footer className="App-footer">
              Built with <span style={{color: '#e25555', fontWeight: 700}}>❤️</span> by Jacob
            </footer>
          </div>
        }
      />
      <Route path="/technical-references" element={<TechnicalReferencesPage />} />
    </Routes>
  );
}

export default App;
