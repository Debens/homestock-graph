"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let TokenBlacklist = class TokenBlacklist {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", String)
], TokenBlacklist.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], TokenBlacklist.prototype, "ati", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], TokenBlacklist.prototype, "rti", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], TokenBlacklist.prototype, "expiry", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => User_1.User, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", User_1.User)
], TokenBlacklist.prototype, "user", void 0);
TokenBlacklist = tslib_1.__decorate([
    typeorm_1.Entity()
], TokenBlacklist);
exports.TokenBlacklist = TokenBlacklist;
