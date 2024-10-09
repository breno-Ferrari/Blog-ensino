import { AuthService } from './AuthService';
import { PostMapper } from "../mappers/PostMapper";
import { PostRepository } from "../repositories/PostRepository";
import { PostResource } from "../resources/PostResource";
import { ValidateUserService } from "./ValidateService";

const postRepository = new PostRepository()
const validateUserService = new ValidateUserService()
const authService = new AuthService()

export class PostService {
    async create(title: string, text: string, token: string): Promise<PostResource | Error> {
        await validateUserService.validateUser(token, "admin");
        const user = await authService.decodeToken(token)
        const createdPost = await postRepository.create(title, text, user.id);
        return PostMapper.mapToResource(createdPost);
    }

    async findAll(): Promise<PostResource[]> {
        try {
            const posts = await postRepository.findAll();
            return posts.map(post => PostMapper.mapToResource(post));
        } catch (error) {
            throw new Error(`Não foi possível encontrar os posts: ${error}`);
        }

    }

    async findByTitle(title: string): Promise<PostResource[]> {
        try {
            const posts = await postRepository.findByTitle(title);
            if (posts === null || posts.length == 0) throw new Error("Não encontramos nenhum post com esse titulo");
            const postList = posts.map(post => PostMapper.mapToResource(post));
            return postList
        } catch (error) {
            throw new Error(`Não foi possível realizar a busca de posts: ${error}`);
        }
    }

    async findById(id: string): Promise<PostResource> {
        try {
            const post = await this.findPostById(id);
            return PostMapper.mapToResource(post)
        } catch (error) {
            throw new Error(`Não foi possível encontrar o usuário: ${error}`);
        }
    }

    async update(id: string, token: string, updatedFields: { title: string; text: string }): Promise<PostResource | Error> {
        await validateUserService.validateUser(token, "admin");
        const post = await this.findPostById(id);
        const updatedPost = await postRepository.update(post, updatedFields)

        return PostMapper.mapToResource(updatedPost)
    }

    async delete(id: string, token: string): Promise<void> {
        await validateUserService.validateUser(token, "admin");
        const post = await this.findPostById(id);

        postRepository.delete(post)
    }

    private async findPostById(id: string) {
        const post = await postRepository.findById(id);
        if (!post) throw new Error("Não encontramos nenhum post com esse titulo");
        return post;
    }

}
