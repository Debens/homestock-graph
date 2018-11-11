"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Container_1 = require("../../entity/Container");
const membership_1 = require("../../utils/membership");
const MembershipBuider_1 = require("./MembershipBuider");
const DEFAULT_MEMBER_OPTIONS = {
    access: membership_1.Role.Read,
};
let ContainerBuilder = class ContainerBuilder {
    constructor(container = new Container_1.Container()) {
        this.container = container;
    }
    create() {
        return this.container;
    }
    setName(name) {
        this.container.name = name;
        return this;
    }
    setOwner(user) {
        const relation = new MembershipBuider_1.MembershipBuilder()
            .setContainer(this.container)
            .setUser(user)
            .setPending(false)
            .setRole(membership_1.Role.Owner)
            .create();
        this.container.memberships = this.container.memberships || [];
        this.container.memberships.push(relation);
        return this;
    }
    addMember(member, options) {
        const memberOptions = Object.assign({}, DEFAULT_MEMBER_OPTIONS, options);
        const relation = new MembershipBuider_1.MembershipBuilder()
            .setContainer(this.container)
            .setUser(member)
            .setPending(true)
            .setRole(memberOptions.access)
            .create();
        this.container.memberships = this.container.memberships || [];
        this.container.memberships.push(relation);
        return this;
    }
};
ContainerBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [Container_1.Container])
], ContainerBuilder);
exports.ContainerBuilder = ContainerBuilder;
exports.default = ContainerBuilder;
