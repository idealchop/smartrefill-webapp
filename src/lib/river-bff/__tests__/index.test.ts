
import { riverBFF } from '../index';

describe('riverBFF', () => {
  describe('login', () => {
    it('should return a user object with id and email on successful login', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = await riverBFF.login(email, password);
      
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email', email);
    });
  });
});
