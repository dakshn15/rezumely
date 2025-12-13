import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportSettings } from '@/store/settingsStore';

export interface ExportProgress {
  status: 'preparing' | 'rendering' | 'generating' | 'complete' | 'error';
  progress: number;
  message: string;
}

export const exportToPDF = async (
  element: HTMLElement,
  filename: string,
  settings: ExportSettings,
  onProgress?: (progress: ExportProgress) => void
): Promise<void> => {
  try {
    onProgress?.({ status: 'preparing', progress: 10, message: 'Preparing document...' });

    const paperSizes = {
      a4: { width: 210, height: 297 },
      letter: { width: 215.9, height: 279.4 },
    };

    const size = paperSizes[settings.paperSize];
    const scale = settings.quality === 'high' ? 2 : 1.5;

    onProgress?.({ status: 'rendering', progress: 30, message: 'Rendering content...' });

    // Clone element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = `${size.width}mm`;
    clonedElement.style.minHeight = `${size.height}mm`;
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.background = 'white';
    
    // Apply grayscale if black and white mode
    if (settings.colorMode === 'bw') {
      clonedElement.style.filter = 'grayscale(100%)';
    }

    // Remove photo if setting is disabled
    if (!settings.includePhoto) {
      const photos = clonedElement.querySelectorAll('[data-photo]');
      photos.forEach((photo) => photo.remove());
    }

    document.body.appendChild(clonedElement);

    onProgress?.({ status: 'rendering', progress: 50, message: 'Capturing pages...' });

    const canvas = await html2canvas(clonedElement, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: size.width * 3.78, // mm to pixels (approximate)
    });

    document.body.removeChild(clonedElement);

    onProgress?.({ status: 'generating', progress: 70, message: 'Generating PDF...' });

    const imgWidth = size.width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = size.height;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: settings.paperSize,
    });

    // Add metadata
    pdf.setProperties({
      title: filename.replace('.pdf', ''),
      creator: 'Resume Builder Pro',
    });

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(
      canvas.toDataURL('image/jpeg', settings.quality === 'high' ? 1.0 : 0.85),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', settings.quality === 'high' ? 1.0 : 0.85),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;
    }

    onProgress?.({ status: 'complete', progress: 100, message: 'Download ready!' });

    pdf.save(filename);
  } catch (error) {
    onProgress?.({ status: 'error', progress: 0, message: 'Export failed. Please try again.' });
    throw error;
  }
};
