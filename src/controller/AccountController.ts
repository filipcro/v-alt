import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { authorize } from '../middleware/auth';
import { Account } from '../model/Account';

const router = Router();

router.use(authorize);

router.get('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const accountContext = getConnection().getRepository(Account);
        const accounts = await accountContext.find({ where: { userId } });

        res.send({ accounts: classToPlain(accounts) });
    } catch (err) {
        res.send({ error: 'DB error.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const currencyId = req.body.currency;
    const name = req.body.name;
    try {
        const accountContext = getConnection().getRepository(Account);

        const newAccount = new Account();
        newAccount.name = name;
        newAccount.currencyId = currencyId;
        newAccount.userId = userId;

        const account = await accountContext.save(newAccount);

        res.send({ accounts: [classToPlain(account)] });
    } catch (err) {
        res.send({ error: 'Account creation unsucesfull.' });
    }
});

router.put('/:accountId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.params.accountId || req.body.id;
    const name = req.body.name;
    try {
        const accountContext = getConnection().getRepository(Account);
        const account = await accountContext.findOne(accountId);

        if (account.userId === userId) {
            account.name = name;
            const savedAccount = await accountContext.save(account);
            res.send({ account: [classToPlain(savedAccount)] });
        } else {
            res.sendStatus(401);
        }

    } catch (err) {
        res.send({ error: 'Account cannot be update.' });
    }
});

router.delete('/:accountId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.params.accountId || req.body.id;
    try {
        const accountContext = getConnection().getRepository(Account);
        const account = await accountContext.findOne(accountId);
        if (account.userId === userId) {
            await accountContext.delete(account);
            res.send({ deleted: true });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.send({ error: 'Account cannot be deleted.' });
    }
});

export default router;
