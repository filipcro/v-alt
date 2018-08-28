import userController from './UserController';
import iconController from './IconController';
import currencyController from './CurrencyController';
import accountController from './AccountController';
import categoryController from './CategoryController'

export function applyRoutes(app) {
    app.use('/user', userController);
    app.use('/icon', iconController);
    app.use('/currency', currencyController);
    app.use('/account', accountController);
    app.use('/category', categoryController);
}
