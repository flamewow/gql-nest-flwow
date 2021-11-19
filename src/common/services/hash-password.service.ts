import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { config } from '@core/config';

@Injectable()
export class HashPasswordService {
  private logger = new Logger(this.constructor.name);

  async getHash(password: string, salt = crypto.randomBytes(64).toString('base64'), N = config.passwordHash.N): Promise<string> {
    const logger = this.logger;

    return new Promise(function (resolve, reject) {
      crypto.scrypt(password, salt, 64, { N }, function (err, result) {
        if (err) {
          logger.error(err);
          reject(err);
        }

        const output = `${N}$${salt}$${result.toString('hex')}`;
        logger.debug(output);

        resolve(output);
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
