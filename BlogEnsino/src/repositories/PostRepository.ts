import { Post } from '../models/Post';
import { Op } from 'sequelize';
import { PostResource } from '../resources/PostResource'; // Importa a entidade

export class PostRepository {
    // Cria um post e retorna PostResource
    create(title: string, text: string, user_id: string): Promise<Post> {
        return Post.create({ title, text, user_id })
    }

    // Retorna uma lista de PostEntities
    findAll(): Promise<Post[]> {
        return Post.findAll();
    }

    // Retorna uma lista de PostEntities ao buscar pelo título
    findByTitle(title: string): Promise<Post[]> {
        return Post.findAll({
            where: {
                title: { [Op.like]: `%${title}%` }
            },
        });
    }

    // Busca por ID e retorna PostResource
    findById(id: string): Promise<Post | null> {
        return Post.findByPk(id)
    }


    // Atualiza um post e retorna PostResource
    update(post: Post, fields: { title: string; text: string }): Promise<Post> {
        return post.update(fields)
    }

    // Deleta um post e retorna PostResource ou null
    delete(post: Post): Promise<void> {
        return post.destroy()
    }
}
