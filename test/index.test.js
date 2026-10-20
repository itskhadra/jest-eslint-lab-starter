
const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles an empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles a single word', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('handles words that are already capitalized', () => {
        expect(capitalizeWords('Hello World')).toBe('Hello World');
    });
});

describe('filterActiveUsers', () => {
    test('returns only active users', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];

        expect(filterActiveUsers(users)).toEqual([
            { name: 'Alice', isActive: true },
        ]);
    });

    test('returns an empty array when no users are active', () => {
        expect(filterActiveUsers([
            { name: 'Bob', isActive: false },
        ])).toEqual([]);
    });

    test('handles an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('returns all users when everyone is active', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'John', isActive: true },
        ];

        expect(filterActiveUsers(users)).toEqual(users);
    });
});

describe('logAction', () => {
    test('returns a log message with the username, action, and timestamp', () => {
        const result = logAction('login', 'Alice');

        expect(result).toMatch(
            /^User Alice performed login at \d{4}-\d{2}-\d{2}T/
        );
        expect(Number.isNaN(Date.parse(result.split(' at ')[1]))).toBe(false);
    });

    test('includes the correct username and action', () => {
        const result = logAction('logout', 'Bob');

        expect(result).toContain('User Bob performed logout at ');
    });
});
