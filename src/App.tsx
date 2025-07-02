import React, { useEffect, useState, useRef } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
pdfjsLib.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/pdf.worker.min.js';

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
  { name: 'NFPA77.pdf', path: process.env.PUBLIC_URL + '/pdfs/nfpa77.pdf' },
  { name: 'LPI175.pdf', path: process.env.PUBLIC_URL + '/pdfs/lpi175.pdf' },
  { name: 'NFPA780.pdf', path: process.env.PUBLIC_URL + '/pdfs/nfpa780.pdf' },
  { name: 'UL96.pdf', path: process.env.PUBLIC_URL + '/pdfs/ul96.pdf' },
  // Add more PDFs here as needed
];

function PdfThumbnail({ file, title }: { file: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(file);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const desiredHeight = 180;
        const viewport = page.getViewport({ scale: 1 });
        const scale = desiredHeight / viewport.height;
        const scaledViewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (canvas && isMounted) {
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;
          await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
          setLoading(false);
        }
      } catch (err) {
        setError(true);
      }
    };
    render();
    return () => { isMounted = false; };
  }, [file]);
  if (loading) return <div className="Pdf-loading">Loading...</div>;
  if (error) return <div className="Pdf-error">PDF Error</div>;
  return <canvas ref={canvasRef} title={title} className="Pdf-thumb-canvas" />;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, info: any) { /* log error if needed */ }
  render() {
    if (this.state.hasError) {
      return <div style={{color:'#e25555',padding:32}}>Something went wrong loading the PDFs. Please try again later.</div>;
    }
    return this.props.children;
  }
}

function TechnicalReferencesPage() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
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
                  <div
                    className="App-card glass"
                    key={project.name}
                    onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
                    tabIndex={0}
                    role="button"
                    onKeyPress={e => { if (e.key === 'Enter') window.open(project.url, '_blank', 'noopener,noreferrer'); }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="App-card-icon">{project.emoji}</div>
                    <span className="App-card-title">{project.name}</span>
                    <p className="App-card-desc">{project.description}</p>
                  </div>
                ))}
                <Link
                  to="/technical-references"
                  className="App-card glass"
                  style={{textDecoration: 'none', cursor: 'pointer'}}
                >
                  <div className="App-card-icon">📚</div>
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
