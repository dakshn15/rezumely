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
    onProgress?.({ status: 'preparing', progress: 5, message: 'Preparing document...' });

    const paperSizes: Record<string, { width: number; height: number }> = {
      a4: { width: 210, height: 297 },
      letter: { width: 215.9, height: 279.4 },
    };

    const size = paperSizes[settings.paperSize] || paperSizes.a4;

    const mmToPx = 96 / 25.4;

    // Cleaner scale — avoid devicePixelRatio stacking
    const scale = settings.quality === 'high' ? 2.5 : 1.5;

    onProgress?.({ status: 'rendering', progress: 20, message: 'Cloning content...' });

    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.transform = 'none';
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '0';
    clonedElement.style.background = '#ffffff';
    clonedElement.style.width = `${Math.round(size.width * mmToPx)}px`;

    if (settings.colorMode === 'bw') {
      clonedElement.style.filter = 'grayscale(100%)';
    }

    if (!settings.includePhoto) {
      clonedElement.querySelectorAll('[data-photo]').forEach((p) => p.remove());
    }

    clonedElement.querySelectorAll('a').forEach((l) => {
      (l as HTMLElement).style.textDecoration = 'none';
      (l as HTMLElement).style.color = 'inherit';
    });

    document.body.appendChild(clonedElement);
    await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 120));

    onProgress?.({ status: 'rendering', progress: 40, message: 'Preparing render frame...' });

    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = `${Math.round(size.width * mmToPx)}px`;
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const idoc = iframe.contentDocument as Document;
    const iwin = iframe.contentWindow as Window;

    Array.from(document.head.childNodes).forEach((node) => {
      if (
        node.nodeName === 'STYLE' ||
        (node.nodeName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet')
      ) {
        idoc.head.appendChild(node.cloneNode(true));
      }
    });

    const style = idoc.createElement('style');
    style.textContent = `
      html, body { margin: 0; padding: 0; background: #fff; }
      * { box-sizing: border-box; }
      img { max-width: 100%; height: auto; }
      @page { margin: 0; size: ${size.width}mm ${size.height}mm; }
      * { -webkit-print-color-adjust: exact; color-adjust: exact; }
    `;
    idoc.head.appendChild(style);

    idoc.body.appendChild(clonedElement);

    try {
      await (iwin as any).document.fonts.ready;
    } catch {}

    await new Promise((r) => setTimeout(r, 200));

    onProgress?.({ status: 'rendering', progress: 55, message: 'Rendering to canvas...' });

    const renderTarget = idoc.body.firstElementChild as HTMLElement;

    const canvas = await html2canvas(renderTarget, {
      scale,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: Math.round(size.width * mmToPx),
      windowHeight: renderTarget.getBoundingClientRect().height, // more accurate than scrollHeight
      scrollX: 0,
      scrollY: 0,
    });

    document.body.removeChild(iframe);

    onProgress?.({ status: 'generating', progress: 70, message: 'Generating PDF...' });

    const pagePxHeight = Math.round(size.height * mmToPx * scale);

    const fullPages = Math.floor(canvas.height / pagePxHeight);
    const remainingPx = canvas.height - fullPages * pagePxHeight;

    // Ignore tiny overflow that causes blank page
    const totalPages = remainingPx > 10 ? fullPages + 1 : fullPages;

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: settings.paperSize });

    for (let page = 0; page < totalPages; page++) {
      const sourceY = page * pagePxHeight;
      const sourceHeight = Math.min(pagePxHeight, canvas.height - sourceY);

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;

      const ctx = pageCanvas.getContext('2d');
      if (!ctx) continue;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, pageCanvas.width, sourceHeight);

      const imgData = pageCanvas.toDataURL('image/png');

      if (page > 0) pdf.addPage();

      const imgWidthMm = size.width;
      const imgHeightMm = (pageCanvas.height / pageCanvas.width) * imgWidthMm;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, imgHeightMm, undefined, 'FAST');

      const progress = 70 + Math.round(((page + 1) / totalPages) * 25);
      onProgress?.({ status: 'generating', progress, message: `Page ${page + 1} of ${totalPages}` });
    }

    pdf.save(filename);

    onProgress?.({ status: 'complete', progress: 100, message: 'PDF ready!' });
  } catch (error) {
    onProgress?.({ status: 'error', progress: 0, message: 'Export failed' });
    throw error;
  }
};
