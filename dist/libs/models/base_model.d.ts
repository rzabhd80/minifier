import { BaseEntity } from "typeorm";
export declare class BaseModel extends BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
