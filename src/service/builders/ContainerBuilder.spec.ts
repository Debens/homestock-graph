import InjectionContainer from 'typedi';

import { Container } from '../../entity/Container';
import { Membership } from '../../entity/Membership';
import { MembershipRole } from '../../entity/model/membership';
import { User } from '../../entity/User';
import { ContainerBuilder } from './ContainerBuilder';

describe('ContainerBuilder', () => {
    let builder: ContainerBuilder;
    beforeEach(() => {
        builder = new ContainerBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(ContainerBuilder)).toBeInstanceOf(ContainerBuilder);
    });

    describe('when calling create', () => {
        let result: Container;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Container', () => {
            expect(result).toBeInstanceOf(Container);
        });
    });

    describe('when calling setName', () => {
        const name = 'zac efron';
        let result: ContainerBuilder;
        beforeEach(() => {
            result = builder.setName(name);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Container;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Container', () => {
                expect(result).toBeInstanceOf(Container);
            });

            it('then should set the Containers name', () => {
                expect(result.name).toBe(name);
            });
        });
    });

    describe('when calling setOwner', () => {
        const user = new User();
        let result: ContainerBuilder;
        beforeEach(() => {
            result = builder.setOwner(user);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Container;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Container', () => {
                expect(result).toBeInstanceOf(Container);
            });

            describe('the resulting container', () => {
                it('then should have a membership', () => {
                    expect(result.memberships.length).toBe(1);
                });

                describe('the membership', () => {
                    let membership: Membership;
                    beforeEach(() => {
                        membership = result.memberships[0];
                    });

                    it('then should be for the user', () => {
                        expect(membership.user).toBe(user);
                    });

                    it('then should be not pending', () => {
                        expect(membership.pending).toBe(false);
                    });

                    it('then should have ownership access', () => {
                        expect(membership.role).toBe(MembershipRole.Owner);
                    });
                });
            });
        });
    });

    describe('when calling addMember', () => {
        const user = new User();

        describe('and passing no options', () => {
            let result: ContainerBuilder;
            beforeEach(() => {
                result = builder.addMember(user);
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Container;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Container', () => {
                    expect(result).toBeInstanceOf(Container);
                });

                describe('the resulting container', () => {
                    it('then should have a membership', () => {
                        expect(result.memberships.length).toBe(1);
                    });

                    describe('the membership', () => {
                        let membership: Membership;
                        beforeEach(() => {
                            membership = result.memberships[0];
                        });

                        it('then should be for the user', () => {
                            expect(membership.user).toBe(user);
                        });

                        it('then should be pending', () => {
                            expect(membership.pending).toBe(true);
                        });

                        it('then should have read access', () => {
                            expect(membership.role).toBe(MembershipRole.Read);
                        });
                    });
                });
            });
        });

        describe('and passing a access option', () => {
            const access = MembershipRole.Admin;
            let result: ContainerBuilder;
            beforeEach(() => {
                result = builder.addMember(user, { access });
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Container;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Container', () => {
                    expect(result).toBeInstanceOf(Container);
                });

                describe('the resulting container', () => {
                    it('then should have a membership', () => {
                        expect(result.memberships.length).toBe(1);
                    });

                    describe('the membership', () => {
                        let membership: Membership;
                        beforeEach(() => {
                            membership = result.memberships[0];
                        });

                        it('then should be for the user', () => {
                            expect(membership.user).toBe(user);
                        });

                        it('then should be pending', () => {
                            expect(membership.pending).toBe(true);
                        });

                        it('then should have the defined access', () => {
                            expect(membership.role).toBe(access);
                        });
                    });
                });
            });
        });
    });
});
