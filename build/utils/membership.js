"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
var Role;
(function (Role) {
    Role["Read"] = "Read";
    Role["Write"] = "Write";
    Role["Admin"] = "Admin";
    Role["Owner"] = "Owner";
})(Role = exports.Role || (exports.Role = {}));
exports.OrderedRoles = immutable_1.OrderedSet([
    Role.Owner,
    Role.Admin,
    Role.Write,
    Role.Read,
]);
