require('dotenv').config({ path: '.env' });

console.log(process.env.POSTGRES_HOST);

const { Sequelize, DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const defineUserModel = require('../../models/User.js'); // Adjust the path as necessary

describe('User Model Integration Test', () => {
    let sequelize;
    let User;

    beforeAll(async () => {
        sequelize = new Sequelize(
            process.env.POSTGRES_DB,
            process.env.POSTGRES_USER,
            process.env.POSTGRES_PASSWORD,
            {
                host: process.env.POSTGRES_HOST,
                port: process.env.POSTGRES_PORT,
                dialect: 'postgres',
                logging: false,
            }
        );

        User = defineUserModel(sequelize, DataTypes);
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should hash the password before creating a user', async () => {
        const userData = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            password: 'plainpassword',
            cart: [],
        };

        const user = await User.create(userData);

        // Verify that the password is hashed
        const isPasswordHashed = await bcryptjs.compare('plainpassword', user.password);
        expect(isPasswordHashed).toBe(true);
        expect(user.password).not.toBe('plainpassword');
    });

    it('should create a user with the correct data', async () => {
        const userData = {
            firstname: 'Jane',
            lastname: 'Smith',
            email: 'jane.smith@example.com',
            password: 'anotherplainpassword',
            cart: [1, 2, 3],
        };

        const user = await User.create(userData);

        expect(user.firstname).toBe('Jane');
        expect(user.lastname).toBe('Smith');
        expect(user.email).toBe('jane.smith@example.com');
        expect(user.cart).toEqual([1, 2, 3]);

        // Verify that the password is hashed
        const isPasswordHashed = await bcryptjs.compare('anotherplainpassword', user.password);
        expect(isPasswordHashed).toBe(true);
    });
});
