import { createConnection, ConnectionOptions } from 'typeorm';

const CONNECTION_OPTIONS = {
    type: process.env.DB_ENGINE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'db_development',
    entities: ['src/model/*.ts']
};

export const connectDB = () => {
    return createConnection(CONNECTION_OPTIONS as ConnectionOptions);
};
