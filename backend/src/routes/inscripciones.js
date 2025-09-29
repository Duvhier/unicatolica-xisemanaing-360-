import { Router } from 'express';
import QRCode from 'qrcode';
import { getDb } from '../db.js';

const router = Router();

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validatePayload(body) {
  const errors = [];
  const requiredStudent = ['nombre', 'cedula', 'correo', 'telefono', 'programa', 'semestre'];
  for (const key of requiredStudent) {
    if (!isNonEmptyString(body[key])) errors.push(`Campo requerido: ${key}`);
  }

  if (!Array.isArray(body.actividades) || body.actividades.length === 0) {
    errors.push('actividades debe ser un arreglo con al menos un elemento');
  }

  const actividad = Array.isArray(body.actividades) ? body.actividades[0] : undefined;
  if (!isNonEmptyString(actividad)) {
    errors.push('actividad inválida');
  }

  if (body.grupo) {
    const g = body.grupo;
    if (!isNonEmptyString(g.nombre)) errors.push('grupo.nombre requerido');
    if (!g.proyecto || !isNonEmptyString(g.proyecto.nombre)) errors.push('grupo.proyecto.nombre requerido');
    if (!g.proyecto || !isNonEmptyString(g.proyecto.descripcion)) errors.push('grupo.proyecto.descripcion requerido');
    if (!g.proyecto || !isNonEmptyString(g.proyecto.categoria)) errors.push('grupo.proyecto.categoria requerido');
    if (!isNonEmptyString(g.institucion)) errors.push('grupo.institucion requerido');
    if (!isNonEmptyString(g.correo)) errors.push('grupo.correo requerido');
  }

  return { ok: errors.length === 0, errors, actividad };
}

router.post('/registro', async (req, res) => {
  try {
    const payload = req.body || {};
    const { ok, errors, actividad } = validatePayload(payload);
    if (!ok) {
      return res.status(400).json({ message: 'Validación fallida', errors });
    }

    const nowIso = new Date().toISOString();
    const db = getDb();

    const stmt = db.prepare(`
      INSERT INTO inscripciones (
        nombre, cedula, correo, telefono, programa, semestre, actividad,
        grupo_nombre, grupo_institucion, grupo_correo, grupo_telefono,
        proyecto_nombre, proyecto_descripcion, proyecto_categoria, integrantes_json,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const grupo = payload.grupo ?? null;
    const integrantes = Array.isArray(grupo?.integrantes) ? grupo.integrantes : [payload.nombre];

    const result = stmt.run(
      payload.nombre,
      payload.cedula,
      payload.correo,
      payload.telefono,
      payload.programa,
      payload.semestre,
      actividad,
      grupo ? grupo.nombre : null,
      grupo ? grupo.institucion : null,
      grupo ? grupo.correo : null,
      grupo ? (grupo.telefono || null) : null,
      grupo ? grupo.proyecto?.nombre : null,
      grupo ? grupo.proyecto?.descripcion : null,
      grupo ? grupo.proyecto?.categoria : null,
      JSON.stringify(integrantes),
      nowIso
    );

    const insertedId = result.lastInsertRowid;

    const qrPayload = {
      id: insertedId,
      estudiante: {
        nombre: payload.nombre,
        cedula: payload.cedula
      },
      actividad,
      emitido: nowIso
    };

    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload), { errorCorrectionLevel: 'M' });

    return res.status(201).json({
      message: 'Inscripción registrada',
      id: insertedId,
      qr: qrDataUrl,
      qrData: qrPayload,
      estudiante: { nombre: payload.nombre, cedula: payload.cedula }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;


