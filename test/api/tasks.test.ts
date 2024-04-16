import request from 'supertest';
import sequelize from '../../src/database';

import app from '../../src/app';

// Basic check for database before starting tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();  // Close connection
});

describe('GET /v1/tasks', () => {
  it('should return an array of tasks', async () => {
    // add a task for testing
    await request(app).post('/v1/tasks').send({ title: 'Test Task', description: 'Test Desc', status: 'INCOMPLETE' });

    const response = await request(app).get('/v1/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].title).toEqual('Test Task');

    // delete the task later
    await request(app).delete(`/v1/tasks/${response.body[0].id}`);
  });

});

describe('POST /v1/tasks', () => {
  it('should create a new task', async () => {
    const response = await request(app).post('/v1/tasks').send({
      title: 'New Task',
      description: 'Details of new task',
      status: 'INCOMPLETE',
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toEqual('New Task');

    // delete the task later
    await request(app).delete(`/v1/tasks/${response.body.id}`);
  });

  it('should not create a new task due to invalid status', async () => {
    const response = await request(app).post('/v1/tasks').send({
      title: 'New Task',
      description: 'Details of new task',
      status: 'PENDING',
    });
    expect(response.status).toBe(400);
  });
});

describe('PATCH /v1/tasks/:id', () => {
  it('should update an existing task', async () => {
    let response = await request(app).post('/v1/tasks').send({ title: 'Old Title', description: 'Old Desc', status: 'COMPLETE' });
    const task = response.body;

    response = await request(app).patch(`/v1/tasks/${task.id}`).send({ status: 'INCOMPLETE' });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual('INCOMPLETE');

    // delete the task later
    await request(app).delete(`/v1/tasks/${response.body.id}`);
  });

  it('should not update a task due to invalid status', async () => {
    let response = await request(app).post('/v1/tasks').send({ title: 'Old Title', description: 'Old Desc', status: 'COMPLETE' });
    const task = response.body;

    response = await request(app).patch(`/v1/tasks/${task.id}`).send({ status: 'PENDING' });
    expect(response.status).toBe(400);

    // delete the task later
    await request(app).delete(`/v1/tasks/${task.id}`);
  });
});

describe('DELETE /v1/tasks/:id', () => {
  it('should delete an existing task', async () => {
    let response = await request(app).post('/v1/tasks').send({ title: 'To Delete', description: 'Desc', status: 'INCOMPLETE' });
    const task = response.body;

    response = await request(app).delete(`/v1/tasks/${task.id}`);
    expect(response.status).toBe(204);
  });
});
