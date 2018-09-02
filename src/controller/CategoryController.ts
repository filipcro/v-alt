import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { authorize } from '../middleware/auth';
import { Category } from '../model/Category';

const router = Router();

router.use(authorize);

router.get('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const categoryContext = getConnection().getRepository(Category);
        const categories = await categoryContext.find({ where: { userId } });
        res.send({ categories: classToPlain(categories) });
    } catch (err) {
        res.send({ error: 'DB error.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const name = req.body.name;
    const incomings = req.body.incomings === true;
    const outgoings = req.body.outgoings === true;
    const iconId = req.body.icon;
    try {
        const categoryContext = getConnection().getRepository(Category);

        const newCategory = new Category();
        newCategory.name = name;
        newCategory.incomings = incomings;
        newCategory.outgoings = outgoings;
        newCategory.iconId = iconId;
        newCategory.userId = userId;

        const category = await categoryContext.save(newCategory);

        res.send({ categories: [classToPlain(category)] });
    } catch (err) {
        res.send({ error: 'Category creation unsucesfull.' });
    }
});

router.put('/:categoryId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const categoryId = req.params.categoryId || req.body.id;
    const name = req.body.name;
    const incomings = req.body.incomings === true;
    const outgoings = req.body.outgoings === true;
    const iconId = req.body.icon;
    try {
        const categoryContext = getConnection().getRepository(Category);
        const category = await categoryContext.findOne(categoryId);

        if (category.userId === userId) {
            category.name = name;
            category.incomings = incomings;
            category.outgoings = outgoings;
            category.iconId = iconId;

            const savedCategory = await categoryContext.save(category);

            res.send({ categories: [classToPlain(savedCategory)] });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.send({ error: 'Category cannot be updated.' });
    }
});

router.delete('/:categoryId?', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const categoryId = req.params.categoryId || req.body.id;
    try {
        const categoryContext = getConnection().getRepository(Category);
        const category = await categoryContext.findOne(categoryId);

        if (category.userId === userId) {
            await categoryContext.delete(category);
            res.send({ deleted: true });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.send({ error: 'Category cannot be deleted.' });
    }
});

export default router;
