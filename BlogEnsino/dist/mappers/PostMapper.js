"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMapper = void 0;
const PostResource_1 = require("./../resources/PostResource");
class PostMapper {
    static mapToResource(post) {
        return new PostResource_1.PostResource(post.title, post.text, post.user_id, post.id);
    }
}
exports.PostMapper = PostMapper;
