import jwt, { JwtPayload } from 'jsonwebtoken';
import { Buffer } from "buffer";
import { UserService } from "./UserService";
import { env } from '../env';
import { UserResource } from '../resources/UserResource';

const userService = new UserService()
interface DecodedToken extends JwtPayload {
    id: string;
    username: string;
    role: string;
}

export class AuthService {
    async generateToken(auth: string): Promise<string> {
        const usernameDecode = Buffer.from(auth, "base64").toString() //decode base64
        const user = await userService.findByUsername(usernameDecode)

        return jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            }, env.SECRET_KEY, {
            expiresIn: '1 day',
        });
    }

    async decodeToken(token: string): Promise<UserResource> {
        const decoded = jwt.verify(token, env.SECRET_KEY) as DecodedToken;
        return new UserResource(decoded.username, decoded.role, decoded.id);
    }
}
