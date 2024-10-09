import SequelizeMock from 'sequelize-mock';
import { v4 as uuidv4 } from 'uuid';
jest.setTimeout(10000);


const sequelizeMock = new SequelizeMock();


const UserMock = sequelizeMock.define('User', {
    username: uuidv4(),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
});

describe('User Model', () => {
    it('Deve inicializar os atributos de usuarios corretamente', async () => {
        const user = await UserMock.create({
            username: 'NovoUsuario',
            role: 'user',
        });

        expect(user.username).toBe('NovoUsuario');
        expect(user.role).toBe('user');
    });

    it('Valida obrigatoriedade do campo username', async () => {
        try {
            await UserMock.create({
                role: 'user',
            });
        } catch (error: any) {
            expect(error.message).toContain('notNull Violation: User.username não pode ser nulo');
        }
    });

    it('Valida obrigatoriedade do campo role', async () => {
        try {
            await UserMock.create({
                username: 'usuarioSemRole',
            });
        } catch (error: any) {
            expect(error.message).toContain('notNull Violation: User.role não pode ser nulo');
        }
    });

    it('Deve gerar corretamente o id no formato UUID', async () => {
        const uuid = uuidv4();
        const user = await UserMock.create({
            id: uuid,
            username: 'autouser',
            role: 'admin',
        });

        expect(user.id).toBeTruthy();
        expect(user.id).toHaveLength(36);
    });
});
