// src/__tests__/User.test.js
const User = require('../../src/models/user');

describe('User Model', () => {
  it('should create a user successfully', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
      age: 25,
      gender: 'Male',
    };

    const user = await User.create(userData);

    expect(user.firstName).toBe('John');
    expect(user.email).toBe('john@example.com');
  });

  it('should not allow missing required fields', async () => {
    try {
      await User.create({}); // empty object
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.errors.firstName).toBeDefined();
      expect(err.errors.lastName).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    }
  });
});
