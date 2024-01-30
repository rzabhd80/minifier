"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeTypeMiddleware = void 0;
const common_1 = require("@nestjs/common");
let MimeTypeMiddleware = class MimeTypeMiddleware {
    use(req, res, next) {
        const allowedFileTypes = [".css", ".js"];
        const fileExtension = req.file?.originalname.split(".").pop();
        if (req.file &&
            fileExtension &&
            !allowedFileTypes.includes(`.${fileExtension.toLowerCase()}`)) {
            return res
                .status(400)
                .send("Invalid file type. Only CSS and JS files are allowed.");
        }
        next();
    }
};
exports.MimeTypeMiddleware = MimeTypeMiddleware;
exports.MimeTypeMiddleware = MimeTypeMiddleware = __decorate([
    (0, common_1.Injectable)()
], MimeTypeMiddleware);
//# sourceMappingURL=upload_file_middleware.js.map