import { PostResource } from './../resources/PostResource';
import { Post } from "../models/Post";

export class PostMapper {
    static mapToResource(post: Post): PostResource {
        return new PostResource(post.title, post.text, post.user_id, post.id)
    }
}