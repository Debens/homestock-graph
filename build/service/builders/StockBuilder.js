"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Stock_1 = require("../../entity/Stock");
let StockBuilder = class StockBuilder {
    constructor(stock = new Stock_1.Stock()) {
        this.stock = stock;
    }
    create() {
        return this.stock;
    }
    setQuantity(amount = '') {
        const value = parseInt(amount.toString(), 10);
        if (value >= 0 && value !== null) {
            this.stock.quantity = value;
        }
        return this;
    }
    setExpiry(expiry) {
        if (!expiry)
            return;
        if (typeof expiry === 'string') {
            this.stock.expiry = new Date(expiry);
        }
        else {
            this.stock.expiry = expiry;
        }
        return this;
    }
    setProduct(product) {
        this.stock.product = product;
        return this;
    }
    setContainer(container) {
        this.stock.container = container;
        return this;
    }
};
StockBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [Stock_1.Stock])
], StockBuilder);
exports.StockBuilder = StockBuilder;
