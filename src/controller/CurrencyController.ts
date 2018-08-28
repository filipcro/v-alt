import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Currency } from '../model/Currency';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const curencyContext = getConnection().getRepository(Currency);
        const currencies = await curencyContext.find();
        res.send({ currencies });
    } catch (err) {
        res.send({ error: 'User not found.' });
    }
});

export default router;