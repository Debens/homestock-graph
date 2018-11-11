"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const v1_1 = tslib_1.__importDefault(require("uuid/v1"));
const Membership_1 = require("./Membership");
const Stock_1 = require("./Stock");
let Container = class Container {
    generateID() {
        this.id = v1_1.default();
        this.created = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], Container.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Container.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], Container.prototype, "created", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Membership_1.Membership, rel => rel.container),
    tslib_1.__metadata("design:type", Array)
], Container.prototype, "memberships", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Stock_1.Stock, stock => stock.container),
    tslib_1.__metadata("design:type", Array)
], Container.prototype, "inventory", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Container.prototype, "generateID", null);
Container = tslib_1.__decorate([
    typeorm_1.Entity()
], Container);
exports.Container = Container;
