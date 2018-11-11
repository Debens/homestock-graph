"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Authentication_1 = require("../../entity/Authentication");
let AuthenticationBuilder = class AuthenticationBuilder {
    constructor(auth = new Authentication_1.Authentication()) {
        this.auth = auth;
    }
    create() {
        return this.auth;
    }
    setPassword(password) {
        this.auth.password = password;
        return this;
    }
};
AuthenticationBuilder = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__metadata("design:paramtypes", [Authentication_1.Authentication])
], AuthenticationBuilder);
exports.AuthenticationBuilder = AuthenticationBuilder;
