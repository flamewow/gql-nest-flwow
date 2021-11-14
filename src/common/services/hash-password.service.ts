import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { config } from '@core/config';

@Injectable()
export class HashPasswordService {
  async getHash(password: string, salt = crypto.randomBytes(64).toString('base64'), N = config.passwordHash.N): Promise<string> {
    return new Promise(function (resolve, reject) {
      crypto.scrypt(password, salt, 64, { N }, function (err, result) {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(`${N}$${salt}$${result.toString('hex')}`);
      });
    });
  }

  parsePasswordHash(password: string) {
    const [N, salt, hash] = password.split('$');
    return {
      N: parseInt(N),
      salt,
      hash,
    };
  }

  async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
    const { N, salt } = this.parsePasswordHash(storedPass);
    const encodedProvidedPass = await this.getHash(providedPass, salt, N);
    return encodedProvidedPass === storedPass;
  }
}
