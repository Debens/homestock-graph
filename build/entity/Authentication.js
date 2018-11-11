"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Authentication = class Authentication {
    hashPassword() {
        this.salt = this.salt || this.generateSalt();
        this.password = this.hash(this.salt);
    }
    generateSalt(length = 16) {
        return crypto_1.default
            .randomBytes(Math.floor(length / 2))
            .toString('hex')
            .slice(0, length);
    }
    hash(salt) {
        return crypto_1.default
            .createHmac('sha512', salt)
            .update(this.password)
            .digest('hex');
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", String)
], Authentication.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Authentication.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Authentication.prototype, "salt", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => User_1.User, User => User.auth, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", User_1.User)
], Authentication.prototype, "user", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Authentication.prototype, "hashPassword", null);
Authentication = tslib_1.__decorate([
    typeorm_1.Entity()
], Authentication);
exports.Authentication = Authentication;
