import { AuthChecker } from 'type-graphql';

import { IContext } from './context';

export const authChecker: AuthChecker<IContext> = ({ context }) => {
    return !!context.user;
};
