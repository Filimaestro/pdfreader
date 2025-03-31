import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  isInverted?: boolean;
  lineColor?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  url, 
  isInverted = false,
  lineColor = '#000000' // Default black
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isProjectorMode, setIsProjectorMode] = useState(false);

  // Handle F11 key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        toggleProjectorMode();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleProjectorMode = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsProjectorMode(true);
      } catch (err) {
        console.error('Error entering fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsProjectorMode(false);
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
      }
    }
  };

  useEffect(() => {
    const loadPDF = async () => {
      if (!url) return;
      
      try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setPdf(pdf);
        setNumPages(pdf.numPages);
        renderPage(1);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, [url]);

  const renderPage = async (pageNumber: number) => {
    if (!pdf) return;

    try {
      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const context = canvas.getContext('2d')!;
      
      // Set up the canvas for color manipulation
      context.save();
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create a composite operation to change colors
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = lineColor;
      context.fillStyle = lineColor;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      context.restore();
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  // Re-render when line color changes
  useEffect(() => {
    if (pdf) {
      renderPage(currentPage);
    }
  }, [lineColor]);

  return (
    <div className={`pdf-viewer ${isProjectorMode ? 'projector-mode' : ''}`}>
      {!isProjectorMode && (
        <div className="controls">
          <button 
            onClick={() => renderPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {numPages}</span>
          <button 
            onClick={() => renderPage(currentPage + 1)}
            disabled={currentPage >= numPages}
          >
            Next
          </button>
          <button 
            onClick={toggleProjectorMode}
            className="projector-mode-btn"
          >
            Projector Mode (F11)
          </button>
        </div>
      )}
      <div 
        className="pdf-container"
        style={{
          filter: isInverted ? 'invert(100%)' : 'none',
          backgroundColor: isInverted ? 'black' : 'white'
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}; 