// jest.config.js
module.exports = {
    // ... other Jest config
    transformIgnorePatterns: [
        '/node_modules/(?!uuid)', // This will transpile the 'uuid' package
    ],
};