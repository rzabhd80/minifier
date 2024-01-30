import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./base_model";
import { User } from "./user_model";

@Index("uploaded_file_pkey", ["id"], { unique: true })
@Entity("uploaded_file", { schema: "public" })
export class UploadedFile extends BaseModel {
  @Column("varchar", { name: "mimetype", nullable: false, unique: false })
  mimetype: string;
  @Column("varchar", { name: "filename", unique: false })
  filename: string;
  @Column("double precision", { nullable: true })
  minificationDuration?: number;
  @Column("numeric", { nullable: true })
  memoryUsageAfterMinification?: number;
  @Column("float", { nullable: false })
  size: number;
  @Column("uuid", { nullable: false })
  userId: string;
  @ManyToOne(() => User, (user) => user.uploadedFiles, { nullable: false })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}
