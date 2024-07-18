const { Sequelize } = require('sequelize');
jest.mock('sequelize', () => {
    const originalModule = jest.requireActual('sequelize');
    return {
        ...originalModule,
        Sequelize: jest.fn().mockImplementation((db, user, pass, options) => {
            console.log(`Sequelize called with db: ${db}, user: ${user}, host: ${options.host}`);
            return {
                define: jest.fn(),
                authenticate: jest.fn().mockResolvedValue(true), // Mock authenticate to bypass actual DB connection for testing
            };
        }),
    };
});

// Mock the environment variables
process.env.POSTGRES_USER = 'admin';
process.env.POSTGRES_PASSWORD = 'admin14';
process.env.POSTGRES_HOST = '127.0.0.1';

// Function to reload the sequelize instance with mocked environment
const loadSequelize = () => {
    jest.resetModules(); // This resets the cache of required modules
    return require('../../config/config.json'); // Adjust the path to where your Sequelize config is
};

describe('Sequelize Configuration', () => {
    it('should use the correct configuration for development environment', () => {
        process.env.NODE_ENV = 'development';
        const sequelizeConfig = loadSequelize();
        const { username, password, host, database, dialect, logging } = sequelizeConfig[process.env.NODE_ENV];
        new Sequelize(database, username, password, { host, dialect, logging });

        expect(Sequelize).toHaveBeenCalledWith('cardory', 'admin', 'admin14', {
            host: '127.0.0.1',
            dialect: 'postgres',
            logging: false,
        });
    });

    it('should use the correct configuration for test environment', () => {
        process.env.NODE_ENV = 'test';
        const sequelizeConfig = loadSequelize();
        const { username, password, host, database, dialect, logging } = sequelizeConfig[process.env.NODE_ENV];
        new Sequelize(database, username, password, { host, dialect, logging });

        expect(Sequelize).toHaveBeenCalledWith('cardory', 'admin', 'admin14', {
            host: '127.0.0.1',
            dialect: 'postgres',
            logging: false,
        });
    });

    it('should use the correct configuration for production environment', () => {
        process.env.NODE_ENV = 'production';
        const sequelizeConfig = loadSequelize();
        const { username, password, host, database, dialect, logging } = sequelizeConfig[process.env.NODE_ENV];
        new Sequelize(database, username, password, { host, dialect, logging });

        expect(Sequelize).toHaveBeenCalledWith('cardory', 'admin', 'admin14', {
            host: '127.0.0.1',
            dialect: 'postgres',
            logging: false,
        });
    });
});
