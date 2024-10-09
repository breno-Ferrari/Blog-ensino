"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostController_1 = require("../../../controllers/PostController");
const PostService_1 = require("../../../services/PostService");
const uuid_1 = require("uuid");
const PostResource_1 = require("../../../resources/PostResource");
jest.mock('../../../services/PostService');
const mockTeste = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1YjcxY2FhLTJhYTItNDgzYy1iNGExLTZjYzA3ODZmNDVjZCIsInVzZXJuYW1lIjoicHJvZmVzc29yIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzI4MDA5MDcwLCJleHAiOjE3MjgwOTU0NzB9.92zFUWHREZq5nNgG - sYqtDTeCrqJzY3kfjbqftidjLs";
describe('Testes da PostController', () => {
    let req;
    let res;
    let jsonMock;
    let statusMock;
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    req = { body: {} };
    res = { status: statusMock };
    afterEach(() => {
        jest.clearAllMocks();
    });
<<<<<<< HEAD
    // it('deve criar um post com sucesso', async () => {
    //     // jest.spyOn(AuthService.prototype, 'generateToken').mockImplementation()
    //     const mockPost = new PostResource(
    //         'titulo1', 'texto1', mockTeste
    //     )
    //     await PostController.createPost(req as Request, res as Response);
    //     jest.spyOn(PostService.prototype, 'create').mockResolvedValue(mockPost);
    //     req.body = { title: mockPost.title, text: mockPost.text };
    //     req.headers = { authorization: mockTeste };
    //     expect(PostService.prototype.create).toHaveBeenCalledWith('titulo1', 'texto1', mockTeste);
    //     expect(statusMock).toHaveBeenCalledWith(201);
    //     expect(jsonMock).toHaveBeenCalledWith(mockPost);
    // });
    // it('Deve lançar erro se role do usuário for diferente de "admin" na criação do post', async () => {
    //     const mockError = new Error('Usuário sem permissão');
    //     // Simulando que o serviço de validação lança um erro de permissão
    //     jest.spyOn(ValidateUserService.prototype, 'validateUser').mockRejectedValue(mockError);
    //     // Simula a criação do post
    //     req.body = { title: 'titulo1', text: 'texto1', user_id: 'mockUserId' };
    //     await PostController.createPost(req as Request, res as Response);
    //     expect(statusMock).toHaveBeenCalledWith(403);
    //     expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuário sem permissão' });
    // });
    // it('deve retornar um erro ao falhar na criação do post', async () => {
    //     const mockError = new Error('Falha ao criar o Post');
    //     jest.spyOn(PostService.prototype, 'create').mockRejectedValue(mockError);
    //     await PostController.createPost(req as Request, res as Response);
    //     expect(PostService.prototype.create).toHaveBeenCalledWith('titulo1', 'texto1', expect.any(String));
    //     expect(statusMock).toHaveBeenCalledWith(500);
    //     expect(jsonMock).toHaveBeenCalledWith({ message: 'Falha ao criar o Post', error: expect.any(Error) });
    // });
=======
    it('deve criar um post com sucesso', async () => {
        const mockPost = new PostResource_1.PostResource('titulo1', 'texto1', mockTeste);
        jest.spyOn(PostService_1.PostService.prototype, 'create').mockResolvedValue(mockPost);
        req.body = { title: mockPost.title, text: mockPost.text };
        req.headers = { authorization: mockTeste };
        await PostController_1.PostController.createPost(req, res);
        expect(PostService_1.PostService.prototype.create).toHaveBeenCalledWith('titulo1', 'texto1', mockTeste);
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(mockPost);
    });
    it('Deve lançar erro se role do usuário for diferente de "admin" na criação do post', async () => {
        const mockError = new Error('Usuário sem permissão');
        // Simulando que o serviço de validação lança um erro de permissão
        jest.spyOn(ValidateService_1.ValidateUserService.prototype, 'validateUser').mockRejectedValue(mockError);
        // Simula a criação do post
        req.body = { title: 'titulo1', text: 'texto1', user_id: 'mockUserId' };
        await PostController_1.PostController.createPost(req, res);
        expect(statusMock).toHaveBeenCalledWith(403);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuário sem permissão' });
    });
    it('deve retornar um erro ao falhar na criação do post', async () => {
        const mockError = new Error('Falha ao criar o Post');
        jest.spyOn(PostService_1.PostService.prototype, 'create').mockRejectedValue(mockError);
        await PostController_1.PostController.createPost(req, res);
        expect(PostService_1.PostService.prototype.create).toHaveBeenCalledWith('titulo1', 'texto1', expect.any(String));
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Falha ao criar o Post', error: expect.any(Error) });
    });
>>>>>>> d1651c3a08e33830364c364ae028c9936aaac402
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
