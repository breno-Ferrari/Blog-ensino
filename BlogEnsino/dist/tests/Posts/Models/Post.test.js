"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_mock_1 = __importDefault(require("sequelize-mock"));
const uuid_1 = require("uuid");
const sequelizeMock = new sequelize_mock_1.default();
const PostMock = sequelizeMock.define('Post', {
    id: (0, uuid_1.v4)(),
    title: 'Post de Teste',
    text: 'Este é um post de teste',
    user_id: (0, uuid_1.v4)(),
    createdAt: new Date(),
    updatedAt: new Date(),
});
describe('Modelo Post', () => {
    it('deve inicializar o modelo Post com os atributos corretos', async () => {
        const post = await PostMock.create({
            title: 'Meu primeiro post',
            text: 'Este é o conteúdo do meu primeiro post',
            user_id: (0, uuid_1.v4)(),
        });
        expect(post.title).toBe('Meu primeiro post');
        expect(post.text).toBe('Este é o conteúdo do meu primeiro post');
        expect(post.user_id).toBeTruthy();
    });
    it('deve exigir o campo title', async () => {
        try {
            await PostMock.create({
                text: 'Este post não tem título',
                user_id: (0, uuid_1.v4)(),
            });
        }
        catch (error) {
            expect(error.message).toContain('notNull Violation: Post.title não pode ser nulo');
        }
    });
    it('deve exigir o campo text', async () => {
        try {
            await PostMock.create({
                title: 'Este post não tem texto',
                user_id: (0, uuid_1.v4)(),
            });
        }
        catch (error) {
            expect(error.message).toContain('notNull Violation: Post.text não pode ser nulo');
        }
    });
    it('deve exigir o campo user_id', async () => {
        try {
            await PostMock.create({
                title: 'Um post sem um usuário',
                text: 'Este post não tem user_id',
            });
        }
        catch (error) {
            expect(error.message).toContain('notNull Violation: Post.user_id não pode ser nulo');
        }
    });
    it('deve gerar automaticamente um UUID para o campo id', async () => {
        const post = await PostMock.create({
            title: 'Outro post',
            text: 'Com UUID gerado',
            user_id: (0, uuid_1.v4)(),
        });
        expect(post.id).toBeTruthy();
        expect(typeof post.id).toBe('string');
        expect(post.id).toHaveLength(36);
    });
    it('deve associar com o modelo User', async () => {
        const userId = (0, uuid_1.v4)();
        const post = await PostMock.create({
            title: 'Post associado a um usuário',
            text: 'Este post está vinculado a um usuário',
            user_id: userId,
        });
        expect(post.user_id).toBe(userId);
    });
});
