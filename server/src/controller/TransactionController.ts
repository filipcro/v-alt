import { Router, Request, Response } from 'express';
import { getConnection, Between, Equal } from 'typeorm';
import { classToPlain } from 'class-transformer';

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
    const startDate = new Date(req.query.startdate);
    const endDate = new Date(req.query.enddate);
    try {
        const transactions = await getConnection()
            .getRepository(Transaction)
            .createQueryBuilder('transaction')
            .innerJoin('transaction.account', 'account')
            .where('transaction.dateTime >= :startDate', { startDate })
            .andWhere('transaction.dateTime <= :endDate', { endDate })
            .andWhere('account.userId = :userId', { userId })
            .getMany();

        const accountSums = await getConnection()
            .getRepository(Account)
            .createQueryBuilder('account')
            .select('SUM(transaction.amount * transaction.rate)', 'sum')
            .addSelect('account.id', 'id')
            .leftJoin(
                'account.transactions',
                'transaction',
                'transaction.dateTime < :startDate',
                { startDate }
            ).where('account.userId = :userId', { userId })
            .groupBy('account.id')
            .getRawMany();

        res.send({
            accountSums: accountSums.map(accountSum => ({
                id: accountSum.id.toString(),
                sum: accountSum.sum || 0
            })
        ),
            transactions: classToPlain(transactions)
        });
    } catch (err) {
        res.send({ error: 'Transactions fetching DB error.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const accountId = req.body.accountId;
    const currencyId = req.body.currencyId;
    const categoryId = req.body.categoryId;
    const dateTime = new Date(req.body.dateTime);
    const amount = req.body.amount;
    const description = req.body.description;
    try {
        const accountContext = getConnection().getRepository(Account);
        const categoryContext = getConnection().getRepository(Category);
        const currencyContext = getConnection().getRepository(Currency);
        const transactionContext = getConnection().getRepository(Transaction);

        const account = await accountContext.findOne(accountId, { relations: ['currency'] });
        const category = await categoryContext.findOne(categoryId);
        const currency = await currencyContext.findOne(currencyId);

        if (account.userId !== userId) {
            res.sendStatus(401);
            return;
        }

        if (Category && category.userId !== userId) {
            res.sendStatus(401);
            return;
        }

        const rate = await getRate(account.currency.code, currency.code, dateTime);

        const transaction = new Transaction();
        transaction.accountId = accountId;
        transaction.categoryId = categoryId;
        transaction.currencyId = currencyId;
        transaction.dateTime = dateTime;
        transaction.amount = amount;
        transaction.description = description;
        transaction.rate = rate;
        const savedTransaction = await transactionContext.save(transaction);

        res.send({ transactions: [classToPlain(savedTransaction)] });
    } catch (err) {
        res.send({ error: 'Creating transaction failed.' });
    }
});

router.put('/:transactionId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const transactionId = req.params.transactionId || req.body.id;
    const accountId = req.body.accountId;
    const currencyId = req.body.currencyId;
    const categoryId = req.body.categoryId;
    const dateTime = new Date(req.body.dateTime);
    const amount = req.body.amount;
    const description = req.body.description;
    try {
        const accountContext = getConnection().getRepository(Account);
        const categoryContext = getConnection().getRepository(Category);
        const currencyContext = getConnection().getRepository(Currency);
        const transactionContext = getConnection().getRepository(Transaction);

        const account = await accountContext.findOne(accountId, { relations: ['currency'] });
        const transaction = await transactionContext
            .findOne(transactionId, { relations: ['account'] });
        const category = await categoryContext.findOne(categoryId);
        const currency = await currencyContext.findOne(currencyId);

        if (transaction.account.userId !== userId) {
            res.sendStatus(401);
            return;
        }

        if (account.userId !== userId) {
            res.sendStatus(401);
            return;
        }

        if (Category && category.userId !== userId) {
            res.sendStatus(401);
            return;
        }

        const rate = await getRate(account.currency.code, currency.code, dateTime);

        transaction.accountId = accountId;
        transaction.categoryId = categoryId || null;
        transaction.currencyId = currencyId;
        transaction.dateTime = dateTime;
        transaction.amount = amount;
        transaction.description = description;
        transaction.rate = rate;
        const savedTransaction = await transactionContext.save(transaction);

        res.send({ transactions: [classToPlain(savedTransaction)] });
    } catch (err) {
        res.send({ error: 'Creating transaction failed.' });
    }
});

router.delete('/:transactionId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const transactionId = req.params.transactionId || req.body.id;
    try {
        const transactionContext = getConnection().getRepository(Transaction);
        const transaction = await transactionContext
            .findOne(transactionId, { relations: ['account'] });

        if (transaction.account.userId === userId) {
            await transactionContext.delete(transaction);
            res.send({ deleted: true });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.send({ error: 'Transaction cannot be deleted.' });
    }
});

export default router;
