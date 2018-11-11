"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const v1_1 = tslib_1.__importDefault(require("uuid/v1"));
const Authentication_1 = require("./Authentication");
const Membership_1 = require("./Membership");
const Product_1 = require("./Product");
const TokenBlacklist_1 = require("./TokenBlacklist");
let User = class User {
    beforeInset() {
        this.id = v1_1.default();
        this.created = new Date();
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "created", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'date' }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "birthday", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => Authentication_1.Authentication, auth => auth.user, {
        nullable: false,
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Authentication_1.Authentication)
], User.prototype, "auth", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => TokenBlacklist_1.TokenBlacklist, token => token.user, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", TokenBlacklist_1.TokenBlacklist)
], User.prototype, "blacklistedTokens", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Membership_1.Membership, rel => rel.user, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "memberships", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Product_1.Product, rel => rel.creator),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "products", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "beforeInset", null);
User = tslib_1.__decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
