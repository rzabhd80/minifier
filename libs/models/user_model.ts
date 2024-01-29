import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseModel } from "./base_model";
import { UploadedFile } from "./uploaded_file_model";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User extends BaseModel {
  @Column("varchar", { name: "name", nullable: false, unique: false })
  name: string;
  @Column("varchar", { name: "email", unique: true })
  email: string;
  @Column("varchar", { name: "password", nullable: false })
  password: string;
  @OneToMany(() => UploadedFile, (uploadedFile) => uploadedFile.user)
  uploadedFiles: UploadedFile[];
}
