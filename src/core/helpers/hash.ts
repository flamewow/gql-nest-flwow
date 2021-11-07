import * as crypto from 'crypto';

export const getScryptHash = async (password: string, salt, N): Promise<string> => {
  return new Promise(function (resolve, reject) {
    crypto.scrypt(password, salt, 64, { N }, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(`${N}$${salt}$${result.toString('hex')}`);
    });
  });
};
