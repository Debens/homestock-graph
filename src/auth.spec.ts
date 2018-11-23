import { GraphQLResolveInfo } from 'graphql';

import { authChecker } from './auth';
import { User } from './entity/User';

describe('authChecker', () => {
    describe('when called with a context', () => {
        describe('and the context is missing a user', () => {
            it('then should not be considered as authenticated', () => {
                expect(
                    authChecker(
                        {
                            context: { user: undefined },
                            root: {},
                            args: {},
                            info: {} as GraphQLResolveInfo,
                        },
                        [],
                    ),
                ).toBe(false);
            });
        });

        describe('and the context has a user', () => {
            it('then should be considered as authenticated', () => {
                expect(
                    authChecker(
                        {
                            context: { user: new User() },
                            root: {},
                            args: {},
                            info: {} as GraphQLResolveInfo,
                        },
                        [],
                    ),
                ).toBe(true);
            });
        });
    });
});
