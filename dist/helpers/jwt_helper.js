"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = void 0;
const generateUserToken = (user) => ({
    id: user.id,
    createdAt: user.createdAt,
    email: user.email ? user.email : null,
});
exports.generateUserToken = generateUserToken;
//# sourceMappingURL=jwt_helper.js.map