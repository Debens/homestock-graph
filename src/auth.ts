import { AuthChecker } from 'type-graphql';

import { IContext } from './context';

export const authChecker: AuthChecker<IContext> = ({ context }, roles) => {
    if (!context.user) {
        return false;
    }

    return roles.length ? roles.indexOf(context.user.role) !== -1 : true;
};
