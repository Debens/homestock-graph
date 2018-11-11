"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vesper_1 = require("vesper");
const UserController_1 = require("./controller/UserController");
const User_1 = require("./entity/User");
console.warn(__dirname);
vesper_1.bootstrap({
    port: 4000,
    controllers: [UserController_1.UserController],
    entities: [User_1.User],
    schemas: [__dirname + "/schema/**/*.graphql"],
    cors: true
})
    .then(() => {
    console.log("Your app is up and running on http://localhost:4000. " +
        "You can use playground in development mode on http://localhost:4000/playground");
})
    .catch((error) => {
    console.error(error.stack ? error.stack : error);
});
