import QRCode from 'qrcode';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL absoluta del formulario en producción
const formularioUrl = 'https://unicatolica-xisemanaing-360.vercel.app/formulario';

// Ruta de salida: sobrescribe la imagen usada por el sitio
const outputPath = path.join(__dirname, 'src', 'assets', 'qr_formulario.png');

try {
  await QRCode.toFile(outputPath, formularioUrl, {
    width: 600,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000000',
      light: '#ffffffff'
    }
  });
  console.log('✅ QR actualizado ->', outputPath);
  console.log('🔗 URL:', formularioUrl);
} catch (err) {
  console.error('❌ Error generando QR:', err);
  process.exit(1);
}


