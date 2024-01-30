"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const common_1 = require("@nestjs/common");
exports.currentUser = (0, common_1.createParamDecorator)((data, contect) => {
    const request = contect.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current_user_decorator.js.map