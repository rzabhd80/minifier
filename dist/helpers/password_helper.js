"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.verifyPassword = exports.generateHashPassword = void 0;
const crypto_1 = require("crypto");
const generate_password_1 = require("generate-password");
const util_1 = require("util");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
const generateHashPassword = async (password) => {
    const salt = (0, crypto_1.randomBytes)(8).toString("hex");
    const hash = (await scrypt(password, salt, 32));
    return salt + "." + hash.toString("hex");
};
exports.generateHashPassword = generateHashPassword;
const verifyPassword = async (hashedPassword, password) => {
    const [salt, storedHash] = hashedPassword.split(".");
    const hash = (await scrypt(password, salt, 32));
    return hash.toString("hex") === storedHash;
};
exports.verifyPassword = verifyPassword;
const generatePassword = () => {
    if (process.env.NODE_ENV === "test") {
        return "test@1234&!@$%";
    }
    return generate_password_1.default.generate({
        length: 10,
        numbers: true,
        symbols: false,
    });
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=password_helper.js.map