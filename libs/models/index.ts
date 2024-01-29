//User Model
export * from "./user_model";
export * from "./uploaded_file_model";
import { User } from "./user_model";
import { UploadedFile } from "./uploaded_file_model";

export const entities = [User, UploadedFile];
