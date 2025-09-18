import { z } from 'zod';
import { createPresignedPutUrl } from '../services/s3.service.js';

export async function presignUpload(req, res) {
  try {
    const schema = z.object({
      key: z.string().min(1),
      contentType: z.string().min(1),
      expiresIn: z.number().int().positive().max(3600).optional(),
    });
    const body = schema.parse(req.body);
    const result = await createPresignedPutUrl(body);
    res.json({ ok: true, ...result });
  } catch (e) {
    res.status(400).json({ ok: false, message: 'Bad request' });
  }
}


