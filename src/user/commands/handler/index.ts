export * from "./user_signup.handler";
export * from "./user_login.handler";
export * from "./seeder_factory.handler";
import { UserSignupHandler } from "./user_signup.handler";
import { UserLoginHandler } from "./user_login.handler";
import { SeederFactoryCommand } from "../impl/seeder_factory.command";

export const userHandlers = [
  UserSignupHandler,
  UserLoginHandler,
  SeederFactoryCommand,
];
