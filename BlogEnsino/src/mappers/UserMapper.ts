import { User } from "../models/User";
import { UserResource } from "../resources/UserResource";

export class UserMapper {
    static mapToResource(user: User): UserResource {
        return new UserResource(user.username, user.role, user.id)
    }
}