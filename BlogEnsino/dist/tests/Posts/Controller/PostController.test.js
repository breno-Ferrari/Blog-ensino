"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostController_1 = require("../../../controllers/PostController");
const PostService_1 = require("../../../services/PostService");
const uuid_1 = require("uuid");
const PostResource_1 = require("../../../resources/PostResource");
jest.mock('../../../services/PostService');
describe('Testes da PostController', () => {
    let req;
    let res;
    let jsonMock;
    let statusMock;
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    beforeEach(() => {
        req = {
            body: {
                title: "Título",
                text: "Texto",
            },
            headers: {
                authorization: "Bearer token-valido",
            },
        };
        res = {
            status: statusMock,
            json: jsonMock
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    // it('deve criar um post com sucesso', async () => {
    //     PostService.prototype.create = jest.fn().mockResolvedValue({ title: "Título", text: "Texto" });
    //     await PostController.createPost(req as Request, res as Response);
    //     expect(PostService.prototype.create).toHaveBeenCalledWith("Título", "Texto", "Bearer token-valido");
    //     expect(statusMock).toHaveBeenCalledWith(201);
    //     expect(jsonMock).toHaveBeenCalledWith({ title: "Título", text: "Texto" });
    // });
    // it('Deve lançar erro se role do usuário for diferente de "admin" na criação do post', async () => {
    //     PostService.prototype.create = jest.fn().mockRejectedValue(new Error("Usuário sem permissão"));
    //     await PostController.createPost(req as Request, res as Response);
    //     expect(statusMock).toHaveBeenCalledWith(403);
    //     expect(jsonMock).toHaveBeenCalledWith({ message: "Usuário sem permissão" });
    // });
    // it("deve retornar 500 para criação de post", async () => {
    //     PostService.prototype.create = jest.fn().mockRejectedValue(new Error("Erro inesperado"));
    //     await PostController.createPost(req as Request, res as Response);
    //     expect(statusMock).toHaveBeenCalledWith(500);
    //     expect(jsonMock).toHaveBeenCalledWith({ message: "Falha ao criar o Post" });
    // });
    it('deve retornar todos os post', async () => {
        const mockPost = [
            new PostResource_1.PostResource('titulo1', 'texto1', (0, uuid_1.v4)()),
            new PostResource_1.PostResource('titulo2', 'texto2', (0, uuid_1.v4)())
        ];
        jest.spyOn(PostService_1.PostService.prototype, 'findAll').mockResolvedValue(mockPost);
        await PostController_1.PostController.getAllPosts(req, res);
        expect(PostService_1.PostService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockPost);
    });
    it('deve retornar erro ao buscar todos os Posts', async () => {
        const mockError = new Error('Não foi possível criar o post:');
        jest.spyOn(PostService_1.PostService.prototype, 'findAll').mockRejectedValue(mockError);
        await PostController_1.PostController.getAllPosts(req, res);
        expect(PostService_1.PostService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: "Falha ao Buscar os Posts", error: expect.any(Error) });
    });
    it('deve retornar um post pelo ID', async () => {
        const mockPost = new PostResource_1.PostResource('titulo1', 'texto1', (0, uuid_1.v4)());
        jest.spyOn(PostService_1.PostService.prototype, 'findById').mockResolvedValue(mockPost);
        const mockId = mockPost.id;
        req.params = { id: mockId };
        await PostController_1.PostController.getPostById(req, res);
        expect(PostService_1.PostService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockPost);
    });
    it('deve retornar erro 404 quando o id não for encontrado', async () => {
        const mockError = new Error('Post não encontrado');
        jest.spyOn(PostService_1.PostService.prototype, 'findAll').mockRejectedValue(mockError);
        const mockUser = { id: (0, uuid_1.v4)(), username: 'user1', role: 'admin' };
        PostService_1.PostService.prototype.findById.mockResolvedValue(null); // Mock do método create
        const mockId = mockUser.id;
        req.params = { id: mockId };
        await PostController_1.PostController.getPostById(req, res);
        expect(PostService_1.PostService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Post não encontrado' });
    });
    it('deve retornar um post pelo titulo', async () => {
        const mockPost = new PostResource_1.PostResource('titulo1', 'texto1', (0, uuid_1.v4)());
        jest.spyOn(PostService_1.PostService.prototype, 'findByTitle').mockResolvedValue([mockPost]);
        req.query = { title: mockPost.title };
        await PostController_1.PostController.getPostByTitle(req, res);
        expect(PostService_1.PostService.prototype.findByTitle).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith([mockPost]);
    });
});
