import { createUserApi, authUserApi } from '../../service/api.service';
import bcrypt from 'bcrypt';
import * as repository from '../../repository/api.repository';


describe('createUserApi', () => {
    test('corrected', async () => {
        const mock_1 = jest.spyOn(repository, 'getUserByEmailDB');
        const mock_2 = jest.spyOn(repository, 'createUserApiDB');
        const mock_3 = jest.spyOn(bcrypt, 'hash')
        mock_1.mockResolvedValue([]);
        mock_2.mockResolvedValue([{ name: 'Test', surname: 'Testosteronov', email: 'test123@test.com', pwd: 'wewerwrrwrwrwer' }]);
        mock_3.mockResolvedValue('wewerwrrwrwrwer');
        const response = await createUserApi('Test', 'Testosteronov', 'test123@test.com', '1112332332');
        expect(mock_1).toHaveBeenCalled();
        expect(mock_2).toHaveBeenCalled();
        expect(mock_3).toHaveBeenCalled();
        expect(mock_1).toHaveBeenCalledWith('test123@test.com');
        expect(mock_2).toHaveBeenCalledWith('Test', 'Testosteronov', 'test123@test.com', 'wewerwrrwrwrwer');
        expect(mock_3).toHaveBeenCalledWith('1112332332', 3);
        expect(response).toHaveLength(1);
        expect(response).toEqual([{ name: 'Test', surname: 'Testosteronov', email: 'test123@test.com', pwd: 'wewerwrrwrwrwer' }]);


    })

})
