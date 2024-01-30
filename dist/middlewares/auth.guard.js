"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGuard = void 0;
class userGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return !!request.user;
    }
}
exports.userGuard = userGuard;
//# sourceMappingURL=auth.guard.js.map