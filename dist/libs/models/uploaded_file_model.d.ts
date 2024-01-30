import { BaseModel } from "./base_model";
import { User } from "./user_model";
export declare class UploadedFile extends BaseModel {
    mimetype: string;
    filename: string;
    minificationDuration?: number;
    memoryUsageAfterMinification?: number;
    size: number;
    userId: string;
    user: User;
}
