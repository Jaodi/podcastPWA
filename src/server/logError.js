//TODO change to a proper logger implementation
const logError = console.error;
const testing = process.argv[2] === 'true';

module.exports = { 
    logError: testing ? logError : () => {},
 };