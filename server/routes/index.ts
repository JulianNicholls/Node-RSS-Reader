import express from 'express';
import { SiteModel } from '../models/feeds';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response) => {
  SiteModel.find({}, (err, docs) => {
    if (err) return res.json({ error: err });

    return res.json({ feeds: docs, error: null });
  });
});

export default router;
