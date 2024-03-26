import { createTaskDB } from '../../repository/task.repository';


const client = {
    query: jest.fn()
}

jest.mock('pg', function () {
    const pool = {
        connect: jest.fn(() => client),
    }

    return {
        Pool: jest.fn(() => pool)
    }
});

describe('createTaskDB', () => {
    test('correct', async () => {
        const mock = [{ id: 1, taks: 'ts', user_id: 1 }];

        client.query.mockResolvedValue({ rows: mock });

        const res = await createTaskDB('ts', 1);
        expect(client.query).toHaveBeenCalled();
        expect(res).toHaveLength(1);
    })
})

