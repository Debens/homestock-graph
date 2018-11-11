"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const v1_1 = tslib_1.__importDefault(require("uuid/v1"));
const Container_1 = require("./Container");
const Product_1 = require("./Product");
let Stock = class Stock {
    generateInsertValues() {
        this.id = v1_1.default();
        this.created = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], Stock.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], Stock.prototype, "created", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 1 }),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "quantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], Stock.prototype, "expiry", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Product_1.Product, product => product.stock, {
        // eager: true,
        cascade: true,
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Product_1.Product)
], Stock.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Container_1.Container, container => container.inventory, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Container_1.Container)
], Stock.prototype, "container", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Stock.prototype, "generateInsertValues", null);
Stock = tslib_1.__decorate([
    typeorm_1.Entity()
], Stock);
exports.Stock = Stock;
