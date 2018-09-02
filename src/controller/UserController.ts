import { Router, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { authorize } from '../middleware/auth';
import { createToken } from '../utils/jwt';
import { User } from '../model/User';

const router = Router();

router.get('/', authorize, async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const userContext = getConnection().getRepository(User);
        const user = await userContext.findOne(userId);
        res.send({ user: classToPlain(user) });
    } catch (err) {
        res.send({ error: 'User not found.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.name = req.body.name;
    newUser.email = req.body.email;

    try {
        const userContext = getConnection().getRepository(User);
        const user = await userContext.save(newUser);
        res.send({
            user: classToPlain(user),
            token: createToken(user)
        });
    } catch (err) {
        res.send({ error: 'User creation failed.' });
    }
});

router.get('/usernametaken', async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const userContext = getConnection().getRepository(User);
        const count = await userContext.count({ where: { username } });
        res.send({
            username,
            taken: count > 0
        });
    } catch (err) {
        res.send({ error: 'Username check failed.' });
    }
});

router.get('/emailtaken', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const userContext = getConnection().getRepository(User);
        const count = await userContext.count({ where: { email } });
        res.send({
            email,
            taken: count > 0
        });
    } catch (err) {
        res.send({ error: 'Email check failed.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send({ error: 'Username and password required' });
    }
    try {
        const userContext = getConnection().getRepository(User);
        const user = await userContext.findOne({ where: { username } });

        if (user && await user.comparePasswords(password)) {
            res.send({
                user: classToPlain(user),
                token: createToken(user)
            });
        } else {
            return res.send({ error: 'Invalid username or password.' });
        }
    } catch (err) {
        return res.send({ error: 'Database error.' });
    }
});

export default router;
