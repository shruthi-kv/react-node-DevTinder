const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const app = express();
app.use(express.json());

// Simple routes for testing
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

describe('User API', () => {
  let userData;

  beforeEach(() => {
    userData = { firstName: 'Sam', lastName: 'Lee', email: 'sam@example.com', password: '123' };
  });

  it('should create a user via POST /api/users', async () => {
    const res = await request(app).post('/api/users').send(userData);
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe('Sam');
  });

  it('should fetch a user via GET /api/users/:id', async () => {
    const user = await User.create(userData);
    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('sam@example.com');
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
