import { GlobalWorkerOptions } from 'pdfjs-dist';

// Import the worker directly
import PDFWorker from 'pdfjs-dist/build/pdf.worker?worker';

// Set up the worker
GlobalWorkerOptions.workerPort = new PDFWorker(); 