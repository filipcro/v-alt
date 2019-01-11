import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { Icon } from '../model/Icon';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const iconContext = getConnection().getRepository(Icon);
        const icons = await iconContext.find();
        res.send({ icons: classToPlain(icons) });
    } catch (err) {
        res.send({ error: 'DB error.' });
    }
});

export default router;
