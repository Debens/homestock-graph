import { registerEnumType } from 'type-graphql';

export enum UserRole {
    Admin = 'Admin',
    Premium = 'Premium',
    Free = 'Free',
}

registerEnumType(UserRole, { name: 'UserRole' });
