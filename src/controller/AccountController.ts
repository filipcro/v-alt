import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { authorize } from '../middleware/auth';

import { User } from '../model/User';
import { Account } from '../model/Account';
import { Currency } from '../model/Currency';

const router = Router();

router.use(authorize);

router.get('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const userContext = getConnection().getRepository(User);
        const user = await userContext
            .findOne(userId, {
                relations: ['accounts', 'accounts.currency']
            });
        res.send({ accounts: user.accounts });
    } catch (err) {
        res.send({ error: 'Account fetch failed.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const currencyId = req.body.currency;
    try {
        const userContext = getConnection().getRepository(User);
        const curencyContext = getConnection().getRepository(Currency);
        const accountContext = getConnection().getRepository(Account);

        const user = await userContext.findOne(userId);
        const currency = await curencyContext.findOne(currencyId);

        const newAccount = new Account();
        newAccount.name = req.body.name;

        newAccount.currency = currency;
        newAccount.user = user;

        const account = await accountContext.save(newAccount);

        res.send({ account });
    } catch (err) {
        res.send({ error: 'Account creation unsucesfull.' });
    }
});

router.delete('/:accountId', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    try {
        const accountContext = getConnection().getRepository(Account);

        const account = await accountContext.findOne(accountId, { relations: ['user'] });
        if (account.user.id === userId) {
            await accountContext.delete(account);
            return res.send({
                deleted: true,
                msg: 'Account deleted.'
            });
        }
        return res.status(401).send();

    } catch (err) {
        res.send({ error: 'Account cannot be deleted.' });
    }
});

router.put('/:accountId', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.params.accountId;
    try {
        const accountContext = getConnection().getRepository(Account);
        const account = await accountContext.findOne(accountId, { relations: ['user'] });

        if (account.user.id === userId) {
            account.name = req.body.name;
            const savedAccount = await accountContext.save(account);
            return res.send({ account: savedAccount });
        }

        return res.status(401).send();

    } catch (err) {
        res.send({ error: 'Account cannot be deleted.' });
    }
});

export default router;
