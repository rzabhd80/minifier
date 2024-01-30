"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadedFile = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("./base_model");
const user_model_1 = require("./user_model");
let UploadedFile = class UploadedFile extends base_model_1.BaseModel {
};
exports.UploadedFile = UploadedFile;
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "mimetype", nullable: false, unique: false }),
    __metadata("design:type", String)
], UploadedFile.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "filename", unique: false }),
    __metadata("design:type", String)
], UploadedFile.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)("double precision", { nullable: true }),
    __metadata("design:type", Number)
], UploadedFile.prototype, "minificationDuration", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { nullable: true }),
    __metadata("design:type", Number)
], UploadedFile.prototype, "memoryUsageAfterMinification", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { nullable: false }),
    __metadata("design:type", Number)
], UploadedFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid", { nullable: false }),
    __metadata("design:type", String)
], UploadedFile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.uploadedFiles, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "userId", referencedColumnName: "id" }),
    __metadata("design:type", user_model_1.User)
], UploadedFile.prototype, "user", void 0);
exports.UploadedFile = UploadedFile = __decorate([
    (0, typeorm_1.Index)("uploaded_file_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("uploaded_file", { schema: "public" })
], UploadedFile);
//# sourceMappingURL=uploaded_file_model.js.map