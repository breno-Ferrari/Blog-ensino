"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const Post_1 = require("../models/Post");
const sequelize_1 = require("sequelize");
class PostRepository {
    // Cria um post e retorna PostResource
    create(title, text, user_id) {
        return Post_1.Post.create({ title, text, user_id });
    }
    // Retorna uma lista de PostEntities
    findAll() {
        return Post_1.Post.findAll();
    }
    // Retorna uma lista de PostEntities ao buscar pelo título
    findByTitle(title) {
        return Post_1.Post.findAll({
            where: {
                title: { [sequelize_1.Op.like]: `%${title}%` }
            },
        });
    }
    // Busca por ID e retorna PostResource
    findById(id) {
        return Post_1.Post.findByPk(id);
    }
    // Atualiza um post e retorna PostResource
    update(post, fields) {
        return post.update(fields);
    }
    // Deleta um post e retorna PostResource ou null
    delete(post) {
        return post.destroy();
    }
}
exports.PostRepository = PostRepository;
