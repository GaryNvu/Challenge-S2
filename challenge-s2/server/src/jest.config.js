module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    testEnvironment: 'node',
    testTimeout: 30000
};
