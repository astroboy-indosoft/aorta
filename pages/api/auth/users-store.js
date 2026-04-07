import crypto from 'crypto';

const users = [];

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const SCRYPT_COST = 16384;

function scryptAsync(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      { N: SCRYPT_COST },
      (err, derivedKey) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(derivedKey);
      }
    );
  });
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = await scryptAsync(password, salt);
  return `${salt.toString('hex')}:${key.toString('hex')}`;
}

export async function comparePassword(password, hash) {
  const [saltHex, keyHex] = hash.split(':');
  if (!saltHex || !keyHex) {
    return false;
  }

  const key = await scryptAsync(password, Buffer.from(saltHex, 'hex'));
  const savedKey = Buffer.from(keyHex, 'hex');

  if (key.length !== savedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(key, savedKey);
}

export function findUserByNormalizedEmail(normalizeemail) {
  return users.find((u) => u.normalizeemail === normalizeemail && !u.deleted_at);
}

export function createUser(userInput) {
  const user = {
    id: users.length + 1,
    ...userInput,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
  };

  users.push(user);
  return user;
}
