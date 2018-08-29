import { Router, Request, Response } from 'express';
import { getConnection, Between } from 'typeorm';

import { authorize } from '../middleware/auth';
import { getRate } from '../utils/exchangeRate';

import { Currency } from '../model/Currency';
import { User } from '../model/User';
import { Account } from '../model/Account';
import { Category } from '../model/Category';
import { Transaction } from '../model/Transaction';

const router = Router();

router.use(authorize);

router.get('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    let { startDate, endDate } = req.body;
    try {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const userContext = getConnection().getRepository(User);
        const user = await userContext.findOne(
            userId,
            {
                relations: [
                    'accounts',
                    'accounts.transactions',
                    'accounts.transactions.currency',
                    'accounts.transactions.category'
                ],
                where: {
                    'user.accounts.transactions.dateTime': Between(startDate, endDate)
                }
            });
        res.send({ accounts: user.accounts });
    } catch (err) {
        res.send({ error: 'Transactions fetching DB error.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.body.accountId;
    const currencyId = req.body.currency;
    const categoryId = req.body.categoryId;

    try {
        const userContext = getConnection().getRepository(User);
        const curencyContext = getConnection().getRepository(Currency);
        const accountContext = getConnection().getRepository(Account);
        const categoryContext = getConnection().getRepository(Category);
        const transactionContext = getConnection().getRepository(Transaction);

        const user = await userContext.findOne(userId);
        const currency = await curencyContext.findOne(currencyId);
        const account = await accountContext.findOne(
            accountId,
            { relations: ['user', 'currency'] }
        );
        const category = await categoryContext.findOne(categoryId, { relations: ['user'] });

        if (account.user.id !== userId || category.user.id !== userId) {
            return res.status(401).send();
        }
        const newTransaction = new Transaction();
        newTransaction.account = account;
        newTransaction.category = category;
        newTransaction.currency = currency;

        newTransaction.dateTime = new Date(req.body.dateTime);
        newTransaction.amount = req.body.amount;
        newTransaction.description = req.body.description;
        newTransaction.rate = await getRate(account.currency.code, currency.code);

        const transaction = await transactionContext.save(newTransaction);
        res.send({ transaction });
    } catch (err) {
        res.send({ error: 'Creating transaction failed.' });
    }
});

export default router;
