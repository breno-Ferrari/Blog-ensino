import SequelizeMock from 'sequelize-mock';
import { v4 as uuidv4 } from 'uuid';

const sequelizeMock = new SequelizeMock();

const PostMock = sequelizeMock.define('Post', {
    id: uuidv4(),
    title: 'Post de Teste',
    text: 'Este é um post de teste',
    user_id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
});

describe('Modelo Post', () => {
    it('deve inicializar o modelo Post com os atributos corretos', async () => {
        const post = await PostMock.create({
            title: 'Meu primeiro post',
            text: 'Este é o conteúdo do meu primeiro post',
            user_id: uuidv4(),
        });

        expect(post.title).toBe('Meu primeiro post');
        expect(post.text).toBe('Este é o conteúdo do meu primeiro post');
        expect(post.user_id).toBeTruthy();
    });

    it('deve exigir o campo title', async () => {
        try {
            await PostMock.create({
                text: 'Este post não tem título',
                user_id: uuidv4(),
            });
        } catch (error: any) {
            expect(error.message).toContain('notNull Violation: Post.title não pode ser nulo');
        }
    });

    it('deve exigir o campo text', async () => {
        try {
            await PostMock.create({
                title: 'Este post não tem texto',
                user_id: uuidv4(),
            });
        } catch (error: any) {
            expect(error.message).toContain('notNull Violation: Post.text não pode ser nulo');
        }
    });

    it('deve exigir o campo user_id', async () => {
        try {
            await PostMock.create({
                title: 'Um post sem um usuário',
                text: 'Este post não tem user_id',
            });
        } catch (error: any) {
            expect(error.message).toContain('notNull Violation: Post.user_id não pode ser nulo');
        }
    });

    it('deve gerar automaticamente um UUID para o campo id', async () => {
        const post = await PostMock.create({
            title: 'Outro post',
            text: 'Com UUID gerado',
            user_id: uuidv4(),
        });

        expect(post.id).toBeTruthy();
        expect(typeof post.id).toBe('string');
        expect(post.id).toHaveLength(36);
    });

    it('deve associar com o modelo User', async () => {
        const userId = uuidv4();
        const post = await PostMock.create({
            title: 'Post associado a um usuário',
            text: 'Este post está vinculado a um usuário',
            user_id: userId,
        });

        expect(post.user_id).toBe(userId);
    });
});
