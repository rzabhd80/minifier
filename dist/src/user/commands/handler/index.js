"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHandlers = void 0;
__exportStar(require("./user_signup.handler"), exports);
__exportStar(require("./user_login.handler"), exports);
__exportStar(require("./seeder_factory.handler"), exports);
__exportStar(require("./seeder_factory.handler"), exports);
const seeder_factory_handler_1 = require("./seeder_factory.handler");
const user_signup_handler_1 = require("./user_signup.handler");
const user_login_handler_1 = require("./user_login.handler");
exports.userHandlers = [
    user_signup_handler_1.UserSignupHandler,
    user_login_handler_1.UserLoginHandler,
    seeder_factory_handler_1.SeederFactoryHandler,
];
//# sourceMappingURL=index.js.map