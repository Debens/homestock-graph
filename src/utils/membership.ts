import { OrderedSet } from 'immutable';

export enum Role {
    Read = 'Read',
    Write = 'Write',
    Admin = 'Admin',
    Owner = 'Owner',
}

export const OrderedRoles = OrderedSet<Role>([
    Role.Owner,
    Role.Admin,
    Role.Write,
    Role.Read,
]);
