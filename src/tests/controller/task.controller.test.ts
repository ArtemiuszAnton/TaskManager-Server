import supertest from 'supertest';
import { app } from '../../app';

test('POST/task', async () => {
    const res = await supertest(app).post('/task').send({ task: 'ts', user_id: '1' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].task).toBe('ts');
})