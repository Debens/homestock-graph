"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Membership_1 = require("../../entity/Membership");
let MembershipBuilder = class MembershipBuilder {
    constructor(relation = new Membership_1.Membership()) {
        this.relation = relation;
    }
    create() {
        return this.relation;
    }
    setRole(role) {
        this.relation.role = role;
        return this;
    }
    setUser(user) {
        this.relation.user = user;
        return this;
    }
    setContainer(container) {
        this.relation.container = container;
        return this;
    }
    setPending(isPending) {
        this.relation.pending = isPending;
        return this;
    }
};
MembershipBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [Membership_1.Membership])
], MembershipBuilder);
exports.MembershipBuilder = MembershipBuilder;
