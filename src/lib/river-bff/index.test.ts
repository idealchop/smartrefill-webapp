
import { riverBFF } from './index';

describe('riverBFF - signup', () => {

  // Positive Test Case
  it('should sign up a user successfully and return user data', async () => {
    const fullName = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';

    const user: any = await riverBFF.signup(fullName, email, password);

    expect(user).toBeDefined();
    expect(user.id).toBe('123');
    expect(user.fullName).toBe(fullName);
    expect(user.email).toBe(email);
  });

  // Negative Test Case
  it('should throw an error when signup fails', async () => {
    const fullName = 'Test Fail';
    const email = 'fail@example.com';
    const password = 'fail-test'; // Special password to trigger failure

    // We expect the promise to be rejected
    await expect(riverBFF.signup(fullName, email, password))
      .rejects
      .toThrow('Simulated API Error: Invalid credentials');
  });

});
