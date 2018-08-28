import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Icon } from '../model/Icon';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const iconContext = getConnection().getRepository(Icon);
        const icons = await iconContext.find();
        res.send({ icons });
    } catch (err) {
        res.send({ error: 'User not found.' });
    }
});

export default router;