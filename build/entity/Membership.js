"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const membership_1 = require("./../utils/membership");
const typeorm_1 = require("typeorm");
const Container_1 = require("./Container");
const User_1 = require("./User");
let Membership = class Membership {
    generateInsertValues() {
        this.created = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", String)
], Membership.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.id, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", User_1.User)
], Membership.prototype, "user", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Container_1.Container, container => container.memberships, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Container_1.Container)
], Membership.prototype, "container", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], Membership.prototype, "created", void 0);
tslib_1.__decorate([
    typeorm_1.Column('enum', { enum: membership_1.Role }),
    tslib_1.__metadata("design:type", String)
], Membership.prototype, "role", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: true }),
    tslib_1.__metadata("design:type", Boolean)
], Membership.prototype, "pending", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Membership.prototype, "generateInsertValues", null);
Membership = tslib_1.__decorate([
    typeorm_1.Entity()
], Membership);
exports.Membership = Membership;
