"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Product_1 = require("../../entity/Product");
let ProductBuilder = class ProductBuilder {
    constructor(product = new Product_1.Product()) {
        this.product = product;
    }
    create() {
        return this.product;
    }
    setName(name) {
        this.product.name = name;
        return this;
    }
    setCreator(user) {
        this.product.creator = user;
        return this;
    }
};
ProductBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [Product_1.Product])
], ProductBuilder);
exports.ProductBuilder = ProductBuilder;
exports.default = ProductBuilder;
