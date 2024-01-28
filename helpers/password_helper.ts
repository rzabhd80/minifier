import { randomBytes, scrypt as _scrypt } from 'crypto';
import generator from 'generate-password';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

export const generateHashPassword = async (
  password: string,
): Promise<string> => {
  // generate the salt
  const salt = randomBytes(8).toString('hex');

  // hash password and salt together
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  // join the hashed result and salt together
  return salt + '.' + hash.toString('hex');
};

export const verifyPassword = async (
  hashedPassword: string,
  password,
): Promise<boolean> => {
  const [salt, storedHash] = hashedPassword.split('.');

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  return hash.toString('hex') === storedHash;
};

export const generatePassword = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return 'test@1234&!@$%';
  }
  return generator.generate({
    length: 10,
    numbers: true,
    symbols: false,
  });
};
