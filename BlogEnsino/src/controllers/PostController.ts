import { Request, Response } from "express";
import { PostService } from "../services/PostService";

const postService = new PostService();

export class PostController {
  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, text } = req.body;
      const token = req.headers.authorization
      if (token) {
        const post = await postService.create(title, text, token);
        res.status(201).json(post);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário sem permissão") {
          res.status(403).json({ message: "Usuário sem permissão" });
          return
        } else if (error.message === "Usuário não encontrado") {
          res.status(404).json({ message: "Usuário não encontrado" });
          return
        } else {
          res.status(500).json({ message: "Falha ao criar o Post" });
          return
        }
      }
    }
  }

  static async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.findAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Falha ao Buscar os Posts", error });
      // throw new Error(`Falha ao Buscar os Posts", ${error}`)
    }
  }

  static async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const post = await postService.findById(req.params.id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Falha ao Buscar o Post", error });
      // throw new Error(`Falha ao Buscar o Post", ${error}`)
    }
  }

  static async getPostByTitle(req: Request, res: Response): Promise<void> {
    try {
      const title = req.query.title as string
      const posts = await postService.findByTitle(title);
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Falha ao Buscar o Post title", error });
      // throw new Error(`Falha ao Buscar o Post title", ${error}`)
    }
  }

  static async editPost(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization
      if (token) {
        const updatedPost = await postService.update(req.params.id, token, req.body,);
        res.status(201).json(updatedPost);
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário sem permissão") {
          res.status(403).json({ message: "Usuário sem permissão" });
          return
        } else if (error.message === "Usuário não encontrado") {
          res.status(404).json({ message: "Usuário não encontrado" });
          return
        }
      }
      res.status(500).json({ message: "Erro ao editar o post" });
      return
    }
  }

  static async deletePost(req: Request, res: Response): Promise<void> {
    try {

      const token = req.headers.authorization
      if (token) {
        await postService.delete(req.params.id, token);
        res.status(200).json({ message: 'Post deletado com sucesso' });
      } else {
        res.status(404).json({ message: "Post não encontrado" });
      }

    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Usuário sem permissão") {
          res.status(403).json({ message: "Usuário sem permissão" });
          return
        } else if (error.message === "Usuário não encontrado") {
          res.status(404).json({ message: "Usuário não encontrado" });
          return
        }
      }
      res.status(500).json({ message: "Erro ao deletar o post" });
      return
    }
  }
}
