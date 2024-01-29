import { UserSignupDto } from "../../../libs/dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignupDtoRequest extends UserSignupDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
}
