import { ApiProperty } from "@nestjs/swagger";
import { UserLoginDto } from "libs/dto";

export class UserLoginDtoRequest extends UserLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
