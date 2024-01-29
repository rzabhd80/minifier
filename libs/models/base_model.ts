import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;
  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamptz",
    default: () => `null`,
    name: "deleted_at",
  })
  public deletedAt: Date | null;
}
