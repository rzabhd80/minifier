export declare const generateHashPassword: (password: string) => Promise<string>;
export declare const verifyPassword: (hashedPassword: string, password: any) => Promise<boolean>;
export declare const generatePassword: () => string;
