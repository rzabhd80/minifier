import { BaseModel } from "./base_model";
import { UploadedFile } from "./uploaded_file_model";
export declare class User extends BaseModel {
    name: string;
    email: string;
    password: string;
    uploadedFiles: UploadedFile[];
}
