import assert from "assert";

describe('Basic mocha string test', () => {
    it('should return number of characters in a string', () => {
        assert.equal("hello".length, 5);
    });

    it('should return the first character of the string', () => {
        assert.equal("Hello".charAt(0), 'H');
    });
})