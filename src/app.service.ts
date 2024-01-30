import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  bootstrap_test(): string {
    return "application is up!";
  }
}
