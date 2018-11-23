import { Request } from 'express';
import { Container, Token } from 'typedi';
import { getManager } from 'typeorm';

import { User } from './entity/User';
import { TokenService } from './service/TokenService';

export interface IContext {
    user: User;
}

interface ContextParams {
    req: Request;
}

interface ContextResolver<T> {
    (paras: ContextParams): T | Promise<T>;
}

export const resolveContext: ContextResolver<IContext> = async ({ req: request }) => {
    const token: string = (request.headers.authorization || '')
        .replace('Bearer', '')
        .trim();

    if (token) {
        const service = Container.get<TokenService>(TokenService.HANDLE);

        try {
            const payload: any = service.verify(token);

            if (payload.sub) {
                const user = await getManager().findOne(User, {
                    id: payload.sub,
                });

                return { user };
            }
        } catch (_) {}
    }
};
