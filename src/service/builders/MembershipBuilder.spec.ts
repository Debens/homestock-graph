import InjectionContainer from 'typedi';

import { Container } from '../../entity/Container';
import { Membership } from '../../entity/Membership';
import { MembershipRole } from '../../entity/model/membership';
import { User } from '../../entity/User';
import { MembershipBuilder } from './MembershipBuilder';

describe('MembershipBuilder', () => {
    let builder: MembershipBuilder;
    beforeEach(() => {
        builder = new MembershipBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(MembershipBuilder)).toBeInstanceOf(
            MembershipBuilder,
        );
    });

    describe('when calling create', () => {
        let result: Membership;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Membership', () => {
            expect(result).toBeInstanceOf(Membership);
        });
    });

    describe('when calling setRole', () => {
        const role = MembershipRole.Write;
        let result: MembershipBuilder;
        beforeEach(() => {
            result = builder.setRole(role);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Membership;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Membership', () => {
                expect(result).toBeInstanceOf(Membership);
            });

            it('then should set the Memberships access role', () => {
                expect(result.role).toBe(role);
            });
        });
    });

    describe('when calling setUser', () => {
        const creator = new User();
        let result: MembershipBuilder;
        beforeEach(() => {
            result = builder.setUser(creator);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Membership;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Membership', () => {
                expect(result).toBeInstanceOf(Membership);
            });

            it('then should set the Memberships user subject', () => {
                expect(result.user).toBe(creator);
            });
        });
    });

    describe('when calling setContainer', () => {
        const container = new Container();
        let result: MembershipBuilder;
        beforeEach(() => {
            result = builder.setContainer(container);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Membership;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Membership', () => {
                expect(result).toBeInstanceOf(Membership);
            });

            it('then should set the Memberships container subject', () => {
                expect(result.container).toBe(container);
            });
        });
    });

    describe('when calling setPending', () => {
        const isPending = false;
        let result: MembershipBuilder;
        beforeEach(() => {
            result = builder.setPending(isPending);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Membership;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Membership', () => {
                expect(result).toBeInstanceOf(Membership);
            });

            it('then should set the Memberships pending status', () => {
                expect(result.pending).toBe(isPending);
            });
        });
    });
});
