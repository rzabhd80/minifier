"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_MIMETYPE = exports.INVALID_TOKEN = exports.WRITE_FILE_ERROR = exports.MINIFICATION_FAILED = exports.INVALID_PASSWORD = exports.USER_ALREADY_EXISTS = exports.USER_NOT_FOUND = exports.CustomError = void 0;
const common_1 = require("@nestjs/common");
class CustomError extends common_1.HttpException {
    constructor({ description, status }) {
        super(description, status);
    }
}
exports.CustomError = CustomError;
exports.USER_NOT_FOUND = {
    status: common_1.HttpStatus.NOT_FOUND,
    description: "User Not Found",
};
exports.USER_ALREADY_EXISTS = {
    status: common_1.HttpStatus.BAD_REQUEST,
    description: "user already exists",
};
exports.INVALID_PASSWORD = {
    status: common_1.HttpStatus.BAD_REQUEST,
    description: "Incorrect Password",
};
exports.MINIFICATION_FAILED = {
    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    description: "could not minify the file",
};
exports.WRITE_FILE_ERROR = {
    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    description: "could not write the file",
};
exports.INVALID_TOKEN = {
    status: common_1.HttpStatus.UNAUTHORIZED,
    description: "token is invalid, maybe you should delete the bearer you wrote in  the swagger ui part?",
};
exports.INVALID_MIMETYPE = {
    status: common_1.HttpStatus.BAD_REQUEST,
    description: "unsupported mime type",
};
//# sourceMappingURL=exceptions.js.map