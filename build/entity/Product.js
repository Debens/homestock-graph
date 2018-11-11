"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const v1_1 = tslib_1.__importDefault(require("uuid/v1"));
const Stock_1 = require("./Stock");
const User_1 = require("./User");
let Product = class Product {
    beforeInset() {
        this.id = v1_1.default();
        this.created = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], Product.prototype, "created", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User_1.User, rel => rel.products, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", User_1.User)
], Product.prototype, "creator", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Stock_1.Stock, stock => stock.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "stock", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Product.prototype, "beforeInset", null);
Product = tslib_1.__decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
