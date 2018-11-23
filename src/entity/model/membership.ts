import { OrderedSet } from 'immutable';
import { registerEnumType } from 'type-graphql';

export enum MembershipRole {
    Read = 'Read',
    Write = 'Write',
    Admin = 'Admin',
    Owner = 'Owner',
}

registerEnumType(MembershipRole, { name: 'MembershipRole' });

export const OrderedRoles = OrderedSet<MembershipRole>([
    MembershipRole.Owner,
    MembershipRole.Admin,
    MembershipRole.Write,
    MembershipRole.Read,
]);
