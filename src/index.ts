import { getManager } from 'typeorm';
import { bootstrap } from 'vesper';

import { User } from './entity/User';
import { Authenticator } from './service/Authenticator';

export const CURRENT_USER = 'user.current';

bootstrap({
    port: 4000,
    controllers: [__dirname + '/controller/*'],
    schemas: [__dirname + '/schema/**/*.graphql'],
    cors: true,
    setupContainer: async (container, action) => {
        const authenticator = new Authenticator();
        container.set(Authenticator.Handle, new Authenticator());

        if (action.request) {
            const token: string = (action.request.headers.authorization || '')
                .replace('Bearer', '')
                .trim();

            if (token) {
                const payload: any = authenticator.verify(token);

                const user = await getManager().findOneOrFail(User, payload.sub);
                action.container.set(CURRENT_USER, user);
            }
        }
    },
    authorizationChecker: async (roles, action): Promise<void> => {
        const user = action.container.get<User>(CURRENT_USER);
        if (!user.id) {
            throw new Error('Unauthorized');
        }
    },
})
    .then(() => {
        console.log(
            'Your app is up and running on http://localhost:4000. ' +
                'You can use playground in development mode on http://localhost:4000/playground',
        );
    })
    .catch((error: any) => {
        console.error(error.stack ? error.stack : error);
    });
