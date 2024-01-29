export * from "./user_signup.handler";
export * from "./user_login.handler";
import { UserSignupHandler } from "./user_signup.handler";
import { UserLoginHandler } from "./user_login.handler";

export const userHandlers = [UserSignupHandler, UserLoginHandler];
