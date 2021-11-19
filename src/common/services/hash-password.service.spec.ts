import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HashPasswordService } from './hash-password.service';

describe('HashPasswordService', () => {
  let service: HashPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Logger],
      providers: [HashPasswordService],
    })
      .setLogger(console)
      .compile();

    service = module.get<HashPasswordService>(HashPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate 222 chars pass hash string', async () => {
    const passwordHash = await service.getHash('qwerty');
    expect(passwordHash.length).toEqual(222);
  });
});
