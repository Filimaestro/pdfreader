import { useState } from 'react';
import { PDFViewer } from './components/PDFViewer';
import './App.css';

function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [lineColor, setLineColor] = useState('#000000');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please upload a PDF file');
    }
  };

  return (
    <div className="app">
      <div className="controls-panel">
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={isInverted}
              onChange={(e) => setIsInverted(e.target.checked)}
            />
            Invert Colors
          </label>
        </div>
        <div className="control-group">
          <label>
            Line Color:
            <input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
            />
            {lineColor}
          </label>
        </div>
        <div className="control-group">
          <label className="file-upload">
            Upload PDF:
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="file-input"
            />
            <span className="file-label">Choose a PDF file</span>
          </label>
        </div>
      </div>
      <div className="viewer-container">
        {pdfUrl ? (
          <PDFViewer
            url={pdfUrl}
            isInverted={isInverted}
            lineColor={lineColor}
          />
        ) : (
          <div className="upload-prompt">
            <p>Upload a PDF file to get started</p>
            <p className="upload-hint">Supported: PDF files with layers</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 