import puppeteer from 'puppeteer';

export const generatePDF = async (resumeId: string, token: string): Promise<Buffer> => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Pass the auth token to the frontend via local storage or headers if possible.
        // Since we are navigating to a URL, we can use a cookie or local storage injection.
        // Easier: The frontend route /preview/:id should ideally be public OR we inject the token.
        // Let's inject the token into localStorage before navigation completes mostly.

        const frontendUrl = process.env.FRONTEND_URL;
        if (!frontendUrl) {
            throw new Error('FRONTEND_URL environment variable is required for PDF generation');
        }
        const targetUrl = `${frontendUrl}/preview/${resumeId}`;

        // Set viewport to A4 dimensions (approx)
        await page.setViewport({ width: 794, height: 1123 }); // 96 DPI A4

        // We can set the token in localStorage
        await page.evaluateOnNewDocument((token) => {
            localStorage.setItem('auth-storage', JSON.stringify({ state: { token: token }, version: 0 }));
        }, token);

        await page.goto(targetUrl, { waitUntil: 'networkidle0' });

        // Wait for resume element to be visible
        await page.waitForSelector('.resume-paper');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
        });

        await browser.close();
        return Buffer.from(pdfBuffer);

    } catch (error) {
        console.error("PDF Generation Error:", error);
        if (browser) await browser.close();
        throw new Error("Failed to generate PDF");
    }
};
