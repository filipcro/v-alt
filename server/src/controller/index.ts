import UserController from './UserController';
import IconController from './IconController';
import CurrencyController from './CurrencyController';
import AccountController from './AccountController';
import CategoryController from './CategoryController';
import TransactionController from './TransactionController';

export function applyRoutes(app) {
    app.use('/user', UserController);
    app.use('/icon', IconController);
    app.use('/currency', CurrencyController);
    app.use('/account', AccountController);
    app.use('/category', CategoryController);
    app.use('/transaction', TransactionController);
}
