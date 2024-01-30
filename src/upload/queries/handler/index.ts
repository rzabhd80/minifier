import { GetUsersFileQuery } from "../impl/get_users_file.query";

export * from "./get_users_files.handler";
import {GetUsersFilesHandler} from "./get_users_files.handler"
export const uploadQueryHandler = [GetUsersFileQuery];