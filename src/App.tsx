import { useState } from 'react';
import { PDFViewer } from './components/PDFViewer';
import './App.css';

function App() {
  const [isInverted, setIsInverted] = useState(false);
  const [lineColor, setLineColor] = useState('#000000');

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
      </div>
      <div className="viewer-container">
        <PDFViewer
          url="/sample.pdf"
          isInverted={isInverted}
          lineColor={lineColor}
        />
      </div>
    </div>
  );
}

export default App; 