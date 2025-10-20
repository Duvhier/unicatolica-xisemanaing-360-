import { Resend } from 'resend';

/**
 * Serverless endpoint to send registration confirmation email with QR.
 * Requires RESEND_API_KEY configured in the deployment environment.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { to, nombre, evento, cedula, programa, semestre, qrSrc, id } = req.body || {};

  if (!to || !qrSrc || !nombre) {
    return res.status(400).json({ message: 'Faltan campos obligatorios: to, nombre, qrSrc' });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return res.status(500).json({ message: 'RESEND_API_KEY no configurado' });
    }

    const resend = new Resend(resendApiKey);

    // Build absolute URLs for assets
    const proto = (req.headers['x-forwarded-proto'] || 'https');
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${proto}://${host}`;
    const logoUrl = `${baseUrl}/unicatolica-logo.svg`;

    const titulo = 'Inscripción registrada - XI Semana de la Ingeniería';

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; background:#f6f7fb; padding:24px; color:#111827;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 20px rgba(0,0,0,0.06)">
          <tr>
            <td style="background:#062a5a;padding:20px 24px;">
              <img src="${logoUrl}" alt="UNICATÓLICA" height="40" style="display:block;filter:brightness(1.1)"/>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 24px 0 24px;">
              <h1 style="margin:0 0 8px 0;font-size:22px;color:#062a5a;">Inscripción registrada</h1>
              <p style="margin:0;color:#374151">Hola ${nombre}, tu registro fue exitoso.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 0 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:#f9fafb;border:1px solid #eef2f7;border-radius:12px;">
                <tr>
                  <td style="padding:16px 16px 0 16px;color:#111827;font-weight:600;">Detalles del registro</td>
                </tr>
                <tr>
                  <td style="padding:8px 16px 16px 16px;color:#374151;font-size:14px;">
                    <div><strong>Evento:</strong> ${evento || '—'}</div>
                    <div><strong>Documento:</strong> ${cedula || '—'}</div>
                    <div><strong>Programa/Semestre:</strong> ${programa || '—'} ${semestre ? `- ${semestre}` : ''}</div>
                    <div><strong>ID de inscripción:</strong> ${id || '—'}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px;text-align:center;">
              <p style="margin:0 0 8px 0;color:#374151">Presenta este código QR para confirmar tu participación:</p>
              <img src="${qrSrc}" alt="Código QR" width="224" height="224" style="display:block;margin:8px auto;border:8px solid #f3f4f6;border-radius:16px;"/>
              <div style="margin-top:8px">
                <a href="${qrSrc}" style="display:inline-block;background:#062a5a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:999px;font-weight:600">Abrir QR</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px;color:#6b7280;font-size:12px;">
              Si recibiste este mensaje por error, por favor ignóralo. Este correo fue enviado automáticamente por el sistema de inscripciones de la Facultad de Ingeniería.
            </td>
          </tr>
          <tr>
            <td style="background:#f3f4f6;padding:14px 24px;color:#6b7280;font-size:12px;">
              Universidad Católica Lumen Gentium – Facultad de Ingeniería
            </td>
          </tr>
        </table>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Facultad de Ingeniería <no-reply@unicatolica.edu.co>',
      to: [to],
      subject: titulo,
      html
    });

    if (error) {
      return res.status(500).json({ message: 'Error enviando correo', error });
    }

    return res.status(200).json({ message: 'Correo enviado', id: data?.id });
  } catch (err) {
    return res.status(500).json({ message: 'Fallo inesperado enviando correo', error: String(err?.message || err) });
  }
}


