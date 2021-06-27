import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        postgres: {
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT, 10),
            password: process.env.DB_PASS,
            username: process.env.DB_USER,
            host: process.env.DB_HOST,
        },
        jwt:{
            secret: process.env.JWT_SECRET
        }
    };
});