"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const vesper_1 = require("vesper");
const User_1 = require("../entity/User");
const UserBuilder_1 = require("../service/builders/UserBuilder");
let UserController = class UserController {
    constructor(entityManager, builder) {
        this.entityManager = entityManager;
        this.builder = builder;
    }
    user(query) {
        console.log(arguments);
        return this.entityManager.findOne(User_1.User, query);
    }
    users() {
        return this.entityManager.find(User_1.User);
    }
    createUser({ user }) {
        const newUser = this.builder
            .setFirstName(user.firstName)
            .setLastName(user.lastName)
            .setBirthday(user.birthday)
            .setEmail(user.email)
            .setPassword(user.password)
            .create();
        return this.entityManager.save(User_1.User, newUser);
    }
    delteUser(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.entityManager.remove(User_1.User, query);
            return true;
        });
    }
};
tslib_1.__decorate([
    vesper_1.Query(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "user", null);
tslib_1.__decorate([
    vesper_1.Query(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "users", null);
tslib_1.__decorate([
    vesper_1.Mutation(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    vesper_1.Mutation(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "delteUser", null);
UserController = tslib_1.__decorate([
    vesper_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.EntityManager, UserBuilder_1.UserBuilder])
], UserController);
exports.UserController = UserController;
