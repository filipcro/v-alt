import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { authorize } from '../middleware/auth';

import { User } from '../model/User';
import { Icon } from '../model/Icon';
import { Category } from '../model/Category';

const router = Router();

router.use(authorize);

router.get('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const userContext = getConnection().getRepository(User);
        const user = await userContext
            .findOne(
                userId,
                { relations: ['categories', 'categories.icon'] }
            );
        res.send({ categories: user.categories });
    } catch (err) {
        res.send({ error: 'Account fetch failed.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const userContext = getConnection().getRepository(User);
        const categoryContext = getConnection().getRepository(Category);
        const iconContext = getConnection().getRepository(Icon);

        const user = await userContext.findOne(userId);
        const icon = await iconContext.findOne(req.body.icon);

        const newCategory = new Category();
        newCategory.name = req.body.name;
        newCategory.incomings = req.body.incomings === true;
        newCategory.outgoings = req.body.outgoings === true;

        newCategory.icon = icon;
        newCategory.user = user;

        const category = await categoryContext.save(newCategory);

        res.send({ category });
    } catch (err) {
        res.send({ error: 'Category creation unsucesfull.' });
    }
});

router.delete('/:categoryId', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const categoryId = req.params.categoryId;
    try {
        const categoryContext = getConnection().getRepository(Category);

        const category = await categoryContext.findOne(categoryId, { relations: ['user'] });
        if (category.user.id === userId) {
            await categoryContext.delete(category);
            return res.send({
                deleted: true,
                msg: 'Category deleted.'
            });
        }
        return res.status(401).send();
    } catch (err) {
        res.send({ error: 'Category cannot be deleted.' });
    }
});

router.put('/:categoryId', async (req: Request, res: Response) => {
    const userId = req.user.id;
    const categoryId = req.params.categoryId;
    try {
        const categoryContext = getConnection().getRepository(Category);
        const iconContext = getConnection().getRepository(Icon);

        const category = await categoryContext.findOne(categoryId, { relations: ['user'] });

        if (category.user.id === userId) {
            const icon = await iconContext.findOne(req.body.icon);

            category.name = req.body.name;
            category.incomings = req.body.incomings;
            category.outgoings = req.body.outgoings;
            category.icon = icon;
            const savedCategory = await categoryContext.save(category);
            return res.send({ category: savedCategory });
        }

        return res.status(401).send();

    } catch (err) {
        res.send({ error: 'Account cannot be deleted.' });
    }
});

export default router;
