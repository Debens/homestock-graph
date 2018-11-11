"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const User_1 = require("../../entity/User");
const AuthenticationBuilder_1 = require("./AuthenticationBuilder");
let UserBuilder = class UserBuilder {
    constructor(user = new User_1.User()) {
        this.user = user;
    }
    create() {
        return this.user;
    }
    setFirstName(name) {
        this.user.firstName = name;
        return this;
    }
    setLastName(name) {
        this.user.lastName = name;
        return this;
    }
    setEmail(email) {
        this.user.email = email;
        return this;
    }
    setBirthday(birthday) {
        this.user.birthday = birthday;
        return this;
    }
    setPassword(password) {
        this.user.auth = new AuthenticationBuilder_1.AuthenticationBuilder().setPassword(password).create();
        return this;
    }
};
UserBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [User_1.User])
], UserBuilder);
exports.UserBuilder = UserBuilder;
exports.default = UserBuilder;
