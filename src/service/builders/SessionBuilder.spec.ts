import InjectionContainer from 'typedi';

import { Session } from '../../entity/Session';
import { User } from '../../entity/User';
import { SessionBuilder } from './SessionBuilder';

describe('SessionBuilder', () => {
    let builder: SessionBuilder;
    beforeEach(() => {
        builder = new SessionBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(SessionBuilder)).toBeInstanceOf(SessionBuilder);
    });

    describe('when calling create', () => {
        let result: Session;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Session', () => {
            expect(result).toBeInstanceOf(Session);
        });
    });

    describe('when calling setUser', () => {
        describe('and passing a user', () => {
            const user = new User();
            let result: SessionBuilder;
            beforeEach(() => {
                result = builder.setUser(user);
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let session: Session;
                beforeEach(() => {
                    session = builder.create();
                });

                it('then should return a Session', () => {
                    expect(session).toBeInstanceOf(Session);
                });

                it('then should set the Sessions user', () => {
                    expect(session.user).toEqual(user);
                });
            });
        });
    });
});
