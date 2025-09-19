const User = require('../../src/models/user');
const ConnectionRequest = require('../../src/models/connectionRequest');

describe('ConnectionRequest Model', () => {
  let user1, user2;

  beforeEach(async () => {
    user1 = await User.create({ firstName: 'Alice', lastName: 'Smith', email: 'a@a.com', password: '123' });
    user2 = await User.create({ firstName: 'Bob', lastName: 'Jones', email: 'b@b.com', password: '123' });
  });

  it('should create a connection request', async () => {
    const request = await ConnectionRequest.create({
      fromUserId: user1._id,
      toUserId: user2._id,
      status: 'interested'
    });

    expect(request.status).toBe('interested');
    expect(request.fromUserId.toString()).toBe(user1._id.toString());
  });

  it('should not allow request to self', async () => {
    try {
      await ConnectionRequest.create({
        fromUserId: user1._id,
        toUserId: user1._id,
        status: 'interested'
      });
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBe('you cannot send request to yourself');
    }
  });
});
