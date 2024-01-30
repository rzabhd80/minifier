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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_model_1 = require("./base_model");
const uploaded_file_model_1 = require("./uploaded_file_model");
let User = class User extends base_model_1.BaseModel {
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", nullable: false, unique: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email", unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => uploaded_file_model_1.UploadedFile, (uploadedFile) => uploadedFile.user),
    __metadata("design:type", Array)
], User.prototype, "uploadedFiles", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Index)("user_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("user", { schema: "public" })
], User);
//# sourceMappingURL=user_model.js.map