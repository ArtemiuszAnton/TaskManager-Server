import { createTask, getAllTasks } from '../../service/task.service';
import * as repository from '../../repository/task.repository';


describe('createTask', () => {
    test('corrected', async () => {
        const mock = jest.spyOn(repository, 'createTaskDB');
        mock.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' }]);

        const response = await createTask('task_1', '1');
        expect(response).toEqual([{ id: 1, task: 'task_1', user_id: '1' }]);
        expect(response).toHaveLength(1);
        expect(response.length).toBeGreaterThan(0);
        expect(mock).toHaveBeenCalled();
    })
})


describe('getAllTasks', () => {
    test('corrected', async () => {
        const mock = jest.spyOn(repository, 'getAllTasksDB');
        mock.mockResolvedValue([{ id: 1, task: 'task_1', user_id: '1' }, { id: 2, task: 'task_2', user_id: '2' }]);
        const response = await getAllTasks();

        expect(mock).toHaveBeenCalled();
        expect(response).toEqual([{ id: 1, task: 'task_1', user_id: '1' }, { id: 2, task: 'task_2', user_id: '2' }]);
        expect(response).toHaveLength(2);
        expect(response.length).toBeGreaterThan(1)
    })
})