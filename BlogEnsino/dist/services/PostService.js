"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const AuthService_1 = require("./AuthService");
const PostMapper_1 = require("../mappers/PostMapper");
const PostRepository_1 = require("../repositories/PostRepository");
const postRepository = new PostRepository_1.PostRepository();
const authService = new AuthService_1.AuthService();
class PostService {
    async create(title, text, token) {
        await authService.validateUser(token, "admin");
        const user = await authService.decodeToken(token);
        const createdPost = await postRepository.create(title, text, user.id);
        return PostMapper_1.PostMapper.mapToResource(createdPost);
    }
    async findAll() {
        try {
            const posts = await postRepository.findAll();
            return posts.map(post => PostMapper_1.PostMapper.mapToResource(post));
        }
        catch (error) {
            throw new Error(`Não foi possível encontrar os posts: ${error}`);
        }
    }
    async findByTitle(title) {
        try {
            const posts = await postRepository.findByTitle(title);
            if (posts === null || posts.length == 0)
                throw new Error("Não encontramos nenhum post com esse titulo");
            const postList = posts.map(post => PostMapper_1.PostMapper.mapToResource(post));
            return postList;
        }
        catch (error) {
            throw new Error(`Não foi possível realizar a busca de posts: ${error}`);
        }
    }
    async findById(id) {
        try {
            const post = await this.findPostById(id);
            return PostMapper_1.PostMapper.mapToResource(post);
        }
        catch (error) {
            throw new Error(`Não foi possível encontrar o usuário: ${error}`);
        }
    }
    async update(id, token, updatedFields) {
        await authService.validateUser(token, "admin");
        const post = await this.findPostById(id);
        const updatedPost = await postRepository.update(post, updatedFields);
        return PostMapper_1.PostMapper.mapToResource(updatedPost);
    }
    async delete(id, token) {
        await authService.validateUser(token, "admin");
        const post = await this.findPostById(id);
        postRepository.delete(post);
    }
    async findPostById(id) {
        const post = await postRepository.findById(id);
        if (!post)
            throw new Error("Não encontramos nenhum post com esse titulo");
        return post;
    }
}
exports.PostService = PostService;
